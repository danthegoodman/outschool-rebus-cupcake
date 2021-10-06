# About

Hosted on deno.dev: [outschool-cupcake-rebus.deno.dev](https://outschool-cupcake-rebus.deno.dev)

# Emojis

1. You can recreate the `emoji-apple.json` file with `fetch-emoji-apple.sh`.
2. `emoji-custom` is a manually maintained file.

Both files should be a mapping of `:shortname:` to image url.
In case of a conflict, custom emojis are preferred over the apple ones.

# Development

1. You'll need the `apg` alias for the AWS playground account to gain access to the DynamoDB tables.

```shell
# Setup
brew install deno
deno install --allow-read --allow-write --allow-env --allow-net \
    --allow-run --no-check -f https://deno.land/x/deploy/deployctl.ts

# Add deno to path
export PATH="/Users/username/.deno/bin:$PATH"

# Run backend
apg deployctl run --watch --no-check server.ts

# Run frontend 
cd frontend && yarn start
```

## Frontend

The frontend is compiled from typescript to JS using babel.
Each file is compiled on the fly in esmodule mode.
We are unable to use npm modules, but you can bring in global UMD libraries easily enough by adding them in the `index.html` file.
This is how we bring in React.

# Deploy to production

1. Run `cd frontend && yarn build`
2. Commit your built changes
3. Push to master
4. Wait a few seconds
5. It's live.
