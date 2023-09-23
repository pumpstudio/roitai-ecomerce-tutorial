const Order = require("../models/Order");

exports.changeOrderStatus = async (req, res) => {
  try {
    // Code
    console.log(req.body)

    const {orderId , orderstatus} = req.body;
    let orderUpdate = await Order.findByIdAndUpdate(
      orderId,
      {orderstatus},
      {new: true}
    )

    res.send(orderUpdate)

  } catch (err) {
    console.log(err);
    res.status(500).send("changeOrderStatus Error!");
  }
};

exports.getOrderAdmin = async (req, res) => {
  try {

    let order = await Order.find()
      .populate('products.product')
      .populate('orderdBy','username')
      .exec();

    res.json(order)

  } catch (error) {
    res.status(500).send('getOrders Error')
  }
}