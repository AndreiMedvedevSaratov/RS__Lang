<template lang='pug'>
	div.body-puzzle
		.modal-wrapper-puzzle
			p.text Извините, но для этой игры необходимо разрешение экрана не менее 900х640
		.main-wrapper-puzzle
			.header-puzzle
				.select_wrapper-puzzle
					label.level-puzzle
						select.select-puzzle-777(v-model="selected_level")
							option.option-puzzle(
								v-for="(item,i) in 6"
								:key="i"
								:value="item-1"
							) Level {{item}}
					label.page-puzzle
						select.select-puzzle-777.select-two-puzzle(v-model="selected_page")
							option.option-puzzle(
								v-for="(item_page,i) in 30"
								:key="i"
								:value="item_page-1"
							) Page {{item_page}}
				.smile
					.circle-puzzle
						.eyes-puzzle
					.circle-puzzle-one
						.eyes-puzzle-one
				.button_wrapper-puzzle
					button#button_1(
						@click="audiohint"
					)
					button#button_2(
						@click="texthint"
					)
					button#button_3(
						@click="audiomeaning"
					)
					button#button_4(
						@click="img"
					)
			.hunt-puzzle
				p#textExampleTranslate
			.result-word-puzzle(
				ref="resultWord"
			)
				.word-container-puzzle(
					v-for="(item, i) in 10"
					:key="i"
					ref="wordContainer"
				)
			.begin-word-puzzle(
				ref="beginWord"
			)
			.button-puzzle
				div(
					v-if="gameStatus"
				)
					button.button__not-know-puzzle.button_style-puzzle(
						@click="dontKnow"
						ref="dontKnow"
					) I don't know
					button.button__check-puzzle.button_style-puzzle(
						@click="check"
						ref="check"
					) Check
					button.button__continue-puzzle.button_style-puzzle(
						@click="continueWord"
						ref="continueWord"
					) Continue
					button.button__result-puzzle.button_style-puzzle(
						@click="results"
						ref="results"
					) Result
					button.button__check-puzzle.button_style-puzzle(
					v-if="!gameStatus"
				) Next level
			vModal( :words="{ correct: correctWords, wrong: wrongWords }"
				:textExample="true")
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';
import vModal from './modal/ModalShortStat.vue';
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'EnglishPuzzle',
	components: {
		vModal,
	},
	props: [],
	data: () => ({
		num: 0,
		wordRight: null,
		moveY: 0,
		gameStatus: false,
		imgSrc: 0,
		arr: null,
		booleanForCheck: false,
		selected_level: 0,
		selected_page: 0,
		continueCount: 0,
		nameGallery: ['Иван Айвазовский - Девятый вал (1850 г.)', 'Иван Шишкин - Утро в сосновом лесу (1889 г.)', 'Карл Брюллов - Последний день Помпеи (1833 г.)',
			'Алексей Саврасов - Плоты (1868 г.)', 'Алексей Саврасов - Грачи прилетели (1871 г.)', 'Илья Репин - Бурлаки на Волге (1870 - 1873 гг.)',
			'Иван Шишкин - Рожь (1878 г.)'],
		correctWords: [],
		wrongWords: [],
		loading: false,
	}),
	computed: {
		...mapGetters({
			words: 'getWords',
			urlFiles: 'getUrlFiles',
			getShortStatistics: 'showShortStatistics',
		}),
		showStatistics: {
			get() {
				return this.getShortStatistics;
			},
			set() {
				this.offStatistics();
			},
		},
	},
	watch: {
		selected_level() {
			this.watch_load_game();
		},
		selected_page() {
			this.watch_load_game();
		},
	},
	created() {
	},
	mounted() {
		this.eyes();
		this.local();
		this.game();
		this.appHtml([
			{ one: 'main', key: 'drawer', value: false },
			{ one: 'main', key: 'breadcrumbs', value: false },
			{ one: 'app', key: 'background', value: 'light-green darken-4' },
			{ one: 'app', key: 'colorWhite', value: true },
		]);
	},
	beforeDestroy() {
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
			{ one: 'app', key: 'background', value: 'grey lighten-5' },
			{ one: 'app', key: 'colorWhite', value: false },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
			offStatistics: 'SHOW_SHORT_STATISTICS',
		}),
		...mapActions({
			wordsAction: 'APP_GET_USER_WORDS_AGGREGATED',
			alertAction: 'ALERT',
			wordProcessing: 'APP_WORD_PROCESSING',
		}),

		eyes() {
			window.addEventListener('mousemove', (event) => {
				const arctg = (x, y) => {
					let a = null;
					if (x > 0 && y > 0) {
						a = Math.PI / 2 - Math.atan(x / y);
					}
					if (x < 0 && y > 0) {
						a = Math.PI / 2 - Math.atan(x / y);
					}
					if (x < 0 && y < 0) {
						a = Math.PI + Math.atan(y / x);
					}
					if (x > 0 && y < 0) {
						a = 3 * (Math.PI / 2) + Math.abs(Math.atan(x / y));
					}
					return a * 57.2958;
				};
				const { x, y } = { x: event.x, y: event.y };
				const left = +document.querySelector('.circle-puzzle').getBoundingClientRect().left;
				const top = +document.querySelector('.circle-puzzle').getBoundingClientRect().top;
				document.querySelector('.circle-puzzle').style.transform = `rotate(${arctg(x - left - 20, y - top - 20)}deg)`;
				document.querySelector('.circle-puzzle-one').style.transform = `rotate(${arctg(x - left - 20, y - top - 20)}deg)`;
			});
		},

		async game() {
			localStorage.setItem('level', this.selected_level);
			localStorage.setItem('page', this.selected_page);
			await this.wordsAction({
				group: this.selected_level,
				page: this.selected_page,
				filter: {
					$or: [
						{
							userWord: { $ne: null },
						},
						{
							userWord: null,
						},
					],
				},
			});
			this.gameStatus = true;
			const widthPx = (str) => +str.match(/[0-9]/g).join('');
			const sortArr = (arr) => arr.sort(() => Math.random() - 0.5);
			const clearWords = (string) => {
				let newStr = '';
				const str = string.trim();
				for (let i = 0; i < str.length; i += 1) {
					if (str[i] === ',') {
						i += 1;
					}
					if (str[i] === '<' || str[i] === ',') {
						while (str[i] !== '>') {
							i += 1;
						}
					} else if (str[i] === '.' && i + 1 === str.length) {
						return newStr;
					} else if ((str[i] === '.' && str[i + 1] !== ' ') || (str[i] === '.' && str[i + 1] === ' ')) {
						newStr += str[i];
					} else {
						newStr += str[i];
					}
				}
				return newStr;
			};

			const { beginWord, wordContainer } = this.$refs;
			const str = this.words[this.num].textExample;
			const arrWord = clearWords(str).split(' ');
			this.arr = arrWord;
			const countWords = this.arr.length;
			wordContainer[this.num].innerHTML = '';
			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.className = `gig-puzzle gig_end-puzzle${this.num}`;
				wordContainer[this.num].append(div);
			}
			beginWord.innerHTML = '';
			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.className = `gig-puzzle gig_begin-puzzle${this.num}`;
				beginWord.append(div);
			}
			for (let i = 0; i < countWords; i += 1) {
				const div = document.createElement('div');
				div.innerHTML = `${this.arr[i]}`;
				div.className = `word-puzzle word-puzzle${this.num}`;
				div.setAttribute('draggable', true);
				document.querySelectorAll(`.gig_begin-puzzle${this.num}`)[i].append(div);
			}
			// Array div word
			const wordAll = document.querySelectorAll(`.word-puzzle${this.num}`);
			this.wordRight = wordAll;
			let sumWidth = 0;
			const map = new Map();
			for (let i = 0; i < countWords; i += 1) {
				const width = wordAll[i].offsetWidth;
				map.set(`${i}`, `${width}`);
			}

			for (let i = 0; i < countWords; i += 1) {
				wordAll[i].style.width = `${map.get(`${i}`)}px`;
				sumWidth += +map.get(`${i}`);
			}

			if (sumWidth > 900) {
				sumWidth -= 900;
				wordAll[wordAll.length - 1].style.width = `${+map.get(`${wordAll.length - 1}`) - sumWidth}px`;
			} else if (sumWidth < 900) {
				sumWidth = 900 - sumWidth;
				wordAll[wordAll.length - 1].style.width = `${+map.get(`${wordAll.length - 1}`) + sumWidth}px`;
			}
			if (localStorage.getItem('img')) {
				const img = +localStorage.getItem('img');
				this.imgSrc = img;
				for (let i = 0; i < countWords; i += 1) {
					wordAll[i].style.backgroundImage = `url(./assets/img/${img}.jpg)`;
				}
			} else {
				for (let i = 0; i < countWords; i += 1) {
					wordAll[i].style.backgroundImage = `url(./assets/img/${this.imgSrc}.jpg)`;
				}
			}

			let moveX = 0;

			if (this.num > 0) {
				this.moveY -= 45;
			}
			for (let i = 0; i < countWords; i += 1) {
				if (this.num === 0) {
					if (i === 0) {
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else if (i === 1) {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					}
				}
				if (this.num > 0) {
					if (i === 0) {
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else if (i === 1) {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					} else {
						moveX -= widthPx(wordAll[i - 1].style.width);
						wordAll[i].style.backgroundPosition = `${moveX}px ${this.moveY}px`;
					}
				}
			}

			const y = Array.from(document.querySelectorAll(`.gig_begin-puzzle${this.num}`));
			const sortY = sortArr(y);
			let strR = '';

			for (let i = 0; i < countWords; i += 1) {
				strR += sortY[i].outerHTML;
			}
			beginWord.innerHTML = `${strR}`;

			const newArr = [];

			for (let i = 0; i < countWords; i += 1) {
				newArr.push(0);
			}

			const gigEnd = document.querySelectorAll(`.gig_end-puzzle${this.num}`);
			const newWordAll = document.querySelectorAll(`.word-puzzle${this.num}`);
			for (let i = 0; i < newWordAll.length; i += 1) {
				newWordAll[i].classList.add('img-none-puzzle');
			}
			for (let i = 0; i < newWordAll.length; i += 1) {
				newWordAll[i].addEventListener('click', (e) => {
					if (this.booleanForCheck) {
						return 1;
					}
					if (e.target.closest(`.gig_begin-puzzle${this.num}`)) {
						for (let p = 0; p < newArr.length; p += 1) {
							if (newArr[p] === 0) {
								document.querySelectorAll(`.gig_end-puzzle${this.num}`)[p].append(newWordAll[i]);
								newArr.splice([p], 1, 1);
								if (!newArr.includes(0)) {
									document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
								}
								break;
							}
						}
					} else if (e.target.closest(`.gig_end-puzzle${this.num}`)) {
						document.querySelectorAll(`.gig_begin-puzzle${this.num}`)[i].append(newWordAll[i]);
					}
					return 1;
				});
			}

			for (let i = 0; i < gigEnd.length; i += 1) {
				gigEnd[i].addEventListener('click', () => {
					newArr.splice([i], 1, 0);
				});
			}

			function dragStart() {
				setTimeout(() => {
					this.classList.add('hide-puzzle');
				}, 0);
			}
			function dragEnd() {
				this.classList.remove('hide-puzzle');
			}

			function dragOver(event) {
				event.preventDefault();
			}
			function dragEnter() {
				this.classList.add('hovered-puzzle');
			}
			function dragLeave() {
				this.classList.remove('hovered-puzzle');
			}
			let target = null;
			let runRight = false;
			let runLeft = false;
			document.addEventListener('mousedown', (e) => {
				target = e.target;
			});
			function dragDrop() {
				runRight = false;
				runLeft = false;
				for (let i = 0; i < gigEnd.length; i += 1) {
					if (this === gigEnd[i]) {
						if (gigEnd[i].innerHTML) {
							if (this.firstChild === target) {
								return 1;
							}
							if (i !== 0 && gigEnd[i - 1].firstElementChild === target) {
								const a = gigEnd[i].firstElementChild;
								gigEnd[i].innerHTML = '';
								gigEnd[i - 1].append(a);
								gigEnd[i].append(target);
								newArr.splice([i], 1, 1);
								newArr.splice([i + 1], 1, 1);
							} else if (i !== gigEnd.length - 1 && gigEnd[i + 1].firstElementChild === target) {
								const a = gigEnd[i].firstElementChild;
								gigEnd[i].innerHTML = '';
								gigEnd[i + 1].append(a);
								gigEnd[i].append(target);
								newArr.splice([i], 1, 1);
								newArr.splice([i + 1], 1, 1);
							} else {
								for (let j = i; j < gigEnd.length; j += 1) {
									if (!gigEnd[j].innerHTML) {
										runRight = true;
									}
								}
								for (let k = i; k >= 0; k -= 1) {
									if (!gigEnd[k].innerHTML) {
										runLeft = true;
									}
								}
								if (!runRight && !runLeft) {
									for (let h = 0; h < gigEnd.length; h += 1) {
										if (target === gigEnd[h].firstElementChild) {
											for (let q = 0; q < gigEnd.length; q += 1) {
												if (this === gigEnd[q]) {
													if (h > q) {
														const a = gigEnd[h].firstElementChild;
														let b = gigEnd[q].firstElementChild;
														gigEnd[h].innerHTML = '';
														gigEnd[q].innerHTML = '';
														gigEnd[q].append(a);
														for (let p = q + 1; p <= h; p += 1) {
															const c = gigEnd[p].firstElementChild;
															gigEnd[p].innerHTML = '';
															gigEnd[p].append(b);
															b = c;
														}
													}
													if (h < q) {
														const a = gigEnd[h].firstElementChild;
														let b = gigEnd[q].firstElementChild;
														gigEnd[h].innerHTML = '';
														gigEnd[q].innerHTML = '';
														gigEnd[q].append(a);
														for (let p = q - 1; p >= h; p -= 1) {
															const c = gigEnd[p].firstElementChild;
															gigEnd[p].innerHTML = '';
															gigEnd[p].append(b);
															b = c;
														}
													}
												}
											}
										}
									}
								}
								if (runRight) {
									let a = gigEnd[i].firstElementChild;
									gigEnd[i].innerHTML = '';
									gigEnd[i].append(target);
									for (let p = i + 1; p < gigEnd.length; p += 1) {
										if (gigEnd[p].innerHTML) {
											const c = gigEnd[p].firstElementChild;
											gigEnd[p].innerHTML = '';
											gigEnd[p].append(a);
											newArr.splice([p], 1, 1);
											if (!newArr.includes(0)) {
												document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
											}
											a = c;
										} else {
											gigEnd[p].append(a);
											newArr.splice([p], 1, 1);
											if (!newArr.includes(0)) {
												document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
											}
											return 1;
										}
									}
									console.log(newArr);
								}
								if (runLeft) {
									let a = gigEnd[i].firstElementChild;
									gigEnd[i].innerHTML = '';
									gigEnd[i].append(target);
									for (let p = i - 1; p >= 0; p -= 1) {
										if (gigEnd[p].innerHTML) {
											const c = gigEnd[p].firstElementChild;
											gigEnd[p].innerHTML = '';
											gigEnd[p].append(a);
											if (!newArr.includes(0)) {
												document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
											}
											a = c;
										} else {
											gigEnd[p].append(a);
											newArr.splice([p], 1, 1);
											if (!newArr.includes(0)) {
												document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
											}
											console.log(newArr);
											return 1;
										}
									}
									console.log(newArr);
								}
							}
						} else {
							gigEnd[i].append(target);
							newArr.splice([i], 1, 1);
						}
					}
				}
				for (let i = 0; i < gigEnd.length; i += 1) {
					if (!gigEnd[i].innerHTML) {
						newArr.splice([i], 1, 0);
					}
					if (!newArr.includes(0)) {
						document.querySelector('.button__check-puzzle').classList.add('visibble-btn-puzzle');
					}
				}
				// this.append(target)
				this.classList.remove('hovered-puzzle');
				return 1;
			}

			gigEnd.forEach((item) => {
				item.addEventListener('dragover', dragOver);
				item.addEventListener('dragenter', dragEnter);
				item.addEventListener('dragleave', dragLeave);
				item.addEventListener('drop', dragDrop);
			});
			wordAll.forEach((item) => {
				item.addEventListener('dragstart', dragStart);
				item.addEventListener('dragend', dragEnd);
			});
		},

		dontKnow() {
			this.deletehint();
			const wordBefore = document.querySelectorAll(`.word-puzzle${this.num}`);
			document.querySelector('.button__check-puzzle').classList.remove('visibble-btn-puzzle');
			document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
			for (let i = 0; i < wordBefore.length; i += 1) {
				this.$refs.beginWord.innerHTML = '';
				document.querySelectorAll(`.gig_end-puzzle${this.num}`)[i].innerHTML = '';
			}
			for (let i = 0; i < wordBefore.length; i += 1) {
				document.querySelectorAll(`.gig_end-puzzle${this.num}`)[i].innerHTML = this.wordRight[i].outerHTML;
			}
			const wordAfter = document.querySelectorAll(`.word-puzzle${this.num}`);
			for (let i = 0; i < wordBefore.length; i += 1) {
				wordAfter[i].setAttribute('draggable', 'false');
				wordAfter[i].classList.remove('img-none-puzzle');
			}
			document.querySelector('.button__continue-puzzle').classList.add('visibble-btn-puzzle');
			document.querySelector('.button__check-puzzle').classList.remove('visibble-btn-puzzle');
			document.querySelector('.button__not-know-puzzle').classList.remove('visibble-btn-puzzle');
			this.audiohint();
			this.texthint();
			document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
			this.booleanForCheck = false;
		},

		check() {
			const wordBefore = document.querySelectorAll(`.word-puzzle${this.num}`);
			const wordAll = document.querySelectorAll(`.word-puzzle${this.num}`);
			document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
			let count = 0;
			if (this.booleanForCheck) {
				return 1;
			}
			for (let i = 0; i < wordBefore.length; i += 1) {
				wordBefore[i].setAttribute('draggable', 'false');
			}
			for (let i = 0; i < wordAll.length; i += 1) {
				wordAll[i].classList.remove('right-puzzle');
				wordAll[i].classList.remove('wrong-puzzle');
			}
			for (let i = 0; i < wordAll.length; i += 1) {
				if (wordAll[i].closest(`.gig_end-puzzle${this.num}`)) {
					if (wordAll[i].innerHTML === this.arr[i]) {
						wordAll[i].classList.add('right-puzzle');
						count += 1;
					} else {
						wordAll[i].classList.add('wrong-puzzle');
						document.querySelector('.button__not-know-puzzle').classList.add('visibble-btn-puzzle');
					}
				} else {
					wordAll[i].classList.add('wrong-puzzle');
				}
				if (count === wordAll.length) {
					document.querySelector('.button__continue-puzzle').classList.add('visibble-btn-puzzle');
					this.stat(true, this.words[this.num]);
					for (let j = 0; j < wordBefore.length; j += 1) {
						wordBefore[j].classList.remove('img-none-puzzle');
					}
					this.audiohint();
					this.texthint();
					document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
					document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
					document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
					document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
				}
			}
			if (count !== wordAll.length) {
				this.stat(false, this.words[this.num]);
			}
			this.booleanForCheck = true;
			return 1;
		},

		continueWord() {
			this.deletehint();
			this.continueCount += 1;
			if (this.continueCount === 10) {
				const wordAll = document.querySelectorAll('.word-puzzle');
				for (let i = 0; i < wordAll.length; i += 1) {
					wordAll[i].innerHTML = '';
					wordAll[i].classList.add('border-none-puzzle');
				}
				document.querySelector('.button__check-puzzle').classList.remove('visibble-btn-puzzle');
				document.querySelector('.button__result-puzzle').classList.add('visibble-btn-puzzle');
				document.querySelector('.begin-word-puzzle').innerHTML = this.nameGallery[this.imgSrc];
				return 1;
			}
			if (this.continueCount === 11) {
				if (this.imgSrc < 6) {
					this.imgSrc += 1;
					localStorage.setItem('img', this.imgSrc);
				} else {
					this.imgSrc = 0;
					localStorage.setItem('img', this.imgSrc);
				}
				this.continueCount = 0;
				if (this.selected_level === 5 && this.selected_page === 29) {
					this.selected_level = 0;
					this.selected_page = 0;
				} else if (this.selected_page === 29) {
					this.selected_level += 1;
					this.selected_page = 0;
				} else {
					this.selected_page += 1;
				}
				document.querySelector('.button__result-puzzle').classList.remove('visibble-btn-puzzle');
				document.querySelector('.button__continue-puzzle').classList.remove('visibble-btn-puzzle');
				return 1;
			}

			this.booleanForCheck = false;
			const wordBefore = document.querySelectorAll(`.word-puzzle${this.num}`);
			for (let i = 0; i < wordBefore.length; i += 1) {
				this.$refs.beginWord.innerHTML = '';
				document.querySelectorAll(`.gig_end-puzzle${this.num}`)[i].innerHTML = '';
			}
			for (let i = 0; i < wordBefore.length; i += 1) {
				document.querySelectorAll(`.gig_end-puzzle${this.num}`)[i].innerHTML = this.wordRight[i].outerHTML;
			}
			const wordAfter = document.querySelectorAll(`.word-puzzle${this.num}`);
			for (let i = 0; i < wordBefore.length; i += 1) {
				wordAfter[i].setAttribute('draggable', 'false');
			}
			if (this.num < 9) {
				this.num += 1;
				this.game();
			} else {
				this.gameStatus = false;
				this.alertAction({ status: 'success', data: 'Game over' });
			}
			document.querySelector('.button__continue-puzzle').classList.remove('visibble-btn-puzzle');
			document.querySelector('.button__check-puzzle').classList.remove('visibble-btn-puzzle');
			document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
			return 1;
		},

		img() {
			if (document.querySelector('#button_4').classList.contains('btn-opacity-puzzle')) {
				return 1;
			}
			const wordAllImg = document.querySelectorAll(`.word-puzzle${this.num}`);
			for (let i = 0; i < wordAllImg.length; i += 1) {
				wordAllImg[i].classList.remove('img-none-puzzle');
			}
			document.querySelector('#button_4').classList.add('btn-opacity-puzzle');
			return 1;
		},
		async stat(correct, word) {
			if (correct) {
				this.correctWords.push(word);

				return;
			}
			this.wrongWords.push(word);
			await this.wordProcessing({ word, right: correct, offDate: false });
		},

		results() {
			this.showStatistics = true;
		},
		audiohint() {
			// const audio = new Audio(this.isUrlFiles + this.words[this.num].audioExample);
			// await audio.play();
			// console.log(this.isUrlFiles);
			if (document.querySelector('#button_1').classList.contains('btn-opacity-puzzle')) {
				return 1;
			}
			const audio = new Audio(this.urlFiles + this.words[this.num].audioExample);
			audio.play();
			document.querySelector('#button_1').classList.add('btn-opacity-puzzle');
			return 1;
		},
		texthint() {
			if (document.querySelector('#button_2').classList.contains('btn-opacity-puzzle')) {
				return 1;
			}
			document.getElementById('textExampleTranslate').innerText = this.words[this.num].textExampleTranslate;
			document.querySelector('#button_2').classList.add('btn-opacity-puzzle');
			return 1;
		},
		audiomeaning() {
			if (document.querySelector('#button_3').classList.contains('btn-opacity-puzzle')) {
				return 1;
			}
			const audio = new Audio(this.urlFiles + this.words[this.num].audioMeaning);
			audio.play();
			document.querySelector('#button_3').classList.add('btn-opacity-puzzle');
			return 1;
		},
		deletehint() {
			document.getElementById('textExampleTranslate').innerText = '';
		},
		local() {
			if (localStorage.getItem('level')) {
				this.selected_level = +localStorage.getItem('level');
				this.selected_page = +localStorage.getItem('page');
			}
		},
		watch_load_game() {
			document.querySelectorAll('.word-container-puzzle').forEach((item) => {
				const a = item;
				a.innerHTML = '';
			});
			const {
				continueWord, check, dontKnow, results,
			} = this.$refs;
			if (continueWord) continueWord.classList.remove('visibble-btn-puzzle');
			if (check) check.classList.remove('visibble-btn-puzzle');
			if (dontKnow) dontKnow.classList.remove('visibble-btn-puzzle');
			if (results) results.classList.remove('visibble-btn-puzzle');

			document.querySelector('#button_1').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_2').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_3').classList.remove('btn-opacity-puzzle');
			document.querySelector('#button_4').classList.remove('btn-opacity-puzzle');
			this.num = 0;
			this.moveY = 0;
			this.booleanForCheck = false;
			this.continueCount = 0;
			this.game();
			this.deletehint();
		},
	},
};

