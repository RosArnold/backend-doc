const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('./models/User');
const Document = require('./models/Document');
const Folder = require('./models/Folder');

require('dotenv').config();

mongoose.connect(process.env.MONGO_URI);

async function seedDatabase() {
  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Document.deleteMany({}),
    Folder.deleteMany({}),
  ]);

  // Create users
  const users = [];
  for (let i = 1; i <= 5; i++) {
    const userId = new mongoose.Types.ObjectId();
    const name = `User${i}`;
    const email = `user${i}@example.com`;
    const password = `password${i}`;

    users.push({
      _id: userId,
      name,
      email,
      password: password,
    });
  }

  await User.create(users);

  // Create folders
  const folders = [];
  for (let i = 1; i <= 5; i++) {
    const folderId = new mongoose.Types.ObjectId();
    const name = `Folder ${i}`;
    const owner = users[i - 1]._id; // Assign folder to respective user

    folders.push({
      _id: folderId,
      name,
      owner,
    });
  }

  await Folder.create(folders);

  // Create documents
  const documents = [];
  for (let i = 1; i <= 10; i++) {
    const documentId = new mongoose.Types.ObjectId();
    const name = `Document ${i}`;
    const path = `upload/file_${i}.pdf`;
    const owner = users[(i - 1) % 5]._id; // Assign owner in round-robin manner
    const folder = folders[(i - 1) % 5]._id; // Assign folder in round-robin manner

    documents.push({
      _id: documentId,
      name,
      path,
      owner,
      folder,
    });
  }

  await Document.create(documents);

  console.log('Database seeded successfully!');
  mongoose.connection.close();
}

seedDatabase();
