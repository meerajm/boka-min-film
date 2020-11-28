const reducer = (state, action) => {
  switch (action.type) {
    case "setMovies":
      return {
        ...state,
        loading: false,
        movies: action.data,
        errorMessage: null,
      };
    case "setSearchResult":
      return {
        ...state,
        searchResult: action.data,
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
    case "setCinemaNames":
      return {
        ...state,
        cinemaNames: action.data,
      };
    case "setSelectedCinema":
      return {
        ...state,
        selectedCinema: action.data,
      };
    case "setSelectedDay":
      return {
        ...state,
        selectedDay: action.data,
      };
    case "setUserDetails":
      return {
        ...state,
        userDetails: action.data,
      };
    case "setSelectedShow":
      return {
        ...state,
        selectedShow: action.data,
      };
    case "setTicketDetails":
      return {
        ...state,
        tickets: action.data,
      };

    default:
      return state;
  }
};

export default reducer;
