const auth = require("../middleware/auth");
const { Product, validateProduct } = require("../models/product");
const mongoose = require("mongoose");
const express = require("express");
const { Category } = require("../models/category");
const router = express.Router();
const cors = require("cors");
var compose = require("express-compose");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.options("*", cors());
router.get("/", cors(), async (req, res) => {
  const products = await Product.find().sort("name");
  res.send(products);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product)
    return res.status(404).send("There is no product with such ID.");
  res.send(product);
});

router.post("/:product/image", upload.single("file"), async (req, res) => {
  const product = await Product.findById(req.params.product);
  if (!product) {return res.status(404).send("There is no product with such ID.");}
  
  const category = await Category.findById(product.category._id)
  if (!category) {return res.status(404).send("There is no category with such ID.");}

  product.image = req.file.buffer;

  const productInCategory = category.products.find(pc=>pc._id.valueOf()===product._id.valueOf())
  productInCategory.image=product.image;

  product.save();
  category.save();

  res.send(product);
});

router.post("/", auth, async (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const category = await Category.findOne({ name: req.body.category.name }); //.select('-products')
  if (!category) return res.status(400).send("Invalid category");
  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    category: {
      name: req.body.category.name,
      _id: category._id,
    },
    numberInStock: req.body.numberInStock,
    price: req.body.price,
    image: req.body.image,
  });

  product = await product.save();
  category.products.push(product);

  category.save();

  res.send(product);
});

router.put("/:id", async (req, res) => {
  console.log("req.body: ");
  console.log(req.body);
  const { error } = validateProduct(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  }

  const category = await Category.findOne({ name: req.body.category.name });
  console.log(category);
  //const category = await Category.findOne({name: req.body.category.name})

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      category: {
        name: req.body.category.name,
        _id: category._id,
      },
      numberInStock: req.body.numberInStock,
      price: req.body.price,
      image: req.body.image,
    },
    {
      new: true,
    }
  );
  await product.save();

  let index = category.products.findIndex(
    (product) => product._id.valueOf() === req.params.id
  );
  if (index !== -1) {
    category.products.splice(index, 1);
  }

  category.products.push(product);

  if (!category) return res.status(400).send("Invalid category");
  if (!product)
    return res.status(404).send("There is no product with such ID.");

  await category.save();

  res.send(product);
});
router.delete("/:id", async (req, res) => {
  const product = await Product.findByIdAndRemove(req.params.id);
  if (!product)
    return res.status(404).send("There is no product with such ID.");

  const category = await Category.findById(product.category._id);

  for (const [key, value] of Object.entries(category.products)) {
    if (value._id.valueOf() == req.params.id) {
      let index = category.products.indexOf(value);
      if (index !== -1) {
        category.products.splice(index, 1);
      }
    }
  }
  await category.save();
  res.send(product);
});

module.exports = router;
