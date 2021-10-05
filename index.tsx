// You need to import `h` factory function as Deno Deploy
// uses it instead of `React.createElement`
import { h } from "https://x.lcas.dev/preact@10.5.12/mod.js";
import { renderToString } from "https://x.lcas.dev/preact@10.5.12/ssr.js";

function App() {
  return (
    <html>
      <head>
        <title>Outschool Rebus Puzzles</title>
        <style>{".rebus { font-size: 3em; margin: 0.25em}"}</style>
  </head>
  <body>
  <h1>Outschool Rebus Puzzles</h1>
  <p class="rebus">🫖🍀</p>
  <p class="rebus">🧍4️⃣🧑‍🎓</p>
  <p class="rebus">🙋🚚💵💵</p>
  </body>
  </html>
);
}

addEventListener("fetch", (event) => {
  const response = new Response(renderToString(<App />), {
    headers: { "content-type": "text/html; charset=utf-8" },
  });

  event.respondWith(response);
});
