import {jsonResponse, textResponse} from "./util.ts";

export async function handleGameRequest(request: Request, url: URL) {
  if (request.method === "GET") {
    return handleGameGetRequest(request, url);
  }

  return textResponse("Invalid HTTP method", 405);
}

async function handleGameGetRequest(req: Request, url: URL){
  const id = url.searchParams.get('id');
  if(!id) throw new Error("Missing id");
  return jsonResponse({id});
}
