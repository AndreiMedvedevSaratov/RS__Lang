<template>
  <div class="savanna-game">
    <div class="container">
      <div class="savanna-game__wrapper">
        <h3 class="savanna-game__word">
          careful
        </h3>
        <ul class="savanna-game__healths">
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
          <li class="helth" />
        </ul>
        <ul class="savanna-game__word-list">
          <li class="word-list__item word-list__item--sucess">
            осторожный
          </li>
          <li class="word-list__item word-list__item--error">
            устаревший
          </li>
          <li class="word-list__item">
            беспокойный
          </li>
          <li class="word-list__item">
            счастливый
          </li>
        </ul>
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
	name: 'SavannaGame',
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

ul {
    padding: 0;
    margin: 0;
}

.container {
    padding-top: 0;
    padding-bottom: 0;
}
  .savanna-game {
    width: 100vw;
    height: 100vh;
    background: url("./main-bg.svg") no-repeat center;
    background-position-x: center;
    background-position-y: 100%;
    position: relative;
    padding-top: 60px;
        &__word {
        top: 0;
        font-size: 48px;
        line-height: 1;
        font-weight: 300;
        white-space: nowrap;
        color: #fff;
        letter-spacing: 1px;
        height: 100%;
        transform: translate(0);
        transition: transform 5s ease-in;
        position: absolute;
        transform-origin: 50% bottom;
        transition: all .3s ease;
        transform: translate(-50%);
        display: inline-block;
        left: 50%;
    }
    &__wrapper {
        position: relative;
        display: flex;
        align-items: center;
        height: 100vh;
        justify-content: center;
    }
    &__healths {
        position: absolute;
        top: 0;
        right: 0;
        list-style: none;
        width: 120px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        .helth {
            width: 20px;
            height: 20px;
            background: url("./hearth.svg") no-repeat center;
        }
    }
    &__word-list {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 0;
        list-style: none;
        .word-list__item {
            font-size: 24px;
            line-height: 30px;
            font-weight: 300;
            max-width: 270px;
            padding: 20px 15px 20px 30px;
            color: #fff;
            border-radius: 2px;
            cursor: pointer;
            margin: 0 20px;
            &:hover {
                background: hsla(0,0%,100%,.1);
            }
        }
    }

    .word-list__item--error {
        background: rgba(255,109,127,.3);
    }
    .word-list__item--sucess{
       background: rgba(80,227,194,.15);
    }

}

</style>
