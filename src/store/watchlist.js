import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      watchList: [
      ],
    };
  },
  mutations: {
    addToWatchList(state, show) {
      show.listed = true
      state.watchList.push(show)
      console.log(state.watchList)

    },
    removeFromWatchList(state, show) {
      state.watchList = state.watchList.filter(item => {item.imdbID !== show.imdbID})
      console.log(state.watchList)
    }
  }
});
