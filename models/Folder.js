const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FolderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parentFolder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Folder = mongoose.model('folder', FolderSchema);

module.exports = Folder;
