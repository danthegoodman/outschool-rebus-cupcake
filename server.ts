import { handlePublicFile } from "./server/public-files.ts";
import { textResponse } from "./server/util.ts";
import { handleRebusRequest } from "./server/rebus-db.ts";
import { initEmojiMapping } from "./server/emoji-mapping.ts";
import {
  handleAuthRedirect,
  handleLogout,
  handleRequestNeedingAuth,
  hasAuth,
} from "./server/google-auth.ts";

async function handleRequest(request: Request) {
  const url = new URL(request.url);
  // non-authed routes
  switch (url.pathname) {
    case "/favicon.ico":
      return new Response(null, { status: 404 });
    case "/logout":
      return handleLogout();
    case "/api/auth_redirect":
      return handleAuthRedirect(url);
  }

  if (!(await hasAuth(request))) {
    return handleRequestNeedingAuth(url);
  }

  // authed routes
  switch (url.pathname) {
    case "/":
      return handlePublicFile("/index.html");
    case "/api/rebus":
      return handleRebusRequest(request);
    default:
      return handlePublicFile(url.pathname);
  }
}

initEmojiMapping().catch((error) => {
  console.log("failed to load emojis", error);
});

addEventListener("fetch", async (event) => {
  let resp;
  try {
    resp = await handleRequest(event.request);
  } catch (error) {
    console.error(error);
    resp = textResponse(`ERROR: ${error.message}`, 500);
  }
  event.respondWith(resp);
});
