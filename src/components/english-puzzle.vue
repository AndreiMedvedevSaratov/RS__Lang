<template lang='pug'>
	.f
		.result-word
        	.word-container
            .word-container
            .word-container
            .word-container
            .word-container
            .word-container
            .word-container
            .word-container
            .word-container
            .word-container
        .begin-word
        .fuck
        	.fuck2 f
        .button
            button.button__not-know.button_style I don't know
            button.button__check.button_style Check
</template>

<script>
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'English-puzzle',
	components: {},
	props: [],
	data: () => ({

	}),
	computed: {},
	watch: {},
	created() {},
	mounted() {},
	methods: {},

};

const book1 = [
    {
    "word": "agree",
    "image": "files/01_0001.jpg",
    "audio": "files/01_0001.mp3",
    "audioMeaning": "files/01_0001_meaning.mp3",
    "audioExample": "files/01_0001_example.mp3",
    "textMeaning": "To agree is to have the same opinion or belief as another person",
    "textExample": "The students agree they have too much homework",
    "transcription": "[əgríː]",
    "wordTranslate": "согласна",
    "textMeaningTranslate": "Согласиться - значит иметь то же мнение или убеждение, что и другой человек",
    "textExampleTranslate": "Студенты согласны, что у них слишком много домашней работы",
    "id": 1
  },
  {
    "word": "alcohol",
    "image": "files/01_0002.jpg",
    "audio": "files/01_0002.mp3",
    "audioMeaning": "files/01_0002_meaning.mp3",
    "audioExample": "files/01_0002_example.mp3",
    "textMeaning": "Alcohol is a type of drink that can make people drunk",
    "textExample": "A person should not drive a car after he or she has been drinking alcohol",
    "transcription": "[ǽlkəhɔ̀ːl]",
    "wordTranslate": "алкоголь",
    "textMeaningTranslate": "Алкоголь - это тип напитка, который может сделать людей пьяными",
    "textExampleTranslate": "Человек не должен водить машину после того, как он выпил алкоголь",
    "id": 2
  },
  {
    "word": "arrive",
    "image": "files/01_0003.jpg",
    "audio": "files/01_0003.mp3",
    "audioMeaning": "files/01_0003_meaning.mp3",
    "audioExample": "files/01_0003_example.mp3",
    "textMeaning": "To arrive is to get somewhere",
    "textExample": "They arrived at school at 7 a.m",
    "transcription": "[əráiv]",
    "wordTranslate": "прибыть",
    "textMeaningTranslate": "Приехать значит попасть куда-то",
    "textExampleTranslate": "Они прибыли в школу в 7 часов утра",
    "id": 3
  },
  {
    "word": "August",
    "image": "files/01_0004.jpg",
    "audio": "files/01_0004.mp3",
    "audioMeaning": "files/01_0004_meaning.mp3",
    "audioExample": "files/01_0004_example.mp3",
    "textMeaning": "August is the eighth month of the year",
    "textExample": "Is your birthday in August?",
    "transcription": "[ɔ́ːgəst]",
    "wordTranslate": "август",
    "textMeaningTranslate": "Август - восьмой месяц года",
    "textExampleTranslate": "У тебя день рождения в августе?",
    "id": 4
  },
  {
    "word": "boat",
    "image": "files/01_0005.jpg",
    "audio": "files/01_0005.mp3",
    "audioMeaning": "files/01_0005_meaning.mp3",
    "audioExample": "files/01_0005_example.mp3",
    "textMeaning": "A boat is a vehicle that moves across water",
    "textExample": "There is a small boat on the lake",
    "transcription": "[bout]",
    "wordTranslate": "лодка",
    "textMeaningTranslate": "Лодка - это транспортное средство, которое движется по воде",
    "textExampleTranslate": "На озере есть маленькая лодка",
    "id": 5
  },
  {
    "word": "breakfast",
    "image": "files/01_0006.jpg",
    "audio": "files/01_0006.mp3",
    "audioMeaning": "files/01_0006_meaning.mp3",
    "audioExample": "files/01_0006_example.mp3",
    "textMeaning": "Breakfast is the morning meal",
    "textExample": "I ate eggs for breakfast",
    "transcription": "[brekfəst]",
    "wordTranslate": "завтрак",
    "textMeaningTranslate": "Завтрак - это утренняя трапеза",
    "textExampleTranslate": "Я ел яйца на завтрак",
    "id": 6
  },
  {
    "word": "camera",
    "image": "files/01_0007.jpg",
    "audio": "files/01_0007.mp3",
    "audioMeaning": "files/01_0007_meaning.mp3",
    "audioExample": "files/01_0007_example.mp3",
    "textMeaning": "A camera is a piece of equipment that takes pictures",
    "textExample": "I brought my camera on my vacation",
    "transcription": "[kǽmərə]",
    "wordTranslate": "камера",
    "textMeaningTranslate": "Камера - это часть оборудования, которая делает снимки",
    "textExampleTranslate": "Я принес свою камеру в отпуск",
    "id": 7
  },
  {
    "word": "capital",
    "image": "files/01_0008.jpg",
    "audio": "files/01_0008.mp3",
    "audioMeaning": "files/01_0008_meaning.mp3",
    "audioExample": "files/01_0008_example.mp3",
    "textMeaning": "A capital is a city where a country’s government is based",
    "textExample": "The capital of the United States is Washington, D.C",
    "transcription": "[kæpətl]",
    "wordTranslate": "столица",
    "textMeaningTranslate": "Столица - это город, в котором базируется правительство страны",
    "textExampleTranslate": "Столица Соединенных Штатов - Вашингтон, округ Колумбия",
    "id": 8
  },
  {
    "word": "catch",
    "image": "files/01_0009.jpg",
    "audio": "files/01_0009.mp3",
    "audioMeaning": "files/01_0009_meaning.mp3",
    "audioExample": "files/01_0009_example.mp3",
    "textMeaning": "To catch is to grab or get something",
    "textExample": "Did you catch the ball during the baseball game?",
    "transcription": "[kætʃ]",
    "wordTranslate": "поймать",
    "textMeaningTranslate": "Поймать - значит схватить или получить что-то",
    "textExampleTranslate": "Вы поймали мяч во время игры в бейсбол?",
    "id": 9
  },
  {
    "word": "duck",
    "image": "files/01_0010.jpg",
    "audio": "files/01_0010.mp3",
    "audioMeaning": "files/01_0010_meaning.mp3",
    "audioExample": "files/01_0010_example.mp3",
    "textMeaning": "A duck is a small water bird",
    "textExample": "People feed ducks at the lake",
    "transcription": "[dʌk]",
    "wordTranslate": "утка",
    "textMeaningTranslate": "Утка - маленькая водяная птица",
    "textExampleTranslate": "Люди кормят уток у озера",
    "id": 10
  }
]

