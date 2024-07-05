const Document = require('../models/Document');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: './uploads/',
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
    res.status(500).send('Server error');
  }
};

exports.searchDocuments = async (req, res) => {
  try {
    const keyword = new RegExp(req.params.keyword, 'i');
    const documents = await Document.find({ name: keyword });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.uploadDocuments = [
  upload.array('files'),
  async (req, res) => {
    const { folder } = req.body;

    try {
      const documents = req.files.map((file) => ({
        name: file.originalname,
        path: file.path,
        owner: req.user.id,
        folder,
      }));

      const savedDocuments = await Document.insertMany(documents);

      res.json(savedDocuments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  },
];

exports.getDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    const { name, folder } = req.body;

    document.name = name;
    document.folder = folder;

    await document.save();
    res.json({ msg: 'Document updated' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.shareDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    const { email } = req.body;
    const userId = await User.findOne({ email: email });

    document.sharedWith.push(userId);
    await document.save();

    res.json('Document shared');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSharedDocuments = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const sharedDocuments = await Document.find({
      sharedWith: { $in: [userId] },
    });

    res.json(sharedDocuments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    res.json(document);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    await Document.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Document removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
