const settings = require("./settings"); // settings.json
const [firstName, lastName, birthday] = process.argv.slice(2);
var knex = require('knex')({
  client: 'pg',
  connection: {
    host: settings.hostname,
    user: settings.user,
    password: settings.password,
    database: settings.database
  }
});

knex.insert({
  first_name: firstName,
  last_name: lastName,
  birthdate: birthday
})
  .returning('id')
  .into('famous_people')
  .finally(function() {
    knex.destroy();
  })

