const { Router } = require("express");
const clubRouter = Router();
const clubController = require("../controllers/clubController");
const { ensureAuthenticated } = require("../middlewares/auth");

clubRouter.get("/", ensureAuthenticated, clubController.getJoinClub);
clubRouter.post("/", ensureAuthenticated, clubController.postJoinClub);

module.exports = clubRouter;

