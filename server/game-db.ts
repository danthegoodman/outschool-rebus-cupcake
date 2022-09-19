import {jsonResponse, textResponse} from "./util.ts";
import {getAuth} from "./google-auth.ts";
import {ddbGet, ddbPut} from "./dynamo.ts";
import {getPuzzlesFromDynamoDB, ClientPuzzle} from "./rebus-db.ts";
import {shuffle} from "https://cdn.skypack.dev/lodash-es@^4.17.15";

export async function handleGameRequest(request: Request, url: URL) {
  const id = url.searchParams.get('id');
  if(!id) throw new Error("Missing id");

  if (request.method === "GET") {
    return await handleGameGetRequest(request, id);
  }

  if (request.method === "POST") {
    return await handleGamePostRequest(request, id);
  }

  return textResponse("Invalid HTTP method", 405);
}

const TABLE = "cupcake-2021q3-rebus-games"
type DynamoGameKey = {
  e: {S:string} // email
  i: {S:string} // id
}
type DynamoGameItem =  DynamoGameKey & {
  p: {L:Array<{S:string}>} // puzzles
  s: {L:Array<{S:string}>} // solutions
  g: {L:Array<{S:string}>} // guesses
  n: {L:Array<{S:string}>} // hiNts
  h: {S: string} // hacker
}
type ClientGame = {
  id: string;
  email: string;
  puzzles: string[];
  solutions: string[];
  guesses: string[];
  hints: string[];
  hacker: boolean;
}

async function handleGameGetRequest(req: Request, id: string){
  const {email} = await getAuth(req);

  let game = await ddbGet<DynamoGameKey, DynamoGameItem>(TABLE, {
    e: {S: email},
    i: {S: id},
  });

  if(!game){
    game = await createNewGame(email, id)
  }
  return jsonResponse(mapDynamoGame(game));
}

async function handleGamePostRequest(req: Request, id: string){
  const clientGame: ClientGame = await req.json();
  if(id !== clientGame.id){
    throw new Error("Mismatched ID on game and in URL");
  }
  await ddbPut<DynamoGameItem>(TABLE, mapClientGame(clientGame))
  return jsonResponse(clientGame);
}

async function createNewGame(email: string, id: string){
  const allPuzzles = await getPuzzlesFromDynamoDB();
  const puzzles:ClientPuzzle[] = shuffle(allPuzzles).slice(0, 10);

  const ddbGame = mapClientGame({
    email,
    id,
    puzzles: puzzles.map(it=>it.puzzle),
    solutions: puzzles.map(it=>it.solution),
    hints: puzzles.map(it=>it.hint),
    guesses: puzzles.map(()=>""),
    hacker: false,
  })
  await ddbPut<DynamoGameItem>(TABLE, ddbGame)
  return ddbGame
}

function mapDynamoGame(item: DynamoGameItem): ClientGame{
  const mapStr = (it: {S:string})=> it.S;
  return {
    email: item.e.S,
    id: item.i.S,
    puzzles: item.p.L.map(mapStr),
    guesses: item.g.L.map(mapStr),
    solutions: item.s.L.map(mapStr),
    hints: item.n.L.map(mapStr),
    hacker: item.h.S === "1",
  }
}
function mapClientGame(item: ClientGame): DynamoGameItem{
  const mapStr = (it: string)=> ({S: it});
  return {
    e: {S: item.email},
    i: {S: item.id},
    p: {L: item.puzzles.map(mapStr)},
    g: {L: item.guesses.map(mapStr)},
    s: {L: item.solutions.map(mapStr)},
    n: {L: item.hints.map(mapStr)},
    h: {S: item.hacker ? "1" : ""},
  }
}
