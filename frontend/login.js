const loginButton = document.getElementById('login-button');
const usernameElem = document.getElementById('username');
const passwordElem = document.getElementById('password');

function saveToken(token) {
    sessionStorage.setItem('token', token);
}

async function login(loginInformation) {
  console.log(loginInformation);
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    body: JSON.stringify(loginInformation),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  console.log(data);
  if (data.success) {
  saveToken(data.token)
  window.location.href = 'http://localhost:3000/loggedIn.html';
  }
}

async function createAccount(credentials) {
  const response = await fetch('http://localhost:3000/api/create', {
    method: 'POST',
    body: JSON.stringify(credentials),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const data = await response.json();
}

loginButton.addEventListener('click', () => {
  let loginInformation = {
    username: usernameElem.value,
    password: passwordElem.value
  }
  login(loginInformation);
});
