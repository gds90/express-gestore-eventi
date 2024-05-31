const express = require('express');
const port = process.env.port || 9000;
const errors404Formatter = require('./middlewares/errors404Formatter.js');
const errors500Formatter = require('./middlewares/errors500Formatter.js');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventsRouter = require("./routers/eventsRouter.js");

// Events router
app.use("/events", eventsRouter);

app.use(errors404Formatter);
app.use(errors500Formatter);

// Server in ascolto
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})