</script>
<style lang='scss'>

@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 400;
	src: url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.eot');
	src: local('Montserrat Regular'), local('Montserrat-Regular'),
url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.eot?#iefix') format('embedded-opentype'),
url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.woff2') format('woff2'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.woff') format('woff'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-regular.ttf') format('truetype'),
}

@font-face {
	font-family: 'Montserrat';
	font-style: normal;
	font-weight: 700;
	src: url('../assets/fonts/montserrat-v14-latin_cyrillic-700.eot');
	src: local('Montserrat Bold'), local('Montserrat-Bold'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.eot?#iefix') format('embedded-opentype'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff2') format('woff2'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.woff') format('woff'),
		url('../assets/fonts/montserrat-v14-latin_cyrillic-700.ttf') format('truetype'),
  }

.body-puzzle {
	font-family: 'Montserrat';
	font-style: normal;
	color: #33691E;
	user-select: none;
}

.header-puzzle {
	width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    flex-wrap: wrap;
	margin-top: 20px;
}

.img-none-puzzle {
	background-image: unset !important;
	background-color: #C2B4A2;
}

.title-puzzle {
	padding-top: 167px;
	font-size: 4rem;
	font-weight: 700;
	display: flex;
	justify-content: center;
}

.description-puzzle {
	font-weight: 400;
	padding-top: 20px;
	display: flex;
	justify-content: center;
}

.form-wrapper-puzzle {
	width: 369px;
	display: flex;
	flex-direction: column;
}

.button-puzzle {
	display: flex;
	justify-content: center;
	margin-top: 12px;
}

.btn-puzzle {
	width: 90px;
	height: 27px;
	margin-right: 19px;
	border-radius: 3px;
	outline: none;
	background: #a8d06f;
	border: 1px solid #a8d06f;
	cursor: pointer;
}

.btn__register-puzzle:hover {
	color: #a8d06f;
}

.btn__sign-in-puzzle:hover {
	color: #a8d06f;
}

.start-puzzle {
	display: flex;
	justify-content: center;
	margin-top: 20px;
}

.result-word-puzzle {
	width: 900px;
	height: 450px;
	background: #33691E;
	margin: 0 auto;
	margin-top: 0px;
	border: 1px solid;
}

.begin-word-puzzle {
	display: flex;
    justify-content: center;
    width: 900px;
    height: 45px;
    margin: 25px auto 0px auto;
    align-items: center;
}

.word-container-puzzle {
	display: flex;
	justify-content: center;
	width: 100%;
	height: 45px;
	background: #d7e5d2;
	align-items: center;
}

.word-container-puzzle:last-child {
	border-bottom: 1px solid;
}

.gig-puzzle {
	flex-grow: 1;
	width: auto;
	min-width: 40px;
	height: 45px;
	background: #a8d06f;
	border: none;
	display: flex;
	justify-content: center;
	color: blanchedalmond;
	font-weight: bold;
}

.word-puzzle {
	width: -webkit-fill-available;
	height: 45px;
	border: 1px solid blanchedalmond;
	text-align: center;
	padding: 7px 5px 8px 5px;
	background-repeat: no-repeat;
	cursor: pointer;
	-webkit-text-stroke: 1px white;
    color: black;
	font-size: 20px;
}

.border-none-puzzle {
	border: none
}

.button_style-puzzle {
	padding: 10px 30px 10px 30px;
	cursor: pointer;
	border: 1px solid;
	border-radius: 5px;
	background: #33691E;
	color: white;
	font-family: 'Montserrat';
	width: 180px;
	height: 50px;
	position: relative;
	top: 5px;
    font-weight: bold;
}

.button__check-puzzle {
	display: none;
	margin-left: 10px;
}

.button__result-puzzle {
	display: none;
	margin-left: 10px;
}

.button__continue-puzzle {
	display: none;
}

.button__not-know-puzzle {
	display: none;
}

.visibble-btn-puzzle {
	display: inline-block;
}

.right-puzzle {
	box-shadow: 0 0 5px #33691E;
}

.wrong-puzzle {
	box-shadow: 0 0 5px red;
}

.hide-puzzle {
	display: none;
}

/*мой код*/

#button_1, #button_2, #button_3, #button_4 {
	width: 40px;
	height: 40px;
	margin-left: 5px;
	color: #33691E;
	border-radius: 5px;
}

