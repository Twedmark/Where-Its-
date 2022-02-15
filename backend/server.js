const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const jwt = require('jsonwebtoken');
const {
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
} = require('./database/operations');
const {
  hashPassword,
  comparePassword
} = require('./utils/bcrypt');

app.use(express.static(__dirname +'/public'));
app.use(express.static('../frontend'));

app.use(express.json());
app.use(cookieParser());


async function cheackConstertList() {
  const test = await getConserts();
  if (test.length < 1) {
    saveConserts();
  };
}

cheackConstertList();

app.post('/api/create-ticket', async (request, response) => {
  const ticketInformation = request.body
  const resObj = {
    success: true,
    soldOut: false
  }
  //const stillAvailable = await getAvailabilityByTitle(ticketInformation.title);
  //console.log(stillAvailable);

  var ticketId = await newTicketId();
  //while(await getTicketById(ticketId).length > 0){
  //  ticketId = await newTicketId();
  //  // detta skulle kunna bli en oändlig loop om man har andvänt alla
  // ID som går att skapa på detta sätt
  //}};

  ticketInformation.id = ticketId;
  createTicket(ticketInformation);

  const cookieId = newTicketCookie();

  updateCookieOnTicket(ticketInformation.id, cookieId);

  response.cookie("ticketCookie", cookieId);

  response.json(resObj);
});

app.get("/api/ticket", async (request, response) => {
  const cookie = request.cookies.ticketCookie;
  let resObj = {
    title: "",
    location: "",
    date: "",
    timeStart: "",
    timeStop: "",
    price: "",
    id: ""
  }

  const ticket = await getTicketByCookie(cookie);
  if (ticket.length > 0) {
    resObj.title = ticket[0].title;
    resObj.location = ticket[0].location;
    resObj.date = ticket[0].date;
    resObj.timeStart = ticket[0].timeStart;
    resObj.timeStop = ticket[0].timeStop;
    resObj.price = ticket[0].price;
    resObj.id = ticket[0].id;
  }

  response.json(resObj);
});


app.post('/api/create', async (request, response) => {
  const credentials = request.body;
  const resObj = {
    success: true
  }

  const hashedPassword = await hashPassword(credentials.password);
  credentials.password = hashedPassword;
  saveAccount(credentials);
  
  response.json(resObj);
});

app.post('/api/login', async (request, response) => {
  const credentials = request.body;
  const resObj = {
    success: false,
    token: ''
  }

  const account = await getAccountByUsername(credentials.username);
  if (account.length > 0) {
    const correctPassword = await comparePassword(credentials.password, account[0].password);
    if (correctPassword) {
      resObj.success = true;
      const token = jwt.sign({ username: account[0].username }, 'a1b1c1', {
      expiresIn: 600
      });
      resObj.token = token;
    }
  }

  response.json(resObj);
});

app.get('/api/cheack-token', async (request, response) => {
    const token = request.headers.authorization.replace('Bearer ', '');
    const resObj = {
        success: false,
    }

    try {
        const data = jwt.verify(token, 'a1b1c1');
        resObj.success = true;
    } catch (error) {
        resObj.errorMessage = 'Token invalid';
    }

    response.json(resObj);
});

app.post('/api/check-ticket', async (request, response) => {
  const ticketId = request.body;
  const resObj = {
    success: false,
    exists: true,
    used: false
  };

  const ticket = await getTicketById(ticketId.id);
  if (ticket[0] == null) {
    console.log("kan inte hitta ticket");
    resObj.exists = false;
  } else if (ticket[0].type == 'ticket' && ticket[0].verified == false) {
    console.log("uppdaterar ticket verified")
    resObj.success = true;
    updateVerified(ticketId.id);
  } else if (ticket[0].type == 'ticket' && ticket[0].verified == true) {
    console.log("ticket är redan verified");
    resObj.used = true;
  }

  response.json(resObj);
});

app.get('/api/get-conserts', async (request, response) => {
  const conserts = await getConserts();

  const resObj = {
    conserts: ""
  }
  resObj.conserts = conserts[0]
  response.json(resObj);
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
