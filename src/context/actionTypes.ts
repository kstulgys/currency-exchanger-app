export enum ActionTypes {
  SET_INITIAL_DATA_START = 'SET_INITIAL_DATA_START',
  SET_INITIAL_DATA_SUCCESS = 'SET_INITIAL_DATA_SUCCESS',
  SET_INITIAL_DATA_FAIL = 'SET_INITIAL_DATA_FAIL',

  CURRENCY_RATE_CHANGED = 'CURRENCY_RATE_CHANGED',
  CURRENCIES_SWAPPED = 'CURRENCIES_SWAPPED',
  INPUT_VALUE_FROM_CHANGED = 'INPUT_VALUE_FROM_CHANGED',
  INPUT_VALUE_TO_CHANGED = 'INPUT_VALUE_TO_CHANGED',

  SUBMIT_VALUES_START = 'SUBMIT_VALUES_START',
  SUBMIT_VALUES_SUCCESS = 'SUBMIT_VALUES_SUCCESS',
  SUBMIT_VALUES_FAIL = 'SUBMIT_VALUES_FAIL',

  CURRENCY_FROM_SELECTED = 'CURRENCY_FROM_SELECTED',
  CURRENCY_TO_SELECTED = 'CURRENCY_TO_SELECTED',

  FETCH_CURRENCY_RATE = 'FETCH_CURRENCY_RATE',

  STATUS_CLEANUP = 'STATUS_CLEANUP',
}

export type ActionType =
  | ActionTypes.SET_INITIAL_DATA_START
  | ActionTypes.SET_INITIAL_DATA_SUCCESS
  | ActionTypes.SET_INITIAL_DATA_FAIL
  | ActionTypes.CURRENCIES_SWAPPED
  | ActionTypes.CURRENCY_FROM_SELECTED
  | ActionTypes.CURRENCY_RATE_CHANGED
  | ActionTypes.CURRENCY_TO_SELECTED
  | ActionTypes.FETCH_CURRENCY_RATE
  | ActionTypes.INPUT_VALUE_FROM_CHANGED
  | ActionTypes.INPUT_VALUE_TO_CHANGED
  | ActionTypes.SUBMIT_VALUES_FAIL
  | ActionTypes.SUBMIT_VALUES_START
  | ActionTypes.SUBMIT_VALUES_SUCCESS
  | ActionTypes.STATUS_CLEANUP;
