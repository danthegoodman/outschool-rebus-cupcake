import Babel from "https://dev.jspm.io/@babel/standalone"

async function handleRequest(request: Request){
  const {pathname} = new URL(request.url);
  switch (pathname) {
    case '/': return handlePublicFile('/index.html');
    case '/favicon.ico': return new Response(null, {status:404});
  }

  return handlePublicFile(pathname);
}

async function handlePublicFile(pathname: string){
  try {
    let content = await Deno.readTextFile('public' + pathname)
    content = maybeTransform(content, pathname);
    return new Response(content, {
      headers: {"content-type": assumeContentType(pathname)},
    });
  } catch(error) {
    if(error.name === "NotFound"){
      return textResponse(`Not Found: ${pathname}`, 404);
    } else {
      throw error;
    }
  }
}

function maybeTransform(content: string, pathname: string){
  if(!pathname.match(/.tsx?$/)) return content;
  return Babel.transform(content, {
    filename: pathname.slice(1),
    presets: ['typescript','react']
  }).code;
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

function textResponse(content: string, status: number){
  return new Response(content, {
    headers: {"content-type": 'text/plain'},
    status,
  })
}

addEventListener("fetch", async (event) => {
  let resp;
  try {
    resp = await handleRequest(event.request);
  } catch(error){
    console.error(error);
    resp = textResponse(`ERROR: ${error.message}`, 500);
  }
  event.respondWith(resp);
});
