import { serve } from "https://deno.land/std@0.140.0/http/server.ts";
import { handlePublicFile } from "./server/public-files.ts";
import { textResponse } from "./server/util.ts";
import { handleRebusRequest } from "./server/rebus-db.ts";
import {
  handleAuthenticated,
  handleAuthRedirect,
  handleLogout,
  handleRequestNeedingAuth,
  hasAuth,
} from "./server/google-auth.ts";
import {isDevelopment} from "./server/constants.ts";
import {handleGameRequest} from "./server/game-db.ts";
import {handleScoreRequest} from "./server/score-db.ts";

async function handleRequest(request: Request): Promise<Response>{
  const url = new URL(request.url);
  // non-authed routes
  switch (url.pathname) {
    case "/favicon.ico":
      return new Response(null, { status: 404 });
    case '/auth/complete':
      return handleAuthenticated();
    case "/auth/logout":
      return handleLogout();
    case "/auth/login":
      return handleRequestNeedingAuth(request, url);
    case "/auth/redirect":
      return handleAuthRedirect(url);
  }

  if (!(await hasAuth(request))) {
    return handleRequestNeedingAuth(request, url);
  }

  // authed routes
  switch (url.pathname) {
    case "/":
      return handlePublicFile("/index.html");
    case "/api/rebus":
      return handleRebusRequest(request);
    case "/api/game":
      return handleGameRequest(request, url);
    case "/api/score":
      return handleScoreRequest(request, url);
    default:
      return handlePublicFile(url.pathname);
  }
}

serve(async (req) => {
  let resp: Response;
  try {
    resp = await handleRequest(req);
    if(!resp) throw new Error("No response given");
  } catch (error) {
    console.error(error);
    resp = textResponse(`ERROR: ${error.message}`, 500);
  }

  if(isDevelopment){
    let message = `${req.method} ${req.url} => ${resp.status}`;
    if(resp.headers.has('Location')){
      message += ' ' + resp.headers.get('Location')
    }
    console.log(message);
  }
  return resp;
}, isDevelopment ? {port: 8080} : {});
