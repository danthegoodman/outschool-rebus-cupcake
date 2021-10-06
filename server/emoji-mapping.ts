let apple: Record<string, string | undefined> = {};
let custom: Record<string, string | undefined> = {};

export async function initEmojiMapping(){
  const [appleText, customText] = await Promise.all([
    Deno.readTextFile('./public/emoji-apple.json'),
    Deno.readTextFile('./public/emoji-custom.json'),
  ])
  apple = JSON.parse(appleText);
  custom = JSON.parse(customText);
}

export function getEmojiUrl(shortName: string): string | undefined {
  return custom[shortName] ?? apple[shortName];
}

