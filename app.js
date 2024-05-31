const express = require('express');
const port = process.env.port || 9000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const eventsRouter = require("./routers/eventsRouter.js");

// Events router
app.use("/events", eventsRouter);

// Server in ascolto
app.listen(port, () => {
    console.log(`Server in ascolto su http://localhost:${port}`);
})
