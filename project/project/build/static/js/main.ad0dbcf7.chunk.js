(this.webpackJsonpproject=this.webpackJsonpproject||[]).push([[0],[,,,,function(e,t,a){e.exports=a(11)},,,,,function(e,t,a){},function(e,t,a){},function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),s=a(3),o=a.n(s),l=(a(9),a(1)),c=(a(10),function(e){return fetch("/tweet/".concat(e),{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}),i=function(e){return fetch("/userTweet/".concat(e),{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},u=function(e){return fetch("/tweetInfo/".concat(e),{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},g=function(){return fetch("/allTweets",{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},m=function(e){return fetch("/tweet/".concat(e),{method:"PUT"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){if(!e.ok)return e.json().then((function(e){return Promise.reject(e)}))}))},P=function(e){return fetch("/profileDetails/".concat(e),{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))},f=function(e){return fetch("/tweet/".concat(e),{method:"DELETE"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){if(!e.ok)return Promise.reject({error:"Cannot delete Tweet"})}))},h=function(e){var t=e.setHomePage,a=e.setExplorePage,r=e.setProfilePage,s=e.setOtherUserPage,o=e.setTweetDetailsPage;return n.a.createElement("button",{className:"button",onClick:function(){a(!0),t(!1),r(!1),s({isOtherPage:!1}),o({isTweetDetailsPage:!1})}},n.a.createElement("img",{src:"/explore.png",alt:"avatar",className:"image"}),"Explore")},E=function(e){var t=e.setHomePage,a=e.setExplorePage,r=e.setProfilePage,s=e.setOtherUserPage,o=e.setTweetDetailsPage;return n.a.createElement("button",{className:"button",onClick:function(){t(!0),r(!1),a(!1),s({isOtherPage:!1}),o({isTweetDetailsPage:!1})}},n.a.createElement("img",{src:"/home.png",alt:"avatar",className:"image"}),"Home")},d=function(e){var t=e.setHomePage,a=e.setExplorePage,r=e.setProfilePage,s=e.setOtherUserPage,o=e.setTweetDetailsPage;return n.a.createElement("button",{className:"button",onClick:function(){r(!0),t(!1),a(!1),s({isOtherPage:!1}),o({isTweetDetailsPage:!1})}},n.a.createElement("img",{src:"/avatar.png",alt:"avatar",className:"image"}),"Profile")},w=function(e){var t=e.onLogout,a=e.setError;return n.a.createElement("button",{className:"button",onClick:function(){fetch("/session",{method:"DELETE"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){if(!e.ok)return Promise.reject({error:"Error logging out"})})).then((function(){return t()})).catch((function(e){console.log(e.error),a(e.error)}))}},"Logout")},p=function(e){var t=e.setUserState,a=e.setError,r=e.setHomePage,s=e.setProfilePage,o=e.setExplorePage,l=e.setOtherUserPage,c=e.setTweetDetailsPage;return n.a.createElement("div",null,n.a.createElement("ul",null,n.a.createElement("li",null,n.a.createElement(E,{setHomePage:r,setExplorePage:o,setProfilePage:s,setOtherUserPage:l,setTweetDetailsPage:c})),n.a.createElement("li",null,n.a.createElement(h,{setHomePage:r,setExplorePage:o,setProfilePage:s,setOtherUserPage:l,setTweetDetailsPage:c})),n.a.createElement("li",null,n.a.createElement(d,{setHomePage:r,setExplorePage:o,setProfilePage:s,setOtherUserPage:l,setTweetDetailsPage:c})),n.a.createElement("li",null,n.a.createElement(w,{onLogout:function(){t({isLoggedIn:!1}),r(!1),s(!1),o(!1),l({isOtherPage:!1}),c({isTweetDetailsPage:!1})},setError:a}))))},v=function(e){var t=e.isProfilePage,a=e.setUserState,r=e.setTweetDetailsPage,s=e.otherUserPage,o=e.isExplorePage,l=e.userState,u=e.tweets,P=e.setAllTweets,h=e.setError,E=e.setHomePage,d=e.setProfilePage,w=e.setExplorePage,p=e.setOtherUserPage,v=function(e){m(e.target.dataset.id).then((function(){o?g().then((function(e){P(e)})):s.isOtherPage?i(s.otherUser).then((function(e){P(e)})):t?i(l.id).then((function(e){P(e)})):c(l.id).then((function(e){P(e)}))})).catch((function(e){h(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(a({isLoggedIn:!1}),E(!1),w(!1),d(!1),p({isOtherPage:!1}),r({isTweetDetailsPage:!1}))}))},O=function(e){f(e.target.dataset.id).then((function(){o?g().then((function(e){P(e)})):s.isOtherPage?i(s.otherUser).then((function(e){P(e)})):t?i(l.id).then((function(e){P(e)})):c(l.id).then((function(e){P(e)}))})).catch((function(e){h(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(a({isLoggedIn:!1}),E(!1),w(!1),d(!1),p({isOtherPage:!1}),r({isTweetDetailsPage:!1}))}))},N=function(e){var t=e.target.dataset.id;t==l.id?(d(!0),p({isOtherPage:!1})):(p({isOtherPage:!0,otherUser:t}),d(!1)),E(!1),w(!1),r({isTweetDetailsPage:!1})},U=function(e){e.preventDefault();var t=e.target.dataset.id;"name"!=e.target.className&&"time"!=e.target.className&&"likes"!=e.target.className&&"delete"!=e.target.className&&"count"!=e.target.className&&"avatar-display"!=e.target.className&&(r({isTweetDetailsPage:!0,tweetId:t}),E(!1),w(!1),d(!1),p({isOtherPage:!1}))},j=Object.values(u).map((function(e){if(e)return n.a.createElement("li",{key:e.time+e.user,className:"tweet-display"},n.a.createElement("a",{href:e.tweetId,onClick:U,"data-id":e.tweetId,className:"main-header"},n.a.createElement("div",{className:"tweet-info","data-id":e.tweetId},n.a.createElement("div",{className:"tweet-data","data-id":e.tweetId},n.a.createElement("div",{className:"user-info","data-id":e.tweetId},n.a.createElement("img",{src:"/profile.png",alt:"avatar",className:"avatar-display","data-id":e.userId,onClick:N}),n.a.createElement("span",{className:"name","data-id":e.userId,onClick:N},e.user),n.a.createElement("span",{className:"time"},function(e){var t=(Date.now()-e)/1e3;if(t<60)return Math.floor(t)+"s";if(t>=60&&t<3600)return Math.floor(t/60)+"min";if(t>=3600&&t<86400)return Math.floor(t/3600)+"h";if(t>=86400&&t<31536e3){var a=new Date(e);return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]+" "+a.getDate()}var r=new Date(e);return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+" "+r.getFullYear()}(e.time))),n.a.createElement("p",{className:"tweet","data-id":e.tweetId},e.tweet)),n.a.createElement("div",{className:"comments"},n.a.createElement("div",{className:"like"},n.a.createElement("button",{className:"likes",onClick:v,"data-id":e.tweetId}),n.a.createElement("label",{className:"count"},e.likes)),function(e){if(e.userId==l.id)return n.a.createElement("button",{className:"delete",onClick:O,"data-id":e.tweetId})}(e)))))}));return n.a.createElement("div",{className:"tweet-panel"},n.a.createElement("ul",{className:"tweets"},j))},O=function(e){var t=e.isProfilePage,a=e.setTweetDetailsPage,s=e.otherUserPage,o=e.isExplorePage,i=e.userState,u=e.setUserState,g=e.setError,m=e.setHomePage,P=e.setProfilePage,f=e.setExplorePage,h=e.setOtherUserPage,E=Object(r.useState)(""),d=Object(l.a)(E,2),w=d[0],O=d[1],N=Object(r.useState)([]),U=Object(l.a)(N,2),j=U[0],b=U[1];return Object(r.useEffect)((function(){var e=setInterval((function(){c(i.id).then((function(e){b(e),g("")})).catch((function(e){g(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(u({isLoggedIn:!1}),m(!1),f(!1),P(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))}),2500);return g(""),function(){clearInterval(e)}}),[]),n.a.createElement("div",{className:"home-page"},n.a.createElement("div",{className:"options"},n.a.createElement(p,{setUserState:u,setError:g,setHomePage:m,setProfilePage:P,setExplorePage:f,setOtherUserPage:h,setTweetDetailsPage:a})),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"input-container"},n.a.createElement("img",{src:"/profile.png",alt:"avatar",className:"avatar"}),n.a.createElement("textarea",{className:"input",placeholder:"What's happening?",onChange:function(e){O(e.target.value)},value:w,maxLength:"250"}),n.a.createElement("br",null),n.a.createElement("button",{className:"submit",onClick:function(){w&&function(e){return fetch("/tweet",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({tweet:e})}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))}(w).then((function(e){b(e),O(""),g("")})).catch((function(e){g(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(u({isLoggedIn:!1}),m(!1),f(!1),P(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))},disabled:!w},"Zweet")),n.a.createElement(v,{isProfilePage:t,setUserState:u,setTweetDetailsPage:a,otherUserPage:s,isExplorePage:o,userState:i,tweets:j,setAllTweets:b,setError:g,setHomePage:m,setProfilePage:P,setExplorePage:f,setOtherUserPage:h})))},N=function(e){var t=e.onLogin,a=e.setError,s=Object(r.useState)(""),o=Object(l.a)(s,2),c=o[0],i=o[1];return Object(r.useEffect)((function(){a("")}),[]),n.a.createElement("div",{className:"login"},n.a.createElement("img",{src:"/header.png",alt:"logo",className:"header"}),n.a.createElement("h2",{className:"title"},"Log in to Zwitter"),n.a.createElement("input",{className:"user-name",onChange:function(e){return i(e.target.value)},placeholder:"Enter name"}),n.a.createElement("br",null),n.a.createElement("button",{className:"add-user",onClick:function(){(function(e){return fetch("/session",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:e})}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))})(c).then((function(e){t(e)})).catch((function(e){a(e.error)}))}},"Log in"))},U=function(e){var t=e.isProfilePage,a=e.setTweetDetailsPage,s=e.otherUserPage,o=e.isExplorePage,c=e.userState,u=e.setUserState,g=e.setError,m=e.setHomePage,f=e.setProfilePage,h=e.setExplorePage,E=e.setOtherUserPage,d=Object(r.useState)([]),w=Object(l.a)(d,2),O=w[0],N=w[1],U=Object(r.useState)([]),j=Object(l.a)(U,2),b=j[0],S=j[1];return Object(r.useEffect)((function(){var e=setInterval((function(){P(c.id).then((function(e){N(e),i(c.id).then((function(e){S(e)}))})).catch((function(e){g(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(u({isLoggedIn:!1}),m(!1),h(!1),f(!1),E({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))}),2500);return g(""),function(){clearInterval(e)}}),[]),n.a.createElement("div",{className:"home-page"},n.a.createElement("div",{className:"options"},n.a.createElement(p,{setUserState:u,setError:g,setHomePage:m,setProfilePage:f,setExplorePage:h,setOtherUserPage:E,setTweetDetailsPage:a})),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"profile-info"},n.a.createElement("img",{src:"/profile.png",alt:"avatar",className:"avatar"}),n.a.createElement("span",{className:"name"},O.name),n.a.createElement("br",null),n.a.createElement("span",{className:"follow"},O.following&&O.following.length?O.following.length:0),n.a.createElement("label",{className:"text"},"Following"),n.a.createElement("span",{className:"follow"},O.followers&&O.followers.length?O.followers.length:0),n.a.createElement("label",null,"Followers")),n.a.createElement("div",null,n.a.createElement(v,{isProfilePage:t,setUserState:u,setTweetDetailsPage:a,otherUserPage:s,isExplorePage:o,userState:c,tweets:b,setAllTweets:S,setError:g,setHomePage:m,setProfilePage:f,setExplorePage:h,setOtherUserPage:E}))))},j=function(e){var t=e.isProfilePage,a=e.setTweetDetailsPage,s=e.otherUserPage,o=e.isExplorePage,c=e.userState,i=e.setUserState,u=e.setError,m=e.setHomePage,P=e.setProfilePage,f=e.setExplorePage,h=e.setOtherUserPage,E=Object(r.useState)([]),d=Object(l.a)(E,2),w=d[0],O=d[1];return Object(r.useEffect)((function(){var e=setInterval((function(){g().then((function(e){O(e)})).catch((function(e){u(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(i({isLoggedIn:!1}),m(!1),f(!1),P(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))}),2500);return u(""),function(){clearInterval(e)}}),[]),n.a.createElement("div",{className:"home-page"},n.a.createElement("div",{className:"options"},n.a.createElement(p,{setUserState:i,setError:u,setHomePage:m,setProfilePage:P,setExplorePage:f,setOtherUserPage:h,setTweetDetailsPage:a})),n.a.createElement("div",{className:"container"},n.a.createElement(v,{isProfilePage:t,setUserState:i,setTweetDetailsPage:a,otherUserPage:s,isExplorePage:o,userState:c,tweets:w,setAllTweets:O,setError:u,setHomePage:m,setProfilePage:P,setExplorePage:f,setOtherUserPage:h})))},b=function(e){var t=e.tweetDetailsPage,a=e.setTweetDetailsPage,s=e.userState,o=e.setUserState,c=e.setError,i=e.setHomePage,g=e.setProfilePage,P=e.setExplorePage,h=e.setOtherUserPage,E=Object(r.useState)([]),d=Object(l.a)(E,2),w=d[0],v=d[1],O=function(e){f(e.target.dataset.id).then((function(){g(!0),P(!1),i(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1})})).catch((function(e){c(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(o({isLoggedIn:!1}),i(!1),P(!1),g(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))},N=function(e){var t=e.target.dataset.id;t==s.id?(g(!0),h({isOtherPage:!1})):(h({isOtherPage:!0,otherUser:t}),g(!1)),i(!1),P(!1),a({isTweetDetailsPage:!1})};return Object(r.useEffect)((function(){u(t.tweetId).then((function(e){v(e)})).catch((function(e){c(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(o({isLoggedIn:!1}),i(!1),P(!1),g(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))})),c("")}),[]),n.a.createElement("div",{className:"home-page"},n.a.createElement("div",{className:"options"},n.a.createElement(p,{setUserState:o,setError:c,setHomePage:i,setProfilePage:g,setExplorePage:P,setOtherUserPage:h,setTweetDetailsPage:a})),n.a.createElement("div",{className:"tweet-container"},n.a.createElement("div",{className:"tweet-data"},n.a.createElement("div",{className:"user-info"},n.a.createElement("img",{src:"/profile.png",alt:"avatar",className:"avatar-display","data-id":w.userId,onClick:N}),n.a.createElement("span",{className:"name","data-id":w.userId,onClick:N},w.user),n.a.createElement("span",{className:"time"},function(e){var t=(Date.now()-e)/1e3;if(t<60)return Math.floor(t)+"s";if(t>=60&&t<3600)return Math.floor(t/60)+"min";if(t>=3600&&t<86400)return Math.floor(t/3600)+"h";if(t>=86400&&t<31536e3){var a=new Date(e);return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][a.getMonth()]+" "+a.getDate()}var r=new Date(e);return["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][r.getMonth()]+" "+r.getDate()+" "+r.getFullYear()}(w.time))),n.a.createElement("p",{className:"tweet"},w.tweet)),n.a.createElement("div",{className:"meta-info"},n.a.createElement("span",{className:"follow"},w.likes),n.a.createElement("label",{className:"text"},"Likes")),n.a.createElement("div",{className:"comments"},n.a.createElement("div",{className:"like"},n.a.createElement("button",{className:"likes",onClick:function(e){m(e.target.dataset.id).then((function(){u(t.tweetId).then((function(e){v(e)}))})).catch((function(e){c(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(o({isLoggedIn:!1}),i(!1),P(!1),g(!1),h({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))},"data-id":w.tweetId}),n.a.createElement("label",{className:"count"},w.likes)),function(e){if(e.userId==s.id)return n.a.createElement("button",{className:"delete",onClick:O,"data-id":e.tweetId})}(w))))},S=function(e){var t=e.isProfilePage,a=e.setTweetDetailsPage,s=e.isExplorePage,o=e.otherUserPage,c=e.userState,u=e.setUserState,g=e.setError,m=e.setHomePage,f=e.setProfilePage,h=e.setExplorePage,E=e.setOtherUserPage,d=Object(r.useState)([]),w=Object(l.a)(d,2),O=w[0],N=w[1],U=Object(r.useState)([]),j=Object(l.a)(U,2),b=j[0],S=j[1];return Object(r.useEffect)((function(){var e=setInterval((function(){P(o.otherUser).then((function(e){N(e),i(o.otherUser).then((function(e){S(e)}))})).catch((function(e){g(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(u({isLoggedIn:!1}),m(!1),h(!1),f(!1),E({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))}),2500);return g(""),function(){clearInterval(e)}}),[]),n.a.createElement("div",{className:"home-page"},n.a.createElement("div",{className:"options"},n.a.createElement(p,{setUserState:u,setError:g,setHomePage:m,setProfilePage:f,setExplorePage:h,setOtherUserPage:E,setTweetDetailsPage:a})),n.a.createElement("div",{className:"container"},n.a.createElement("div",{className:"profile-info"},n.a.createElement("img",{src:"/profile.png",alt:"avatar",className:"avatar"}),n.a.createElement("span",{className:"name"},O.name),n.a.createElement("br",null),n.a.createElement("span",{className:"follow","data-id":O.id},O.following&&O.following.length?O.following.length:0),n.a.createElement("label",{className:"text","data-id":O.id},"Following"),n.a.createElement("span",{className:"follow"},O.followers&&O.followers.length?O.followers.length:0),n.a.createElement("label",{"data-id":O.id},"Followers"),n.a.createElement("button",{className:"to-follow",onClick:function(){var e;(e=o.otherUser,fetch("/tweet",{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({otherUser:e})}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():e.json().then((function(e){return Promise.reject(e)}))}))).then((function(e){N(e),i(o.otherUser).then((function(e){S(e)}))})).catch((function(e){g(e.error),"Unauthorized user"!==e.error&&"User not allowed"!==e.error||(u({isLoggedIn:!1}),m(!1),h(!1),f(!1),E({isOtherPage:!1}),a({isTweetDetailsPage:!1}))}))}}," ",O.followers&&O.followers.includes(c.id)?"Following":"Follow")),n.a.createElement("div",null,n.a.createElement(v,{isProfilePage:t,setUserState:u,setTweetDetailsPage:a,otherUserPage:o,isExplorePage:s,userState:c,tweets:b,setAllTweets:S,setError:g,setHomePage:m,setProfilePage:f,setExplorePage:h,setOtherUserPage:E}))))};var T=function(){var e=Object(r.useState)({isLoggedIn:!1}),t=Object(l.a)(e,2),a=t[0],s=t[1],o=Object(r.useState)(""),c=Object(l.a)(o,2),i=c[0],u=c[1],g=Object(r.useState)(!1),m=Object(l.a)(g,2),P=m[0],f=m[1],h=Object(r.useState)(!1),E=Object(l.a)(h,2),d=E[0],w=E[1],p=Object(r.useState)(!1),v=Object(l.a)(p,2),T=v[0],D=v[1],x=Object(r.useState)({isOtherPage:!1}),I=Object(l.a)(x,2),k=I[0],C=I[1],H=Object(r.useState)({isTweetDetailsPage:!1}),L=Object(l.a)(H,2),y=L[0],A=L[1];return Object(r.useEffect)((function(){fetch("/session",{method:"GET"}).catch((function(){return Promise.reject({error:"Cannot connect to Server"})})).then((function(e){return e.ok?e.json():Promise.reject({error:"login-invalid"})})).then((function(e){s({isLoggedIn:!0,username:e.name,id:e.id}),f(!0)}))}),[]),d?n.a.createElement("div",{className:"App"},n.a.createElement(U,{isProfilePage:d,setTweetDetailsPage:A,otherUserPage:k,isExplorePage:T,userState:a,setUserState:s,setError:u,setHomePage:f,setProfilePage:w,setExplorePage:D,setOtherUserPage:C}),n.a.createElement("p",{className:"status"},i)):T?n.a.createElement("div",{className:"App"},n.a.createElement(j,{isProfilePage:d,setTweetDetailsPage:A,otherUserPage:k,isExplorePage:T,userState:a,setUserState:s,setError:u,setHomePage:f,setProfilePage:w,setExplorePage:D,setOtherUserPage:C}),n.a.createElement("p",{className:"status"},i)):P?n.a.createElement("div",{className:"App"},n.a.createElement(O,{isProfilePage:d,setTweetDetailsPage:A,otherUserPage:k,isExplorePage:T,userState:a,setUserState:s,setError:u,setHomePage:f,setProfilePage:w,setExplorePage:D,setOtherUserPage:C}),n.a.createElement("p",{className:"status"},i)):k.isOtherPage?n.a.createElement("div",{className:"App"},n.a.createElement(S,{isProfilePage:d,setTweetDetailsPage:A,isExplorePage:T,otherUserPage:k,userState:a,setUserState:s,setError:u,setHomePage:f,setProfilePage:w,setExplorePage:D,setOtherUserPage:C}),n.a.createElement("p",{className:"status"},i)):y.isTweetDetailsPage?n.a.createElement("div",{className:"App"},n.a.createElement(b,{tweetDetailsPage:y,setTweetDetailsPage:A,userState:a,setUserState:s,setError:u,setHomePage:f,setProfilePage:w,setExplorePage:D,setOtherUserPage:C}),n.a.createElement("p",{className:"status"},i)):n.a.createElement("div",{className:"App"},n.a.createElement(N,{onLogin:function(e){s({isLoggedIn:!0,username:e.name,id:e.id}),f(!0)},setError:u}),n.a.createElement("p",{className:"status"},i))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.ad0dbcf7.chunk.js.map