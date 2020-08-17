import { readJsonSync, writeJsonSync } from 'fs-extra';
import { resolve } from 'path';
// import { v4 as uuidv4 } from 'uuid';

const DB_PATH = process.env.DB_PATH || resolve('./data/db.json');

export interface DB {
    map: {
        [key: string]: string;
    }
}

let db: DB;

export const load = () => {
    db = readJsonSync(DB_PATH);
};

export const flush = () => {
    writeJsonSync(DB_PATH, db);
    load();
};

export const clean = () => {
    db = { map: { hello: "world" } };
    flush();
};

// TODO add model methods

export const getDB = () => db;