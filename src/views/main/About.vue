<template>
  <div class="about-team">
    <div class="about-team__wrapper">
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="12"
          md="6"
          class="aligh-center"
        >
          <h1 class="about-team__title">
            Dream Team 42
          </h1>
        </v-col>
        <v-col
          cols="12"
          md="6"
        >
          <iframe
            width="560"
            height="315"
            src=""
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          />
        </v-col>
      </v-row>
    </div>
    <div class="about-team__questions">
      <h2 class="questions__title">
        Here is short information about our team
      </h2>
      <ul class="questions__list">
        <li class="questions__item ">
          First question is "Why Dream Team 42?
          <p class="questions__anwear">
            Answer is simple - "Dream Team" - just because we are Dream Team
          </p>
        </li>
        <li class="questions__item ">
          First question is "Why Dream Team 42?
          <p class="questions__anwear">
            Answer is simple - "Dream Team" - just because we are Dream Team
          </p>
        </li>
        <li class="questions__item ">
          First question is "Why Dream Team 42?
          <p class="questions__anwear">
            Answer is simple - "Dream Team" - just because we are Dream Team
          </p>
        </li>
      </ul>
    </div>

    <div class="about-team__profile-page">
      <h3 class="profile-page__title">
        our team
      </h3>
      <div class="profile-page__wrapper">
        <div
          v-for="(item, i) in developers"
          :key="i"
          class="profile-page__item"
        >
          <div class="profile-page__img">
            <img
              :src="item.profilePicture"
              class="avatar_img"
            >

            <div class="profile-page__info">
              <div class="info__name">
                <span class="name">Name:</span> {{ item.name }}
              </div>
              <div class="info__name">
                <span class="name">Name:</span> {{ item.githubAccount }}
              </div>
              <div class="info__name">
                <span class="name">Name:</span> {{ item.emailAddress }}
              </div>
              <div class="info__name">
                <span class="name">Name:</span> {{ item.telephone }}
              </div>
              <div class="info__name">
                <p>{{ item.about }}</p>
              </div>
              <!-- <b>Name:</b> <u>{{ item.name }}</u>
          <b>Github account:</b> {{ item.githubAccount }}
          <b>E-mail:</b> {{ item.emailAddress }}
          <b>Telephone:</b> {{ item.telephone }}
          <b>About:</b> {{ item.about }} -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
	name: 'ProfilePage',
	data() {
		return {
			developers: [
				{
					name: 'Maksim Kapustin',
					profilePicture: './assets/img/Maksim_Kapustin.jpg',
					emailAddress: 'makskapustin90@gmail.com',
					githubAccount: 'https://github.com/TimeOfProgramming',
					telephone: '+7-927-057-34-99',
					about: 'He likes web development and he learn very fast.',
				},
				{
					name: 'Andrei Medvedev',
					profilePicture: './assets/img/Andrei_Medvedev.jpg',
					emailAddress: 'andreiok@gmail.com',
					githubAccount: 'https://github.com/andreimedvedevsaratov',
					telephone: '+7-917-215-19-68',
					about: `He is fulltime working in Import-Export Company now. Currently he is interesting in development of his
            		skills in Web programming. Computer programming was his dream from school years. But life happens
            		that he worked in other type of jobs. Now he is going to follow his earlier dreams and start to move toward it.`,
				},
				{
					name: 'Nurlan Kurbandurdyev',
					profilePicture: './assets/img/Nurlan_Kurbandurdyev.jpg',
					emailAddress: 'nurlan.wap3@gmail.com',
					githubAccount: 'https://github.com/ggnk',
					telephone: '+7-967-501-81-87',
					about:
						'He use web programming both in his work, for solving various tasks, and as a hobby. He want to become a professional in the field of web technologies.',
				},
				{
					name: 'Alexey Zhumaev',
					profilePicture: './assets/img/Alexey_Zhumaev.jpg',
					emailAddress: 'alex.zhumaev@mail.ru',
					githubAccount: 'https://github.com/alexey221284',
					telephone: '+7-904-244-04-62',
					about: `His goal is to gain experience and skills in the JavaScript programming language for further employment.
					His skills are HTML, CSS, the basics of JavaScript, and he also have some experience with the Webix and 1C Bitrix frameworks.`,
				},
				{
					name: 'Pavel Pronchatov',
					profilePicture: './assets/img/Pavel_Pronchatov.jpg',
					emailAddress: 'pavel.pronchatov155@gmail.ru',
					githubAccount: 'https://github.com/pavelponchatov',
					telephone: '+7-908-554-03-79',
					about:
						'He is studying at college and work as Junior Software Ingeneer',
				},
				{
					name: 'Mark Flerko',
					profilePicture: './assets/img/Mark_Flerko.jpg',
					emailAddress: 'markflerko@gmail.com',
					githubAccount: 'https://github.com/markflerko',
					telephone: '+375447314001',
					about: 'He developed PO "TKZ-RU" for "BelTEI"',
				},
				{
					name: 'Aliaksei Palanevich',
					profilePicture: './assets/img/Aliaksei_Palanevich.jpg',
					emailAddress: 'palanevich.aleksey@gmail.com',
					githubAccount: 'https://github.com/goldoragon',
					telephone: '+375299069001',
					about: `He likes: solve anything task (physics, logic, mathematical etc.); read and explore other people's solutions;
					to build his day as how he wants; work on an interesting project in a friendly team. So he’d like to find interesting things and good people.`,
				},
			],
		};
	},
	mounted() {
		// Перед началом игры изменим стиль страницы
		this.appHtml([
			// свернем меню
			{ one: 'main', key: 'drawer', value: false },
			// Уберем хлебные крошки
			{ one: 'main', key: 'breadcrumbs', value: false },
		]);
	},
	beforeDestroy() {
		// Перед закрытием страницы возращаем настройки обратно
		this.appHtml([
			{ one: 'main', key: 'drawer', value: true },
			{ one: 'main', key: 'breadcrumbs', value: true },
		]);
	},
	methods: {
		...mapMutations({
			appHtml: 'EDIT_HTML',
		}),
	},
};
</script>

