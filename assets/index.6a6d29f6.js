var e=Object.defineProperty,t=Object.defineProperties,a=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,o=Object.prototype.propertyIsEnumerable,s=(t,a,l)=>a in t?e(t,a,{enumerable:!0,configurable:!0,writable:!0,value:l}):t[a]=l;"undefined"!=typeof require&&require;import{c as r,r as i,d as u,k as c,n as d,a as p,b as m,S as f,C as h,z as b,R as y,F as g,M as v,e as _,f as w,W as I,m as k,i as L,u as T,l as P,D as S,B as O,g as E,h as R,w as j,j as x,v as K,T as A,o as M,L as C,p as D,q as N,s as U,A as V,U as q,t as z,K as J,x as F,y as B,E as W,G as H,H as $,I as X,J as Z,N as G}from"./vendor.0429b4fb.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const a of e)if("childList"===a.type)for(const e of a.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),"use-credentials"===e.crossorigin?t.credentials="include":"anonymous"===e.crossorigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const Q="/favicon.ico",Y="__your_service_id_userInfo__",ee="cloud_wms_tab",te={loginStatus:0,token:"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiIxaXMzcXkiLCJjcmVhdGVkIjoxNjIyNjkwMjY4NzAxLCJleHAiOjE2MjMyOTUwNjgsImRldmljZUlkIjpudWxsfQ.9q2_cEHXQez4RWUUigq27yMDKXlEEZ3M1TK7ovFj7KMEXgmwXOF8SArdDy_pZ0qdQN2Sm6dS6oMq3wTLJBUjcw",userInfo:{birthday:1184515200,country:"",gender:0,city:"",isTagInfo:1,upgradePlayerTime:1583811692,type:1,lastLoginIp:"183.129.240.242",userLevel:9,province:"",userPlayerLevel:2,shopId:124208,unionId:"orZa31B1CCSxRF4DewEAu-A4ZFtc",uname:"微信用户",level:9,isLoginCustomerServiceUser:1,iosBind:!1,isExistenceCustomerServiceUser:1,isAuctionStatus:!1,secKillStatus:1,avatar:"https://cdn.wanwudezhi.com/mall-portal/image/0302685194",userId:15772129,lastLoginTime:1622690268,userLevelName:"V9,传奇",phone:"182******70",unick:"膨小鱼🐠",userBind:!1,status:1}},ae=(e,t)=>{e.token=t},le=(e,t)=>{e.userInfo=t,localStorage.setItem(Y,JSON.stringify(t))},ne=e=>{ae(e,""),le(e,{}),window.localStorage.removeItem(Y)},oe={clearLoginStatus:ne,logout(e){ne(e)},setToken:ae,setUserInfo:le},se={getUserInfo(e){if(!e.userInfo||!e.userInfo.userId){const t=localStorage.getItem(Y)||"";oe.setUserInfo(e,t?JSON.parse(t):{})}return e.userInfo},getToken:e=>(e.token,e.token)};var re={namespaced:!0,state:{userInfo:{},token:null},mutations:oe,actions:{async login({state:e,commit:t}){if(e.token)return Promise.resolve(e.userInfo);const a=te,{token:l,userInfo:n}=a;return t("setToken",`Wwdz ${l}`),t("setUserInfo",n),Promise.resolve(n)}},getters:se};const ie=["localStorage","sessionStorage"];const ue=function(e){if(!ie.includes(e))throw new Error(`Invalid webStorage, expect oneOf ${ie.join(",")}, but got ${e}`);const t=window[e];return{set:(e,a)=>{const l=JSON.stringify(a);t.setItem(e,l)},get:e=>{let a=t.getItem(e);return"string"==typeof a&&(a=JSON.parse(a)),a},rm:e=>{t.removeItem(e)}}}("sessionStorage"),ce={addTab(e,t){const{isFirstMounted:a,hideTab:l,fullPath:n}=t,o=ue.get(ee);if(a&&Array.isArray(o))return void(e.tabList=o);const s=e.tabList.find((e=>e.fullPath===n));l||s||(e.tabList.push(t),!a&&ue.set(ee,e.tabList))},closeCurTab(e,t){e.tabList.splice(t,1),ue.set(ee,e.tabList)},closeLeftTab(e,t){1!==e.tabList.length&&0!==t&&(e.tabList.splice(0,t),ue.set(ee,e.tabList))},closeRightTab(e,t){const a=e.tabList.length;1!==a&&t!==a-1&&(e.tabList.splice(t+1,a-t-1),ue.set(ee,e.tabList))},closeOtherTab(e,t){ce.closeRightTab(e,t),ce.closeLeftTab(e,t)}};var de=r({modules:{user:re,tabs:{namespaced:!0,state:{tabList:[]},mutations:ce,actions:{},getters:{tabList:e=>e.tabList}}}}),pe=i(!1);const me=()=>p("section",null,[p("p",null,[m("1. 确认阅读README.md，几乎所有疑问都可在此查阅")]),p("p",null,[m("2. const、enum规范是个比较好的建议")]),p("p",null,[m("3. eslint和commitlint如有不适，及时对焦，也可自行更改，共同完善")]),p("p",null,[m("4. 项目中有大量TODO，请全局搜索，处理后删除这些TODO")]),p("p",null,[m("5. 重要！！！"),p("p",null,[m("pages/TemplateList是一个常用后台页，仅需更改接口，字段便可完成页面，可复制粘贴重复使用。")])]),p("p",null,[m("6. 重要！！！"),p("p",null,[m("components/ModalForm组件可以关注一下，能提升效率！但是全局响应式数据不要随便使用，写在组件内部！否则会出现全局污染。此组件关闭时已清除数据")])]),p("p",null,[m("最后： 祝你开发愉快，早早下班，升职加薪")])]);var fe=u({name:"App",setup(){const e=c((()=>({spinReset:{height:"100%",".ant-spin-container":{height:"100%"},".ant-spin-spinning":{zIndex:999999},".ant-spin-blur":{zIndex:999999}}})));return d.destroy(),d.info({message:p("b",null,[m("本后台模板你需要确认")]),description:p(me,null,null)}),()=>p(f,{delay:300,spinning:pe.value,wrapperClassName:e.value.spinReset},{default:()=>[p(h,{locale:b},{default:()=>[p(y,null,null)]})]})}});const he={loginType:"phone",base:"/"},be={},ye=function(e,t){return t&&0!==t.length?Promise.all(t.map((e=>{if((e=`/${e}`)in be)return;be[e]=!0;const t=e.endsWith(".css"),a=t?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${e}"]${a}`))return;const l=document.createElement("link");return l.rel=t?"stylesheet":"modulepreload",t||(l.as="script",l.crossOrigin=""),l.href=e,document.head.appendChild(l),t?new Promise(((e,t)=>{l.addEventListener("load",e),l.addEventListener("error",t)})):void 0}))).then((()=>e())):e()},{SubMenu:ge,Item:ve}=v,_e=e=>{const{meta:t={},children:a}=e.routeRaw,{title:l,hideSubRoute:n,Icon:o}=t;return p("section",null,[Array.isArray(a)&&a.length>0&&p(g,null,[n?p(ve,{key:e.routeRaw.path},{default:()=>[p("span",null,[l])]}):p(ge,{key:e.routeRaw.path},{default:()=>[a.map((e=>p(_e,{routeRaw:e,key:e.path,path:e.path},null)))],title:()=>!e.collapsed&&l,icon:()=>"function"==typeof o&&p(o,null,null)})]),!a&&p(ve,{key:e.routeRaw.path},{default:()=>[p("span",null,[l])]})])},we=_({showModal:!1,rowData:{},dataSource:[],apiName:""});var Ie=u({name:"ModalForm",setup(){const e=i(),t=()=>{we.showModal=!1,setTimeout((()=>{e.value.initModelRef(),we.title="",we.rowData={},we.dataSource=[]}),200)},a=(a={})=>{console.log("data :>> ",a,we.rowData),e.value.validate().then((async()=>{we.apiName&&k.success("操作成功"),t(),"function"==typeof we.onRefresh&&await we.onRefresh()}))};return()=>p(w,{title:we.title,visible:we.showModal,footer:null,onCancel:t,closable:!1},{default:()=>[p(I,{config:{layout:"horizontal",labelCol:{span:8},wrapperCol:{span:16},labelAlign:"right"},watchInitModel:{updateState:!0},ref:e,dataSource:we.dataSource,onConfirm:a,onClose:t},null)]})}});const ke=[{path:"",label:"测试环境",env:"dev"},{path:"",label:"预发环境",env:"pre"},{path:"",label:"正式环境",env:"prod"}];let Le;const Te=p(v,null,"function"==typeof(Pe=Le=ke.map((e=>p(v.Item,{key:e.path},{default:()=>[p("a",{href:e.path,target:"_blank",rel:"noopener noreferrer nofollow"},[e.label])]}))))||"[object Object]"===Object.prototype.toString.call(Pe)&&!L(Pe)?Le:{default:()=>[Le]});var Pe;const Se=()=>{const e=T(),t=P.exports.get(window,"location.port"),{__env:a}=e.query,l=ke.find((e=>e.env===a))||{},{label:n}=l;return"prod"!==a?p(S,{overlay:Te,trigger:["click"]},{default:()=>[n&&p(O,{type:"link"},{default:()=>[t?"本地环境":n]})]}):null};const Oe=[{value:"closeLeft",label:"关闭左侧标签页"},{value:"closeRight",label:"关闭右侧标签页"},{value:"closeOther",label:"关闭其它标签页"}],Ee=()=>{let e;const t=E(),a=T(),l=t.getters["tabs/tabList"].findIndex((e=>e.fullPath===a.fullPath));return p(v,null,function(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!L(e)}(e=Oe.map((e=>p(v.Item,{key:e.value,onClick:()=>{(e=>{switch(e.value){case"closeLeft":t.commit("tabs/closeLeftTab",l);break;case"closeRight":t.commit("tabs/closeRightTab",l);break;case"closeOther":t.commit("tabs/closeOtherTab",l)}})(e)}},{default:()=>[e.label]}))))?e:{default:()=>[e]})};var Re=u({name:"MultiTabs",setup(){const e=R(),t=T(),a=E(),l=_({loading:!1,activeKey:t.fullPath}),n=a.getters["tabs/tabList"],o=t=>{e.push(t)},s=(t,o)=>{if("remove"===o){const o=n.findIndex((e=>e.fullPath===t));if(a.commit("tabs/closeCurTab",o),t===l.activeKey){const t=0===o?0:o-1;e.push({path:n[t].fullPath})}}};return j((()=>t.fullPath),(()=>{l.activeKey=t.fullPath})),()=>x(p(A,{class:"us-n",type:"editable-card",size:"small",hideAdd:!0,tabBarGutter:4,onChange:o,onEdit:s,activeKey:l.activeKey,"onUpdate:activeKey":e=>l.activeKey=e},{default:()=>[n.map((e=>p(A.TabPane,{key:e.fullPath,tab:e.title,closable:1!==n.length},null)))],tabBarExtraContent:()=>p(S,{overlay:Ee,trigger:"click",class:"ml100"},{default:()=>[p("div",{class:"red"},[p("span",null,[m("关闭标签页选项")]),p(M,{style:{margin:"0 4px"}},null)])]})}),[[K,n.length>0]])}});var je="_layout-container_1829k_1",xe="_logo_1829k_5",Ke="_header-reset_1829k_25",Ae="_breadcrumb-reset_1829k_32",Me="_user-name_1829k_35",Ce="_main_1829k_46",De="_sider_1829k_50";function Ne(e){return"function"==typeof e||"[object Object]"===Object.prototype.toString.call(e)&&!L(e)}var Ue=u({name:"Layout",setup(){const e=R(),t=T(),a=E(),l=P.exports.get(a,"getters.user/getUserInfo",{}),{avatar:n,unick:o}=l,s=()=>{const e=P.exports.get(t,"meta.showSubRouterView",!1),a=t.matched.length-(e?2:1),l=P.exports.get(t,"matched[0].path",""),n=P.exports.get(t,`matched[${a}].path`,""),o=P.exports.compact(n.split("/"));return{openKey:l,selectedKeys:P.exports.get(o,"[1]",""),showSubRouterView:e}},r=_({collapsed:!1,selectedKeys:[],openKeys:[]});j((()=>t.fullPath),((e,l)=>{var n;if(e!==l){const{openKey:e,selectedKeys:o}=s();a.commit("tabs/addTab",{fullPath:t.fullPath,title:t.meta.title,hideTab:null==(n=null==t?void 0:t.meta)?void 0:n.hideTab,isFirstMounted:!l}),r.selectedKeys=[o],r.openKeys=[e]}}),{immediate:!0});const i=({keyPath:t})=>{const a=t.join("/");e.push(a)},u=p(v,null,{default:()=>[p(v.Item,null,{default:()=>[p(g,null,[p(C,null,null),p("span",{onClick:()=>{a.commit("user/logout")}},[m("退出登录")])])]})]});return()=>{let e,a;const l=P.exports.get(t,"meta.keepAlive",!1),c=s(),{showSubRouterView:d}=c;return p(D,{class:je},{default:()=>[p(D.Sider,{class:De,collapsible:!0,collapsed:r.collapsed,"onUpdate:collapsed":e=>r.collapsed=e},{default:()=>[p("div",{class:xe},[p("img",{class:"contain",src:Q,alt:"wwdz logo"},null),!r.collapsed&&p("span",null,[m("vue3后台模板")])]),p(v,{theme:"dark",mode:"inline",onClick:i,selectedKeys:r.selectedKeys,"onUpdate:selectedKeys":e=>r.selectedKeys=e,openKeys:r.openKeys,"onUpdate:openKeys":e=>r.openKeys=e},Ne(e=Be.map((e=>p(_e,{routeRaw:e,key:e.path,path:e.path,collapsed:r.collapsed},null))))?e:{default:()=>[e]})]}),p(D,{class:Ce},{default:()=>[p(D.Header,{class:Ke},{default:()=>[p(N,{class:Ae},Ne(a=t.matched.map((e=>{const{path:t,meta:a}=e,{title:l,Icon:n}=a;return p(N.Item,{href:t,key:t},{default:()=>[p(U,{to:t},{default:()=>["function"==typeof n&&p(n,{class:"mr4"},null),p("span",null,[l])]})]})})))?a:{default:()=>[a]}),p("div",{class:"flex-center"},[p(Se,null,null),p(S,{overlay:u},{default:()=>[p("div",{class:"flex-center"},[p(V,{shape:"circle",size:"default",icon:n?p("img",{src:n},null):p(q,null,null)},null),p("div",{class:Me},[o])])]})])]}),p(D.Content,{class:"p20"},{default:()=>[p(Re,null,null),p(Ie,null,null),p(y,null,{default:({Component:e})=>p("section",null,[p(y,null,{default:({Component:e})=>p(z,{name:"fade-slide"},{default:()=>[d&&p(e,{key:t.fullPath},null)]})}),p(z,{name:"fade-slide"},{default:()=>[p(J,null,[!d&&l&&p(e,{key:t.fullPath},null)])]}),p(z,{name:"fade-slide"},{default:()=>[!d&&!l&&p(e,{key:t.fullPath},null)]})])})]})]})]})}}}),Ve=u({name:"Result",props:F,setup(e,{slots:t}){const a=R();return()=>p("section",{class:"antd-reset"},[p(B,e,{default:()=>[p("div",{class:"ant-result-extra"},["function"==typeof t.default&&t.default({router:a})])]})])}});var qe="_wel-container_1xnmv_1",ze="_logo_1xnmv_8",Je="_text_1xnmv_13",Fe=u({name:"Welcome",setup:()=>()=>p("section",{class:qe},[p("img",{class:ze,src:Q,alt:""},null),p("h3",{class:Je},[m("欢迎来到wont！这里是vue3后台模板")])])});const Be=[{path:"/TemplateList",name:"TemplateList",component:Ue,meta:{title:"功能示范",Icon:W},children:[{path:"TablePage",name:"TemplateList.TablePage",component:()=>ye((()=>import("./index.0e31940c.js")),["assets/index.0e31940c.js","assets/vendor.0429b4fb.js","assets/vendor.27ad5df6.css","assets/tableTpl.2176d6d6.js"]),meta:{title:"表格页模板",keepAlive:!0,hideSubRoute:!0},children:[{path:"Detail",name:"TemplateList.TablePage.View",component:()=>ye((()=>import("./index.c25628ed.js")),["assets/index.c25628ed.js","assets/index.0fbd59e0.css","assets/vendor.0429b4fb.js","assets/vendor.27ad5df6.css","assets/tableTpl.2176d6d6.js"]),meta:{title:"仅查看",showSubRouterView:!0},props:{operaType:"view"}},{path:"Deliver",name:"TemplateList.TablePage.Deliver",component:()=>ye((()=>import("./index.c25628ed.js")),["assets/index.c25628ed.js","assets/index.0fbd59e0.css","assets/vendor.0429b4fb.js","assets/vendor.27ad5df6.css","assets/tableTpl.2176d6d6.js"]),meta:{title:"可操作",showSubRouterView:!0},props:{operaType:"deliver"}}]}]}],We=[{path:"/",name:"/",component:Ue,meta:{title:"首页"},redirect:"/Welcome",children:[{path:"Welcome",name:"Welcome",component:Fe,meta:{title:"欢迎",isHidden:!0,hideSubRoute:!0}}]},{path:"/login",name:"Login",component:()=>ye((()=>import("./index.dc751219.js")),["assets/index.dc751219.js","assets/index.a3f12df3.css","assets/index.0fbd59e0.css","assets/vendor.0429b4fb.js","assets/vendor.27ad5df6.css"]),meta:{title:"登录",hideTab:!0}},...Be,{path:"/:pathMatch(.*)",name:"404",component:Ue,meta:{title:"页面未找到"},redirect:"/notFound/404",children:[{path:"404",name:"404/404",component:p(Ve,{title:"404",subTitle:"抱歉，你访问的页面不存在",status:"404"},{default:({router:e})=>p(O,{type:"primary",ghost:!0,onClick:()=>{e.back()}},{default:()=>[m("返回")]})}),meta:{title:"404",isHidden:!0,hideSubRoute:!0}}]}],{VITE_APP_ENV:He,BASE_URL:$e=he.base}={VITE_APP_ENV:"prod",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0},Xe=H({history:$($e),routes:We});console.log("router env :>> ",{VITE_APP_ENV:"prod",BASE_URL:"/",MODE:"production",DEV:!1,PROD:!0}),Xe.beforeEach(((e,r,i)=>{let u=null;var c,d;"prod"===He||e.query.__env||(c=((e,t)=>{for(var a in t||(t={}))n.call(t,a)&&s(e,a,t[a]);if(l)for(var a of l(t))o.call(t,a)&&s(e,a,t[a]);return e})({},e.query),d={__env:r.query.__env||He},u=t(c,a(d))),e.query,u?i({path:e.path,query:u}):i()}));var Ze={mounted(e){if("INPUT"===e.tagName)e.focus();else{const t=e.querySelector("input");"INPUT"===t.tagName&&t.focus()}}};X.locale("zh-cn");const Ge=Z((()=>p(h,{locale:G},{default:()=>[p(fe,null,null)]})));Ge.use(Xe).use(de).mount("#app"),Ge.directive("customFocus",Ze),Ge.config.errorHandler=(e,t,a)=>{console.log("err, vm, info :>> ",e,t,a)};export{we as m};
