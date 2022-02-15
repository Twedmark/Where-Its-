// const buyTicketButton = document.getElementById('buy-ticket');
const loginButton = document.getElementById('Login-btn');
const consertsDiv = document.getElementById('conserts-div')

function showConsterts(conserts) {
  conserts.forEach((consert, index) => {
    const eventElemDiv = document.createElement('div');
    eventElemDiv.setAttribute('class', "eventDiv");
    eventElemDiv.addEventListener("click", function() {
      buyTicket(consert);
    });
    consertsDiv.append(eventElemDiv);

    const eventElemDivLeft = document.createElement('div');
    eventElemDivLeft.setAttribute('class', "divLeft");
    eventElemDiv.append(eventElemDivLeft);

    const eventElemDate = document.createElement('p');
    eventElemDate.setAttribute('class', "date");
    eventElemDate.innerHTML = consert.date;
    eventElemDivLeft.append(eventElemDate);

    const eventElemDivRight = document.createElement('div');
    eventElemDivRight.setAttribute('class', "divRight");
    eventElemDiv.append(eventElemDivRight);

    const eventElemTitle = document.createElement('p');
    eventElemTitle.setAttribute('class', "title");
    eventElemTitle.innerHTML = consert.title;
    eventElemDivRight.append(eventElemTitle);

    const eventElemLocation = document.createElement('p');
    eventElemLocation.setAttribute('class', "location");
    eventElemLocation.innerHTML = consert.location;
    eventElemDivRight.append(eventElemLocation);

    const eventElemDivRightBot = document.createElement('div');
    eventElemDivRightBot.setAttribute('class', "divRightBot");
    eventElemDivRight.append(eventElemDivRightBot);

    const eventElemTime = document.createElement('p');
    eventElemTime.setAttribute('class', "time");
    eventElemTime.innerHTML = consert.timeStart + " - " + consert.timeStop;
    eventElemDivRightBot.append(eventElemTime);

    const eventElemPrice = document.createElement('p');
    eventElemPrice.setAttribute('class', "price");
    eventElemPrice.innerHTML = consert.price + " Sek";
    eventElemDivRightBot.append(eventElemPrice);
  });
}

async function getConsterts() {
  const response = await fetch('http://localhost:3000/api/get-conserts');
  const data = await response.json();
  showConsterts(data.conserts.conserts);
}

async function buyTicket(ticket) {
  const response = await fetch('http://localhost:3000/api/create-ticket', {
    method: 'POST',
    body: JSON.stringify(ticket),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
  if (data.success) {
    window.location.href = 'http://localhost:3000/ticket.html';
  };

}

async function login() {
  window.location.href = 'http://localhost:3000/login.html'
};

getConsterts();

loginButton.addEventListener('click', () => {
  login();
})
