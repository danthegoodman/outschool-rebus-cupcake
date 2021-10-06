import { textResponse } from "./util.ts";

export async function handlePublicFile(pathname: string) {
  try {
    const content = await Deno.readTextFile("public" + pathname);
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
    case "css":
      return "text/css";
  }
  return "text/plain";
}