<style scoped lang="scss">
.about-team {
	&__wrapper {
		width: 100%;
		height: calc(100vh - 88px);
		background-image: linear-gradient(120deg, #f6d365 0%, #fda085 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		margin-bottom: 100px;
	}
	&__title {
		color: #FFF;
		font-size: 100px;
	}
	.questions__title {
		color: #000;
		font-size: 48px;
		text-align: center;
		margin-bottom: 100px;
	}
	.questions__list {
		list-style-type: none;
		counter-reset: num;
		display: flex;
		justify-content: space-between;
		margin-bottom: 200px;
	}
	.questions__item {
		width: 30%;
		color: #000;
		font-size: 22px;
		opacity: 1;
		cursor: pointer;
		transition: color .3s;
		text-align: center;
		.questions__anwear {
			opacity: .6;
		}
		&:before {
			content: counter(num, decimal-leading-zero) ".";
			counter-increment: num;
			margin-right: 10px;
			color: #000;
		}
		&:hover {
			&::before {
				color: orange;
			}
		}
	}
	.profile-page {
		&__title {
			color: #000;
			font-size: 48px;
			text-align: center;
			margin-bottom: 100px;
			text-transform: uppercase;
		}
		&__wrapper {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
		}
		&__item {
			width: 31%;
			height: 500px;
			margin-bottom: 20px;
			cursor: pointer;
			&:hover {
				.profile-page__info {
					display: block;
				}
			}
		}
		&__img {
				width: 100%;
				height: 100%;
				position: relative;
			.avatar_img {
				width: 100%;
				height: 100%;
				border-radius: 15px;
			}
		}
		&__info {
			width: 100%;
			padding: 15px;
			display: none;
			animation: fadein .4s;
			border-radius: 15px;
			background-color: #FF9900;
			position: absolute;
			bottom: 0;
			left: 0;
			color: white;
			opacity: 1;
			.name {
				font-weight: 700;
			}
			&:hover {
				display: block;
			}
		}
	}
}

@keyframes fadein {
	from {
		bottom: -100%;
		opacity: 0;
	}
	to {
		bottom: 0;
		opacity: 1;
	}
}
</style>
