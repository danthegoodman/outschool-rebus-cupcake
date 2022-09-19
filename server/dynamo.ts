import { createAwsRequest } from "./create-aws-request.ts";
const credentials = {
  accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
  secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
  sessionToken: Deno.env.get("AWS_SESSION_TOKEN"),
};

export async function ddbScanAll<T>(table: string): Promise<T[]> {
  async function tailRecursive(items: T[], startKey: unknown): Promise<T[]> {
    if (items.length > 0 && startKey === undefined) {
      return items;
    }
    const { Items, LastEvaluatedKey } = await ddbRequest("Scan", {
      TableName: table,
      ExclusiveStartKey: startKey,
      ConsistentRead: true,
    });
    if (Items) {
      items.push(...Items);
    }
    return tailRecursive(items, LastEvaluatedKey);
  }

  return await tailRecursive([], undefined);
}

export async function ddbGet<K, T>(table: string, key: K): Promise<T | null> {
  const {Item} = await ddbRequest("GetItem", {
    TableName: table,
    Key: key,
    ConsistentRead: true,
  });
  return Item ?? null;
}

export async function ddbPut<T>(table: string, item: T) {
  await ddbRequest("PutItem", {
    TableName: table,
    Item: item,
  });
}

export async function ddbDelete<T>(table: string, key: T) {
  await ddbRequest("DeleteItem", {
    TableName: table,
    Key: key,
  });
}

async function ddbRequest<T, O>(api: string, body: T): Promise<O> {
  const req = await createAwsRequest({
    url: "https://dynamodb.us-east-1.amazonaws.com/",
    region: "us-east-1",
    credentials,
    method: "POST",
    extraHeaders: { "X-Amz-Target": `DynamoDB_20120810.${api}` },
    contentType: "application/x-amz-json-1.0",
    body: JSON.stringify(body),
  });

  const resp = await fetch(req);
  if (!resp.ok) {
    const text = await resp.text().catch((err) =>
      "ERROR:" + (err?.toString() ?? "n/a")
    );
    throw new Error(`Invalid response: ${resp.status} - ${text}`);
  }
  return resp.json();
}
