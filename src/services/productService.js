import { Product } from "../models/Product.js";

export async function getAllProducts() {
  return await Product.find();
}

export async function createProduct(productData) {
  const newProduct = new Product(productData);
  return await newProduct.save();
}

export async function updateProduct(id, updates) {
  return await Product.findByIdAndUpdate(id, updates, { new: true });
}

export async function deleteProduct(id) {
  const result = await Product.findByIdAndDelete(id);
  return !!result;
}