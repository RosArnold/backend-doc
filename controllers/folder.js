const Folder = require("../models/Folder");
const Document = require("../models/Document");

exports.getFolders = async (req, res) => {
  try {
    const folders = await Folder.find({
      owner: req.user.id,
      parentFolder: undefined,
    });

    const documents = await Document.findOne({
      owner: req.user.id,
      folder: undefined,
    });

    res.json({ folders: folders, documents: documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.createFolder = async (req, res) => {
  const { name, parentFolder } = req.body;

  try {
    const folder = new Folder({
      name,
      owner: req.user.id,
      parentFolder,
    });

    await folder.save();
    res.json(folder);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.getFolder = async (req, res) => {
  try {
    const folder = await Folder.find({
      parentFolder: req.params.id,
    });
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    if (folder.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const folders = await Folder.find({ parentFolder: folder._id });

    const documents = await Document.find({ folder: folder._id });

    res.json({ foler: folder, folders: folders, documents: documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.updateFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    if (folder.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    const { name, parentFolder } = req.body;
    folder.name = name;
    folder.parentFolder = parentFolder;

    await folder.save();
    res.json({ message: "Folder updated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

exports.deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);
    if (!folder) {
      return res.status(404).json({ msg: "Folder not found" });
    }

    if (folder.owner.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await Document.findByIdAndDelete(folder._id);

    await Folder.findByIdAndDelete(req.params.id);
    res.json({ msg: "Folder removed" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
