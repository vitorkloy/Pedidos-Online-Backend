import * as service from "../services/productService.js";

export async function listProducts(req, res) {
  const products = await service.getAllProducts(); // Adicionado await
  res.json(products);
}

export async function addProduct(req, res) {
  const product = await service.createProduct(req.body); // Adicionado await
  res.status(201).json(product);
}

export async function editProduct(req, res) {
  try {
    const updated = await service.updateProduct(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "Produto não encontrado" });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: "ID inválido ou erro na atualização" });
  }
}

export async function removeProduct(req, res) {
  const deleted = await service.deleteProduct(req.params.id);
  if (!deleted) return res.status(404).json({ error: "Produto não encontrado" });
  res.status(204).end();
}