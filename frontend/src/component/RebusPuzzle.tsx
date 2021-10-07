import React from "react";
import emojiApple from "../static/emoji-apple.json";
import emojiCustom from "../static/emoji-custom.json";

export function RebusPuzzle({ puzzle }: { puzzle: string }) {
  const parts = parseRebus(puzzle).map((it, ndx) =>
    "text" in it ? (
      <span key={ndx}>{it.text}</span>
    ) : (
      <img
        className="bg-rebus rounded p-2"
        key={ndx}
        src={it.image}
        alt={it.shortName}
        title={it.shortName}
      />
    )
  );

  return (
    <p className="rebus" title={puzzle}>
      {parts}
    </p>
  );
}

type RebusDatum = { text: string } | { image: string; shortName: string };

function parseRebus(puzzle: string): RebusDatum[] {
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
      items.push({ text: puzzle.slice(lastEnd, match.index) });
    }
    items.push({ image, shortName });
    lastEnd = regex.lastIndex;
  }
  if (lastEnd !== puzzle.length) {
    items.push({ text: puzzle.slice(lastEnd) });
  }

  return items;
}

export function getEmojiUrl(shortName: string): string | undefined {
  //@ts-ignore these are lookup maps, not strongly typed json objects
  return emojiCustom[shortName] ?? emojiApple[shortName];
}
