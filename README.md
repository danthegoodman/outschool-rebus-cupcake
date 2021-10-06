# About

Hosted on deno.dev: [outschool-cupcake-rebus.deno.dev](https://outschool-cupcake-rebus.deno.dev)

# Emojis

1. You can recreate the `emoji-apple.json` file with `fetch-emoji-apple.sh`.
2. `emoji-custom` is a manually maintained file.

Both files should be a mapping of `:shortname:` to image url.
In case of a conflict, custom emojis are preferred over the apple ones.

# Development

```shell
# Setup
brew install deno
deno install --allow-read --allow-write --allow-env --allow-net \
    --allow-run --no-check -f https://deno.land/x/deploy/deployctl.ts

# Add deno to path
export PATH="/Users/username/.deno/bin:$PATH"

# Run locally
deployctl run --watch --no-check server.ts
```

## Frontend

The frontend is compiled from typescript to JS using babel.
Each file is compiled on the fly in esmodule mode.
We are unable to use npm modules, but you can bring in global UMD libraries easily enough by adding them in the `index.html` file.
This is how we bring in React.

# Deploy to production

1. Push to master
2. Wait a few seconds
3. It's live.
