export function textResponse(content: string, status: number){
  return new Response(content, {
    headers: {"Content-Type": 'text/plain'},
    status,
  });
}

export function jsonResponse(content: unknown){
  return new Response(JSON.stringify(content), {
    headers: {"Content-Type": 'application/json'},
  });
}

export function htmlResponse(content: string){
  return new Response(content, {
    headers: {"Content-Type": 'text/html'},
  });
}

export function redirectResponse(location: string | URL){
  return new Response(null, {
    headers: {"Location": location.toString()},
    status: 302,
  });
}
