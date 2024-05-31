const Event = require('../model/Event.js');

const save = (event) => {
    const events = Event.getEvents();
    events.push(event);
    Event.saveEvents(events);
};

const updateEvent = (updatedData) => {
    const events = Event.getEvents();
    const eventIndex = events.findIndex(e => e.id === parseInt(updatedData.id));
    events[eventIndex] = updatedData;
    Event.saveEvents(events);
};

const index = (req, res) => {
    const { id, title, date } = req.query;

    let events = Event.getEvents();

    // Filtraggio per ID
    if (id) {
        const event = Event.findEventById(id);
        if (!event) {
            res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
            return;
        }
        return res.json(event);
    }

    // Filtraggio per titolo
    if (title) {
        const event = events.filter(e => e.title.toLowerCase().includes(title.toLowerCase().replaceAll('-', ' ')));
        if (!event) {
            res.status(404).json({ message: 'Non esiste un evento con quel titolo' });
            return;
        }
    }

    // Filtraggio per data
    if (date) {
        const eventsInData = events.filter(e => e.date === date);

        if (eventsInData.length === 0) {
            res.status(404).json({ message: 'Non esistono eventi in quella data' });
            return;
        }

        res.json(eventsInData);
    }

    res.json(events);
}

const store = (req, res) => {
    const { id, title, description, date, maxSeats } = req.body;

    if (!id || !title || !description || !date) {
        res.status(400).json({ message: 'Mancanza di uno o più parametri per il salvataggio dell\'evento' });
        return;
    }
    // Controllo se esiste un altro evento con quell'ID
    const event = Event.findEventById(id);
    if (event) {
        res.status(400).json({ message: 'Esiste già un evento con quell\'ID' })
        return;
    }

    const newEvent = new Event(id, title, description, date, maxSeats);

    save(newEvent);
    res.json({ message: 'Evento aggiunto correttamente.', newEvent });
}

const update = (req, res) => {
    const { event: id } = req.params;
    const { title, description, date, maxSeats } = req.body;

    let event = Event.findEventById(id);
    if (!event) {
        res.status(404).json({ message: 'Non esiste un evento con quell\'ID' });
        return;
    }
    event = updateEvent({ id: parseInt(id), title, description, date, maxSeats });
    res.json({ message: 'Evento aggiornato correttamente.', event });
}

module.exports = {
    index,
    store,
    update
}