export const fetchLoginStatus = () =>{
    return fetch('/session',{
        method:'GET',
      })
      .catch( () => Promise.reject({ error: 'network-error' }))
      .then( (response) =>{
        if(!response.ok){
          return Promise.reject({ error: 'login-invalid' });
        }
        return;
    });
}

export const fetchLogin = (username) =>{
    return fetch('/session',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username }),
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchMessage = (message) =>{
    return fetch('/messages',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ message: message}),
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchLogout = () => {
    return fetch('/session', {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( (response) => {
        if(!response.ok){
            return Promise.reject({ error: 'Error logging out'})
        }
        return;
    });
}

export const fetchUsers = () =>{
    return fetch('/users', {
        method: 'GET',
    })
    .catch( () => Promise.reject( {error: 'network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchMessages = () =>{
    return fetch('/messages', {
        method: 'GET',
    })
    .catch( () => Promise.reject( {error: 'network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then(err => Promise.reject(err));
        }
        return response.json();
    });
}