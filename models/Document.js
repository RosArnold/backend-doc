const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  path: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  sharedWith: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  folder: {
    type: Schema.Types.ObjectId,
    ref: 'Folder',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Document = mongoose.model('document', DocumentSchema);

module.exports = Document;
