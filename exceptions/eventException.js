class EventException extends Error {
    constructor(message, status = 400) {
        super(message);
        this.status = status;
        this.name = 'EventException';
    }
}

module.exports = EventException;

// BONUS 
// throw new EventException('Il Titolo deve essere una stringa', 400);
// throw new EventException(`Nessun evento con id ${id} trovato`, 400);

// const errorHandler = (err, req, res, next) => {
//     res.status(err.status).send(`Error: ${err.name}`);
// }