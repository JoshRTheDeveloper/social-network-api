const users = [
 {
   username: "user1",
   email: "user1@example.com",
 },
 {
   username: "user2",
   email: "user2@example.com",
 },
 {
   username: "user3",
   email: "user3@example.com",
 },

];

const thoughts = [
 {
   thoughtText: "This is the first thought.",
   username: "user1",
   reactions: [
     {
       reactionBody: "Interesting!",
       username: "user2"
     },
     {
       reactionBody: "I agree!",
       username: "user3"
     }
   ]
 },
 {
   thoughtText: "This is the second thought.",
   username: "user2",
   reactions: [
     {
       reactionBody: "Nice thought!",
       username: "user1"
     }
   ]
 },

];

module.exports = { users, thoughts };
