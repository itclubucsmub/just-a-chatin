var dbConfig = require("../config/db")
var migration = require(`../database/migrations/${dbConfig.db_migration_version}`)

var args = process.argv.slice(2);
switch (args[0]) {
    case 'help':
        console.log('\nHelp\n\n run : node script/migrate.js [up|down]\n\ne.g. run "node script/migrate.js up"\n');
        break;
    case 'up':
        console.log("Migration: [up] runing")
        migration.up()
        console.log("Migration: [up] done")
        break;
    case 'down':
        console.log("Migration: [down] runing")
        migration.down()
        console.log("Migration: [down] done")
        break;
    default:
        console.log('\nSorry,\n\n run: node script/migrate.js help\n\nTo see help.\n');
}

