export const fetchLoginStatus = () =>{
    return fetch('/session',{
        method:'GET',
      })
      .catch( () => Promise.reject({ error: 'Cannot connect to Server' }))
      .then( (response) =>{
        if(!response.ok){
          return Promise.reject({ error: 'login-invalid' });
        }
        return response.json();
    });
}

export const fetchLogin = (username) =>{
    return fetch('/session',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: username}),
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
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
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return Promise.reject({ error: 'Error logging out'})
        }
        return;
    });
}

export const postTweet = (tweet) => {
    return fetch('/tweet',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tweet: tweet }),
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchUserTweets = (userId) => {
    return fetch(`/tweet/${userId}`,{
        method: 'GET',    
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchUserSpecificTweets = (userId) => {
    return fetch(`/userTweet/${userId}`,{
        method: 'GET',    
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchTweet = (tweetId) => {
    return fetch(`/tweetInfo/${tweetId}`,{
        method:'GET',
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchAllTweets = () => {
    return fetch('/allTweets', {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const updateLikes = (tweetId) => {
    return fetch(`/tweet/${tweetId}`,{
        method: 'PUT',
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return;
    });
}

export const updateFollowStatus = (otherUserId) => {
    return fetch('/tweet' , {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otherUser: otherUserId }),
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const fetchProfileDetails = (userId) => {
    return fetch(`/profileDetails/${userId}`, {
        method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return response.json().then( err => Promise.reject(err));
        }
        return response.json();
    });
}

export const deleteTweet = (tweetId) => {
    return fetch(`/tweet/${tweetId}`, {
        method: 'DELETE',
    })
    .catch( () => Promise.reject({ error: 'Cannot connect to Server'}))
    .then( (response) => {
        if(!response.ok){
            return Promise.reject({ error: 'Cannot delete Tweet'})
        }
        return;
    });
}