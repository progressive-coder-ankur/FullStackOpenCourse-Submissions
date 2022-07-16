const mongoose = require('mongoose');

const Pwd = 'p33S2H8nGOxQFJyt';

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  );
  process.exit(1);
}

const password = process.argv[2];
const name = process.argv[3] || null;
const number = process.argv[4] || null;

const url = `mongodb+srv://fullstack-phonebook:${password}@cluster0.3i2quha.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

const ContactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Contact = mongoose.model('Contact', ContactSchema);

mongoose.connect(url).then(result => {
  console.log('connected');

  const person = new Contact({
    name: `${name}`,
    number: `${number}`,
  });

  if (name === null || number === null) {
    return Contact.find({}).then(result => {
      console.log(`phonebook:`);
      result.forEach(item => {
        console.table(`${item.name + ' ' + item.number}`);
      });
      mongoose.connection.close();
    });
  }

  return person
    .save()
    .then(result => {
      console.log(
        `added ${result.name + ' number ' + result.number} to the phonebook`
      );
      return mongoose.connection.close();
    })
    .catch(err => console.log(err));
});
