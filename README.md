# About

Hosted on deno.dev: [outschool-cupcake-rebus.deno.dev](https://outschool-cupcake-rebus.deno.dev)
The database contains private data and so you must be an outschool employee to access it.

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

# Run backend
apg deno task serve

# Run frontend 
cd frontend && yarn start
```

## Frontend

The frontend is a create react app frontend that uses a proxy to the backend so both backend and frontend need to be running at the same time. Before committing your frontend changes run `yarn build` for the changes to be available to production.

# Deploy to production

1. Run `cd frontend && yarn build`
2. Commit your built changes
3. Push to master
4. Wait a few seconds
5. It's live.
