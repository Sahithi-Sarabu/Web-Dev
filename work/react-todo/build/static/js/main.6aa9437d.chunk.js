(this["webpackJsonpreact-todo"]=this["webpackJsonpreact-todo"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(6),s=n.n(r),c=(n(13),n(1)),i=(n(14),function(e){return fetch("/tasks/".concat(e),{method:"GET"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}),u=function(e,t){return fetch("/tasks/".concat(t,"/").concat(e),{method:"GET"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},l=function(e,t){return fetch("/tasks/".concat(e,"/").concat(t.taskId),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:t})}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},m=function(e){var t=e.onLogin,n=e.setError,r=Object(a.useState)(""),s=Object(c.a)(r,2),i=s[0],u=s[1];return Object(a.useEffect)((function(){n("")}),[]),o.a.createElement("div",{className:"login"},o.a.createElement("input",{className:"user-name",onChange:function(e){return u(e.target.value)},placeholder:"Enter name"}),o.a.createElement("button",{className:"add-user",onClick:function(){(function(e){return fetch("/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({username:e})}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(i).then((function(e){t(e.data.username)})).catch((function(e){n(e.message)}))}},"Login"))},d=function(e){var t=e.onSend,n=e.userState,r=e.setUserState,s=e.setError,u=e.setTheme,l=Object(a.useState)(""),m=Object(c.a)(l,2),d=m[0],f=m[1];return o.a.createElement("div",{className:"to-send"},o.a.createElement("input",{className:"new-todo",value:d,onChange:function(e){f(e.target.value)},placeholder:"Enter Task Name"}),o.a.createElement("button",{className:"add",onClick:function(e){d&&function(e,t){return fetch("/tasks/".concat(t),{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({task:e})}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}({task:d,done:!1},n.username).then((function(){f(""),i(n.username).then((function(e){t(e.data),s("")}))})).catch((function(e){s(e.message),"no valid session"!==e.message&&"action not permitted"!==e.message||(r({isLoggedIn:!1}),u("light"),s("Login to access"))}));d||s("Message cannot be Empty")}},"Send"))},f=n(7),h=n(4),g=function(e){var t=e.onFilter,n=e.onSort;e.onRefresh;return o.a.createElement("div",{className:"filters"},o.a.createElement("input",{className:"radio",type:"radio",id:"radio",name:"task",onClick:function(e){n(e.target.value)},value:"Sort Ascending Name"}),o.a.createElement("label",{className:"radio"},"Sort Ascending Name"),o.a.createElement("input",{className:"radio",type:"radio",id:"radio",name:"task",onClick:function(e){n(e.target.value)},value:"Sort Descending Name"}),o.a.createElement("label",{className:"radio"},"Sort Descending Name"),o.a.createElement("input",{className:"radio",type:"radio",id:"radio",name:"task",onClick:function(e){n(e.target.value)},value:"Sort By Done"}),o.a.createElement("label",{className:"radio"},"Sort By Done"),o.a.createElement("input",{className:"radio",type:"radio",id:"radio",name:"task",onClick:function(e){n(e.target.value)},value:"Sort By Not Done"}),o.a.createElement("label",{className:"radio"},"Sort By Not Done "),o.a.createElement("label",{className:"filter"},"Show"),o.a.createElement("select",{className:"filter",onChange:function(e){var n=e.target.value;t(n)}},o.a.createElement("option",null,"All"),o.a.createElement("option",null,"Done"),o.a.createElement("option",null,"Not Done")),o.a.createElement("button",{className:"refresh",onClick:function(e){e.target.previousElementSibling.value="All",n(""),t("All")}},"Refresh"))},j=function(e){var t=e.todos,n=e.userState,r=e.setTodos,s=e.setError,m=e.setUserState,d=e.setTheme,j=Object(a.useState)(""),E=Object(c.a)(j,2),v=E[0],b=E[1],k=Object(a.useState)("All"),N=Object(c.a)(k,2),p=N[0],S=N[1],O=Object(a.useState)(""),y=Object(c.a)(O,2),P=y[0],C=y[1],T=function(e){var t=e.target.dataset.id;u(t,n.username).then((function(e){e.data.done=!e.data.done;var t=Object(h.a)({},e.data);l(n.username,t).then((function(){i(n.username).then((function(e){r(Object.values(e.data))}))}))})).catch((function(e){s(e.message),"no valid session"!=e.message&&"action not permitted"!=e.message||(m({isLoggedIn:!1}),d("light"),s("Login to access"))}))},L=function(e){var t=e.target.dataset.id,a=v;u(t,n.username).then((function(e){var t=e.data,o=Object(h.a)({},t,{task:a});l(n.username,o).then((function(){i(n.username).then((function(e){r(Object.values(e.data))}))}))})).catch((function(e){s(e.message),"no valid session"!=e.message&&"action not permitted"!=e.message||(m({isLoggedIn:!1}),d("light"),s("Login to access"))}))},D=function(e){b(e.target.value)},I=function(e){var t,a,o=e.target.dataset.id;(t=n.username,a=o,fetch("/tasks/".concat(t,"/").concat(a),{method:"DELETE"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(){i(n.username).then((function(e){r(Object.values(e.data))}))})).catch((function(e){s(e.message),"no valid session"!=e.message&&"action not permitted"!=e.message||(m({isLoggedIn:!1}),d("light"),s("Login to access"))}))};var w=Object(f.a)(t).sort((function(e,t){if(P)return"Sort Ascending Name"===P?e.task.localeCompare(t.task):"Sort Descending Name"===P?t.task.localeCompare(e.task):"Sort By Done"===P?t.done-e.done:"Sort By Not Done"===P?e.done-t.done:void 0})).filter((function(e){return"Done"===p?1==e.done:"Not Done"!==p||0==e.done})).map((function(e){return o.a.createElement("li",{key:e.taskId},o.a.createElement("div",{className:"task-info"},o.a.createElement("div",{className:"done"},o.a.createElement("button",{className:"done","data-id":e.taskId,onClick:T},e.done?"Done":"Not Done")),o.a.createElement("div",{className:"container"},o.a.createElement("input",{className:"newTask",onChange:D,defaultValue:e.task}),o.a.createElement("button",{className:"update","data-id":e.taskId,onClick:L},"Update")),o.a.createElement("button",{className:"delete","data-id":e.taskId,onClick:I},"Delete")))}));return o.a.createElement("div",{className:"todo-content"},o.a.createElement(g,{onFilter:function(e){S(e)},onSort:function(e){C(e)}}),o.a.createElement("ul",{className:"todos"},w))},E=function(e){var t=e.onLogout,n=e.setError;return o.a.createElement("div",{className:"logout"},o.a.createElement("button",{className:"logout-button",onClick:function(){fetch("/session",{method:"DELETE"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){if(!e.ok)return Promise.reject({error:"Error logging out"})})).then((function(){return t()})).catch((function(e){n(e.error)}))}},"Logout"))},v=o.a.createContext("colorful"),b=function(e){var t=e.userState,n=e.setUserState,r=e.setError,s=Object(a.useState)([]),u=Object(c.a)(s,2),l=u[0],m=u[1],f=Object(a.useContext)(v),h=Object(c.a)(f,2),g=(h[0],h[1]),b=function(){var e;(e=t.username,fetch("/theme/".concat(e),{method:"GET"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(e){var t=e.data.theme;g("light"===t||"dark"===t?t:"colorful")})).catch((function(e){r(e.message),"no valid session"!=e.message&&"action not permitted"!=e.message||(n({isLoggedIn:!1}),g("light"))}))};Object(a.useEffect)((function(){i(t.username).then((function(e){m(Object.values(e.data))})).catch((function(e){r(e.message)})),r(""),b()}),[]);return o.a.createElement("div",{className:"todo"},o.a.createElement("h2",null,"To be Done"),o.a.createElement(E,{onLogout:function(){n({isLoggedIn:!1}),g("light")},setError:r}),o.a.createElement("div",{className:"theme"},o.a.createElement("label",{className:"themes"},"Select Theme "),o.a.createElement("select",{className:"themes",onChange:function(e){var a=e.target.value;g(a),function(e,t){return fetch("/theme/".concat(e),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({theme:t})}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}(t.username,a).catch((function(e){r(e.message),"no valid session"!=e.message&&"action not permitted"!=e.message||(n({isLoggedIn:!1}),g("light"))}))}},o.a.createElement("option",null,"colorful"),o.a.createElement("option",null,"light"),o.a.createElement("option",null,"dark"))),o.a.createElement(d,{onSend:function(e){m(Object.values(e))},userState:t,setUserState:n,setError:r,setTheme:g}),o.a.createElement(j,{todos:l,userState:t,setTodos:m,setError:r,setUserState:n,setTheme:g}))},k=function(){var e=Object(a.useState)({isLoggedIn:!1}),t=Object(c.a)(e,2),n=t[0],r=t[1],s=Object(a.useState)(""),i=Object(c.a)(s,2),u=i[0],l=i[1],d=Object(a.useState)("light"),f=Object(c.a)(d,2),h=f[0],g=f[1];Object(a.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(e){return e.json().then((function(e){return Promise.reject(e.message)}))})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))})).then((function(e){r({isLoggedIn:!0,username:e.data.username})}))}),[]);return o.a.createElement(v.Provider,{value:[h,g]},o.a.createElement("div",{className:h},n.isLoggedIn?o.a.createElement(b,{userState:n,setUserState:r,setError:l}):o.a.createElement(m,{onLogin:function(e){r({isLoggedIn:!0,username:e})},setError:l}),o.a.createElement("p",{className:"status"},u)))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(k,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},8:function(e,t,n){e.exports=n(15)}},[[8,1,2]]]);
//# sourceMappingURL=main.6aa9437d.chunk.js.map