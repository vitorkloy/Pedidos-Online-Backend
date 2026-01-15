import * as service from "../services/productService.js";

export function listProducts(req, res) {
  res.json(service.getAllProducts());
}

export function addProduct(req, res) {
  const product = service.createProduct(req.body);
  res.status(201).json(product);
}

export function editProduct(req, res) {
  const updated = service.updateProduct(req.params.id, req.body);

  if (!updated) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.json(updated);
}

export function removeProduct(req, res) {
  const deleted = service.deleteProduct(req.params.id);

  if (!deleted) {
    return res.status(404).json({ error: "Produto não encontrado" });
  }

  res.status(204).end();
}
