import { createStore } from "vuex";
import { ref } from "vue";

export const store = createStore({
  state() {
    return {
      watchList: [],
      typeOfShow: ref(""),
      yearOfRelease: Number(new Date().getFullYear()),
      searchString: ref("star"),
      imdbID: 'tt12327578'
    };
  },
  mutations: {
    addToWatchList(state, show) {
      let alreadyWatchlisted = state.watchList.some(item => item.imdbID === show.imdbID)

      if (alreadyWatchlisted === false) {
        show.listed = true;
        state.watchList.push(show);
      }
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
    filterByImdbId(state, imdbID) {
      state.imdbID = imdbID;
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
