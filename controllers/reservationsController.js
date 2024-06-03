const Reservation = require('../model/Reservation.js');
const Event = require('../model/Event.js');

const index = (req, res) => {
    const { event: eventId } = req.params;
    const event = Event.findEventById(id);

    if (!event) {
        res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
        return;
    }

    const reservations = Reservation.getReservationsByEvent(eventId);
    res.json(reservations);
}

const store = (req, res) => {
    const { event: eventId } = req.params;
    const { firstName, lastName, email } = req.body;
    const event = Event.findEventById(id);

    if (!event) {
        res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
        return;
    };

    const newReservation = new Reservation(firstName, lastName, email, eventId);
    Reservation.saveReservation(newReservation);

    Event.decrementSeats(eventId);

    res.json({
        message: 'Prenotazione effettuata correttamente!', reservation: newReservation
    });
}

const destroy = (req, res) => {
    //
}

module.exports = {
    index,
    store,
    destroy
}