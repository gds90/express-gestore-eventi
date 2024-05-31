module.exports = (req, res, next) => {
    const statusCode = 404;
    res.status(statusCode).json({ statusCode, message: 'Pagina non trovata' });
}