import Babel from "https://dev.jspm.io/@babel/standalone"
import {textResponse} from "./util.ts";

export async function handlePublicFile(pathname: string){
  try {
    let content = await Deno.readTextFile('public' + pathname)
    content = maybeTransform(content, pathname.slice(1));
    return new Response(content, {
      headers: {"Content-Type": assumeContentType(pathname)},
    });
  } catch(error) {
    if(error.name === "NotFound"){
      return textResponse(`Not Found: ${pathname}`, 404);
    } else {
      throw error;
    }
  }
}

function maybeTransform(content: string, filename: string){
  let presets;
  if(filename.endsWith('.ts')) presets = ['typescript'];
  else if(filename.endsWith('.tsx')) presets = ['typescript','react'];
  else return content;

  return Babel.transform(content, {filename, presets}).code;
}

function assumeContentType(pathname: string){
  const suffix = pathname.split('.').slice(-1)[0];
  switch(suffix){
    case 'html':
      return "text/html; charset=utf-8";
    case 'ts':
    case 'js':
    case 'tsx':
    case 'jsx':
      return "application/javascript";
  }
  return "text/plain";
}
