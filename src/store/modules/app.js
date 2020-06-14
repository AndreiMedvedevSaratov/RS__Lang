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

};

/**
 * Instructions for working with getters
 * link https://vuex.vuejs.org/api/#getters
 */
const getters = {
	auth: (state) => state.loggedIn,
	admin: (state) => state.setting.access_admin,
	root: (state) => state.setting.access_root,
	user: (state) => state.user,
};

const state = {
	user: [],
	setting: {
		access_admin: false,
		access_root: false,
		default: 1,
	},
	loggedIn: false,
};

export default {
	// namespaced false. To make it available throughout the project without special pointers.
	namespaced: false,
	state,
	getters,
	actions,
	mutations,
};
