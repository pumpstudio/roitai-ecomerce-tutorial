const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    address: {
      type: String,
    },
    wishlist:[{
      type: ObjectId,
      ref: 'product'
    }],
    role: {
      type: String,
      default: "user",
    },
    enabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = User = mongoose.model("users", UserSchema);
