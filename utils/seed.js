const mongoose = require('mongoose');
const User = require('../models/user'); 
const Thought = require('../models/thought'); 
const { users, thoughts } = require('./data');


const seedDatabase = async () => {
  try {
    
    await User.deleteMany();
    await Thought.deleteMany();

    const insertedUsers = await User.insertMany(users);


    const thoughtsWithUserIds = thoughts.map(thought => ({
      ...thought,
      userId: insertedUsers.find(user => user.username === thought.username)._id
    }));


    await Thought.insertMany(thoughtsWithUserIds);

    return console.log('Database seeded successfully!');
  } catch (error) {
    return console.error('Error seeding database:', error);
  } finally {

    mongoose.disconnect();
  }
};


seedDatabase();
