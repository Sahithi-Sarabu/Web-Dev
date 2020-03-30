/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/recipe.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/recipe.js":
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _serviceCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serviceCalls */ "./src/serviceCalls.js");

var appState = {
  isLoggedIn: false,
  recipes: [],
  error: ''
};
var page = document.querySelector('.main');

function renderPage() {
  if (!appState.isLoggedIn) {
    renderMain(appState.recipes);
  } else {
    renderMainLoggedIn(appState.recipes);
  }

  renderErrors(appState.error);
}

function renderMainLoggedIn(recipesList) {
  page.innerHTML = "\n    <h2>Tasty Treats</h2>\n      <button class=\"add\">Add New Recipe</button>\n      <button class=\"logout-button\">Logout</button>\n      <div class=\"recipe-list\">\n        <ul class=\"recipes\"></ul>\n      </div>";
  renderRecipes(recipesList);
}

function renderMain(recipesList) {
  page.innerHTML = "\n    <h2>Tasty Treats</h2>\n     <button class=\"login-button\">Login</button>\n     <div class=\"recipe-list\">\n      <ul class=\"recipes\"></ul>\n     </div>";
  renderRecipes(recipesList);
}

function renderRecipes(recipesList) {
  var recipes = page.querySelector('.recipes');
  recipes.innerHTML = recipesList.map(function (recipe) {
    return "\n        <li>\n          <div class=\"recipe-details\">\n            <a class=\"recipe-title\" href=\"/recipes/".concat(recipe.id, "\"  data-id=\"").concat(recipe.id, "\">").concat(recipe.title, "</a>\n            <span class=\"recipe-author\">By ").concat(recipe.author, "</span>\n          </div>\n        </li> ");
  }).join('');
}

function renderRecipeDetails(recipeDetails) {
  var ingredients = recipeDetails.ingredients.split(",");
  page.innerHTML = "\n    <h2>Tasty Treats</h2>\n     <button class=\"home\">Home</button>\n     <div class=\"recipe-indetail\">\n      <label class=\"label-text\">Author: </label>\n      <span class=\"text\">".concat(recipeDetails.author, "</span><br>\n      <label class=\"label-text\">Recipe Name: </label>\n      <span class=\"text\">").concat(recipeDetails.title, "</span><br>\n      <label class=\"label-text\">Ingredients: </label><br>\n      <ul class=\"ingredients-list\"> ") + ingredients.map(function (ingredient) {
    return "<li>".concat(ingredient, "</li>");
  }).join('') + "</ul>\n      <label class=\"label-text\">Directions: </label><br>\n      <div class=\"text\">".concat(recipeDetails.instructions, "</div>\n     </div>");
}

function renderLogin() {
  page.innerHTML = "<div class=\"login\"><input class=\"user-name\" placeholder=\"Enter your name\"/><button class=\"add-user\">Sign in</button></div>";
}

function renderAddRecipe() {
  page.innerHTML = "\n        <h2>Tasty Treats</h2>\n        <button class=\"home\">Home</button>\n        <div class=\"recipe\">\n            <label class=\"label-text\">Title</label><br>\n            <input class=\"title\" placeholder=\"Enter recipe title\"></input><br>\n            <label class=\"label-text\">Ingredients</label><br>\n            <textarea rows=\"3\" cols=\"60\" placeholder=\"Enter ingredients separated by comma\"></textarea><br>\n            <label class=\"label-text\">Directions</label><br>\n            <textarea rows=\"10\" cols=\"60\" placeholder=\"Enter procedure\"></textarea>\n        </div>\n        <button class=\"add-recipe\">Add</button>";
}

