const express = require('express');

const routes = (Book) => {
  const bookRouter = express.Router();

  bookRouter.route('/')
    .post(function (req, res) {
      const book = new Book(req.body);

      book.save()
        .then(() => res.status(201).send(book))
        .catch((error) => res.status(500).end());
    })
    .get(function (req, res) {
      const query = req.query;

      Book.find(query, function (err, books) {
        if (err) {
          res.sendStatus(500).send(err)
        } else {
          res.json(books);
        }
      });
    });

  bookRouter.use('/:bookId', function (req, res, next) {
    Book.findById(req.params.bookId, function (err, book) {
      if (err) {
        res.sendStatus(500).send(err)
      } else if (book) {
        req.book = book;
        next();
      } else {
        res.status(404).send('no book found');
      }
    });
  });
  bookRouter.route('/:bookId')
    .get(function (req, res) {
      res.json(req.book);
    })
    .put(function (req, res) {
      req.book.title = req.body.title;
      req.book.author = req.body.author;
      req.book.genre = req.body.genre;
      req.book.read = req.body.read;

      req.book.save()
        .then(() => res.status(201).send(req.book))
        .catch((error) => res.status(500).end());
    })
    .patch(function (req, res) {
      if (req.body._id) {
        delete req.body._id;
      }

      for (let p in req.body) {
        req.book[p] = req.body[p]
      }

      req.book.save()
        .then(() => res.status(201).send(req.book))
        .catch((error) => res.status(500).end());
    })
    .delete(function (req, res) {
      req.book.remove(function (err) {
        if (err) {
          res.status(500).send(err);
        } else {
          res.status(204).send('Removed');
        }
      })
    });

  return bookRouter;
};

module.exports = routes;
