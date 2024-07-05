const mongoose = require('mongoose');
const User = require('./models/User');
const Document = require('./models/Document');
const Folder = require('./models/Folder');
const dotenv = require('dotenv');

dotenv.config();

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Document.deleteMany({});
    await Folder.deleteMany({});

    // Create users
    const users = await User.insertMany([
      { name: 'User 1', email: 'user1@example.com', password: 'password1' },
      { name: 'User 2', email: 'user2@example.com', password: 'password2' },
      { name: 'User 3', email: 'user3@example.com', password: 'password3' },
      { name: 'User 4', email: 'user4@example.com', password: 'password4' },
      { name: 'User 5', email: 'user5@example.com', password: 'password5' },
    ]);

    // Create folders
    const folders = await Folder.insertMany([
      { name: 'Folder 1', owner: users[0]._id },
      { name: 'Folder 2', owner: users[1]._id },
      { name: 'Folder 3', owner: users[2]._id },
      { name: 'Folder 4', owner: users[3]._id },
      { name: 'Folder 5', owner: users[4]._id },
    ]);

    // Create documents
    await Document.insertMany([
      {
        name: 'Document 1',
        path: 'upload/doc1.txt',
        owner: users[0]._id,
        sharedWith: [users[1]._id, users[2]._id],
        folder: folders[0]._id,
      },
      {
        name: 'Document 2',
        path: 'upload/doc2.txt',
        owner: users[1]._id,
        sharedWith: [users[0]._id, users[3]._id],
        folder: folders[1]._id,
      },
      {
        name: 'Document 3',
        path: 'upload/doc3.txt',
        owner: users[2]._id,
        sharedWith: [users[1]._id, users[4]._id],
        folder: folders[2]._id,
      },
      {
        name: 'Document 4',
        path: 'upload/doc4.txt',
        owner: users[3]._id,
        sharedWith: [users[2]._id, users[0]._id],
        folder: folders[3]._id,
      },
      {
        name: 'Document 5',
        path: 'upload/doc5.txt',
        owner: users[4]._id,
        sharedWith: [users[3]._id, users[1]._id],
        folder: folders[4]._id,
      },
    ]);

    console.log('Database seeded!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
};

seedDatabase();
