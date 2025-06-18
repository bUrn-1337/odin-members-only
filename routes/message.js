const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { ensureAuthenticated } = require("../middlewares/auth");

messageRouter.get("/", ensureAuthenticated, messageController.getCreateMessage);
messageRouter.post("/", ensureAuthenticated, messageController.postCreateMessage);

module.exports = messageRouter;