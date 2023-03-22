const Collection = require("../models/collection.model.js");

// Create and Save a new Collection
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Collection
  const collection = new Collection({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published || false
  });

  // Save Collection in the database
  Collection.create(collection, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Collection."
      });
    else res.send(data);
  });
};

// Retrieve all Collections from the database (with condition).
exports.findAll = (req, res) => {
  const title = req.query.title;

  Collection.getAll(title, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving collections."
      });
    else res.send(data);
  });
};

// Find a single Collection by Id
exports.findOne = (req, res) => {
  Collection.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Collection with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Collection with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Collections
exports.findAllPublished = (req, res) => {
  Collection.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving collections."
      });
    else res.send(data);
  });
};

// Update a Collection identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Collection.updateById(
    req.params.id,
    new Collection(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Collection with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Collection with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Collection with the specified id in the request
exports.delete = (req, res) => {
  Collection.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Collection with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Collection with id " + req.params.id
        });
      }
    } else res.send({ message: `Collection was deleted successfully!` });
  });
};

// Delete all Collections from the database.
exports.deleteAll = (req, res) => {
  Collection.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all collections."
      });
    else res.send({ message: `All Collections were deleted successfully!` });
  });
};
