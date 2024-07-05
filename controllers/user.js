const User = require('../models/User');
const Document = require('../models/Document');

exports.getUsers = async (req, res) => {
  try {
    const { name } = req.body;

    const document = await Document.findOne({ name: name });
    const sharedUsers = document.sharedWith;
    const users = await User.find({ _id: { $nin: sharedUsers } });

    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
