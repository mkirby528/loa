const express = require("express");
const router = express.Router();
const axios = require("axios");
const Secrets = require("../config/secrets");

router.get("/", (req, res, next) => {
  books = [];
  axios
    .get("https://openlibrary.org/search.json?title=Lord+of+the+rings")
    .then(response => {
      data = response["data"]["docs"];
      // res.send(data);
      for (var i = 0; i < 25; i++) {
        current = data[i];
        if ("language" in current) {
          if (!current["language"].includes("eng")) {
            break;
          }
        }
        title = current["title"];
        key = current["key"];
        author = current["author_name"] ? current["author_name"] : "";
        author_key = current["author_key"] ? current["author_key"] : "";
        cover_i = current["cover_i"] ? current["cover_i"] : -1;
        language = current["language"] ? current["language"] : [];
        isbn = current["isbn"] ? current["isbn"] : "";
        publish_year = current["first_publish_year"]
          ? current["first_publish_year"]
          : "";

        full_title = title;

        if (current["subtitle"]) {
          full_title = full_title + ": " + current["subtitle"];
        }
        books.push({
          title: title,
          key: key,
          author: author,
          author_key: author_key,
          cover_i: cover_i,
          full_title: full_title,
          language: language,
          isbn: isbn
        });
      }
      res.send(books);
    })
    .catch(err => {
      console.log(err);
    });
});
module.exports = router;
