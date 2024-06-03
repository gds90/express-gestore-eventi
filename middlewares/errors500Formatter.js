module.exports = (err, req, res, next) => {
    const statusCode = 500;
    res.status(statusCode).json({ statusCode, message: 'Errore interno del server' });
}