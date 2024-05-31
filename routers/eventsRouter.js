const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/eventsController.js");
router.use(express.urlencoded({ extended: true }));

// Rotte
router.get("/", eventsController.index);
router.post("/", eventsController.store);
router.put("/:event", eventsController.update);

module.exports = router;
