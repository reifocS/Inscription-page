const BASE_URL = 'http://localhost:8001'

function getEndpointURL(endpoint) {
    return `${BASE_URL}${endpoint}`;
}


export async function authentificate(user) {
    //request on http://localhost:8001/login
    let url = getEndpointURL('/login');
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    let data = await response.json();
    console.log(data); //contains everything about the user, but here we just want the first and last name.
    if (!data.firstname) { //authentification failed
        return false;
    }
    return `Bonjour ${data.firstname} ${data.lastname} 😊`;
}

export async function getUsers() {
    //request on http://localhost:8001/users 
    let url = getEndpointURL('/users');
    let response = await fetch(url);

    // Parse in JSON
    let data = await response.json();

    return data;
}

export async function createUser(user) {
    // requête POST sur l'URL http://localhost:8001/signin 
    let url = getEndpointURL('/signin');
    let response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    if (response.status >= 300) {
        return false;
    }

    return true;
}




