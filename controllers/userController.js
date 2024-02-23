const User = require('../models/user');

const userController = {

  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },


  getUserById: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
      return res.status(200).json(user);
    } catch (error) {
      return res.status(404).json({ error: error.message });
    }
  },

 
  createUser: async (req, res) => {
    try {
      const newUser = await User.create(req.body);
      return res.status(200).json(newUser);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },


  updateUser: async (req, res) => {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.userId, req.body, { new: true });
      return res.status(200).json(updatedUser);
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
  },

  
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.userId);
      return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  },


  addFriend: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      user.friends.push(req.params.friendId);
      await user.save();
      return res.status(200).json(user);
    } catch (error) {
     return res.status(400).json({ error: error.message });
    }
  }

};

module.exports = userController;
