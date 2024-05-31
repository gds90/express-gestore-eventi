const fs = require('fs');
const path = require('path');

class Reservation {
    constructor(id, firstName, lastName, email, eventId) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.eventId = eventId;
    }

    static getReservations() {
        const filePath = path.join(__dirname, '../db/reservations.json');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const reservations = JSON.parse(fileData);
        return reservations;
    }

    static saveReservations(reservations) {
        const filePath = path.join(__dirname, '../db/reservations.json');
        fs.writeFileSync(filePath, JSON.stringify(reservations));
    }

    static getReservationsByEvent(eventId) {
        const reservations = this.getReservations();
        const reservation = reservations.filter(r => r.eventId === parseInt(eventId));
        return reservation;
    }

    static findReservationById(reservationId) {
        const reservations = this.getReservations();
        return reservations.find(r => r.id === parseInt(reservationId));
    }

    static saveReservation(newReservation) {
        const reservations = this.getReservations();
        reservations.push(newReservation);
        this.saveReservations(reservations);
    }

    static deleteReservation(reservationId) {
        const reservations = this.getReservations();
        const reservation = this.findReservationById(reservationId);
        reservations.splice(reservations.indexOf(reservation), 1);
        this.saveReservations(reservations);
    }
}

module.exports = Reservation;