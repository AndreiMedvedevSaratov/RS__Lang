(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["main-game"],{"0d17":function(t,e){var n={methods:{successResult:function(){this.isHideWord=!1,this.isHideSentences=!1,this.isHideFadeAnswer=!0,this.wordsCount+=1;var t=this.getSoundArr(!0);this.playAllAudio(t)},playAllAudio:function(t){var e=this;console.log(t);var n=0,s=new Audio(t[n]),a=function a(){n+=1,n===t.length&&(e.gameStatus="learnGroupReq",s.removeEventListener("ended",a)),s.src=t[n],s.play()};s.addEventListener("ended",a),s.play()},nextRound:function(){this.wordsCount===this.wordsPerDay?this.endGame():(this.wordProcessing({word:this.nextWord,right:!0}),this.nextWord=this.words[this.wordsCount])},endGame:function(){this.alert({data:"Игра закончена, Ваша статистика!"}),this.showStatistics=!0}}};t.exports={correctAnswer:n}},"0dd6":function(t,e,n){"use strict";var s=n("efb8"),a=n.n(s);a.a},"1de5":function(t,e,n){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},3711:function(t,e){var n={methods:{failureResult:function(){this.isHideWord=!1,this.isGetWrongInput=!0;var t=this.getSoundArr(!1);this.repeatAudio(t)},repeatAudio:function(t){var e=this,n=new Audio(t[0]);n.addEventListener("ended",(function(){e.gameStatus="secondAttempt"})),n.play()},repeatRound:function(){this.isHideFadeAnswer=!1}}};t.exports={wrongAnswer:n}},"4d63":function(t,e,n){var s=n("83ab"),a=n("da84"),i=n("94ca"),r=n("7156"),o=n("9bf2").f,c=n("241c").f,d=n("44e7"),u=n("ad6d"),l=n("9f7f"),p=n("6eeb"),h=n("d039"),g=n("69f3").set,f=n("2626"),m=n("b622"),w=m("match"),x=a.RegExp,v=x.prototype,b=/a/g,_=/a/g,T=new x(b)!==b,S=l.UNSUPPORTED_Y,y=s&&i("RegExp",!T||S||h((function(){return _[w]=!1,x(b)!=b||x(_)==_||"/a/i"!=x(b,"i")})));if(y){var W=function(t,e){var n,s=this instanceof W,a=d(t),i=void 0===e;if(!s&&a&&t.constructor===W&&i)return t;T?a&&!i&&(t=t.source):t instanceof W&&(i&&(e=u.call(t)),t=t.source),S&&(n=!!e&&e.indexOf("y")>-1,n&&(e=e.replace(/y/g,"")));var o=r(T?new x(t,e):x(t,e),s?this:v,W);return S&&n&&g(o,{sticky:n}),o},k=function(t){t in W||o(W,t,{configurable:!0,get:function(){return x[t]},set:function(e){x[t]=e}})},C=c(x),A=0;while(C.length>A)k(C[A++]);v.constructor=W,W.prototype=v,p(a,"RegExp",W)}f("RegExp")},"761c":function(t,e,n){t.exports=n.p+"assets/img/dustbin.9432e245.svg"},7993:function(t,e,n){n("99af");var s={methods:{checkWord:function(){var t=this.userInput.toLowerCase(),e=this.nextWord.word.toLowerCase();e===t?(this.successInput(this.isGetWrongInput),this.successResult()):(this.failureInput(this.isGetWrongInput),this.failureResult())},getSoundArr:function(t){var e=[];return e.push("".concat(this.urlFiles).concat(this.nextWord.audio)),t&&(this.showAudioMeaning&&e.push("".concat(this.urlFiles).concat(this.nextWord.audioMeaning)),this.showAudioExample&&e.push("".concat(this.urlFiles).concat(this.nextWord.audioExample))),e},skipWord:function(){this.isGetWrongInput=!0,this.successInput(this.isGetWrongInput),this.successResult()}}};t.exports={mainGame:s}},"839a":function(t,e){var n={methods:{markWord:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"nextWord";this[t].userWord||(this[t].userWord={learnGroup:1,dictionaryGroup:1,allRepeats:0,successRepeats:0,previousTrain:new Date,nextTrain:new Date})},getNextTrainTime:function(t){var e=[0,1,2,7,18],n=new Date;switch(n.setHours(0,0,0,0),t){case 1:n.setDate(n.getDate()+e[0]);break;case 2:n.setDate(n.getDate()+e[1]);break;case 3:n.setDate(n.getDate()+e[2]);break;case 4:n.setDate(n.getDate()+e[3]);break;case 5:n.setDate(n.getDate()+e[4]);break;default:}return n},failureInput:function(t){var e=0,n=this.nextWord.userWord;t||(n.learnGroup=n.learnGroup>e?n.learnGroup-=1:e,n.dictionaryGroup=n.dictionaryGroup>e?n.dictionaryGroup-=1:e,n.allRepeats+=1)},successInput:function(t){var e=5,n=this.nextWord.userWord;t||(n.learnGroup=n.learnGroup<e?n.learnGroup+=1:e,n.dictionaryGroup=n.dictionaryGroup<e?n.dictionaryGroup+=1:e,n.successRepeats+=1),n.allRepeats+=1,n.previousTrain=new Date,n.nextTrain=this.getNextTrainTime(n.learnGroup)},getNextWord:function(){return{word:"boat",image:"https://cdn.bannerbuzz.com/media/catalog/product/b/o/boat-lettering.jpg",audio:"https://audio00.forvo.com/audios/mp3/v/w/vw_8991262_39_297198_126192.mp3",audioMeaning:"files/01_0005_meaning.mp3",audioExample:"https://audio00.forvo.com/mp3/9170762/39/9170762_39_7071412.mp3",textMeaning:"A boat is a vehicle that moves across water",textExample:"The next boat to the Aran Islands will be tomorrow morning",transcription:"[bout]",wordTranslate:"лодка",textMeaningTranslate:"Лодка - это транспортное средство, которое движется по воде",textExampleTranslate:"Следующая лодка на острава Аран будут завтра утром",id:5}}}};t.exports={forGame:n}},"9f40":function(t,e,n){"use strict";n.r(e);var s=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"background"},[0!=Object.keys(t.nextWord).length?n("div",{staticClass:"card-container"},[n("div",{staticClass:"card-header"},[n("div",{staticClass:"card-header_repeat-progress"}),n("div",{staticClass:"card-header_delete-button"},[n("v-btn",{attrs:{"x-small":""},on:{click:function(e){return t.addWordInDeleteCategory()}}},[n("div",{staticClass:"delete-button"})])],1)]),n("main",{staticClass:"card-body"},[n("div",{staticClass:"learn-content"},[n("div",{staticClass:"learn-content_image-word"},[t.showImage?n("div",{staticClass:"learn-content_image"},[n("img",{attrs:{src:""+this.urlFiles+this.nextWord.image,width:"250",height:"170"}})]):t._e(),n("div",{staticClass:"learn-content_word"},[n("form",{staticClass:"word_origin",on:{submit:function(e){return e.preventDefault(),t.checkWord()}}},[n("span",{staticClass:"origin_container"},t._l(t.nextWord.word,(function(e,s){return n("span",{class:[{hidden:t.isHideWord},t.classForSymbols[s]]},[t._v(t._s(e))])})),0),n("input",{directives:[{name:"model",rawName:"v-model",value:t.userInput,expression:"userInput"}],class:[{hidden:!t.isHideWord},"origin_input"],attrs:{id:"inputField",type:"text"},domProps:{value:t.userInput},on:{input:function(e){e.target.composing||(t.userInput=e.target.value)}}}),n("span",{class:[{hidden:t.isHideFadeAnswer},"origin_fade-answer"]},[t._v(t._s(t.nextWord.word))])]),t.showWordTranslate?n("p",{staticClass:"word_translation",domProps:{innerHTML:t._s(t.nextWord.wordTranslate)}}):t._e(),t.showTranscription&&!t.isHideSentences?n("p",{staticClass:"word_transcription",domProps:{innerHTML:t._s(t.nextWord.transcription)}}):t._e()])]),t.showTextExample?n("div",{staticClass:"learn-content_text-example"},[n("div",{staticClass:"text-example_origin"},[n("p",{staticClass:"origin_all-sentence"},[n("span",{domProps:{innerHTML:t._s(t.example.before)}}),t.isHideSentences?n("span",{staticClass:"origin_cap"},[t._v("[...]")]):n("span",{staticClass:"origin_word",domProps:{innerHTML:t._s(t.example.wordInText)}}),n("span",{domProps:{innerHTML:t._s(t.example.after)}})])]),t.showTextExampleTranslate?n("div",{staticClass:"text-example_translate"},[t.isHideSentences?t._e():n("p",{staticClass:"translate_all-sentence",domProps:{innerHTML:t._s(t.nextWord.textExampleTranslate)}})]):t._e()]):t._e(),t.showTextMeaning?n("div",{staticClass:"learn-content_text-meaning"},[n("div",{staticClass:"text-meaning_origin"},[n("p",{staticClass:"origin_all-sentence"},[n("span",{domProps:{innerHTML:t._s(t.meaning.before)}}),t.isHideSentences?n("span",{staticClass:"origin_cap"},[t._v("[...]")]):n("span",{staticClass:"origin_word",domProps:{innerHTML:t._s(t.meaning.wordInText)}}),n("span",{domProps:{innerHTML:t._s(t.meaning.after)}})])]),t.showTextMeaningTranslate?n("div",{staticClass:"text-meaning_translate"},[t.isHideSentences?t._e():n("p",{staticClass:"translate_all-sentence",domProps:{innerHTML:t._s(t.nextWord.textMeaningTranslate)}})]):t._e()]):t._e()])]),n("div",{staticClass:"card-footer"},[t.isHideButtons?n("div",{staticClass:"card-footer_next-button"},[n("v-btn",{on:{click:function(e){return t.skipWord()}}},[t._v("Показать ответ")]),n("v-btn",{on:{click:function(e){return t.checkWord()}}},[t._v("Проверить слово")])],1):t._e(),t.isHideButtons?t._e():n("div",{staticClass:"card-footer_buttons"},[n("v-btn",[t._v("Легко")]),n("v-btn",[t._v("Хорошо")]),n("v-btn",[t._v("Трудно")])],1),n("div",{staticClass:"card-footer_progress-linear"},[n("v-progress-linear",{attrs:{value:t.progressLinear}})],1)])]):t._e()])},a=[],i=(n("99af"),n("d81d"),n("fb6a"),n("4d63"),n("ac1f"),n("25f0"),n("466d"),n("1276"),n("3835")),r=(n("96cf"),n("1da1")),o=n("5530"),c=n("2f62"),d=n("0d17"),u=n("839a"),l=n("3711"),p=n("7993"),h={name:"CardItem",components:{},mixins:[u["forGame"],p["mainGame"],d["correctAnswer"],l["wrongAnswer"]],data:function(){return{nextWord:{},isHideWord:!0,isHideFadeAnswer:!0,isHideSentences:!0,isHideButtons:!0,isGetWrongInput:!1,wordsCount:0,userInput:"",classForSymbols:[],gameStatus:"firstAttempt"}},computed:Object(o["a"])(Object(o["a"])({},Object(c["c"])({getSetting:"user/getSetting",words:"getWords",urlFiles:"getUrlFiles",getShortStatistics:"showShortStatistics"})),{},{example:function(){var t=this.nextWord,e=t.textExample,n=t.word;return this.getSentenceParts(e,n)},meaning:function(){var t=this.nextWord,e=t.textMeaning,n=t.word;return this.getSentenceParts(e,n)},progressLinear:function(){var t=this.wordsCount/this.wordsPerDay;return Math.floor(100*t)},choiceWords:{get:function(){return this.getSetting.optional.choiceWords},set:function(t){this.setSetting({key:"choiceWords",value:t})}},wordsPerDay:{get:function(){return this.getSetting.wordsPerDay},set:function(t){this.setSetting({value:t})}},showWordTranslate:{get:function(){return this.getSetting.optional.showWordTranslate},set:function(t){this.setSetting({key:"showWordTranslate",value:t})}},showTranscription:{get:function(){return this.getSetting.optional.showTranscription},set:function(t){this.setSetting({key:"showTranscription",value:t})}},showImage:{get:function(){return this.getSetting.optional.showImage},set:function(t){this.setSetting({key:"showImage",value:t})}},showTextMeaning:{get:function(){return this.getSetting.optional.showTextMeaning},set:function(t){this.setSetting({key:"showTextMeaning",value:t})}},showTextMeaningTranslate:{get:function(){return this.getSetting.optional.showTextMeaningTranslate},set:function(t){this.setSetting({key:"showTextMeaningTranslate",value:t})}},showAudioMeaning:{get:function(){return this.getSetting.optional.showAudioMeaning},set:function(t){this.setSetting({key:"showAudioMeaning",value:t})}},showTextExample:{get:function(){return this.getSetting.optional.showTextExample},set:function(t){this.setSetting({key:"showTextExample",value:t})}},showTextExampleTranslate:{get:function(){return this.getSetting.optional.showTextExampleTranslate},set:function(t){this.setSetting({key:"showTextExampleTranslate",value:t})}},showAudioExample:{get:function(){return this.getSetting.optional.showAudioExample},set:function(t){this.setSetting({key:"showAudioExample",value:t})}}}),watch:{userInput:function(){var t=this;this.changeLettersStatus(),"secondAttempt"===this.gameStatus&&(this.isHideFadeAnswer=!0,setTimeout((function(){t.isHideFadeAnswer=!1}),1500))},gameStatus:function(t){var e=this;switch(t){case"finish":this.resetRoundVariables(),this.wordsCount===this.wordsPerDay?this.endGame():this.nextRound();break;case"learnGroupReq":this.isHideButtons=!1,setTimeout((function(){e.isHideButtons=!0,e.gameStatus="finish"}),3e3);break;case"secondAttempt":this.resetAttemptVariables();break;default:}}},created:function(){this.game()},mounted:function(){document.addEventListener("keypress",(function(){document.getElementById("inputField").focus()}),!1),this.appHtml([{one:"main",key:"drawer",value:!1},{one:"main",key:"breadcrumbs",value:!1},{one:"app",key:"background",value:"red"},{one:"app",key:"red",value:!0}])},beforeDestroy:function(){this.appHtml([{one:"main",key:"drawer",value:!0},{one:"main",key:"breadcrumbs",value:!0},{one:"app",key:"background",value:"grey lighten-5"},{one:"app",key:"colorWhite",value:!1}])},beforeUpdate:function(){},updated:function(){},methods:Object(o["a"])(Object(o["a"])(Object(o["a"])({},Object(c["d"])({appHtml:"EDIT_HTML",offStatistics:"SHOW_SHORT_STATISTICS",setSetting:"user/USER_SETTINGS"})),Object(c["b"])({getWords:"APP_GET_USER_WORDS_AGGREGATED",alert:"ALERT",wordProcessing:"APP_WORD_PROCESSING"})),{},{game:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getWords({group:0,wordsPerPage:t.wordsPerDay,filter:{$or:[{userWord:{$ne:null}},{userWord:null}]}});case 2:t.nextWord=t.words[t.wordsCount];case 3:case"end":return e.stop()}}),e)})))()},changeLettersStatus:function(){for(var t=this.userInput.toLowerCase(),e=this.nextWord.word.toLowerCase(),n=3,s=0,a=[],i=t.length>e.length?t.length:e.length,r=0;r<i;r+=1)t[r]===e[r]?a.push("result-success"):(a.push("result-failure"),s+=1);s>n&&(a=a.map((function(t){return"result-failure"===t?"".concat(t,"_big"):t}))),this.classForSymbols=a},addWordInDeleteCategory:function(){this.nextWord.userWord.isDelete=!0},getSentenceParts:function(t,e){var n=new RegExp("[".concat(e[0].toUpperCase()).concat(e[0].toLowerCase(),"]").concat(e.slice(1),"\\w?")),s=t.match(n)[0],a=t.split(s),r=Object(i["a"])(a,2),o=r[0],c=r[1];return{before:o,wordInText:s,after:c}},resetAttemptVariables:function(){this.isHideWord=!0,this.userInput="",this.classForSymbols=[]},resetRoundVariables:function(){this.isHideWord=!0,this.isHideFadeAnswer=!0,this.isHideSentences=!0,this.isGetWrongInput=!1,this.userInput="",this.classForSymbols=[],this.gameStatus="firstAttempt"}})},g=h,f=(n("0dd6"),n("2877")),m=n("6544"),w=n.n(m),x=n("8336"),v=n("8e36"),b=Object(f["a"])(g,s,a,!1,null,"c02b1966",null);e["default"]=b.exports;w()(b,{VBtn:x["a"],VProgressLinear:v["a"]})},c67c:function(t,e,n){var s=n("24fb"),a=n("1de5"),i=n("cbf5"),r=n("761c");e=s(!1);var o=a(i),c=a(r);e.push([t.i,".background[data-v-c02b1966]{width:100%;height:calc(100vh - 90px);background:url("+o+") no-repeat;background-size:cover;display:flex;justify-content:center}.card-container[data-v-c02b1966]{flex-direction:column;margin:auto;padding:5px;max-width:600px;min-height:450px;width:100%;border:1px solid #8b8484;border-radius:5px;box-shadow:0 3px .5rem #adadad;background-color:#fff}.card-container[data-v-c02b1966],.card-header[data-v-c02b1966]{display:flex;justify-content:space-between}.card-header[data-v-c02b1966]{height:15px;margin:5px 5% 10px;align-items:center}.card-header_repeat-progress[data-v-c02b1966]{display:flex;height:100%;width:-webkit-fit-content;width:-moz-fit-content;width:fit-content;align-items:center}.delete-button[data-v-c02b1966]{width:15px;height:15px;background-image:url("+c+");background-position:50%;background-size:contain}.dot[data-v-c02b1966]{width:.5rem;height:.5rem;background:#efe6e1;border-radius:50%;margin:0 .125rem}.dot-success[data-v-c02b1966]{background-color:#8bb9c1}.dot-failure[data-v-c02b1966]{background-color:#efe6e1}.learn-content_image-word[data-v-c02b1966]{display:flex;justify-content:space-around;flex-wrap:wrap}.learn-content_image[data-v-c02b1966]{max-width:250px;max-height:170px;margin-bottom:10px;border-radius:5px;overflow:hidden}.learn-content_word[data-v-c02b1966]{display:flex;flex-direction:column;align-items:center;justify-content:center;font-size:2rem;font-family:Roboto,Arial,sans-serif}.word_origin[data-v-c02b1966]{position:relative;border:1px solid #8b8484}.origin_container[data-v-c02b1966],.word_origin[data-v-c02b1966]{width:-webkit-fit-content;width:-moz-fit-content;width:fit-content}.origin_input[data-v-c02b1966]{z-index:11}.origin_fade-answer[data-v-c02b1966],.origin_input[data-v-c02b1966]{width:100%;position:absolute;top:0;left:0}.origin_fade-answer[data-v-c02b1966]{z-index:10;opacity:.5}.result-success[data-v-c02b1966]{text-decoration:underline;color:#a4d5a6}.result-failure[data-v-c02b1966]{color:#ffdf80}.result-failure_big[data-v-c02b1966]{color:#ffa98f}.success-result[data-v-c02b1966]{text-decoration:underline;color:#a4d5a6}.hidden[data-v-c02b1966]{visibility:hidden}.card-footer .v-btn[data-v-c02b1966]{margin-bottom:10px}.card-footer_buttons[data-v-c02b1966],.card-footer_next-button[data-v-c02b1966]{display:flex;justify-content:space-around;flex-wrap:wrap}.card-footer_progress-linear[data-v-c02b1966]{margin-top:5px}",""]),t.exports=e},cbf5:function(t,e,n){t.exports=n.p+"assets/img/fon3.ac273a1c.jpg"},efb8:function(t,e,n){var s=n("c67c");"string"===typeof s&&(s=[[t.i,s,""]]),s.locals&&(t.exports=s.locals);var a=n("499e").default;a("11ff9ada",s,!0,{sourceMap:!1,shadowMode:!1})}}]);