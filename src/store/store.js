import { createStore } from "vuex";
import { ref } from "vue";

export const store = createStore({
  state() {
    return {
      watchList: [],
      typeOfShow: ref(""),
      yearOfRelease: Number(new Date().getFullYear()),
      searchString: ref("star"),
    };
  },
  mutations: {
    addToWatchList(state, show) {
      show.listed = true
      state.watchList.push(show)
      console.log(state.watchList)
    },
    removeFromWatchList(state, id) {
      let arr = state.watchList
      arr = arr.filter((obj) => obj.imdbID !==id)
      state.watchList = arr
      console.log(state.watchList)
    },
    filterShowsByYear(state, selectedYear) {
      state.yearOfRelease = selectedYear
    },
    filterShowsByString(state, string) {
      state.searchString = string
    },
    filterByType(state, type) {
      state.typeOfShow = type
    },
  }
});
