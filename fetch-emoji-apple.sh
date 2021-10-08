#!/usr/bin/env bash
export apple_src="https://unpkg.com/emoji-datasource-apple@7.0.2"
curl -s "${apple_src}/emoji.json" \
 | jq -c '
  map(
    [.sheet_x, .sheet_y] as $value
    | (
        .short_names
        | map({key:., value:$value})
      )
    )
  | flatten
  | from_entries
 ' > frontend/src/static/emoji-apple.json
