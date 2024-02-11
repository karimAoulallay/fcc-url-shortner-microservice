require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

// parse body request
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

const urlArray = [];
let shortUrl = 0;
const errorjSON = { error: "invalid url" };
const { lookup } = require("dns");

app.post("/api/shorturl", function (req, res) {
  try {
    const url = new URL(req.body.url);
    const regExp = new RegExp(
      "(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})"
    );
    if (!url.href.match(regExp)) {
      res.json(errorjSON);
    }
    lookup(url.hostname, function (err, address) {
      if (!address) {
        res.json(errorjSON);
      } else {
        const original_url = url.href;
        urlArray.push({ original_url, short_url: shortUrl++ });
        res.json(urlArray.at(-1));
      }
    });
  } catch {
    res.json(errorjSON);
  }
});

app.get("/api/shorturl/:shorturl", (req, res) => {
  const paramsShorturl = req.params.shorturl;
  const url = urlArray.find((url) => url.short_url == paramsShorturl);
  res.redirect(url.original_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
