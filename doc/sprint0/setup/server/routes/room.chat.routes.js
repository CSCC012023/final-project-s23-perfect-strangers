const router = require('express').Router();

let ChatModel = require('../models/room.chat.model');
let RoomModel = require('../models/chat.model');


// Get all chatRoom documents
router.route("/chatrooms").get(async (req, res) => {
    const chatRoomDocs = await RoomModel.find();
    res.send(chatRoomDocs);
});
  

// Get a single chatRoom
router.route("/chatrooms/:roomID").get(async (req, res) => {
    const chatRoomDoc = await RoomModel.find({
      roomID: req.params.roomID,
    });
    res.send(chatRoomDoc);
});
  

// Post a chatRoom
router.route("/chatrooms").post(async (req, res) => {

  
    const newRoomDoc = new InterestModel({
      chatHistory: req.body.chatHistory,
      participants: req.body.partipants,
      roomID: req.body.roomID
    });
  
    const currentDatabaseRooms = await RoomModel.find({
      roomID: req.body.roomID,
    });
    
    if (currentDatabaseRooms.length === 0) {
      await newRoomDoc.save();
      console.log("chat room document posted");
      res.send(newRoomDoc);
    } else {
      // res.status(400);
      // res.send({error: "Interest already exists in database"});
      console.log("Room already exists in database");
    }
});
  

// Delete the userInterest document of a particular user
router.route("/chats/:roomID").delete(async (req, res) => {
    try {
      await RoomModel.deleteOne({ roomID: req.params.roomID });
      console.log("chat room deleted");
      res.status(204).send();
    } catch {
      // res.status(404)
      // res.send({ error: "Post doesn't exist!" })
      console.log("This chat room does not exist");
    }
});


// Patch the userInterest document of a particular user
router.route("/chats/:roomID").patch(async (req, res) => {
  const newMessage = req.body.newMessage;
  var newChatHistory = req.body.currentChatHistory;
  newChatHistory.push(newMessage);

  try {
    RoomModel.updateOne({roomID: req.body.roomID},{$set:{ chatHistory: newChatHistory}})
    res.status(204).send();
  }
  catch{
      // res.status(404)
      // res.send({ error: "Post doesn't exist!" })
      console.log("Error updating chat room");
  }
});


module.exports = router;