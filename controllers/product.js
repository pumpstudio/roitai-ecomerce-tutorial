const { response } = require('express');
const Product = require('../models/Product');

exports.create = async (request, response) => {
  try {
    // const { name } = request.body;
    // console.log(request.bpdy)
    const product = await new Product(request.body).save()
    response.send(product);
  } catch (error) {
    response.status(500).send("Create Product Fail!!")
  }
};

exports.list = async (request, response) => {
  try {
    const count = parseInt(request.params.count)
    const product = await Product
      .find()
      .limit(count)
      .populate('category')
      .sort([["createdAt", "desc"]]);

    response.send(product);

  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};

exports.remove = async (request, response) => {
  try {
    const id = request.params.id;
    const deleted = await Product.findOneAndRemove({ _id: id })
      .exec();
    response.send(deleted);
  } catch (error) {
    response.status(500).send("Remove Product Error!!")
  }
};

exports.read = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await Product
      .findOne({ _id: id })
      .populate('category')
      .exec();
    response.send(product);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};

exports.update = async (request, response) => {
  try {
    const id = request.params.id;
    const product = await Product
      .findOneAndUpdate(
        { _id: id },
        request.body,
        { new: true }
      ).exec()
    response.send(product);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};

exports.listProductBy = async (request, response) => {
  try {

    const { sort, order, limit } = request.body;

    const product = await Product
      .find()
      .limit(limit)
      .populate('category')
      .sort([[sort, order]]);

    response.send(product);

  } catch (error) {
    response.status(500).send("ListBy Product Error!!")
  }
};

const handleQuery = async (request, response, query) => {
  let products = await Product.find({
    $text: { $search: query }
  }).populate('category','_id name')

  response.send(products)
}

const handlePrice = async (request, response, price) => {
  let products = await Product.find({
    price:{
      $gte:price[0],
      $lte:price[1]
    }
  })
  .populate('category','_id name')

  response.send(products)
}

const handleCategory = async (request, response, category) => {
  let products = await Product.find({category}).populate('category','_id name')
  response.send(products)
}

exports.searchFilters = async (request, response) => {
  const { query,price,category } = request.body;
  if (query) {
    console.log('query', query);
    await handleQuery(request, response, query);
  }

  // price [0,200]
  if (price !== undefined) {
    console.log('price-----> ', price);
    await handlePrice(request, response, price);
  }
  
  // [_id,_id]
  if (category !== undefined) {
    console.log('category-----> ', category);
    await handleCategory(request, response, category);
  }

};