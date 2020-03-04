(function IIFE() {

  const counter = () =>  {
    let count = 0;
    return () => {
      count += 1;
      return count;
    };
  };
  const nextId = counter();

  const items = {};

  const addButton = document.querySelector('.outgoing button');
  const list = document.querySelector('.items');
  const newTaskEl = document.querySelector('.to-add');

  const renderList = (items) => {
	  list.innerHTML = Object.keys(items).map( (key) => {
		const item = items[key];
		return `
        <li>
        	<span data-id="${key}">
            	<button class="delete">x</button>
            </span>
            <span data-id="${key}" class="new-item">
            	${item.item}
          	</span>
          	<span data-id="${key}" class="container">
           		<button class="reduce-quantity" ${item.quantity <= 0 ? "disabled" : ""}>-</button>
            	${item.quantity}
             	<button class="add-quantity">+</button>
          	</span>
        </li>
      `;
    }).join('\n');
  };
  
  list.addEventListener('click', function (event){
	  const id = event.target.parentElement.dataset.id;
	  if(event.target.classList.contains('add-quantity')){
		  items[id].quantity++;
		  renderList(items);
	  }
	  
	  if(event.target.classList.contains('reduce-quantity')){
		  items[id].quantity--;
		  renderList(items);
	  }
	  
	  if(event.target.classList.contains('delete')) {
		  delete items[id];
		  renderList(items);
	  }
  });

  addButton.addEventListener('click', function (event) {
	  const text = newTaskEl.value;
	  items[ nextId() ] = { item: text, quantity: 0 };
	  renderList(items);
	  newTaskEl.value = '';
	  addButton.disabled = true;
  });

  newTaskEl.addEventListener('keyup', function (event) {
	  const text = event.target.value;
      addButton.disabled = !text;
  });
  
  newTaskEl.addEventListener('keypress', function(event){
	  if(event.which ==32){
		  event.preventDefault();
		  return false;
	  }
  });
    addButton.disabled = true;
	renderList(items);
})();
