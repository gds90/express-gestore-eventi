const express = require("express");
const router = express.Router();

const eventsController = require("../controllers/eventsController.js");
const reservationsController = require("../controllers/reservationsController.js");
router.use(express.urlencoded({ extended: true }));

// Rotte eventi
router.get("/", eventsController.index);
router.post("/", eventsController.store);
router.put("/:event", eventsController.update);

// Rotte prenotazioni
router.get("/:event/reservations", reservationsController.index);
router.post("/:event/reservations", reservationsController.store);
router.delete("/:event/reservations/:reservation", reservationsController.destroy);

module.exports = router;
