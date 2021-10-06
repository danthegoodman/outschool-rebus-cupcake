import {jsonResponse} from "./util.ts";
import {getEmojiUrl} from "./emoji-mapping.ts";

export async function handleRebusList(){
  return jsonResponse([
    {puzzle: parseRebus(':teapot::four_leaf_clover:'), solution: 'Potluck'},
    {puzzle: parseRebus('(:ear::heavy_minus_sign::a:):trophy:'), solution: 'Erwin'}
  ])
}

type RebusDatum =
  | {text:string}
  | {image:string, shortName: string};

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
