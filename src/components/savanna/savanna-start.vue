<template>
  <div class="savanna">
    <div class="container">
      <div class="savanna__wrapper">
        <h3 class="savanna__title">
          САВАННА
        </h3>
        <p class="savanna__desc">
          Тренировка Саванна развивает словарный запас.
          Чем больше слов ты знаешь, тем больше очков опыта получишь.
        </p>
        <router-link
          to="/savanna-game"
          class="savanna__btn"
        >
          Начать
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * API Vue
 * https://ru.vuejs.org/v2/api/index.html
 */
export default {
	name: 'Savanna',
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
</script>
<style lang='scss' scoped>
  .container {
    padding-top: 0;
    padding-bottom: 0;
  }
  .savanna {
    width: 100vw;
    height: 100vh;
    background: url("./main-bg.svg") no-repeat center;
    background-position-x: center;
    background-position-y: 100%;
    position: relative;
    &__title {
      font-size: 40px;
      font-weight: 300;
      line-height: 1;
      color: #6cffde;
      text-transform: uppercase;
      letter-spacing: 13px;
      text-align: center;
      margin-bottom: 60px;
    }
    &__desc {
      font-size: 18px;
      line-height: 24px;
      font-weight: 300;
      color: #fff;
      opacity: .8;
      text-align: center;
      margin: 0 auto 60px;
      max-width: 565px;

    }
    &__btn {
      width: 100%;
      font-size: 24px;
      font-weight: 300;
      line-height: 1;
      text-align: center;
      padding: 20px 15px;
      max-width: 190px;
      color: #fff;
      background: #00c49d;
      border-radius: 5px;
      outline: none;
      cursor: pointer;
      margin: 0 auto;
      text-decoration: none;
    }
    &__wrapper {
      display: flex;
      flex-direction: column;
      height: 100vh;
      justify-content: center;
    }
  }
</style>
