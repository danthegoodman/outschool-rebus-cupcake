import React from "react";
import emojiApple from "../static/emoji-apple.json";
import emojiCustom from "../static/emoji-custom.json";

export function RebusPuzzle({ puzzle }: { puzzle: string }) {
  return (
    <p className="rebus" title={puzzle}>
      {parseRebus(puzzle)}
    </p>
  );
}

function parseRebus(puzzle: string) {
  let items = [];

  const regex = /:([^:]+):/g;
  let lastEnd = 0;
  while (true) {
    const match = regex.exec(puzzle);
    if (!match) break;

    const shortName = match[1];
    const customImage: string | undefined = (emojiCustom as any)[shortName];
    const appleImage: [number,number] | undefined = (emojiApple as any)[shortName];
    if(!customImage && !appleImage) continue;

    if (match.index !== lastEnd) {
      let text = puzzle.slice(lastEnd, match.index);
      if(text.trim()){
        items.push(<span key={items.length}>{text}</span>);
      }
    }
    if(customImage){
      items.push(<img
        className="rebusImg bg-rebus rounded"
        key={items.length}
        src={customImage}
        alt={shortName}
        title={shortName}
      />)
    } else if(appleImage) {
      const [x,y] = appleImage;

      items.push(<span
        className="rebusImg bg-rebus rounded"
        key={items.length}
        title={shortName}
        style={{
          backgroundImage: "url(https://unpkg.com/emoji-datasource-apple@7.0.2/img/apple/sheets-256/64.png)",
          backgroundPosition: `${-x*66}px ${-y*66}px`,
        }}
      />)
    }
    lastEnd = regex.lastIndex;
  }
  let finalText = puzzle.slice(lastEnd);
  if (finalText.trim()) {
    items.push(<span key={items.length}>{finalText}</span>);
  }

  return items;
}

export function getEmojiUrl(shortName: string): string | undefined {
  //@ts-ignore these are lookup maps, not strongly typed json objects
  return emojiCustom[shortName] ?? emojiApple[shortName];
}
