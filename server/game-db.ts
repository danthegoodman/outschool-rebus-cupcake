import {jsonResponse, textResponse} from "./util.ts";
import {getAuth} from "./google-auth.ts";
import {ddbGet, ddbPut} from "./dynamo.ts";
import {getPuzzlesFromDynamoDB} from "./rebus-db.ts";
import {shuffle} from "https://cdn.skypack.dev/lodash-es@^4.17.15";

export async function handleGameRequest(request: Request, url: URL) {
  if (request.method === "GET") {
    return handleGameGetRequest(request, url);
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
  g: {L:Array<{S:string}>} // guessed-solutions
}
type GameOutput = {
  id: string;
  email: string;
  puzzles: string[];
  guesses: string[];
}

async function handleGameGetRequest(req: Request, url: URL){
  const id = url.searchParams.get('id');
  if(!id) throw new Error("Missing id");

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

async function createNewGame(email: string, id: string){
  const allPuzzles = await getPuzzlesFromDynamoDB();
  const puzzles:string[] = shuffle(allPuzzles.map(it=> it.key)).slice(0, 10);

  let ddbGame:DynamoGameItem = {
    e: {S:email},
    i: {S:id},
    p: {L: puzzles.map(it=> ({S: it}))},
    g: {L: []}
  };
  await ddbPut<DynamoGameItem>(TABLE, ddbGame)
  return ddbGame
}

function mapDynamoGame(item: DynamoGameItem): GameOutput{
  return {
    email: item.e.S,
    id: item.i.S,
    puzzles: item.p.L.map(it=> it.S),
    guesses: item.g.L.map(it=> it.S),
  }
}
