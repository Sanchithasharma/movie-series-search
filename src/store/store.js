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
      show.listed = true;
      state.watchList.push(show);
      console.log(state.watchList);
    },
    removeFromWatchList(state, id) {
      state.watchList = state.watchList.filter((obj) => {
         return obj.imdbID !== id;
      });
      console.log(state.watchList)
    },
    filterShowsByYear(state, selectedYear) {
      state.yearOfRelease = selectedYear;
    },
    filterShowsByString(state, string) {
      state.searchString = string;
    },
    filterByType(state, type) {
      state.typeOfShow = type;
    },
  },
  getters: {
    movieIsAlreadyAddedToWatchList: (state) => (id) => {
      state.watchList.forEach((element) => {
        if (element.imdbID === id) {
          return true;
        }
      });
      return false;
    },
  },
});
