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

    setId(id) {
        if (typeof id !== 'number') {
            throw new Error('ID deve essere un numero');
        }
        this.id = id;
    }

    setTitle(title) {
        if (typeof title !== 'string' || title.trim() === '') {
            throw new Error('Il titolo deve essere una stringa non vuota');
        }
        const events = Event.getEvents();
        const event = events.find(e => e.title === this.title);
        if (event) {
            throw new Error('Esiste già un evento con questo titolo')
        }

        this.title = title.trim();
    }

    setDescription(description) {
        if (typeof description !== 'string' || description.trim() === '') {
            throw new Error('La descrizione deve essere una stringa non vuota');
        }
        this.description = description.trim();
    }

    setDate(date) {
        const dateObj = new Date(date);

        if (!isNaN(dateObj)) {
            let day = dateObj.getDate();
            let month = dateObj.getMonth() + 1;
            let year = dateObj.getFullYear();
            this.date = `${day}-${month}-${year}`;
        } else {
            throw new Error('La data deve essere nel formato DD-MM-YYYY');
        }
    }

    setMaxSeats(maxSeats) {
        if (typeof maxSeats !== 'number' || maxSeats <= 0) {
            throw new Error('Il numero massimo di posti deve essere un numero positivo');
        }
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

    static decrementSeats(eventId) {
        const events = this.getEvents();
        const event = events.find(e => e.id === parseInt(eventId));
        if (event && event.maxSeats > 0) {
            event.maxSeats--;
            this.saveEvents(events);
        }
    }
}

module.exports = Event;