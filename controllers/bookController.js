const bookController = function (Book) {
  const post = function (req, res) {
    const book = new Book(req.body);

    book.save()
      .then(() => res.status(201).send(book))
      .catch((error) => res.status(500).end());
  };

  const get = function (req, res) {
    const query = req.query;

    Book.find(query, function (err, books) {
      if (err) {
        res.sendStatus(500).send(err)
      } else {
        res.json(books);
      }
    });
  };

  return {
    post: post,
    get: get,
  }
};

module.exports = bookController;
