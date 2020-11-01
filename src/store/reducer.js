const reducer = (state, action) => {
  switch (action.type) {
    case "setMovies":
      return {
        loading: false,
        movies: action.data,
        errorMessage: null,
      };
    case "setSelectedMovie":
      return {
        ...state,
        selectedMovie: action.data,
      };
    case "setCinemas":
      return {
        loading: false,
        cinemas: action.data,
        errorMessage: null,
      };
    default:
      return state;
  }
};

export default reducer;
