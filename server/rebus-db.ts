import {jsonResponse, textResponse} from "./util.ts";
import {getEmojiUrl} from "./emoji-mapping.ts";
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand,
} from "https://cdn.skypack.dev/@aws-sdk/client-dynamodb@3.20.0?dts";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
    sessionToken: Deno.env.get("AWS_SESSION_TOKEN"),
  },
});

interface RebusPuzzleOutput {
  key: string;
  puzzle: RebusDatum[];
  solution: string;
}

interface RebusPuzzleInput {
  puzzle: string;
  solution: string;
}

export async function handleRebusRequest(request: Request) {
  if (request.method === "GET") {
    const items = await getPuzzlesFromDynamoDB([]);
    return jsonResponse(items);
  }

  if (request.method === "POST") {
    const body = await request.json();
    if (!body.puzzle || !body.solution) {
      throw new Error("puzzle or solution was not provided");
    }
    await putPuzzlesToDynamoDB({
      puzzle: body.puzzle,
      solution: body.solution,
    });
    const items = await getPuzzlesFromDynamoDB([]);
    return jsonResponse(items);
  }

  if (request.method === "DELETE") {
    const body = await request.json();
    if (!body.key) {
      throw new Error("key was not provided");
    }
    await deletePuzzlesToDynamoDB(body.key);
    const items = await getPuzzlesFromDynamoDB([]);
    return jsonResponse(items);
  }

  return textResponse("Invalid HTTP method", 405);
}

type RebusDatum = { text: string } | { image: string; shortName: string };

async function getPuzzlesFromDynamoDB(
  items: any[],
  startKey?: any
): Promise<RebusPuzzleOutput[]> {
  if (items.length > 0 && startKey === undefined) {
    return items;
  }
  const { Items, LastEvaluatedKey } = await client.send(
    new ScanCommand({
      TableName: "cupcake-2021q3-rebus-puzzles",
      ExclusiveStartKey: startKey,
    })
  );

  const newItems = Items?.map(dynamodbToPuzzleResponse) ?? [];

  return getPuzzlesFromDynamoDB(newItems, LastEvaluatedKey);
}

async function putPuzzlesToDynamoDB(item: RebusPuzzleInput) {
  await client.send(
    new PutItemCommand({
      TableName: "cupcake-2021q3-rebus-puzzles",
      Item: {
        p: { S: item.puzzle },
        s: { S: item.solution },
      },
    })
  );
}

async function deletePuzzlesToDynamoDB(key: string) {
  await client.send(
    new DeleteItemCommand({
      TableName: "cupcake-2021q3-rebus-puzzles",
      Key: {
        p: { S: key },
      },
    })
  );
}

function dynamodbToPuzzleResponse(item: any): RebusPuzzleOutput {
  return {
    key: item.p.S,
    puzzle: parseRebus(item.p.S ?? ""),
    solution: item.s.S,
  };
}

export function parseRebus(puzzle: string): RebusDatum[] {
  let items: RebusDatum[] = [];

  const regex = /:([^:]+):/g;
  let lastEnd = 0;
  while(true){
    const match = regex.exec(puzzle);
    if (!match) break;

    const shortName = match[1];
    const image = getEmojiUrl(shortName);
    if (!image) continue;

    if(match.index !== lastEnd){
      items.push({text: puzzle.slice(lastEnd, match.index)});
    }
    items.push({image, shortName})
    lastEnd = regex.lastIndex;
  }
  if(lastEnd !== puzzle.length){
    items.push({text: puzzle.slice(lastEnd)});
  }

  return items;
}
