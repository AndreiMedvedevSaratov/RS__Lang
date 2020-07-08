/** Instructions for working with actions
 * link https://vuex.vuejs.org/api/#actions
 */
const actions = {

};

/**
 * Instructions for working with mutations
 * link https://vuex.vuejs.org/guide/mutations.html
 */
const mutations = {
	SPRINT_SHOW_STATISTICS: (state) => {
		state.showStatistics = !state.showStatistics;
	},
};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	showStatistics: (state) => state.showStatistics,
};

const state = {
	showStatistics: false,
};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
