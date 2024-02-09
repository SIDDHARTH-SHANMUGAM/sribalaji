const express = require("express");

const messageRouter = express.Router();
const {addMessage, getMessage, updateSeen, countUnseenMessages, getUnSeenMessage} = require('../controllers/MessageController');


// get
// post
messageRouter.route('/getMessage').post(getMessage);
messageRouter.route('/getUnSeenMessage').post(getUnSeenMessage);
messageRouter.route('/addMessage').post(addMessage);
messageRouter.route('/getCount').post(countUnseenMessages);

// put
messageRouter.route('/updateSeen').post(updateSeen);


module.exports = messageRouter;
