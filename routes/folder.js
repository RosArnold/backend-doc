const express = require("express");
const {
  getFolders,
  createFolder,
  getFolder,
  updateFolder,
  deleteFolder,
  shareFolder,
} = require("../controllers/folder");
const authMiddleware = require("../middlewares/auth");

const router = express.Router();

router.get("/", authMiddleware, getFolders);
router.post("/", authMiddleware, createFolder);
router.get("/:id", authMiddleware, getFolder);
router.patch("/:id", authMiddleware, updateFolder);
router.post("/:id/share", authMiddleware, shareFolder);
router.delete("/:id", authMiddleware, deleteFolder);

module.exports = router;
