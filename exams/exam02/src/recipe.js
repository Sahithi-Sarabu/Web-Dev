import {
    fetchLoginStatus,
    fetchRecipeDetails,
    fetchRecipes,
    fetchLogin,
    fetchLogout,
    fetchAddRecipeDetails,
} from './serviceCalls';

const appState = {
    isLoggedIn : false,
    recipes: [],
    error: '',
};

const page = document.querySelector('.main');

function renderPage() {
    if(!appState.isLoggedIn)  {
      renderMain(appState.recipes);
    } else {
      renderMainLoggedIn(appState.recipes);
    }
    renderErrors(appState.error);
}

function renderMainLoggedIn(recipesList) {
    page.innerHTML = `
    <h2>Tasty Treats</h2>
      <button class="add">Add New Recipe</button>
      <button class="logout-button">Logout</button>
      <div class="recipe-list">
        <ul class="recipes"></ul>
      </div>`
      renderRecipes(recipesList);
}

function renderMain(recipesList) {
    page.innerHTML = `
    <h2>Tasty Treats</h2>
     <button class="login-button">Login</button>
     <div class="recipe-list">
      <ul class="recipes"></ul>
     </div>`
     renderRecipes(recipesList);
}

function renderRecipes( recipesList) {
    const recipes = page.querySelector('.recipes');
    recipes.innerHTML = recipesList.map( (recipe) =>{
        return `
        <li>
          <div class="recipe-details">
            <a class="recipe-title" href="/recipes/${recipe.id}"  data-id="${recipe.id}">${recipe.title}</a>
            <span class="recipe-author">By ${recipe.author}</span>
          </div>
        </li> `;
    }).join('');
}

function renderRecipeDetails(recipeDetails) {
    let ingredients = recipeDetails.ingredients.split(",");
    page.innerHTML = `
    <h2>Tasty Treats</h2>
     <button class="home">Home</button>
     <div class="recipe-indetail">
      <label class="label-text">Author: </label>
      <span class="text">${recipeDetails.author}</span><br>
      <label class="label-text">Recipe Name: </label>
      <span class="text">${recipeDetails.title}</span><br>
      <label class="label-text">Ingredients: </label><br>
      <ul class="ingredients-list"> ` + ingredients.map( (ingredient) => {
          return `<li>${ingredient}</li>`
      }).join('') + `</ul>
      <label class="label-text">Directions: </label><br>
      <div class="text">${recipeDetails.instructions}</div>
     </div>`
}

function renderLogin(){
    page.innerHTML = `<div class="login"><input class="user-name" placeholder="Enter your name"/><button class="add-user">Sign in</button></div>`;
}

function renderAddRecipe(){
    page.innerHTML = `
        <h2>Tasty Treats</h2>
        <button class="home">Home</button>
        <div class="recipe">
            <label class="label-text">Title</label><br>
            <input class="title" placeholder="Enter recipe title"></input><br>
            <label class="label-text">Ingredients</label><br>
            <textarea rows="3" cols="60" placeholder="Enter ingredients separated by comma"></textarea><br>
            <label class="label-text">Directions</label><br>
            <textarea rows="10" cols="60" placeholder="Enter procedure"></textarea>
        </div>
        <button class="add-recipe">Add</button>`
}

page.addEventListener('click', (e) => {
    if(e.target.classList.contains('logout-button')){
        fetchLogout()
        .then( () =>{
            appState.isLoggedIn = false;
            appState.error = '';
            renderPage();
        })
        .catch( err => {
            appState.error = err;
            renderPage();
        })
    }

    if(e.target.classList.contains('login-button')){
        renderLogin();
        renderErrors(appState.error);
    }

    if(e.target.classList.contains('add-user')){
        const name = e.target.previousElementSibling.value;
        fetchLogin(name)
        .then( recipesList => {
            appState.isLoggedIn = true;
            appState.recipes = recipesList;
            appState.error = '';
            renderPage();
        })
        .catch( err => {
            appState.error = err.error;
            renderLogin();
            renderErrors(appState.error);
        });
    }

    if(e.target.classList.contains('recipe-title')){
        e.preventDefault();
        const id = e.target.dataset.id;
        fetchRecipeDetails(id)
        .then( recipeDetails => {
            renderRecipeDetails(recipeDetails);
            renderErrors('');
        })
        .catch( result =>{
            appState.error = result.error;
            if(appState.error == 'Logged Out'){
                renderRecipeDetails(result.result);
                appState.isLoggedIn = false;
            }else{
                renderPage();
            }
        })
    }

    if(e.target.classList.contains('home')){
        fetchRecipes()
        .then( recipesList => {
            appState.recipes = recipesList;
            appState.error = '';
            renderPage();
        })
        .catch(err =>{
            appState.error = err.error;
            renderPage();
        })
    }

    if(e.target.classList.contains('add')){
        renderAddRecipe();
    }

    if(e.target.classList.contains('add-recipe')){
        const title = e.target.previousElementSibling.children[2].value;
        const ingredients = e.target.previousElementSibling.children[6].value;
        const procedure = e.target.previousElementSibling.children[10].value;
        fetchAddRecipeDetails(title, ingredients, procedure)
        .then( result => {
            /*appState.recipes = result.result;
            appState.error = result.error;
            renderPage();*/
            appState.error = result.error;
            renderRecipeDetails(result.result);
            renderErrors(appState.error);
        })
        .catch(result =>{
            appState.error = result.error;
            if(appState.error == 'Login to add recipe'){
                appState.isLoggedIn = false;
                appState.recipes = result.result;
                renderPage();
            }else{
                renderAddRecipe();
                renderErrors(appState.error);
            }
        })
    }
})

function renderErrors(text ){
    document.querySelector('.status').innerHTML = text;
}

fetchLoginStatus()
.then( recipesList => {
    appState.recipes = recipesList;
    appState.isLoggedIn = true;
    appState.error = '';
    renderPage();
})
.catch( recipeList => {
    appState.isLoggedIn = false;
    appState.recipes = recipeList
    renderPage();
});