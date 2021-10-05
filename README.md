# Development

```shell
# Setup
brew install deno
deno install --allow-read --allow-write --allow-env --allow-net \
    --allow-run --no-check -f https://deno.land/x/deploy/deployctl.ts

# Run locally
deployctl run --watch --no-check server.ts
```
