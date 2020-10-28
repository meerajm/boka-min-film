const reducer = (state, action) => {
  switch (action.type) {
    case "setMovies":
      return {
        loading: false,
        movies: action.data,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
