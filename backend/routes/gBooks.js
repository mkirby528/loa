const express = require('express');
const router = express.Router();
const gBooks = require('google-books-search')

const options = {
    key: 'AIzaSyCmfIN64nQeBjOk_hlchYacjOyaL1jWq0E',
    offset: 0,
    limit: 10,
    type: 'books',
    order: 'relevance',
    lang: 'en'
};



router.get('/', (req, res, next) => {
    res.header("Content-Type",'application/json');
    gBooks.search('Harry Potter', options, function(error, results) {
        if ( ! error ) {
            res.send(JSON.stringify(results, null, 2));
        } else {
            res.json(error);
        }
    });
    
});

module.exports =router;