#!/usr/bin/env bash
export apple_src="https://unpkg.com/emoji-datasource-apple@7.0.2"
curl -s "${apple_src}/emoji.json" \
 | jq '
  map(
    "\(env.apple_src)/img/apple/64/\(.image)" as $url
    | (
        .short_names
        | map({key:., value:$url})
      )
    )
  | flatten
  | from_entries
 ' > public/emoji-apple.json
