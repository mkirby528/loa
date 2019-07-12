const express = require("express");
const router = express.Router();
const axios = require("axios");
const Secrets = require("../config/secrets");
const BookModel = require("../models/Book");
const ISBNModel = require("../models/ISBN");
const AuthorModel = require("../models/Author");

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

        cover_i = current["cover_i"] ? current["cover_i"] : -1;
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

          publish_year: publish_year,
          cover_image: cover_i,
          full_title: full_title
        });

        BookModel.findOrCreate({
          where: {
            key: key
          },
          defaults: {
            title: title,
            key: key,

            publish_year: publish_year,
            cover_image: cover_i,
            full_title: full_title
          }
        })
          .then()
          .catch(err => console.log(err));
      }
    });
  res.send(books);
});

module.exports = router;
