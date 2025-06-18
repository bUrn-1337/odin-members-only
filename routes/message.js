const { Router } = require("express");
const messageRouter = Router();
const messageController = require("../controllers/messageController");
const { ensureAuthenticated, ensureAdmin } = require("../middlewares/auth");

messageRouter.get("/make-message", ensureAuthenticated, messageController.getCreateMessage);
messageRouter.post("/make-message", ensureAuthenticated, messageController.postCreateMessage);
messageRouter.post("delete-message", ensureAuthenticated, ensureAdmin, messageController.postDeleteMessage);

module.exports = messageRouter;