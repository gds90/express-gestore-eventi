const fs = require('fs');
const path = require('path');
const Reservation = require('./Reservation.js');

class Event {
    constructor(id, title, description, date, maxSeats) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.maxSeats = maxSeats;
    }

    static getEvents() {
        const filePath = path.join(__dirname, '../db/events.json');
        const fileData = fs.readFileSync(filePath, 'utf-8');
        const events = JSON.parse(fileData);
        return events;
    }

    static saveEvents(events) {
        const filePath = path.join(__dirname, '../db/events.json');
        fs.writeFileSync(filePath, JSON.stringify(events));
    }

    static findEventById(eventId) {
        const events = this.getEvents();
        const event = events.find(e => e.id === parseInt(eventId));
        return event;
    }

    static getReservations(eventId) {
        const event = this.findEventById(eventId);
        if (!event) {
            res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
            return;
        }
        const reservations = Reservation.getReservationsByEvent(eventId);
        return reservations;
    }
}

module.exports = Event;