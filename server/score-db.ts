import {jsonResponse, textResponse} from "./util.ts";
import {getAuth} from "./google-auth.ts";
import {ddbGet, ddbUpdate} from "./dynamo.ts";

export async function handleScoreRequest(request: Request, url: URL) {
  if (request.method === "GET") {
    return await handleScoreGetRequest(request, url);
  }

  if (request.method === "PUT") {
    return await handleScorePutRequest(request);
  }

  return textResponse("Invalid HTTP method", 405);
}

const TABLE = "cupcake-2021q3-rebus-scores"
type DynamoScoreKey = {
  e: {S:string} // email
}
type DynamoScoreItem = DynamoScoreKey & {
  s: { N: string } // score
}

type ScoreGet = {
  email: string;
  score: number;
}
type ScorePut = {
  points: number;
}

async function handleScoreGetRequest(req: Request, url: URL){
  const {email} = await getAuth(req);

  const scoreItem = await ddbGet<DynamoScoreKey, DynamoScoreItem>(TABLE, {
    e: {S: email},
  });

  return jsonResponse(
    mapDynamoScore(scoreItem ?? {e: {S: email}, s: {N: "0"}})
  );
}

async function handleScorePutRequest(req: Request){
  const {email} = await getAuth(req);

  const {points}: ScorePut = await req.json();
  if(!points || !Number.isSafeInteger(points)){
    throw new Error("Missing or invalid 'points' field");
  }

  if(points < 1 || 5 < points){
    throw new Error("Invalid number of points submitted");
  }
  const result = await ddbUpdate<DynamoScoreKey, DynamoScoreItem>({
    TableName: TABLE,
    Key: {e: {S: email}},
    ExpressionAttributeValues: {':points': {N: String(points)}},
    UpdateExpression: 'ADD s :points',
    ReturnValues: "ALL_NEW"
  })
  return jsonResponse(mapDynamoScore(result));
}
function mapDynamoScore(item: DynamoScoreItem): ScoreGet{
  return {
    email: item.e.S,
    score: Number.parseInt(item.s.N, 10),
  }
}
