export type AwsCredentials = {
  accessKeyId: string;
  secretAccessKey: string;
  sessionToken: string | undefined;
};

export type AwsRequestOpts = {
  credentials: AwsCredentials;
  url: string | URL;
  region: string;
  method: string;
  date?: Date;
  contentType?: string;
  body?: string;
  extraHeaders?: Record<string, string>;
};

export async function createAwsRequest(opts: AwsRequestOpts) {
  const headers: Record<string, string> = {
    "X-Amz-Date": getAmzDate(opts.date ?? new Date()),
    ...opts.extraHeaders,
  };

  if (opts.contentType) {
    headers["Content-Type"] = opts.contentType;
  }
  if (opts.credentials.sessionToken) {
    headers["X-Amz-Security-Token"] = opts.credentials.sessionToken;
  }

  headers["Authorization"] = await awsSign(opts, headers);
  return new Request(opts.url.toString(), {
    method: opts.method,
    headers,
    body: opts.body ?? null,
  });
}

function getCanonicalSearch(url: URL) {
  const canonicalSearch: string[] = [];
  url.searchParams.forEach((v, k) => {
    //TODO lacking support for some edge cases
    canonicalSearch.push(k + "=" + encodeURI(v));
  });
  canonicalSearch.sort();
  return canonicalSearch.join("&");
}

async function awsSign(opts: AwsRequestOpts, headers: Record<string, string>) {
  const algorithm = "AWS4-HMAC-SHA256";
  const url = new URL(opts.url);
  const service = url.hostname.split(".")[0];
  const reqDateTime = headers["X-Amz-Date"];
  const reqDate = reqDateTime.slice(0, 8);

  const credentialScopeParts = [reqDate, opts.region, service, "aws4_request"];
  const credentialScope = credentialScopeParts.join("/");

  const { canonicalHeaders, signedHeaders } = getSigningHeaders(
    url.host,
    headers,
  );
  const canonicalRequest = [
    opts.method,
    url.pathname,
    getCanonicalSearch(url),
    canonicalHeaders,
    signedHeaders,
    await sha256Hex(opts.body ?? ""),
  ].join("\n");

  const stringToSign = [
    algorithm,
    reqDateTime,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join("\n");

  let signingKey = str2Bytes("AWS4" + opts.credentials.secretAccessKey);
  for (const scope of credentialScopeParts) {
    signingKey = await hmac(signingKey, scope);
  }
  const signature = bytes2Hex(await hmac(signingKey, stringToSign));

  return [
    algorithm,
    " Credential=",
    opts.credentials.accessKeyId,
    "/",
    credentialScope,
    ", SignedHeaders=",
    signedHeaders,
    ", Signature=",
    signature,
  ].join("");
}

function getSigningHeaders(host: string, headers: Record<string, string>) {
  const canonicalHeaders: string[] = [`host:${host}`];
  const signedHeaders: string[] = ["host"];
  Object.entries(headers).forEach(([k, v]) => {
    const lowerHeader = k.toLowerCase();
    canonicalHeaders.push(lowerHeader + ":" + v.trim().replace(/ +/, " "));
    signedHeaders.push(lowerHeader);
  });
  canonicalHeaders.sort();
  signedHeaders.sort();

  return {
    canonicalHeaders: canonicalHeaders.join("\n") + "\n",
    signedHeaders: signedHeaders.join(";"),
  };
}

function getAmzDate(date: Date) {
  return date.toISOString().replace(/(:|-|\.\d{3})/g, "");
}

async function sha256Hex(input: string) {
  const hash = await crypto.subtle.digest("SHA-256", str2Bytes(input));
  return bytes2Hex(new Uint8Array(hash));
}
async function hmac(key: Uint8Array, data: string) {
  const webKey = await crypto.subtle.importKey(
    "raw",
    key,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const buf = await crypto.subtle.sign("HMAC", webKey, str2Bytes(data));
  return new Uint8Array(buf);
}
function str2Bytes(str: string) {
  return new TextEncoder().encode(str);
}

function bytes2Hex(array: Uint8Array) {
  return Array
    .from(array, (b) => b.toString(16).padStart(2, "0"))
    .join("");
}
