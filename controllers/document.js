const Document = require("../models/Document");
const multer = require("multer");
const path = require("path");

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ owner: req.user.id });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.searchDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ name: req.params.keyword });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.uploadDocument = [
  upload.array("files"),
  async (req, res) => {
    const { originalname: name, path: filePath } = req.file;
    const { folder } = req.body;

    try {
      const document = new Document({
        name,
        path: filePath,
        owner: req.user.id,
        folder,
      });

      await document.save();
      res.json(document);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  },
];

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    res.json(document);
  } catch {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { name, folder } = req.body;

    console.log(name);

    document.name = name;
    document.folder = folder;

    await document.save();
    res.json({ msg: "Document updated" });
  } catch {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.shareDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { userId } = req.body;
    document.sharedWith = userId;

    await document.save();
    res.json({ message: "Document shared" });
  } catch {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) {
      return res.status(404).json({ msg: "Document not found" });
    }

    if (document.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ msg: "Document removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
