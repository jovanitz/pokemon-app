const initialState = {
  pokemons: [],
};

function reducer(state = initialState, action = {}) {
  const { payload, type } = action;

  switch (type) {
  case 'SET_POKEMONS': {
    return { ...state, pokemons: payload };
  }
  default:
    return state;
  }
}

export default reducer;