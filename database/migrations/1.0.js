'use strict'

const sqlite3 = require("sqlite3");

module.exports = {
    up: function () {
        return new Promise(function (resolve, reject) {
            let db = new sqlite3.Database('./database/botapp.db');

            db.run(`PRAGMA foreign_keys = ON`);

            db.serialize(function () {
                db.run(`CREATE TABLE IF NOT EXISTS subscribers (
              id INTEGER PRIMARY KEY,
              subscriber_id INTEGER,
              in_session TEXT
            )`);

                db.run(`CREATE TABLE IF NOT EXISTS chatsession (
              id INTEGER PRIMARY KEY,
              subscriber_one INTEGER,
              subscriber_two INTEGER,
              session TEXT,
              FOREIGN KEY(subscriber_one) REFERENCES subscribers(id),
              FOREIGN KEY(subscriber_two) REFERENCES subscribers(id)
            )`);
            });

            db.close();
        });
    },
    down: function () {
        return new Promise(function (resolve, reject) {
            /* This runs if we decide to rollback. In that case we must revert the `up` function and bring our database to it's initial state */
            let db = new sqlite3.Database("./database/botapp.db");
            db.serialize(function () {
                db.run(`PRAGMA foreign_keys = OFF;`);
                db.run(`DROP TABLE IF EXISTS chatsession`);
                db.run(`DROP TABLE IF EXISTS subscribers`);
                db.run(`PRAGMA foreign_keys = ON;`);
            });
            db.close();
        });
    }
}