import {jsonResponse, textResponse} from "./util.ts";
import {getEmojiUrl} from "./emoji-mapping.ts";
import {ddbPut, ddbScanAll, ddbDelete} from "./dynamo.ts";
import {getAuth} from "./google-auth.ts";

const TABLE = "cupcake-2021q3-rebus-puzzles";

export interface RebusPuzzleOutput {
  key: string;
  puzzle: RebusDatum[];
  solution: string;
  contributor: string | null;
}

interface RebusPuzzleInput {
  puzzle: string;
  solution: string;
  contributor: string;
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
    if (!body.key) {
      throw new Error("key was not provided");
    }
    await deletePuzzlesToDynamoDB(body.key);
    const items = await getPuzzlesFromDynamoDB();
    return jsonResponse(items);
  }

  return textResponse("Invalid HTTP method", 405);
}

type RebusDatum = { text: string } | { image: string; shortName: string };

type DynamoPuzzleKey = {
  p: { S: string }; //puzzle
}
type DynamoPuzzleItem = DynamoPuzzleKey & {
  s: { S: string }; //solution
  c: { S: string }; //contributor
}

export async function getPuzzlesFromDynamoDB(): Promise<RebusPuzzleOutput[]> {
  const items = await ddbScanAll<DynamoPuzzleItem>(TABLE);
  return items.map(dynamodbToPuzzleResponse)
}

async function putPuzzlesToDynamoDB(item: RebusPuzzleInput) {
  await ddbPut<DynamoPuzzleItem>(TABLE, {
    p: {S: item.puzzle},
    s: {S: item.solution},
    c: {S: item.contributor},
  })
}

async function deletePuzzlesToDynamoDB(puzzle: string) {
  await ddbDelete<DynamoPuzzleKey>(TABLE, {p: {S: puzzle}});
}

function dynamodbToPuzzleResponse(item: DynamoPuzzleItem): RebusPuzzleOutput {
  return {
    key: item.p.S,
    puzzle: parseRebus(item.p.S ?? ""),
    solution: item.s.S,
    contributor: item.c.S ?? null,
  };
}

export function parseRebus(puzzle: string): RebusDatum[] {
  let items: RebusDatum[] = [];

  const regex = /:([^:]+):/g;
  let lastEnd = 0;
  while (true) {
    const match = regex.exec(puzzle);
    if (!match) break;

    const shortName = match[1];
    const image = getEmojiUrl(shortName);
    if (!image) continue;

    if (match.index !== lastEnd) {
      items.push({text: puzzle.slice(lastEnd, match.index)});
    }
    items.push({image, shortName})
    lastEnd = regex.lastIndex;
  }
  if (lastEnd !== puzzle.length) {
    items.push({text: puzzle.slice(lastEnd)});
  }

  return items;
}
