const pg = require("pg");
const settings = require("./settings"); // settings.json
const people = process.argv.slice(2);

const client = new pg.Client({
  user: settings.user,
  password: settings.password,
  database: settings.database,
  host: settings.hostname,
  port: settings.port,
  ssl: settings.ssl
});

function findPpl(data) {
  console.log("Searching ...")

  client.query("SELECT * FROM famous_people WHERE first_name = $1 OR last_name = $1", [data], (err, res) => {
    if (err) {
      console.log('ERR:', err);
      return false
    } else {

      for (let person of res.rows){
        const date = person.birthdate.toDateString();
        console.log(`${person.id}: ${person.first_name} ${person.last_name}, born ${date}`);
      }

    }

    client.end();

  });
}


client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  findPpl(process.argv[2]);
});
