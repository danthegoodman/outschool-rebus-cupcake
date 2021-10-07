import * as JWT from "https://deno.land/x/djwt@v2.2/mod.ts"
import {htmlResponse, redirectResponse, textResponse} from "./util.ts";
import {
  isDevelopment,
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
  } catch (error){
    if(isDevelopment){
      console.log(req.method, req.url, "No auth:", error.message);
    }
    return false;
  }
}

export interface UserAuth {
  email: string;
}
export async function getAuth(req: Request): Promise<UserAuth>{
  const cookies = req.headers.get('Cookie')?.split('; ');
  const jwt = cookies?.find(it=> it.startsWith('JWT='))?.split('=')[1];
  if(!jwt) throw new Error("Missing JWT Token");

  const result = await JWT.verify(jwt, JWT_SECRET, ALGORITHM);
  if(typeof result.email !== "string") throw new Error("JWT is missing email");
  return {email: result.email};
}

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export function handleRequestNeedingAuth(req: Request, url: URL){
  const targ = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  targ.searchParams.set('client_id', OAUTH_CLIENT_ID);
  targ.searchParams.set('redirect_uri', url.origin + '/auth/redirect');
  targ.searchParams.set('response_type', 'code');
  targ.searchParams.set('scope', 'email');
  targ.searchParams.set('prompt', 'select_account');
  let xFwd = req.headers.get('x-forwarded-host');
  if(xFwd){
    targ.searchParams.set('state', `xfwd=${xFwd}`)
  }
  return redirectResponse(targ)
}

export function handleLogout(){
  return new Response(null, {
    headers: {
      'Set-Cookie': buildSetCookieHeader('gone', 'remove'),
      Location: '/'
    },
    status: 302,
  });
}

export function handleAuthenticated(){
  return htmlResponse(`<!DOCTYPE html>
<html lang="en">
<body>
<script>window.location.replace('/');</script>
<p>Click <a href="/">here</a> to proceed if your browser doesn't automatically redirect you</p>
</body>
</html>`)
}

export async function handleAuthRedirect(url: URL){
  const code = url.searchParams.get('code');
  if(!code) return textResponse("Missing ?code", 400);

  if(isDevelopment){
    const [,xFwdHost] = url.searchParams.get('state')?.match(/xfwd=(.+)/) ?? [];
    if(xFwdHost){
      const next = new URL(url);
      next.host = xFwdHost;
      next.searchParams.delete('state');
      return redirectResponse(next);
    }
  }

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
      Location: '/auth/complete',
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
<p><a href="/auth/logout">Logout</a></p>
</body>
</html>`);
}
