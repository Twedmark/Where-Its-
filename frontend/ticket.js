const titleElem = document.getElementById('title');
const locationElem = document.getElementById('location');
const dateElem = document.getElementById('date');
const timeFromElem = document.getElementById('timeFrom');
const timeToElem = document.getElementById('timeTo');
const idElem = document.getElementById('ticketId');



async function getTicketDetails() {
  const response = await fetch('http://localhost:3000/api/ticket');
  const data = await response.json();

  titleElem.innerHTML = data.title;
  locationElem.innerHTML = data.location;
  dateElem.innerHTML =  data.date;
  timeFromElem.innerHTML = data.timeStart;
  timeToElem.innerHTML = data.timeStop;
  idElem.innerHTML = "Biljetnummer: " + data.id;

}

getTicketDetails();
