import {
    fetchLoginStatus,
    fetchLogin,
    fetchChatInfo,
    fetchMessage,
    fetchLogout,
} from './serviceCalls';

const appState = {
    pollId: null,
    isLoggedIn: false,
    messages: {},
    users: {},
    error: '',
};

const page = document.querySelector('.main');

function renderPage() {
    if(!appState.isLoggedIn)  {
      renderLogin();
    } else {
      renderChat(appState.messages, appState.users);
    }
    renderErrors(appState.error);
}


function renderChat( messagesList, usersList) {
    page.innerHTML = `
    <h2>Just Chat</h2>
      <button class="logout-button">Logout</button> 
      <div class="outgoing">
          <input class="new-message" placeholder="Enter a message"/><button class="add">Send</button>
      </div>
      <div class="chat-content">
        <ul class="users"></ul>
        <ul class="messages"></ul>
      </div>`
      renderMessages(messagesList);
      renderUsers(usersList);
}

function renderUsers( usersList ){
    const userPage = page.querySelector('.users');
    userPage.innerHTML = Object.values(usersList).map( (user) =>{
        return `
        <li>${user}</li>`;
    }).join('');
};

function renderMessages( messages ) {
    const chat = page.querySelector('.messages');
    chat.innerHTML = Object.values(messages).map( (message) => {
        return `
        <li>
        <div class="user-info">
          <span class="user-name">${message.user}</span>
          <span class="time">${message.time}</span>
        </div>

        <span class="message">${message.message}</span>
        </li>`;
    }).join('');
};

function renderLogin( show ) {
    page.innerHTML = '<div class="login"><input class="user-name" placeholder="Enter your name"/><button class="add-user">Login</button></div>';
}

page.addEventListener('click', (e) =>{
    if(e.target.classList.contains('add-user')){
        const name = e.target.previousElementSibling.value;
        fetchLogin(name)
        .then( chatInfo => {
            appState.isLoggedIn = true;
            appState.users = chatInfo[0];
            appState.messages = chatInfo[1];
            appState.error = '';
            poll(true);
            renderPage();
        })
        .catch( err => {
            appState.error = err.error;
            renderPage();
        });
    }

    if(e.target.classList.contains('add')){
        const messageBody = e.target.previousElementSibling.value;
        fetchMessage(messageBody)
        .then( chatInfo => {
            appState.isLoggedIn = true;
            appState.users = chatInfo[0];
            appState.messages = chatInfo[1];
            appState.error = '';
            poll(true);
            renderPage();
        })
        .catch( err =>{
            if(err.error == 'Unauthorized user' || err.error == 'User not allowed'){
                appState.isLoggedIn = false;
                clearTimeout(appState.pollId);
                appState.pollId = null;
            }
            appState.error = err.error;
            renderPage();
        });
    }

    if(e.target.classList.contains('logout-button')){
        fetchLogout()
        .then( () =>{
            appState.isLoggedIn = false;
            appState.error = '';
            poll(false);
            renderPage();
        })
        .catch( err => {
            appState.error = err;
            renderPage();
        })
    }
})
  
function renderErrors( text ) {
    document.querySelector('.status').innerHTML = text;
}

function poll(shouldPoll) {
    if( shouldPoll && !appState.pollId ) {
      appState.pollId = setInterval( () => {
        fetchChatInfo()
        .then( chatInfo => {
          appState.users = chatInfo[0];
          appState.messages = chatInfo[1];
          renderPage();
        })
        .catch( err => {
            if(err.error == 'Unauthorized user' || err.error == 'User not allowed'){
                appState.isLoggedIn = false;
                clearTimeout(appState.pollId);
                appState.pollId = null;
            }
            appState.error = err.error;
            renderPage();
        });
      }, 8000);
    }
    
    if( !shouldPoll && appState.pollId ) {
      clearTimeout(appState.pollId);
      appState.pollId = null;
    }
}

fetchLoginStatus()
.then( () => {
    appState.isLoggedIn = true;
    poll(true);
    renderPage();
})
.catch( () => {
    appState.isLoggedIn = false;
    renderPage();
});