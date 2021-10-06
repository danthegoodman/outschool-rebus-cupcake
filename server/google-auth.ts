import * as JWT from "https://deno.land/x/djwt@v2.2/mod.ts"
import {htmlResponse, redirectResponse, textResponse} from "./util.ts";
import {
  isProduction,
  JWT_SECRET,
  OAUTH_CLIENT_ID,
  OAUTH_SECRET
} from "./constants.ts";

const ALGORITHM = 'HS256';
export async function hasAuth(req: Request){
  try {
    await getAuth(req);
    return true;
  } catch {
    return false;
  }
}

export async function getAuth(req: Request){
  const cookies = req.headers.get('Cookie')?.split('; ');
  const jwt = cookies?.find(it=> it.startsWith('JWT='))?.split('=')[1];
  if(!jwt) throw new Error("Invalid Auth");

  return await JWT.verify(jwt, JWT_SECRET, ALGORITHM)
}

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function handleRequestNeedingAuth(reqUrl: URL){
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', OAUTH_CLIENT_ID);
  url.searchParams.set('redirect_uri', reqUrl.origin + '/api/auth_redirect');
  url.searchParams.set('response_type', 'code');
  url.searchParams.set('scope', 'email');
  return redirectResponse(url)
}

export function handleLogout(){
  new Response(null, {
    headers: {
      'Set-Cookie': buildSetCookieHeader('gone', 'remove'),
      Location: '/'
    },
    status: 302,
  });
}

export async function handleAuthRedirect(url: URL){
  const code = url.searchParams.get('code');
  if(!code) return textResponse("Missing ?code", 400);

  const tokenResp = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {"Content-Type": "application/x-www-form-urlencoded"},
    body: new URLSearchParams({
      code,
      client_id: OAUTH_CLIENT_ID,
      client_secret: OAUTH_SECRET,
      grant_type: "authorization_code",
      redirect_uri: url.origin + url.pathname,
    }).toString(),
  });
  if(!tokenResp.ok){
    console.error("token error", tokenResp);
    return textResponse("Error validating google auth code", 500);
  }

  const {access_token} = await tokenResp.json();
  const userResp = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    method: "GET",
    headers: {"Authorization": `Bearer ${access_token}`},
  });
  if(!userResp.ok){
    console.error("userinfo error", userResp);
    return textResponse("Error validating google auth token", 500);
  }

  const {email, picture} = await userResp.json();
  if(!email?.endsWith('@outschool.com')){
    return badEmailResponse(email);
  }

  const jwt = await JWT.create(
    {alg: ALGORITHM, typ: 'JWT'},
    {email, picture, exp: JWT.getNumericDate(THIRTY_DAYS)},
    JWT_SECRET
  )

  return new Response(null, {
    headers: {
      'Set-Cookie': buildSetCookieHeader(jwt, 'add'),
      Location: '/foo'
    },
    status: 302,
  });
}

function buildSetCookieHeader(jwt: string, type: 'add' | 'remove'){
  const parts = [
    `JWT=${jwt}`,
    `Path=/`,
    'SameSite=Strict',
  ]
  if(type === 'add'){
    parts.push(`Max-Age=${THIRTY_DAYS}`);
  } else {
    parts.push(`Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  }
  if(isProduction){
    parts.push('Secure')
  }
  return parts.join('; ');
}

function badEmailResponse(email: string) {
  return htmlResponse(`<!DOCTYPE html>
<html lang="en">
<body>
<h1>Access Denied</h1>
<p>This app is only available to users with @outschool.com emails.</p>
<p>Your email: <code>${email}</code></p>
<p><a href="/logout">Logout</a></p>
</body>
</html>`);
}
