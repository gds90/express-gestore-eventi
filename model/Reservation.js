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

    setId(id) {
        if (typeof id !== 'number') {
            throw new Error('ID deve essere un numero');
        }
        this.id = id;
    }

    setFirstName(firstName) {
        if (typeof firstName !== 'string' || firstName.trim() === '') {
            throw new Error('Il nome deve essere una stringa');
        }
        this.firstName = firstName.trim();
    }

    setLastName(lastName) {
        if (typeof lastName !== 'string' || lastName.trim() === '') {
            throw new Error('Il cognome deve essere una stringa');
        }
        this.lastName = lastName.trim();
    }

    setEmail(email) {
        if (typeof email !== 'string' || email.trim() === '') {
            throw new Error('L\'email deve essere una stringa');
        }
        this.email = email.trim();
    }

    setEventId(eventId) {
        if (typeof eventId !== 'number') {
            throw new Error('L\'ID dell\'evento deve essere un numero');
        }

        const events = Event.getEvents();
        const eventExists = events.find(e => e.id === eventId);

        if (!eventExists) {
            throw new Error('Non esisto un evento con l\'ID inserito');
        }

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