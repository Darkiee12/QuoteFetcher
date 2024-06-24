import express from 'express';
import axios from 'axios';
const app = express();
const port = 3000;
const data = async () => await axios.get("https://api.quotable.io/quotes/random");
const response = (quote) => `
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
async function fetchData() {
    const quote = (await data()).data[0];
    return response(quote);
}
app.get('/', async (req, res) => {
    try {
        const responseText = await fetchData();
        res.setHeader('Content-Type', 'text/html');
        res.send(responseText);
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
