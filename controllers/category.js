const Category = require('../models/Category');

exports.list = async (request, response) => {
  try {
    const category = await Category.find({}).exec();
    response.send(category);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};
exports.create = async (request, response) => {
  try {
    const { name } = request.body;
    const category = await new Category({ name }).save()
    response.send(category);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};
exports.read = async (request, response) => {
  try {
    const id = request.params.id;
    const category = await Category.findOne({ _id: id }).exec();
    response.send(category);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};
exports.update = async (request, response) => {
  try {
    const id = request.params.id;
    const { name } = request.body;
    const category = await Category.findOneAndUpdate(
      { _id: id },
      { name: name }
    )
    response.send(category);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};
exports.remove = async (request, response) => {
  try {
    const id = request.params.id;
    const category = await Category.findOneAndDelete({ _id: id });
    response.send(category);
  } catch (error) {
    response.status(500).send("Server Error!!")
  }
};
