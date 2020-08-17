import express = require('express');
import { transports, format } from 'winston';
import { logger } from 'express-winston';
import { getDB, load, clean } from './db';

const parseNumEnv = (value: string, def: number): number => {
    let res = def;
    if (typeof value === "string") {
        res = parseInt(value, 10);
    }
    if (isNaN(res)) {
        res = def;
    }
    return res;
}

// const parseBoolEnv = (value: string, def = false): boolean => {
//     let res = def;
//     if (typeof value === "string") {
//         res = !["0", "false"].includes(value.toLowerCase());
//     }
//     return res;
// };

const PORT = parseNumEnv(process.env.PORT, 3000);

const app: express.Application = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger({
    transports: [
        new transports.Console()
    ],
    format: format.combine(
        format.simple(),
        format.colorize()
    ),
    meta: true, // optional: control whether you want to log the meta data about the request (default to true)
    msg: "HTTP {{req.method}} {{req.url}}", // optional: customize the default logging message. E.g. "{{res.statusCode}} {{req.method}} {{res.responseTime}}ms {{req.url}}"
    expressFormat: true, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
    colorize: false, // Color the text and status code, using the Express/morgan color palette (text: gray, status: default green, 3XX cyan, 4XX yellow, 5XX red).
}));

app.get('/hello', (__, res) => {
    load();
    const db = getDB();
    const value = db.map.hello;
    if (!value) {
        res.status(400).send({ error: 'Not found' });
    } else {
        res.status(200).send({ hello: db.map.hello });
    }
})

// Clears all the data
// GET /clean
app.get('/clean', (__, res) => {
    clean();
    res.status(200).send({});
});

// Returns the DB
// GET /db
app.get('/db', (__, res) => {
    load();
    res.status(200).send(getDB());
});

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}!`);
});

app.use((err: Error, __: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err);
    if (res.headersSent) {
        return next(err)
    }
    res.status(500).send({ error: err.toString() });
});
