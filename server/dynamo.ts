import {
  DynamoDBClient,
  ScanCommand,
  PutItemCommand,
  DeleteItemCommand
} from "https://cdn.skypack.dev/@aws-sdk/client-dynamodb@3.20.0?dts";

const client = new DynamoDBClient({
    region: "us-east-1",
    credentials: {
      accessKeyId: Deno.env.get("AWS_ACCESS_KEY_ID"),
      secretAccessKey: Deno.env.get("AWS_SECRET_ACCESS_KEY"),
      sessionToken: Deno.env.get("AWS_SESSION_TOKEN"),
    },
  });

export async function ddbScanAll<T>(table: string): Promise<T[]>{
  async function tailRecursive(items: any[], startKey: any): Promise<T[]> {
    if (items.length > 0 && startKey === undefined) {
      return items;
    }
    const { Items, LastEvaluatedKey } = await client.send(
      new ScanCommand({
        TableName: table,
        ExclusiveStartKey: startKey,
        ConsistentRead: true,
      })
    );
    if(Items){
      items.push(...Items);
    }
    return tailRecursive(items, LastEvaluatedKey);
  }

  return tailRecursive([], undefined);
}

export async function ddbPut<T>(table: string, item: T) {
  return await client.send(
    new PutItemCommand({
      TableName: table,
      Item: item,
    })
  );
}

export async function ddbDelete<T>(table: string, key: T) {
  return await client.send(
    new DeleteItemCommand({
      TableName: table,
      Key: key,
    })
  );
}
