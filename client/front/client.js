const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginEmail = document.getElementById('loginEmail');
const loginPassword = document.getElementById('loginPassword');
const resgisterEmail = document.getElementById('registerEmail');
const registerPassword = document.getElementById('registerPassword');
var token, ws;

// Register on click
registerBtn.addEventListener('click', () => {
    if (resgisterEmail.value != '' && registerPassword.value != '') {
        login('http://localhost:5000/register', {
            email: resgisterEmail.value,
            password: registerPassword.value
        }).then(res => {
            console.log(res);
        }).catch((e) => console.log(e));
    }
});

// Login on click
loginBtn.addEventListener('click', () => {
    if (loginEmail.value != '' && loginPassword.value != '') {
        login('http://localhost:5000/login', {
            email: loginEmail.value,
            password: loginPassword.value
        }).then(res => {
            console.log(res);
            token = res.data.token;
            openWsConnection(token);
        }).catch((e) => console.log(e));
    }
});

// Login fetch to express server
async function login(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}

function openWsConnection(token) {
    // Connection with WebSocketServer passing token through params
    ws = new WebSocket("ws://localhost:4000/ws?token=" + token);

    // Send a message whenever the WebSocket connection opens.
    ws.onopen = (event) => {
        console.log("WebSocket connection established.");
    }

    ws.onmessage = (event) => {
        console.log('Do things');
    }

    ws.onerror = (event) => {
        console.log("WebSocket error received: ", event.data);
    }

    ws.onclose = (event) => {
        console.log("WebSocket connection closed.");
    }
}