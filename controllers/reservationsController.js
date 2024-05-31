const Reservation = require('../model/Reservation.js');
const Event = require('../model/Event.js');

const index = (req, res) => {
    const { event: id } = req.params;
    const event = Event.findEventById(id);

    if (!event) {
        res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
        return;
    }

    const reservations = Reservation.getReservationsByEvent(id);
    res.json(reservations);
}

const store = (req, res) => {
    //
}

const destroy = (req, res) => {
    //
}

module.exports = {
    index,
    store,
    destroy
}