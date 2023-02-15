const loginBtn = document.querySelector('.login-btn');

loginBtn.addEventListener('click', () => {
    login('http://localhost:3000/login', {
        email: 'christian',
        password: 'christian'
    })
    .then(res => console.log(res))
    .catch(err => console.log(err));
});

// Login fetch to express server
async function login(url, data) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return response.json();
}