const game = () => {
  const widthPx = str => {
    return +str.match(/[0-9]/g).join('');
  }
  const sortArr = arr => {
    return arr.sort(() => Math.random() - 0.5)
   }
   let num = 0;
   const beginWord = document.querySelector('.begin-word');
   let str = book1[num].textExample;
   console.log(str)
   let strWithoutTrim = str.trim();
   const arr = str.split(' ');
   const countWords = arr.length;
   for (let i = 0; i < countWords; i++) {
    let div = document.createElement('div');
    div.className = 'gig gig_end';
    document.querySelectorAll('.word-container')[num].append(div)
   }
     for (let i = 0; i < countWords; i++) {
      let div = document.createElement('div');
      div.className = `gig gig_begin${num}`;
      beginWord.append(div)
     }

     for (let i = 0; i < countWords; i++) {
         let div = document.createElement('div');
         div.innerHTML = `${arr[i]}`;
         div.className = 'word';
         document.querySelectorAll(`.gig_begin${num}`)[i].append(div);
     }
    let word = document.querySelectorAll('.word');
    let map = new Map();
    for (let i = 0; i < countWords; i++) {
        let width = document.querySelectorAll('.word')[i].offsetWidth;
        map.set(`${i}`, `${width}`);
    }

    for (let i = 0; i < countWords; i++) {
        document.querySelectorAll('.word')[i].style.width = `${map.get(`${i}`)}px`
    }

    let moveX = 0;
    let moveY = 0
    for (let i = 0; i < countWords; i++) {
      if (i === 0) {
        word[i].style.backgroundPosition = `${moveX}px ${moveY}px`;
      } else if (i === 1) {
        moveX -= widthPx(word[i-1].style.width)
        word[i].style.backgroundPosition = `${moveX}px ${moveY}px`;
      } else {
        moveX -= widthPx(word[i-1].style.width);
        word[i].style.backgroundPosition = `${moveX}px ${moveY}px`;
      }
    }


    let y = Array.from(document.querySelectorAll(`.gig_begin${num}`))
    let sortY = sortArr(y);
    let strR = '';

    for (let i = 0; i < countWords; i++) {
      strR += sortY[i].outerHTML;
  }
  beginWord.innerHTML = `${strR}`;

    let newArr = [];

    for (let i = 0; i < countWords; i++) {
        newArr.push(0);
    }
    let g = document.querySelectorAll('.word');
    let h = document.querySelectorAll('.gig_end');
    for (let i = 0; i < g.length; i++) {
        g[i].addEventListener('click', (e) => {
            if(e.target.closest(`.gig_begin${num}`)) {
                for (let p = 0; p < newArr.length; p++){
                    if (newArr[p] === 0) {
                    document.querySelectorAll('.gig_end')[p].append(g[i]);
                    newArr.splice([p], 1, 1)
                    console.log(newArr)
                    break
                    }

                }

          } else if(e.target.closest('.gig_end')) {
              document.querySelectorAll(`.gig_begin${num}`)[i].append(g[i]);
          }
        })
    }

    for (let i = 0; i < h.length; i++) {
        h[i].addEventListener('click', (e) => {
            newArr.splice([i], 1, 0)
            console.log(newArr)
          })
        }
      }

