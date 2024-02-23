const Thought = require('../models/thought');
const User = require('../models/user');

const thoughtController = {
  getAllThoughts: async (req, res) => {
    try {
      const thoughts = await Thought.find();
      return res.status(200).json(thoughts);
    } catch (error) {
      return res.status(404).json({ error: 'Cannot get all thoughts' });
    }
  },

  getThoughtById: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      return res.status(200).json(thought);
    } catch (error) {
      return res.status(404).json({ error: 'server error' });
    }
  },

  createThought: async (req, res) => {
    try {
      const { thoughtText, username } = req.body;

      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      const thought = await Thought.create({ thoughtText, username, userId: user._id });
      
      user.thoughts.push(thought._id);
      await user.save();

      return res.status(200).json(thought);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  },

  updateThought: async (req, res) => {
    try {
      const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
      if (!updatedThought) {
         return res.status(404).json({ message: 'Thought not found' });
      }
      return res.status(200).json(updatedThought);
    } catch (error) {
      return res.status(404).json({ error: 'server error' });
    }
  },

  deleteThought: async (req, res) => {
    try {
      const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!deletedThought) {
        return res.status(404).json({ message: 'Thought not found' });
      }

      await User.updateMany({}, { $pull: { thoughts: req.params.thoughtId } });

      return res.status(200).json({ message: 'Thought deleted successfully' });
    } catch (error) {
      return res.status(404).json({ error: 'server error'});
    }
  },

  createReaction: async (req, res) => {
    try {
      const { reactionBody, username } = req.body;
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.push({ reactionBody, username });
      await thought.save();
      return res.status(200).json(thought);
    } catch (error) {
      res.status(404).json({ error: 'server error' });
    }
  },

  deleteReaction: async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.pull(req.params.reactionId);
      await thought.save();
      return res.status(200).json({ message: 'Reaction deleted successfully' });
    } catch (error) {
      return res.status(400).json({ error: 'server error' });
    }
  }
};

module.exports = thoughtController;
