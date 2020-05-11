'use strict'

const sqlite3 = require("sqlite3");

function sampleSeed() {

    let db = new sqlite3.Database('./database/botapp.db');

    db.serialize(function () {
        db.run(`CREATE TABLE IF NOT EXISTS people (
                id INTEGER PRIMARY KEY,
                name TEXT,
                score INTEGER
            )`);

        db.run(`INSERT INTO people (name,score) VALUES 
                ("Ko Ko",12),
                ("Mg Mg",10),
                ("Ma Ma",8),
                ("Mya Mya",9)
            `);
    });

    db.close();

}

sampleSeed()