import {handlePublicFile} from "./server/public-files.ts";
import {textResponse} from "./server/util.ts";
import { handleRebusRequest } from "./server/rebus-db.ts";
import { initEmojiMapping } from "./server/emoji-mapping.ts";

async function handleRequest(request: Request) {
  const { pathname } = new URL(request.url);
  switch (pathname) {
    case "/":
      return handlePublicFile("/index.html");
    case "/api/rebus":
      return handleRebusRequest(request);
    case "/favicon.ico":
      return new Response(null, { status: 404 });
    default:
      return handlePublicFile(pathname);
  }
}

initEmojiMapping().catch(error=>{
  console.log("failed to load emojis", error);
})

addEventListener("fetch", async event => {
  let resp;
  try {
    resp = await handleRequest(event.request);
  } catch(error){
    console.error(error);
    resp = textResponse(`ERROR: ${error.message}`, 500);
  }
  event.respondWith(resp);
});
