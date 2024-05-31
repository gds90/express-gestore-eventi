const fs = require('fs');
const path = require('path');

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
        const fileData = fs.readFileSync(filePath, "utf-8");
        const events = JSON.parse(fileData);
        return events;
    }

    static saveEvents(events) {
        const filePath = path.join(__dirname, '../db/events.json');
        fs.writeFileSync(filePath, JSON.stringify(events));
    }

    static findEventById(eventId) {
        const events = Event.getEvents();
        const event = events.find(e => e.id === eventId);
        return event;
    }
}

module.exports = Event;