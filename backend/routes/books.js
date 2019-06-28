const express = require("express");
const router = express.Router();
const axios = require("axios");
const Secrets = require("../config/secrets");
const Book = require("../models/Book");

router.get("/", (req, res, next) => {
  search = req.query.search;
  search = search.replace(/\s/g, "+");
  books = [];
  axios
    .get("https://openlibrary.org/search.json?title=" + search)
    .then(response => {
      data = response["data"]["docs"];
      // res.send(data);
      for (var i = 0; i < 25; i++) {
        current = data[i];
        if (current == null) {
          break;
        }
        if ("language" in current) {
          if (!current["language"].includes("eng")) {
            break;
          }
        }
        title = current["title"];
        key = current["key"];
        if (current["author_name"]) {
          author1 =
            typeof current["author_name"][0] !== "undefined"
              ? current["author_name"][0]
              : "";
          author2 =
            typeof current["author_name"][1] !== "undefined"
              ? current["author_name"][1]
              : "";
          author3 =
            typeof current["author_name"][2] !== "undefined"
              ? current["author_name"][2]
              : "";
        } else {
          author1 = author2 = author3 = "";
        }
        cover_i = current["cover_i"] ? current["cover_i"] : -1;
        isbn = current["isbn"] ? current["isbn"] : "";
        publish_year = current["first_publish_year"]
          ? current["first_publish_year"]
          : -1;

        full_title = title;

        if (current["subtitle"]) {
          full_title = full_title + ": " + current["subtitle"];
        }
        books.push({
          title: title,
          key: key,
          author1: author1,
          author2: author2,
          author3: author3,
          publish_year: publish_year,
          cover_image: cover_i,
          full_title: full_title,
          isbns: JSON.stringify(isbn)
        });

        Book.findOrCreate({
          where: {
            key: key
          },
          defaults: {
            title: title,
            key: key,
            author1: author1,
            author2: author2,
            author3: author3,
            publish_year: publish_year,
            cover_image: cover_i,
            full_title: full_title,
            isbns: JSON.stringify(isbn)
          }
        })
          .then()
          .catch(err => console.log(err));
      }
    });
  res.send(books);
});

module.exports = router;
