import productModel from "../../db/models/product.model.js";

export const createProduct = async (req, res) => {
  const product = req.body;
  // const { title, description, price, category, countInStock } = product;
  const newProduct = new productModel(product);
  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const editProduct = async (req, res) => {
  const { product_code} = req.params;
  const product = req.body;
  const editedProduct = await productModel.findOne({ product_code: product_code });
  
  if (!product) return res.status(400).send("Data to update can not be empty");
  try {
    const updatedProduct = await productModel.findByIdAndUpdate(editedProduct?._id, product, {
      new: true,
    });
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};


export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    console.log(products);
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}
