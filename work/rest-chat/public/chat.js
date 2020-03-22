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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/chat.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/chat.js":
/*!*********************!*\
  !*** ./src/chat.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _serviceCalls__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./serviceCalls */ "./src/serviceCalls.js");

var appState = {
  pollId: null,
  isLoggedIn: false,
  messages: {},
  users: {},
  error: ''
};
var page = document.querySelector('.main');

function renderPage() {
  if (!appState.isLoggedIn) {
    renderLogin();
  } else {
    renderChat(appState.messages, appState.users);
  }

  renderErrors(appState.error);
}

function renderChat(messagesList, usersList) {
  page.innerHTML = "\n    <h2>Just Chat</h2>\n      <button class=\"logout-button\">Logout</button> \n      <div class=\"outgoing\">\n          <input class=\"new-message\" placeholder=\"Enter a message\"/><button class=\"add\">Send</button>\n      </div>\n      <div class=\"chat-content\">\n        <ul class=\"users\"></ul>\n        <ul class=\"messages\"></ul>\n      </div>";
  renderMessages(messagesList);
  renderUsers(usersList);
}

function renderUsers(usersList) {
  var userPage = page.querySelector('.users');
  userPage.innerHTML = Object.values(usersList).map(function (user) {
    return "\n        <li>".concat(user, "</li>");
  }).join('');
}

;

function renderMessages(messages) {
  var chat = page.querySelector('.messages');
  chat.innerHTML = Object.values(messages).map(function (message) {
    return "\n        <li>\n        <div class=\"user-info\">\n          <span class=\"user-name\">".concat(message.user, "</span>\n          <span class=\"time\">").concat(message.time, "</span>\n        </div>\n\n        <span class=\"message\">").concat(message.message, "</span>\n        </li>");
  }).join('');
}

;

function renderLogin(show) {
  page.innerHTML = '<div class="login"><input class="user-name" placeholder="Enter your name"/><button class="add-user">Login</button></div>';
}

page.addEventListener('click', function (e) {
  if (e.target.classList.contains('add-user')) {
    var name = e.target.previousElementSibling.value;
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLogin"])(name).then(function (chatInfo) {
      appState.isLoggedIn = true;
      appState.users = chatInfo[0];
      appState.messages = chatInfo[1];
      appState.error = '';
      poll(true);
      renderPage();
    })["catch"](function (err) {
      appState.error = err.error;
      renderPage();
    });
  }

  if (e.target.classList.contains('add')) {
    var messageBody = e.target.previousElementSibling.value;
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchMessage"])(messageBody).then(function (chatInfo) {
      appState.isLoggedIn = true;
      appState.users = chatInfo[0];
      appState.messages = chatInfo[1];
      appState.error = '';
      poll(true);
      renderPage();
    })["catch"](function (err) {
      if (err.error == 'Unauthorized user' || err.error == 'User not allowed') {
        appState.isLoggedIn = false;
        clearTimeout(appState.pollId);
        appState.pollId = null;
      }

      appState.error = err.error;
      renderPage();
    });
  }

  if (e.target.classList.contains('logout-button')) {
    Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLogout"])().then(function () {
      appState.isLoggedIn = false;
      appState.error = '';
      poll(false);
      renderPage();
    })["catch"](function (err) {
      appState.error = err;
      renderPage();
    });
  }
});

function renderErrors(text) {
  document.querySelector('.status').innerHTML = text;
}

function poll(shouldPoll) {
  if (shouldPoll && !appState.pollId) {
    appState.pollId = setInterval(function () {
      Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchChatInfo"])().then(function (chatInfo) {
        appState.users = chatInfo[0];
        appState.messages = chatInfo[1];
        renderPage();
      })["catch"](function (err) {
        if (err.error == 'Unauthorized user' || err.error == 'User not allowed') {
          appState.isLoggedIn = false;
          clearTimeout(appState.pollId);
          appState.pollId = null;
        }

        appState.error = err.error;
        renderPage();
      });
    }, 8000);
  }

  if (!shouldPoll && appState.pollId) {
    clearTimeout(appState.pollId);
    appState.pollId = null;
  }
}

Object(_serviceCalls__WEBPACK_IMPORTED_MODULE_0__["fetchLoginStatus"])().then(function () {
  appState.isLoggedIn = true;
  poll(true);
  renderPage();
})["catch"](function () {
  appState.isLoggedIn = false;
  renderPage();
});

/***/ }),

/***/ "./src/serviceCalls.js":
/*!*****************************!*\
  !*** ./src/serviceCalls.js ***!
  \*****************************/
/*! exports provided: fetchLoginStatus, fetchLogin, fetchMessage, fetchLogout, fetchChatInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLoginStatus", function() { return fetchLoginStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogin", function() { return fetchLogin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchMessage", function() { return fetchMessage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchLogout", function() { return fetchLogout; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fetchChatInfo", function() { return fetchChatInfo; });
var fetchLoginStatus = function fetchLoginStatus() {
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (!response.ok) {
      return Promise.reject({
        error: 'login-invalid'
      });
    }

    return;
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
var fetchMessage = function fetchMessage(message) {
  return fetch('/message', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      message: message
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
var fetchChatInfo = function fetchChatInfo() {
  return fetch('/chat', {
    method: 'GET'
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

/***/ })

/******/ });
//# sourceMappingURL=chat.js.map