export {game}



</script>
<style lang='scss' scoped>
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
}
html{
    box-sizing: border-box;
    font-size: 10px;
}

body {
    font-size: 1.6rem;
}

*, *::before, *::after{
    box-sizing: inherit;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
}

li {
    list-style: none;
}

a {
    text-decoration: none;
}

input {
    outline: none;
}
@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	src: url('../fonts/montserrat-v14-latin_cyrillic-regular.eot'); /* IE9 Compat Modes */
	src: local('Montserrat Regular'), local('Montserrat-Regular'),
		 url('../fonts/montserrat-v14-latin_cyrillic-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
		 url('../fonts/montserrat-v14-latin_cyrillic-regular.woff2') format('woff2'), /* Super Modern Browsers */
		 url('../fonts/montserrat-v14-latin_cyrillic-regular.woff') format('woff'), /* Modern Browsers */
		 url('../fonts/montserrat-v14-latin_cyrillic-regular.ttf') format('truetype'), /* Safari, Android, iOS */
}

@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url('../fonts/montserrat-v14-latin_cyrillic-700.eot'); /* IE9 Compat Modes */
	src: local('Montserrat Bold'), local('Montserrat-Bold'),
		 url('../fonts/montserrat-v14-latin_cyrillic-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
		 url('../fonts/montserrat-v14-latin_cyrillic-700.woff2') format('woff2'), /* Super Modern Browsers */
		 url('../fonts/montserrat-v14-latin_cyrillic-700.woff') format('woff'), /* Modern Browsers */
		 url('../fonts/montserrat-v14-latin_cyrillic-700.ttf') format('truetype'), /* Safari, Android, iOS */
  }
  body {
    font-family: 'Montserrat';
    font-style: normal;
    color: black;
}

.img {
    background: url('../img/nature.jpg') no-repeat;
    background-size: cover;
	width: 100%;
    height: 100vh;
}

.title {
	padding-top: 167px;
	font-size: 4rem;
	font-weight: 700;
	display: flex;
    justify-content: center;
}

.description {
	font-weight: 400;
	padding-top: 20px;
	display: flex;
    justify-content: center;
}

form {
	display: flex;
    justify-content: center;
    margin-top: 10px;
}

.form-wrapper {
	width: 369px;
    display: flex;
    flex-direction: column;
}

.input-email {
	display: flex;
    align-items: center;
    justify-content: space-between;
}

.input-password {
	margin-top: 11px;
	display: flex;
    justify-content: space-between;
    align-items: center;
}

label {
	cursor: pointer;
}

input {
	width: 220px;
    height: 30px;
    border: 1px solid #89C3D9;
    border-radius: 5px;
}

.button {
	display: flex;
    justify-content: center;
    margin-top: 12px;
}

.btn {
	width: 90px;
    height: 27px;
    margin-right: 19px;
    border-radius: 3px;
    outline: none;
    background: burlywood;
	border: 1px solid #F1DE9C;
	cursor: pointer;
}

.btn__register:hover {
	color: #fff
}

.btn__sign-in:hover {
	color: #fff
}

.start {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

.info {
    display: flex;
    justify-content: center;
    height: 20px;
    margin-top: 10px;
}

.result-word {
    width: 900px;
    height: 450px;
    background: aqua;
    margin: 0 auto;
    margin-top: 20px;

}

.begin-word {
    display: flex;
    justify-content: center;
    width: 900px;
    height: auto;
    margin: 10px auto 0px auto;
}

.word-container {
    display: flex;
    justify-content: center;
    width: 100%;
    width: 100%;
    height: 45px;
    background: brown;
    border: 1px solid;
    align-items: center;
}

.gig {
    flex-grow: 1;
    width: auto;
    min-width: 40px;
    height: 45px;
    background: burlywood;
    border: none;
    display: flex;
    justify-content: center;
}


.word {
    width: -webkit-fill-available;
    height: 45px;
    border: 1px solid;
    text-align: center;
    padding: 12px 5px 12px 5px;
    background: url('../img/girl.jpg') no-repeat;
}

.fuck {
    display: flex;
    width: 600px;
    font-size: 2px;
    background: cadetblue;
    margin: 0 auto;
    opacity: 1;
}

.button_style {
    width: 40px
}
</style>
