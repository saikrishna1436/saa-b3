const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/aidsa_apple")
  .then(() => {
    console.log("mongodb is connected");
  })
  .catch((e) => {
    console.log(`error is ${e}`);
  });
const productSchema = mongoose.Schema({
  name: "String",
  price: "Number",
  discount: "Number",
});
const product = mongoose.model("products", productSchema);

app.post("/cp", async (req, res) => {
  const p = await product.insertOne(req.body);
  await res.send(p);
});
app.post("/mp", async (req, res) => {
  const p = await product.insertMany(req.body);
  await res.send(p);
});

const port = 4567;
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});