export function textResponse(content: string, status: number){
  return new Response(content, {
    headers: {"Content-Type": 'text/plain'},
    status,
  });
}

export function jsonResponse(content: any){
  return new Response(JSON.stringify(content), {
    headers: {"Content-Type": 'application/json'},
  });
}
