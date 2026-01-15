import fs from "fs";
import path from "path";
import { v4 as uuid } from "uuid";

const filePath = path.resolve("src/data/products.json");

function readFile() {
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

function writeFile(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function getAllProducts() {
  return readFile().products;
}

export function createProduct(product) {
  const data = readFile();

  const newProduct = {
    id: uuid(),
    name: product.name,
    description: product.description,
    price: Number(product.price),
    image: product.image
  };

  data.products.push(newProduct);
  writeFile(data);

  return newProduct;
}

export function updateProduct(id, updates) {
  const data = readFile();
  const index = data.products.findIndex(p => p.id === id);

  if (index === -1) return null;

  data.products[index] = {
    ...data.products[index],
    ...updates
  };

  writeFile(data);
  return data.products[index];
}

export function deleteProduct(id) {
  const data = readFile();
  const filtered = data.products.filter(p => p.id !== id);

  if (filtered.length === data.products.length) return false;

  data.products = filtered;
  writeFile(data);
  return true;
}
