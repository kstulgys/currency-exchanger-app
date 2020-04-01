import React from 'react'
import {ThemeProvider, CSSReset} from '@chakra-ui/core'
import theme from 'theme'
import {Provider} from 'react-redux'
// import configureStore from 'redux-mock-store';
import {getDefaultMiddleware, configureStore} from '@reduxjs/toolkit'
import {render} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import {rootReducer} from 'app/store'

const currencies = [
  {name: 'GBP', value: 10000.99},
  {name: 'USD', value: 20000.33},
  {name: 'AUD', value: 30000.99},
  {name: 'LTU', value: 40000.33},
]
const preloadedState = {
  isSubmitting: false,
  pocketValueFrom: currencies[0].value.toString(),
  pocketValueTo: currencies[1].value.toString(),
  inputValueFrom: '',
  inputValueTo: '',
  canSubmit: false,
  selectedFrom: currencies[0],
  selectedTo: currencies[1],
  currencies: {
    isLoading: false,
    value: currencies,
    message: null,
  },
  dataPoints: {
    isLoading: false,
    value: [
      {x: 1, y: 1},
      {x: 2, y: 2},
    ],
    message: null,
  },
  currentRate: {
    isLoading: false,
    value: 1.1234,
    message: null,
  },
  message: null,
}

function customRender(ui: any, partialState?: any) {
  // const mockStore = configureStore([...getDefaultMiddleware()]);
  // const store = mockStore({app: {...preloadedState, ...partialState}});

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {app: {...preloadedState, ...partialState}},
    middleware: [...getDefaultMiddleware()],
  })
  return {
    ...render(
      <Provider store={store}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </Provider>,
    ),
    store,
  }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render, preloadedState}
