import {jsonResponse} from "./util.ts";
import {getEmojiUrl} from "./emoji-mapping.ts";
import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
} from "https://cdn.skypack.dev/@aws-sdk/client-dynamodb@3.20.0?dts";

const client = new DynamoDBClient({
  region: "us-east-1",
  credentials: {
    accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
    secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
    sessionToken: Deno.env.get("AWS_SESSION_TOKEN"),
  },
});

interface RebusPuzzle {
  puzzle: string;
  solution: string;
}

export async function handleRebusList() {
  const items = await testScan([]);
  return jsonResponse(items);
}

type RebusDatum = { text: string } | { image: string; shortName: string };

async function testScan(items: any[], startKey?: any): Promise<RebusPuzzle[]> {
  if (items.length > 0 && startKey === undefined) {
    return items;
  }
  const { Items, LastEvaluatedKey } = await client.send(
    new ScanCommand({
      TableName: "cupcake-2021q3-rebus-puzzles",
      ExclusiveStartKey: startKey,
    })
  );

  const newItems =
    Items?.map((item) => ({
      puzzle: parseRebus(item.p.S ?? ""),
      solution: item.s.S,
    })) ?? [];

  return testScan(newItems, LastEvaluatedKey);
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
