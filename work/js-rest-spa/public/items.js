(function IIFE(){

  items = {};
  const page = document.querySelector('.main-content');
  const status = document.querySelector('.status');
  const errorMessages = {
    'failed-login':  'Bad Login',
    'network-error': 'There was a problem connecting to the network, try again',
    'duplicate': 'The item already exists in the inventory',
    'missing-name': 'Enter name of an item to add',
    'modify-error': 'Element does not exist to modify',
    'unauthorized': 'Login to view/modify inventory',
    'forbidden': 'UserName doesnot exist, Login again'
  };

  const updateStatus = (message) =>{
    status.innerHTML = message;
  };

  const renderList = (items) => {
    const list = page.children[3];
    list.innerHTML = Object.keys(items).map( (key) => {
        const item = items[key];
          return `
          <li> 
            <span data-id="${key}">
              <button class="delete">x</button>
            </span>
            <span data-id="${key}" class="new-item">${item.name}</span>
            <span data-id="${key}" class="container">
              <input class="quantity" value=${item.quantity > 0 ? item.quantity : 0}>
              <button class="update-quantity">Update</button>
            </span>
          </li>`;
      }).join('\n');
  };

  const convertError = (response) =>{
    if(response.ok){
      return response.json();
    }
    return response.json()
    .then( err => Promise.reject(err) );
  }

  page.addEventListener('click', (e) => {
    if(e.target.classList.contains('add')){
      let text = e.target.previousElementSibling.previousElementSibling.value;
      let numQuant = e.target.previousElementSibling.value;
      const body = {name: text, quantity: numQuant};
      if(text){
        fetch(`/items/`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        })
        .catch( () => Promise.reject( { error: 'network-error' }) )
        .then(convertError)
        .then(items => {
          e.target.previousElementSibling.previousElementSibling.value = '';
          e.target.previousElementSibling.value = '';
          e.target.disabled = true;
          renderList(items);
          updateStatus('');
          })
          .catch( err => {
            if(err.error == 'unauthorized' || err.error == 'forbidden'){
              page.innerHTML = '<div class="login"><input class="user-name"/><button class="add-user">Login</button></div>'
            }
            updateStatus(errorMessages[err.error] || err.error);
          });    
        }
    }
  });
  
  page.addEventListener('keypress', (e) =>{
    if(e.target.classList.contains('item-name')){
      if(e.which ==32){
        e.preventDefault();
        return false;
      } 
    }
  });

  page.addEventListener('keyup', (e) =>{
    if(e.target.classList.contains('item-name')){
      const text = e.target.value;
      const addButton = e.target.nextElementSibling.nextElementSibling;
      addButton.disabled = !text;
    }
  });
  
  page.addEventListener('click', (e) =>{
  if(e.target.classList.contains('delete')){
    const id = e.target.parentElement.nextElementSibling.textContent;
    fetch(`/items/${id}`,{
      method: 'DELETE',
    })
    .catch( () => Promise.reject( { error: 'network-error' }) )
    .then(convertError)
    .then(items =>{
      renderList(items);
      updateStatus('');
    })
    .catch( err => {
      if(err.error == 'unauthorized' || err.error == 'forbidden'){
        page.innerHTML = '<div class="login"><input class="user-name"/><button class="add-user">Login</button></div>'
      }
      updateStatus(errorMessages[err.error] || err.error);
    });  
  }

  if(e.target.classList.contains('update-quantity')){
    const id = e.target.parentElement.previousElementSibling.textContent;
    const quantityToUpdate = e.target.previousElementSibling.value;
    const body = {quantity : quantityToUpdate};
    fetch(`/items/${id}`,{
      method: 'PATCH',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    .catch( () => Promise.reject({ error : 'network-error' }))
    .then(convertError)
    .then(items => {
      renderList(items);
      updateStatus('');
    })
    .catch( err => {
      if(err.error == 'unauthorized' || err.error == 'forbidden'){
        page.innerHTML = '<div class="login"><input class="user-name"/><button class="add-user">Login</button></div>'
      }
      if(err.error == 'modify-error'){
        fetch('/items/', {
          method: 'GET',
        })
        .catch( () => Promise.reject({error: 'network-error'}))
        .then(response => response.json())
        .then((items) =>{ 
          renderList(items);
        })
      }
      updateStatus(errorMessages[err.error] || err.error);
    })
  }

  if(e.target.classList.contains('logout-button')){
    fetch('/session', {
      method: 'GET',
    })
    .catch( () => Promise.reject({ error: 'network-error'}))
    .then( () => {
      page.innerHTML = '<div class="login"><input class="user-name"/><button class="add-user">Login</button></div>'
      updateStatus('');
    })
  }

});

fetch('/load',{
  method:'GET',
})
.catch( () => Promise.reject({ error: 'network-error' }))
.then( (response) =>{
  if(response.ok){
    isValid = true;
    return response.text();
  }
  isValid = false;
  return response.text();
}) 
.then(uid => {
  if(!uid || !isValid){
    page.innerHTML = '<div class="login"><input class="user-name"/><button class="add-user">Login</button></div>'
    if(!isValid){
      updateStatus('Bad Login');
    }else{
      updateStatus('');
    }
  }else{
    page.innerHTML = "Loading...";
    fetch('/items/', {
      method: 'GET',
    })
    .catch( () => Promise.reject( { error: 'network-error' }))
    .then(convertError)
    .then(items => {
      page.innerHTML = `<h2>Inventory Management</h2>
      <button class="logout-button">Logout</button> 
      <div class="outgoing">
          <input class="item-name"/><input class="item-quantity"/><button class="add">Add</button>
      </div>
      <ul class="items">
          <li><span class="new-item"></span></li>
      </ul>`
      page.children[2].children[2].disabled = true;
      renderList(items);
      updateStatus('');
      })
      .catch( err => {
        updateStatus(errorMessages[err.error] || err.error);
      });
  }  
});

page.addEventListener('click' , (e) =>{
  if(e.target.classList.contains('add-user')){
    const name = e.target.previousElementSibling.value;
    const body = { name : name};
    fetch('/session', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    })
    .catch( () => Promise.reject( { error: 'network-error' }))
    .then(convertError)
    .then((items)  => {
      page.innerHTML = `<h2>Inventory Management</h2>
      <button class="logout-button">Logout</button>
      <div class="outgoing">
          <input class="item-name"/><input class="item-quantity"/><button class="add">Add</button>
      </div>
      <ul class="items">
          <li><span class="new-item"></span></li>
      </ul>`
      page.children[2].children[2].disabled = true;
      renderList(items);
      updateStatus('');
    })
    .catch( err => {
      updateStatus(errorMessages[err.error] || err.error);
    });
  }
})

}) ();