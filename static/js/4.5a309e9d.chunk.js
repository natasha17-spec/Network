(this.webpackJsonpkamasutra=this.webpackJsonpkamasutra||[]).push([[4],{295:function(e,a,t){e.exports={dialogs:"Dialogs_dialogs__3LCdK",dialogsItems:"Dialogs_dialogsItems__2AP60",active:"Dialogs_active__124xO",messages:"Dialogs_messages__2Yt9z",message:"Dialogs_message__3cNqt",dialog:"Dialogs_dialog__3ZV6F"}},300:function(e,a,t){"use strict";t.r(a);var s=t(100),n=t(0),i=t.n(n),l=t(295),o=t.n(l),m=t(12),c=function(e){var a="/dialogs/"+e.id;return i.a.createElement("div",{className:o.a.dialog+" "+o.a.active},i.a.createElement(m.b,{to:a},e.name))},r=function(e){return i.a.createElement("div",{className:o.a.message},e.message)},d=t(26),g=t(90),u=t(132),_=t(64),E=t(25),b=Object(_.a)(50),f=Object(u.a)({form:"AddMessageForm"})((function(e){return i.a.createElement("form",{onSubmit:e.handleSubmit},i.a.createElement("div",null,i.a.createElement(g.a,{component:E.b,validate:[_.b,b],name:"newMessageBody",placeholder:"Enter your message"})),i.a.createElement("div",null,i.a.createElement("button",null,"Send")))})),v=function(e){var a=e.dialogsPage,t=a.dialogsData.map((function(e){return i.a.createElement(c,{name:e.name,key:e.id,id:e.id})})),s=a.messagesData.map((function(e){return i.a.createElement(r,{message:e.message,key:e.id})}));return e.isAuth?i.a.createElement("div",{className:o.a.dialogs},i.a.createElement("div",{className:o.a.dialogsItems},t),i.a.createElement("div",{className:o.a.messages},i.a.createElement("div",null,s),i.a.createElement(f,{onSubmit:function(a){e.sendMessage(a.newMessageBody),a.newMessageBody=""}}))):i.a.createElement(d.a,{to:"/login"})},p=t(11),D=t(98),h=t(8);a.default=Object(h.d)(Object(p.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{sendMessage:function(a){e(Object(s.b)(a))}}})),D.a)(v)}}]);
//# sourceMappingURL=4.5a309e9d.chunk.js.map