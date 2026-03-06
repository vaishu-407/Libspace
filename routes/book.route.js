
const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth.middleware");
const controller = require("../controllers/book.controller");

router.post("/add",auth,controller.addBook);
router.get("/",auth,controller.getBooks);
router.get("/:id",auth,controller.getBookById);
router.put("/:id",auth,controller.updateBook);
router.delete("/:id",auth,controller.deleteBook);

module.exports = router;
