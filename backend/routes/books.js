const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Book = db.Book;
const Author = db.Author;
const ISBN = db.ISBN;
router.get("/", (req, res, next) => {
  search = req.query.search;
  Book.findAll({
    attributes: ["key", "title"],
    where: {
      key: "/works/OL453936W"
    },
    include: [
      {
        model: Author
      },
      {
        model: ISBN
      }
    ]
  }).then(books => {
    for (var i = 0; i < books[0].authors.length; i++) {
      console.log(books[0].authors[i].full_name);
    }
    for (var i = 0; i < books[0].isbns.length; i++) {
      console.log(books[0].isbns[i].isbn);
    }
  });
  res.send("Search Submitted");
});

module.exports = router;
