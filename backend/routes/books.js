const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Book = db.Book;
const Rating = db.Rating;
const Author = db.Author;
const ISBN = db.ISBN;
const Op = db.Sequelize.Op;
var mysql = require("mysql");

router.get("/", (req, res, next) => {
  var search = req.query.search;
  console.log(search);
  var queryString =
    `SELECT
    books.key,
    books.title,
    books.cover_image,
    books.publish_year,
            GROUP_CONCAT(distinct c.full_name ORDER BY c.full_name) authors,
        GROUP_CONCAT(distinct c.key ORDER BY c.full_name) author_keys,
        GROUP_CONCAT(distinct isbns.isbn) isbns,
            AVG(ratings.rating) AS rating
        
    FROM    Books books
            left JOIN author_books b
                ON books.key = b.bookKey
            left  JOIn Authors c
                ON b.authorKey = c.key
        LEFT  JOIN RATINGs ON RATINGs.bookKey = books.key
        LEFT  JOIN ISBNS ON isbns.bookKey = books.key
        where books.title like '%` +
    search +
    `%' GROUP   BY books.key `;

  db.sequelize
    .query(queryString, {
      replacements: { search: search },
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(books => {
      res.send(books);
    });
});

module.exports = router;
