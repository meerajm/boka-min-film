const reducer = (state, action) => {
  switch (action.type) {
    case "setMovies":
      return {
        ...state,
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
        ...state,
        cinemas: action.data,
      };
    default:
      return state;
  }
};

export default reducer;
