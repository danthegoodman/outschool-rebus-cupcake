(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{11:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),u=n(4),o=n.n(u),s=(n(9),n(2)),i=n(0);function a(){var e,t=function(e){var t=Object(c.useState)(null),n=Object(s.a)(t,2),r=n[0],u=n[1],o=Object(c.useState)(void 0),i=Object(s.a)(o,2),a=i[0],j=i[1];return Object(c.useEffect)((function(){fetch(e).then((function(e){return e.json()})).then(j,u)}),[e]),{data:a,error:r}}("/api/rebus"),n=t.data,r=t.error;return r?Object(i.jsxs)("div",{children:["Error: ",null!==(e=r.message)&&void 0!==e?e:r]}):n?Object(i.jsx)(i.Fragment,{children:n.map((function(e){return Object(i.jsx)(j,{rebus:e},e.solution)}))}):Object(i.jsx)("div",{children:"Loading..."})}function j(e){var t=e.rebus,n=function(e){var t=Object(c.useState)(null),n=Object(s.a)(t,2),r=n[0],u=n[1],o=Object(c.useCallback)((function(t){fetch(e,{method:"DELETE",body:JSON.stringify(t)}).then((function(e){return e.json()})).then((function(){}),u)}),[e]);return{error:r,del:o}}("/api/rebus").del;var r=t.puzzle.map((function(e,t){return"text"in e?Object(i.jsx)("span",{children:e.text},t):Object(i.jsx)("img",{src:e.image,alt:e.shortName},t)}));return Object(i.jsxs)("div",{style:{display:"flex",alignItems:"center"},children:[Object(i.jsxs)("p",{className:"rebus",children:[r," = ",t.solution]}),Object(i.jsx)("span",{onClick:function(){n({key:t.key})},style:{color:"red",marginLeft:"20px",cursor:"pointer"},children:"X"})]})}function l(){var e=function(e){var t=Object(c.useState)(null),n=Object(s.a)(t,2),r=n[0],u=n[1],o=Object(c.useState)(void 0),i=Object(s.a)(o,2),a=i[0],j=i[1],l=Object(c.useCallback)((function(t){fetch(e,{method:"POST",body:JSON.stringify(t)}).then((function(e){return e.json()})).then(j,u)}),[e]);return{data:a,error:r,post:l}}("/api/rebus").post,t=Object(c.useState)(""),n=Object(s.a)(t,2),r=n[0],u=n[1],o=Object(c.useState)(""),a=Object(s.a)(o,2),j=a[0],l=a[1];return Object(i.jsxs)("div",{children:[Object(i.jsx)("input",{value:r,onChange:function(e){u(e.currentTarget.value)},placeholder:":teapot::clover:"}),Object(i.jsx)("input",{value:j,onChange:function(e){l(e.currentTarget.value)},placeholder:"Potluck"}),Object(i.jsx)("button",{onClick:function(){e({puzzle:r,solution:j})},children:"Save"})]})}var b=function(){return Object(i.jsxs)("div",{children:[Object(i.jsx)("h1",{children:"Outschool Rebus Puzzles"}),Object(i.jsx)(a,{}),Object(i.jsx)(l,{})]})},d=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,12)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,u=t.getLCP,o=t.getTTFB;n(e),c(e),r(e),u(e),o(e)}))};o.a.render(Object(i.jsx)(r.a.StrictMode,{children:Object(i.jsx)(b,{})}),document.getElementById("root")),d()},9:function(e,t,n){}},[[11,1,2]]]);
//# sourceMappingURL=main.ba11179f.chunk.js.map