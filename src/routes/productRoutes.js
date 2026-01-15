import { Router } from "express";
import {
  listProducts,
  addProduct,
  editProduct,
  removeProduct
} from "../controllers/productController.js";

const router = Router();

router.get("/", listProducts);
router.post("/", addProduct);
router.put("/:id", editProduct);
router.delete("/:id", removeProduct);

export default router;
