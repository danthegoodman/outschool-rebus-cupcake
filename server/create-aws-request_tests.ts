import { assertEquals } from "https://deno.land/std@0.156.0/testing/asserts.ts";
import { createAwsRequest } from "./create-aws-request.ts";

Deno.test("test", async () => {
  const req = await createAwsRequest({
    credentials: {
      accessKeyId: "AKIDEXAMPLE",
      secretAccessKey: "wJalrXUtnFEMI/K7MDENG+bPxRfiCYEXAMPLEKEY",
      sessionToken: undefined,
    },
    url: "https://iam.amazonaws.com/?Version=2010-05-08&Action=ListUsers",
    region: "us-east-1",
    method: "GET",
    contentType: "application/x-www-form-urlencoded; charset=utf-8",
    date: new Date("2015-08-30T12:36:00.000Z"),
  });

  assertEquals(
    req.headers.get("Authorization"),
    "AWS4-HMAC-SHA256 Credential=AKIDEXAMPLE/20150830/us-east-1/iam/aws4_request, SignedHeaders=content-type;host;x-amz-date, Signature=5d672d79c15b13162d9279b0855cfba6789a8edb4c82c400e06b5924a6f2b5d7",
  );
});
