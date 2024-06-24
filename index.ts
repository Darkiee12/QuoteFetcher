import axios from "axios";
interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  authorSlug: string;
  length: number;
  dateAdded: string;
  dateModified: string;
}
const data = async () =>
  await axios.get<Quote[]>("https://api.quotable.io/quotes/random");

const response = (quote: Quote) =>  `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta property="og:title" content="Random quote">
      <meta property="og:description" content="${quote.content} - ${quote.author}">
      <title>Quote of the day</title>
    </head>
    <body>
      <h1>Quote of the day</h1>
      <p>${quote.content}</p>
      <i>~ ${quote.author}</i>
    </body>
    </html>
  `;

const server = Bun.serve({
  port: 3000,
  async fetch(req) {
    const quote = (await data()).data[0];
    const res = response(quote);
    return new Response(res, {
      headers: {
        'Content-Type': 'text/html',
      },
    });
  },
});