#selectbox1, #selectbox2 {
	width: 75px;
	height: 40px;
	margin-right: 5px;
	color: #33691E;
	border-radius: 5px;
	border: solid 1px #33691E;
	font-family: 'Montserrat';
	font-size: 14px;
}

#button_1 {
	background: url("../assets/img/111.png") no-repeat;
}
#button_2 {
	background: url("../assets/img/222.png") no-repeat;
}

#button_3 {
	background: url("../assets/img/333.png") no-repeat;
}

#button_4 {
	position: relative;
	background: url("../assets/img/444.jpg") no-repeat;
}

.hunt-puzzle {
	width: 900px;
    color: #757D72;
    font-size: 15px;
    font-weight: bold;
    font-family: "Montserrat";
    text-align: center;
    margin: 0 auto;
    margin-bottom: 15px;
	height: 25px;
}

.select-puzzle-777 {
	border: solid 2px #33691E;
	border-radius: 5px;
	color: #33691E;
	font-weight: 700;
	text-align-last: center;
    padding: 5px 25px 5px 10px;
    -moz-text-align-last: center;
    text-align-last: center;
	cursor: pointer;
}

.select-two-puzzle {
	margin-left: 20px;
}

.option-puzzle {
	text-align: center;
}

#textExampleTranslate {
	margin-bottom: 0px;
}

.btn-opacity-puzzle {
	opacity: 0.5;
}

.modal-wrapper-puzzle {
	display: none;
    width: 230px;
    height: 100px;
    background: aquamarine;
    margin: 90px auto 0px auto;
    text-align: center;
    font-size: 14px;
    border-radius: 4px;
    padding: 17px;
}

.text-puzzle {
	margin-bottom: 0px !important;
}

.circle-puzzle {
	position: relative;
	width: 40px;
	height: 40px;
	border: 1px solid green;
	border-radius: 100%;
}

.eyes-puzzle {
	position: absolute;
    width: 10px;
    height: 10px;
    background-color: green;
    border-radius: 100%;
    left: 23px;
    top: 15px;
}
.circle-puzzle-one {
	position: relative;
	width: 40px;
	height: 40px;
	border: 1px solid green;
	border-radius: 100%;
}

.eyes-puzzle-one {
	position: absolute;
    width: 10px;
    height: 10px;
    background-color: green;
    border-radius: 100%;
    left: 23px;
    top: 15px;
}

.smile {
	display: flex;
}

@media (max-width: 990px) {
	.main-wrapper-puzzle {
		display: none;
	}

	.modal-wrapper-puzzle {
		display: block;
	}
}
</style>
