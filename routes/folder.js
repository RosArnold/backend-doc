const express = require("express");
const {
  getFolders,
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
} = require("../controllers/folder");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getFolders);
router.post("/", authMiddleware, createFolder);
router.get("/:id", authMiddleware, getFolder);
router.patch("/:id", authMiddleware, updateFolder);
router.delete("/:id", authMiddleware, deleteFolder);

module.exports = router;
