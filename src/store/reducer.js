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
        cinemas: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
