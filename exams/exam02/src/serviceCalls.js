export const fetchLoginStatus = () => {
    return fetch('/session', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error' }))
    .then( (response) =>{
        if(!response.ok){
          return response.json().then( recipeList => Promise.reject(recipeList));
        }
        return response.json();
    });
}


export const fetchLogin = (username) =>{
    return fetch('/session', {
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

export const fetchRecipeDetails = (recipeId) => {
    return fetch(`/recipeDetails/${recipeId}`, { 
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'Network-error'}))
    .then( (response) =>{
        if(!response.ok){
            return response.json().then( result => Promise.reject(result))
        }
        return response.json()
    })
}

export const fetchRecipes = () => {
    return fetch('/recipes', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'Network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    })
}

export const fetchAddRecipeDetails = (title, ingredients, procedure) => {
    return fetch('/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title : title, ingredients: ingredients , procedure: procedure }),
    })
    .catch( () => Promise.reject({ error: 'Network-error'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( result => Promise.reject(result));
        }
        return response.json();
    })
}