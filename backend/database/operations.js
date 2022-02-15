const nedb = require('nedb-promise');
const database = new nedb({
  filename: 'tickets.db',
  autoload: true
});

const conserts = {
  "type": "consert-list",
  "conserts": [{
      "type": "ticket",
      "verified": false,
      "title": "Icona Pop",
      "location": "Stora Teatern",
      "date": "21 APR",
      "timeStart": "18.00",
      "timeStop": "20.00",
      "price": 249,
      "available": 5
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "Imagine Dragons",
      "location": "Trädgår'n",
      "date": "28 APR",
      "timeStart": "20.00",
      "timeStop": "22.00",
      "price": 449,
      "available": 5
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "Tame Impala",
      "location": "Pustevik",
      "date": "11 MAJ",
      "timeStart": "19.00",
      "timeStop": "20.00",
      "price": 149,
      "available": 5
    },
    {
      "type": "ticket",
      "verified": false,
      "title": "E-type",
      "location": "Park Lane",
      "date": "1 JUN",
      "timeStart": "20.00",
      "timeStop": "22.00",
      "price": 199,
      "available": 5
    }
  ]
}


function saveAccount(account) {
  account.type = "account";
  database.insert(account);
}
async function getAccountByUsername(username) {
  const account = await database.find({
    username: username
  });
  return account;
}
async function getTicketById(id) {
  const account = await database.find({
    id: id
  });
  return account;
}

function createTicket(ticket) {
  database.insert(ticket);
}

async function getTicketByCookie(cookie) {
  const account = await database.find({
    cookie: parseInt(cookie)
  });
  return account;
}

function updateCookieOnTicket(ticketId, cookie) {
  database.update({
    id: ticketId
  }, {
    $set: {
      cookie: cookie
    }
  });
}

async function updateVerified(id) {
  database.update({
    id: id
  }, {
    $set: {
      verified: true
    }
  });
}

function newTicketId() {
  var result = '';
  var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < 6; i++) {
    result += characters.charAt(Math.random() * 36);
  }

  return result;
}

function newTicketCookie() {
  const cookie = Math.round(Math.random() * 10000)
  return cookie;
}

function saveConserts() {
  database.insert(conserts);
}

async function getConserts() {
  const conserts = await database.find({
    type: 'consert-list'
  });
  return conserts;
}

async function getAvailabilityByTitle(consertName) {
  let available = await database.find({

    title: consertName

  });
  return available;
}

module.exports = {
  saveAccount,
  getAccountByUsername,
  getTicketById,
  createTicket,
  getTicketByCookie,
  updateCookieOnTicket,
  updateVerified,
  newTicketId,
  newTicketCookie,
  saveConserts,
  getConserts,
  getAvailabilityByTitle
}
