import {jsonResponse, textResponse} from "./util.ts";
import {ddbPut, ddbScanAll, ddbDelete} from "./dynamo.ts";
import {getAuth} from "./google-auth.ts";

const TABLE = "cupcake-2021q3-rebus-puzzles";

export type ClientPuzzle = {
  puzzle: string;
  solution: string;
  contributor: string;
}
type DynamoPuzzleKey = {
  p: { S: string }; //puzzle
}
type DynamoPuzzleItem = DynamoPuzzleKey & {
  s: { S: string }; //solution
  c: { S: string }; //contributor
}

export async function handleRebusRequest(request: Request) {
  if (request.method === "GET") {
    const items = await getPuzzlesFromDynamoDB();
    return jsonResponse(items);
  }

  if (request.method === "POST") {
    const body = await request.json();
    if (!body.puzzle || !body.solution) {
      throw new Error("puzzle or solution was not provided");
    }
    const {email} = await getAuth(request);
    await putPuzzlesToDynamoDB({
      puzzle: body.puzzle,
      solution: body.solution,
      contributor: email,
    });
    const items = await getPuzzlesFromDynamoDB();
    return jsonResponse(items);
  }

  if (request.method === "DELETE") {
    const body = await request.json();
    if (!body.puzzle) {
      throw new Error("key was not provided");
    }
    await deletePuzzlesToDynamoDB(body.puzzle);
    const items = await getPuzzlesFromDynamoDB();
    return jsonResponse(items);
  }

  return textResponse("Invalid HTTP method", 405);
}

export async function getPuzzlesFromDynamoDB(): Promise<ClientPuzzle[]> {
  const items = await ddbScanAll<DynamoPuzzleItem>(TABLE);
  return items.map(mapDynamoPuzzle);
}

async function putPuzzlesToDynamoDB(item: ClientPuzzle) {
  await ddbPut<DynamoPuzzleItem>(TABLE, mapClientPuzzle(item))
}

async function deletePuzzlesToDynamoDB(puzzle: string) {
  await ddbDelete<DynamoPuzzleKey>(TABLE, {p: {S: puzzle}});
}

function mapDynamoPuzzle(it: DynamoPuzzleItem):ClientPuzzle{
  return {
    puzzle: it.p.S,
    solution: it.s.S,
    contributor: it.c.S,
  }
}
function mapClientPuzzle(it: ClientPuzzle): DynamoPuzzleItem{
  return {
    p: {S: it.puzzle},
    s: {S: it.solution},
    c: {S: it.contributor},
  }
}
