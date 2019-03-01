import { createSelector } from 'reselect';

export const API = 'https://pokeapi.co/api/v2';

export function selector(state, reducer, value) {
  const getReducer = stateAux => stateAux[reducer];

  const getValue = createSelector(
    [ getReducer ],
    data => data[value]
  );

  return getValue(state);
}