page.addEventListener('click', function (e) {
  if (e.target.classList.contains('logout-button')) {
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
      appState.isLoggedIn = false;
      appState.error = '';
      renderPage();
    })["catch"](function (err) {
      appState.error = err;
      renderPage();
    });
  }

  if (e.target.classList.contains('login-button')) {
    renderLogin();
    renderErrors(appState.error);
  }

  if (e.target.classList.contains('add-user')) {
    var name = e.target.previousElementSibling.value;
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLogin"])(name).then(function (recipesList) {
      appState.isLoggedIn = true;
      appState.recipes = recipesList;
      appState.error = '';
      renderPage();
    })["catch"](function (err) {
      appState.error = err.error;
      renderLogin();
      renderErrors(appState.error);
    });
  }

  if (e.target.classList.contains('recipe-title')) {
    e.preventDefault();
    var id = e.target.dataset.id;
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchRecipeDetails"])(id).then(function (recipeDetails) {
      renderRecipeDetails(recipeDetails);
    })["catch"](function (result) {
      appState.error = result.error;

      if (appState.error == 'Logged Out') {
        renderRecipeDetails(result.result);
        appState.isLoggedIn = false;
      } else {
        renderPage();
      }
    });
  }

  if (e.target.classList.contains('home')) {
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchRecipes"])().then(function (recipesList) {
      appState.recipes = recipesList;
      appState.error = '';
      renderPage();
    })["catch"](function (err) {
      appState.error = err.error;
      renderPage();
    });
  }

  if (e.target.classList.contains('add')) {
    renderAddRecipe();
  }

  if (e.target.classList.contains('add-recipe')) {
    var title = e.target.previousElementSibling.children[2].value;
    var ingredients = e.target.previousElementSibling.children[6].value;
    var procedure = e.target.previousElementSibling.children[10].value;
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchAddRecipeDetails"])(title, ingredients, procedure).then(function (result) {
      /*appState.recipes = result.result;
      appState.error = result.error;
      renderPage();*/
      appState.error = result.error;
      renderRecipeDetails(result.result);
      renderErrors(appState.error);
    })["catch"](function (result) {
      appState.error = result.error;

      if (appState.error == 'Login to add recipe') {
        appState.isLoggedIn = false;
        appState.recipes = result.result;
        renderPage();
      } else {
        renderAddRecipe();
        renderErrors(appState.error);
      }
    });
  }
});

function renderErrors(text) {
  document.querySelector('.status').innerHTML = text;
}

Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function (recipesList) {
  appState.recipes = recipesList;
  appState.isLoggedIn = true;
  appState.error = '';
  renderPage();
})["catch"](function (recipeList) {
  appState.isLoggedIn = false;
  appState.recipes = recipeList;
  renderPage();
});

/***/ }),

/***/ "./src/serviceCalls.js":
/*!*****************************!*\
  !*** ./src/serviceCalls.js ***!
  \*****************************/
/*! exports provided: fetchLoginStatus, fetchLogin, fetchLogout, fetchRecipeDetails, fetchRecipes, fetchAddRecipeDetails */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipeDetails", function() { return fetchRecipeDetails; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchRecipes", function() { return fetchRecipes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchAddRecipeDetails", function() { return fetchAddRecipeDetails; });
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (recipeList) {
        return Promise.reject(recipeList);
      });
    }

    return response.json();
  });
};
var fetchLogin = function fetchLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchLogout = function fetchLogout() {
  return fetch('/session', {
    method: 'DELETE'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        error: 'Error logging out'
      });
    }

    return;
  });
};
var fetchRecipeDetails = function fetchRecipeDetails(recipeId) {
  return fetch("/recipeDetails/".concat(recipeId), {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'Network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};
var fetchRecipes = function fetchRecipes() {
  return fetch('/recipes', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'Network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (err) {
        return Promise.reject(err);
      });
    }

    return response.json();
  });
};
var fetchAddRecipeDetails = function fetchAddRecipeDetails(title, ingredients, procedure) {
  return fetch('/recipes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      title: title,
      ingredients: ingredients,
      procedure: procedure
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'Network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return response.json().then(function (result) {
        return Promise.reject(result);
      });
    }

    return response.json();
  });
};

/***/ })

/******/ });
//# sourceMappingURL=recipe.js.map