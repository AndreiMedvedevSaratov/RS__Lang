(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["speaking"],{"3e2c":function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,'.theme--light.v-snack__wrapper{color:rgba(0,0,0,.87)}.theme--dark.v-snack__wrapper{color:#fff}.v-sheet.v-snack__wrapper{border-radius:4px}.v-sheet.v-snack__wrapper:not(.v-sheet--outlined){box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12)}.v-sheet.v-snack__wrapper.v-sheet--shaped{border-radius:24px 4px}.v-snack{bottom:0;display:flex;font-size:.875rem;justify-content:center;left:0;pointer-events:none;right:0;top:0;width:100%}.v-snack:not(.v-snack--absolute){height:100vh;position:fixed;z-index:1000}.v-snack:not(.v-snack--centered):not(.v-snack--top){align-items:flex-end}.v-snack__wrapper{align-items:center;border-color:currentColor!important;display:flex;margin:8px;max-width:672px;min-height:48px;min-width:344px;padding:0;pointer-events:auto;position:relative;transition-duration:.15s;transition-property:opacity,transform;transition-timing-function:cubic-bezier(0,0,.2,1)}.v-snack__wrapper.theme--dark{background-color:#333;color:hsla(0,0%,100%,.87)}.v-snack__content{flex-grow:1;font-size:.875rem;font-weight:400;letter-spacing:.015625rem;line-height:normal;margin-right:auto;padding:14px 16px;text-align:initial}.v-snack__action{align-items:center;align-self:center;display:flex}.v-snack__action .v-ripple__container{display:none}.v-application--is-ltr .v-snack__action{margin-right:8px}.v-application--is-rtl .v-snack__action{margin-left:8px}.v-snack__action>.v-snack__btn.v-btn{padding:0 8px}.v-snack__btn{margin-left:0;margin-right:0;margin:0;min-width:auto}.v-snack--absolute{height:100%;position:absolute;z-index:1}.v-snack--centered{align-items:center}.v-snack--left{justify-content:flex-start}.v-snack--multi-line .v-snack__wrapper{min-height:68px}.v-snack--right{justify-content:flex-end}.v-snack:not(.v-snack--has-background) .v-snack__wrapper{background:transparent!important;box-shadow:none!important}.v-snack--text .v-snack__wrapper:before{background-color:currentColor;border-radius:inherit;bottom:0;content:"";left:0;opacity:.12;pointer-events:none;position:absolute;right:0;top:0}.v-snack--top{align-items:flex-start}.v-snack--vertical .v-snack__wrapper{flex-direction:column}.v-snack--vertical .v-snack__wrapper .v-snack__action{align-self:flex-end;margin-bottom:8px}.v-snack-transition-enter.v-snack__wrapper{transform:scale(.8)}.v-snack-transition-enter.v-snack__wrapper,.v-snack-transition-leave-to.v-snack__wrapper{opacity:0}',""]),t.exports=e},"4af6":function(t,e,n){"use strict";var a=n("7872"),i=n.n(a);i.a},7872:function(t,e,n){var a=n("b0b0");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("c5d23664",a,!0,{sourceMap:!1,shadowMode:!1})},"81cf":function(t,e,n){var a=n("d121");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("442ba04a",a,!0,{sourceMap:!1,shadowMode:!1})},"860c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"game"},[n("v-row",{staticClass:"main"},[n("video",{ref:"video",staticClass:"video"},[n("source",{ref:"src",attrs:{src:"./assets/video/"+this.step+".mp4",type:"video/mp4"}})]),n("v-btn",{attrs:{tile:"",id:"btn",value:"Start a conversation"},on:{click:function(e){return t.video()}}},[t._v("Start a conversation")]),n("snack"),n("div",{ref:"answer"}),n("v-col",{ref:"chat",staticClass:"chat"},[t._v("Chat:"),n("div",{ref:"chatWrap",attrs:{id:"chatWrap"}},[n("p",{ref:"speech"})])]),t.loading?n("div",{staticClass:"load"},[t._v("Loading... please wait..."),n("v-progress-linear",{attrs:{indeterminate:"",rounded:"",color:"blue darken-2"}})],1):t._e()],1)],1)},i=[],o=n("5530"),s=n("2f62"),r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"text-center ma-2"},[n("v-btn",{attrs:{id:"btn_rules"},on:{click:function(e){t.snackbar=!0}}},[t._v("Open rules of the game")]),n("v-snackbar",{attrs:{timeout:t.timeout,color:"blue darken-2"},scopedSlots:t._u([{key:"action",fn:function(e){var a=e.attrs;return[n("v-btn",t._b({attrs:{id:"btn_close",text:""},on:{click:function(e){t.snackbar=!1}}},"v-btn",a,!1),[t._v(" Х ")])]}}]),model:{value:t.snackbar,callback:function(e){t.snackbar=e},expression:"snackbar"}},[t._v(" "+t._s(t.text)+" ")])],1)},c=[],l={data:function(){return{snackbar:!0,timeout:3e4,text:"Чтобы играть в эту прекрасную игру, нужно включить микрофон и имитировать диалог. Вы слушаете, то что произносит девушка на видео и отвечаете. Потом игра показывает, что вы произнесли. Предложение за предложением Вы отрабатываете своё произношение, желаем удачи!"}}},d=l,p=(n("95cc"),n("2877")),u=n("6544"),h=n.n(u),v=n("8336"),f=(n("caad"),n("a9e3"),n("ade3")),g=(n("ca71"),n("8dd9")),m=n("a9ad"),b=n("7560"),k=n("f2e7"),_=n("fe6c"),w=n("58df"),x=n("80d2"),y=n("d9bd"),T=Object(w["a"])(g["a"],m["a"],k["a"],Object(_["b"])(["absolute","bottom","left","right","top"])).extend({name:"v-snackbar",props:{app:Boolean,centered:Boolean,contentClass:{type:String,default:""},multiLine:Boolean,text:Boolean,timeout:{type:[Number,String],default:5e3},transition:{type:[Boolean,String],default:"v-snack-transition",validator:function(t){return"string"===typeof t||!1===t}},vertical:Boolean},data:function(){return{activeTimeout:-1}},computed:{classes:function(){return{"v-snack--absolute":this.absolute,"v-snack--active":this.isActive,"v-snack--bottom":this.bottom||!this.top,"v-snack--centered":this.centered,"v-snack--has-background":this.hasBackground,"v-snack--left":this.left,"v-snack--multi-line":this.multiLine&&!this.vertical,"v-snack--right":this.right,"v-snack--text":this.text,"v-snack--top":this.top,"v-snack--vertical":this.vertical}},hasBackground:function(){return!this.text&&!this.outlined},isDark:function(){return this.hasBackground?!this.light:b["a"].options.computed.isDark.call(this)},styles:function(){if(this.absolute)return{};var t=this.$vuetify.application,e=t.bar,n=t.bottom,a=t.footer,i=t.insetFooter,o=t.left,s=t.right,r=t.top;return{paddingBottom:Object(x["f"])(n+a+i),paddingLeft:this.app?Object(x["f"])(o):void 0,paddingRight:this.app?Object(x["f"])(s):void 0,paddingTop:Object(x["f"])(e+r)}}},watch:{isActive:"setTimeout",timeout:"setTimeout"},mounted:function(){this.isActive&&this.setTimeout()},created:function(){this.$attrs.hasOwnProperty("auto-height")&&Object(y["e"])("auto-height",this),0==this.timeout&&Object(y["d"])('timeout="0"',"-1",this)},methods:{genActions:function(){return this.$createElement("div",{staticClass:"v-snack__action "},[Object(x["n"])(this,"action",{attrs:{class:"v-snack__btn"}})])},genContent:function(){return this.$createElement("div",{staticClass:"v-snack__content",class:Object(f["a"])({},this.contentClass,!0),attrs:{role:"status","aria-live":"polite"}},[Object(x["n"])(this)])},genWrapper:function(){var t=this.hasBackground?this.setBackgroundColor:this.setTextColor,e=t(this.color,{staticClass:"v-snack__wrapper",class:g["a"].options.computed.classes.call(this),directives:[{name:"show",value:this.isActive}]});return this.$createElement("div",e,[this.genContent(),this.genActions()])},genTransition:function(){return this.$createElement("transition",{props:{name:this.transition}},[this.genWrapper()])},setTimeout:function(){var t=this;window.clearTimeout(this.activeTimeout);var e=Number(this.timeout);this.isActive&&![0,-1].includes(e)&&(this.activeTimeout=window.setTimeout((function(){t.isActive=!1}),e))}},render:function(t){return t("div",{staticClass:"v-snack",class:this.classes,style:this.styles},[!1!==this.transition?this.genTransition():this.genWrapper()])}}),S=Object(p["a"])(d,r,c,!1,null,null,null),I=S.exports;h()(S,{VBtn:v["a"],VSnackbar:T});var O={name:"Speaking",components:{snack:I},props:[],data:function(){return{step:0,status:"",isAnswer:["Yes, actually I am lost! How did you know?","Am I? Oh, now I understand why I couldnt find anything.","I want to eat at a restaurant by the beach.","Yes, I see the restaurants now! Thanks for your help!","Yes, Im looking for the Wallis Hotel.","I could use any information you have!","How do I get on the highway?","What exit do I get off?","Where did you go?","What did you do there?","Which museums did you go to?","That sounds great!","I would like to change money please.","Its my first day here, so I want to buy money, please.","I dont know. What are your rates?","Great! Then Ill change all my money!"],videoIsEnded:!1,count_error:0,recognition:"",loading:!1,round:1}},computed:Object(o["a"])({},Object(s["c"])({words:"getWords",urlFiles:"getUrlFiles",getShortStatistics:"showShortStatistics"})),watch:{},created:function(){},mounted:function(){var t=this;this.loading=!0,setTimeout((function(){t.loading=!1}),2500),this.appHtml([{one:"main",key:"drawer",value:!1},{one:"main",key:"breadcrumbs",value:!1},{one:"app",key:"background",value:"blue darken-2"},{one:"app",key:"colorWhite",value:!0}])},beforeDestroy:function(){this.appHtml([{one:"main",key:"drawer",value:!0},{one:"main",key:"breadcrumbs",value:!0},{one:"app",key:"background",value:"grey lighten-5"},{one:"app",key:"colorWhite",value:!1}])},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(s["d"])({appHtml:"EDIT_HTML",video:"speaking/SPEAKING_VIDEO",answer:"speaking/SPEAKING_ANSWER",speak:"speaking/SPEAKING_SPEAK",offStatistics:"SHOW_SHORT_STATISTICS"})),Object(s["b"])({getWords:"APP_GET_USER_WORDS_AGGREGATED",alert:"ALERT"})),{},{speak:function(){var t=this,e=window.SpeechRecognition||window.webkitSpeechRecognition;this.recognition=new e,this.recognition.lang="en-US",this.recognition.continuos=!1,this.recognition.interimResults=!1,this.recognition.maxAlternatives=1,this.recognition.onerror=function(e){console.log("It's error! ".concat(e.error)),t.count_error+=1,t.count_error>100&&(t.recognition.onend=function(){return t.recognition.stop()})},this.count_error=0,this.recognition.addEventListener("result",(function(e){var n=e.results.length-1,a=e.results[n][0].transcript.toLowerCase(),i=document.createElement("p");i.className="black white--text",i.ref="speech".concat(t.step),i.textContent=a,document.getElementById("chatWrap").append(i),t.recognition.onend=function(){return t.recognition.stop()},setTimeout((function(){t.clear()}),1500),4!==t.step&&8!==t.step&&12!==t.step||setTimeout((function(){t.clear(),t.round+=1,alert("go on the round ".concat(t.round))}),1500),15===t.step&&setTimeout((function(){alert("you win")}),1500)})),this.recognition.start()},video:function(){var t=this;this.$refs.video.play(),this.$refs.video.onended=function(){t.answer(),t.speak(),t.step+=1,t.$refs.src.setAttribute("src","./assets/video/".concat(t.step,".mp4")),t.loading=!0,t.$refs.video.load(),setTimeout((function(){t.loading=!1}),500)}},answer:function(){var t=document.createElement("div");t.className="answer",t.ref="answer".concat(this.step),t.textContent=this.isAnswer[this.step],document.getElementById("chatWrap").append(t)},clear:function(){var t=document.createElement("div");t.id="chatWrap",document.getElementById("chatWrap").replaceWith(t)}})},E=O,j=(n("4af6"),n("62ad")),C=n("8e36"),A=n("0fd9"),W=Object(p["a"])(E,a,i,!1,null,"1b972444",null);e["default"]=W.exports;h()(W,{VBtn:v["a"],VCol:j["a"],VProgressLinear:C["a"],VRow:A["a"]})},"95cc":function(t,e,n){"use strict";var a=n("81cf"),i=n.n(a);i.a},b0b0:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,".game[data-v-1b972444]{height:100vh;box-sizing:border-box}p[data-v-1b972444]{margin:0}.main[data-v-1b972444]{width:100%;height:auto;justify-content:center;flex-direction:column}.main[data-v-1b972444],.video[data-v-1b972444]{position:relative;display:flex}.video[data-v-1b972444]{width:300px;height:300px;margin:0 auto;align-items:center;top:0}.answer[data-v-1b972444]{left:150px;color:#1976d2;text-align:center}#btn[data-v-1b972444],.answer[data-v-1b972444]{position:relative;display:block;top:10px}#btn[data-v-1b972444]{width:220px;height:60px;border-radius:5px;color:#fff;align-items:center;background:#1976d2;left:50%;transform:translate(-50%)}.chat[data-v-1b972444],.load[data-v-1b972444]{position:relative;top:40px;color:#1976d2}.chat[data-v-1b972444]{border:2px solid #1976d2;border-radius:5px;width:300px;left:50%;transform:translate(-50%)}",""]),t.exports=e},ca71:function(t,e,n){var a=n("3e2c");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var i=n("499e").default;i("3ee1925a",a,!0,{sourceMap:!1,shadowMode:!1})},d121:function(t,e,n){var a=n("24fb");e=a(!1),e.push([t.i,"#btn_rules{background:#1976d2;color:#fff;width:220px;height:60px;top:10px}#btn_close{color:red;position:relative;top:-20px;left:10px}#hint{position:absolute;color:#1976d2;width:40%;left:30%;top:-80%}",""]),t.exports=e}}]);