(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["home"],{"89c2":function(t,e,a){var i=a("24fb");e=i(!1),e.push([t.i,'.theme--light.v-badge .v-badge__badge:after{border-color:#fff}.theme--dark.v-badge .v-badge__badge:after{border-color:#1e1e1e}.v-badge{position:relative}.v-badge,.v-badge__badge{display:inline-block;line-height:1}.v-badge__badge{border-radius:10px;color:#fff;font-size:12px;height:20px;letter-spacing:0;min-width:20px;padding:4px 6px;pointer-events:auto;position:absolute;text-align:center;text-indent:0;top:auto;transition:.3s cubic-bezier(.25,.8,.5,1);white-space:nowrap}.v-application--is-ltr .v-badge__badge{right:auto}.v-application--is-rtl .v-badge__badge{left:auto}.v-badge__badge .v-icon{color:inherit;font-size:12px;margin:0 -2px}.v-badge__badge .v-img{height:12px;width:12px}.v-badge__wrapper{flex:0 1;height:100%;left:0;pointer-events:none;position:absolute;top:0;width:100%}.v-badge--avatar .v-badge__badge{padding:0}.v-badge--avatar .v-badge__badge .v-avatar{height:20px!important;min-width:0!important;max-width:20px!important}.v-badge--bordered .v-badge__badge:after{border-radius:inherit;border-width:2px;border-style:solid;bottom:0;content:"";left:0;position:absolute;right:0;top:0;transform:scale(1.15)}.v-badge--dot .v-badge__badge{border-radius:4.5px;height:9px;min-width:0;padding:0;width:9px}.v-badge--dot .v-badge__badge:after{border-width:1.5px}.v-badge--icon .v-badge__badge{padding:4px 6px}.v-badge--inline{align-items:center;display:inline-flex;justify-content:center}.v-badge--inline .v-badge__badge,.v-badge--inline .v-badge__wrapper{position:relative}.v-badge--inline .v-badge__wrapper{margin:0 4px}.v-badge--tile .v-badge__badge{border-radius:0}',""]),t.exports=e},"99d9":function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return n})),a.d(e,"c",(function(){return o})),a.d(e,"d",(function(){return l}));var i=a("b0af"),s=a("80d2"),r=Object(s["g"])("v-card__actions"),n=Object(s["g"])("v-card__subtitle"),o=Object(s["g"])("v-card__text"),l=Object(s["g"])("v-card__title");i["a"]},b611:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("v-row",{attrs:{align:"center",justify:"center"}},[a("v-col",{attrs:{cols:"12",xl:"3",lg:"4",md:"4",sm:"6"}},t._l(t.gameList,(function(e,i){return i<3?a("v-card",{key:i,staticClass:"mb-2",attrs:{color:e.color,dark:""}},[a("div",{staticClass:"d-flex flex-no-wrap justify-space-between"},[a("div",[a("v-badge",{attrs:{color:"blue-grey darken-4",overlap:"",left:"",content:i+1}},[a("v-card-title",{staticClass:"headline text-wrap",staticStyle:{"word-break":"break-word"}},[t._v(t._s(e.title))])],1),a("v-card-subtitle",[t._v(t._s(e.subtitle))]),a("v-card-actions",[a("v-btn",{staticClass:"mx-2",attrs:{to:e.link,small:"",outlined:""}},[t._v("Запустить")])],1)],1),a("v-avatar",{staticClass:"ma-3",attrs:{size:"125",tile:""}},[a("v-img",{attrs:{src:e.img}})],1)],1)]):t._e()})),1),t.gameList.length>3?a("v-col",{attrs:{cols:"12",xl:"3",lg:"4",md:"4",sm:"6"}},[a("v-spacer"),t._l(t.gameList,(function(e,i){return i>2?a("v-card",{key:i,staticClass:"mb-2",attrs:{color:e.color,dark:""}},[a("div",{staticClass:"d-flex flex-no-wrap justify-space-between"},[a("div",[a("v-badge",{attrs:{color:"blue-grey darken-4",overlap:"",left:"",content:i+1}},[a("v-card-title",{staticClass:"headline text-wrap",staticStyle:{"word-break":"break-word"}},[t._v(t._s(e.title))])],1),a("v-card-subtitle",[t._v(t._s(e.subtitle))]),a("v-card-actions",[a("v-btn",{staticClass:"mx-2",attrs:{to:e.link,small:"",outlined:""}},[t._v("Запустить")])],1)],1),a("v-avatar",{staticClass:"ma-3",attrs:{size:"125",tile:""}},[a("v-img",{attrs:{src:e.img}})],1)],1)]):t._e()}))],2):t._e()],1)],1)},s=[],r={name:"Home",data:function(){return{gameList:[{title:"Main game",subtitle:"Test your knowledge of English",link:"/main-game",img:"assets/img/main.png",color:"red"},{title:"English puzzle",subtitle:"Collect the puzzle to get a picture",link:"/english-puzzle",img:"assets/img/puzzle.png",color:"green"},{title:"Speaking",subtitle:"Train your skills in dialogue game",link:"/speaking",img:"assets/img/speaking.png",color:"primary"},{title:"Спринт",subtitle:"Catch the time to guess the words, the countdown has begun..",link:"/sprint",img:"assets/img/спринт.png",color:"red darken-4"},{title:"SpeakIt",subtitle:"Check your pronunciation skills",link:"/speakit",img:"assets/img/speakit.png",color:"purple lighten-1"},{title:"Аудиовызов",subtitle:"Train your listening skills",link:"/AudioVizov",img:"assets/img/аудиовызов.png",color:"pink darken-1"}]}}},n=r,o=a("2877"),l=a("6544"),d=a.n(l),c=a("8212"),g=(a("a9e3"),a("15fd")),u=a("5530"),b=(a("ff44"),a("132d")),p=a("a9ad"),v=a("7560"),h=a("f2e7"),f=a("f40d"),m=a("fe6c"),_=a("58df"),x=a("80d2"),w=Object(_["a"])(p["a"],Object(m["b"])(["left","bottom"]),v["a"],h["a"],f["a"]).extend({name:"v-badge",props:{avatar:Boolean,bordered:Boolean,color:{type:String,default:"primary"},content:{required:!1},dot:Boolean,label:{type:String,default:"$vuetify.badge"},icon:String,inline:Boolean,offsetX:[Number,String],offsetY:[Number,String],overlap:Boolean,tile:Boolean,transition:{type:String,default:"scale-rotate-transition"},value:{default:!0}},computed:{classes:function(){return Object(u["a"])({"v-badge--avatar":this.avatar,"v-badge--bordered":this.bordered,"v-badge--bottom":this.bottom,"v-badge--dot":this.dot,"v-badge--icon":null!=this.icon,"v-badge--inline":this.inline,"v-badge--left":this.left,"v-badge--overlap":this.overlap,"v-badge--tile":this.tile},this.themeClasses)},computedBottom:function(){return this.bottom?"auto":this.computedYOffset},computedLeft:function(){return this.isRtl?this.left?this.computedXOffset:"auto":this.left?"auto":this.computedXOffset},computedRight:function(){return this.isRtl?this.left?"auto":this.computedXOffset:this.left?this.computedXOffset:"auto"},computedTop:function(){return this.bottom?this.computedYOffset:"auto"},computedXOffset:function(){return this.calcPosition(this.offsetX)},computedYOffset:function(){return this.calcPosition(this.offsetY)},isRtl:function(){return this.$vuetify.rtl},offset:function(){return this.overlap?this.dot?8:12:this.dot?2:4},styles:function(){return this.inline?{}:{bottom:this.computedBottom,left:this.computedLeft,right:this.computedRight,top:this.computedTop}}},methods:{calcPosition:function(t){return"calc(100% - ".concat(Object(x["f"])(t||this.offset),")")},genBadge:function(){var t=this.$vuetify.lang,e=this.$attrs["aria-label"]||t.t(this.label),a=this.setBackgroundColor(this.color,{staticClass:"v-badge__badge",style:this.styles,attrs:{"aria-atomic":this.$attrs["aria-atomic"]||"true","aria-label":e,"aria-live":this.$attrs["aria-live"]||"polite",title:this.$attrs.title,role:this.$attrs.role||"status"},directives:[{name:"show",value:this.isActive}]}),i=this.$createElement("span",a,[this.genBadgeContent()]);return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,mode:this.mode}},[i]):i},genBadgeContent:function(){if(!this.dot){var t=Object(x["n"])(this,"badge");return t||(this.content?String(this.content):this.icon?this.$createElement(b["a"],this.icon):void 0)}},genBadgeWrapper:function(){return this.$createElement("span",{staticClass:"v-badge__wrapper"},[this.genBadge()])}},render:function(t){var e=[this.genBadgeWrapper()],a=[Object(x["n"])(this)],i=this.$attrs,s=(i["aria-atomic"],i["aria-label"],i["aria-live"],i.role,i.title,Object(g["a"])(i,["aria-atomic","aria-label","aria-live","role","title"]));return this.inline&&this.left?a.unshift(e):a.push(e),t("span",{staticClass:"v-badge",attrs:s,class:this.classes},a)}}),k=a("8336"),y=a("b0af"),C=a("99d9"),O=a("62ad"),B=a("adda"),j=a("0fd9"),S=a("2fa4"),z=Object(o["a"])(n,i,s,!1,null,null,null);e["default"]=z.exports;d()(z,{VAvatar:c["a"],VBadge:w,VBtn:k["a"],VCard:y["a"],VCardActions:C["a"],VCardSubtitle:C["b"],VCardTitle:C["d"],VCol:O["a"],VImg:B["a"],VRow:j["a"],VSpacer:S["a"]})},f40d:function(t,e,a){"use strict";var i=a("2b0e");e["a"]=i["default"].extend({name:"transitionable",props:{mode:String,origin:String,transition:String}})},ff44:function(t,e,a){var i=a("89c2");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var s=a("499e").default;s("98a252d0",i,!0,{sourceMap:!1,shadowMode:!1})}}]);