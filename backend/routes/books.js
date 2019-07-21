const express = require("express");
const router = express.Router();
const db = require("../config/database");

router.get("/", (req, res) => {
  var user = req.user;
  if (user != undefined) {
    user = user.username;
  } else {
    user = "";
  }
  var search = req.query.search;
  var queryString =
    `SELECT
    books.key,
    books.title,
    books.cover_image,
    books.publish_year,
            GROUP_CONCAT(distinct c.full_name ORDER BY c.full_name) authors,
        GROUP_CONCAT(distinct c.key ORDER BY c.full_name) author_keys,
        GROUP_CONCAT(distinct isbns.isbn) isbns,
            AVG(ratings.rating) AS rating,
            book_status.status as userStatus

        
    FROM    Books books
            left JOIN author_books b
                ON books.key = b.bookKey
            left  JOIn Authors c
                ON b.authorKey = c.key
        LEFT  JOIN RATINGs ON RATINGs.bookKey = books.key
        LEFT  JOIN book_status ON book_status.bookKey = books.key and book_status.user = '` +
    user +
    `'
        LEFT  JOIN ISBNS ON isbns.bookKey = books.key
        where books.title like '%` +
    search +
    `%' GROUP   BY books.key `;

  db.sequelize
    .query(queryString, {
      type: db.sequelize.QueryTypes.SELECT
    })
    .then(books => {
      res.send(books);
    });
});

router.post("/shelf", (req, res) => {
  var user = req.user;
  if (user != undefined) {
    user = user.username;
  } else {
    res.status(401).send("User Not Logged In");
    return;
  }
  var bookKey = req.body.data.bookKey;
  var status = req.body.data.status;
  db.BookStatus.upsert({ bookKey: bookKey, user: user, status: status });
});
router.delete("/unshelf", (req, res) => {
  var user = req.user;
  if (user != undefined) {
    user = user.username;
  } else {
    res.status(401).send("User Not Logged In");
    return;
  }
  var bookKey = req.body.bookKey;

  db.BookStatus.destroy({
    where: {
      bookKey: bookKey,
      user: user
    }
  });
});
module.exports = router;
