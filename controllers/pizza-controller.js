const { Pizza } = require("../models");

const pizzaController = {
  // the functions will go in here as methods

  // get all pizzas
  getAllPizza(req, res) {
    Pizza.find({})
      .then((dbPizzData) => res.json(dbPizzData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // get one pizza by id
  getPizzaById({ params }, res) {
    Pizza.findOne({ _id: params.id })
      .then((dbPizzData) => {
        // If no pizza is found, send 404
        if (!dbPizzData) {
          res.status(404).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a pizza
  createPizza({ body }, res) {
    Pizza.create(body)
      .then((dbPizzData) => res.json(dbPizzData))
      .catch((err) => res.status(400).json(err));
  },

  // update pizza by id
  updatePizza({ params, body }, res) {
    Pizza.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbPizzData) => {
        if (!dbPizzData) {
          res.status(400).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete a pizza by id
  deletePizza({ params }, res) {
    Pizza.findOneAndDelete({ _id: params.id })
      .then((dbPizzData) => {
        if (!dbPizzData) {
          res.status(400).json({ message: "No pizza found with this id!" });
          return;
        }
        res.json(dbPizzData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = pizzaController;
