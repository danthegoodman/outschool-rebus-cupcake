import { textResponse } from "./util.ts";
import { isDevelopment } from "./constants.ts";

const cache = new Map<string, Uint8Array>();

export async function handlePublicFile(pathname: string) {
  try {
    let content;
    if(isDevelopment){
      content = await Deno.readFile("public" + pathname);
    } else {
      if(cache.has(pathname)){
        content = cache.get(pathname);
      } else {
        content = await Deno.readFile("public" + pathname);
        cache.set(pathname, content);
      }
    }
    return new Response(content, {
      headers: { "Content-Type": assumeContentType(pathname) },
    });
  } catch (error) {
    if (error.name === "NotFound") {
      return textResponse(`Not Found: ${pathname}`, 404);
    } else {
      throw error;
    }
  }
}

function assumeContentType(pathname: string) {
  const suffix = pathname.split(".").slice(-1)[0];
  switch (suffix) {
    case "html":
      return "text/html; charset=utf-8";
    case "js":
      return "application/javascript";
    case "json":
      return "application/json";
    case "png":
      return "image/png";
    case "css":
      return "text/css";
  }
  return "text/plain";
}
