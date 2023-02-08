const validateObjectId = require("../middleware/validateObjectId");
const asyncMiddleware = require("../middleware/async");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { Category, validateCategory } = require("../models/category");
const express = require("express");
const mongoose = require("mongoose");
const { Product } = require("../models/product");
const router = express.Router();
const cors = require("cors");

router.options("*", cors());
router.get("/", cors(),asyncMiddleware(async (req, res, next) => {
    const categories = await Category.find().sort("name");
    let products=[]
    for (const [key, value] of Object.entries(categories)) {
      //console.log("Object.entries(value.products): ")
      console.log(value)
      // for(let i=0; i<value.products.length; i++){
      //   console.log("value.products[i]", i)
      //   console.log(value.products[i])
      // }
    }
      
    res.send(categories);
    }
  )
);
router.get("/:id", cors(), async (req, res) => {
  let category = await Category.findById(req.params.id);
  if (!category)
    return res.status(404).send("There is no category with such ID.");
  let products = await Product.find()
    .where("category._id")
    .equals(category)
    .select("name description numberInStock price image");
  console.log(products);
  for (let i = 0; i < products.length; i++) {
    category.products.push(products[i]);
  }
  res.send(category);
});
router.post("/", auth, asyncMiddleware(async (req, res) => {
    const { error } = validateCategory(req.body);
    if (error) {
      res.status(400).send(error.details[0].message);
      return;
    }
    let category = new Category({ name: req.body.name });
    let categoryFromStack = await Category.findOne({ name: req.body.name }).exec()
    console.log("categoryFromStack: ")
    console.log(categoryFromStack)
    if (categoryFromStack) {
        res.status(400).send("There is already category with that name")
        return
    }
    category = await category.save();
    res.send(category);
  })
);

router.put("/:id", async (req, res) => {
  const { error } = validateCategory(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const category = await Category.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!category)
    return res.status(404).send("There is no category with such ID.");

  res.send(category);
});
router.delete("/:id", [auth, admin], async (req, res) => {
  const category = await Category.findByIdAndRemove(req.params.id);

  if (!category)
    return res.status(404).send("There is no category with such ID.");

  res.send(category);
});

module.exports = router;