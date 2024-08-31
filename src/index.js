import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import './index.css'
import { DevSupport } from '@react-buddy/ide-toolbox'

import store from './store'
import App from './components/App'
import { ComponentPreviews, useInitial } from './dev'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <DevSupport
        ComponentPreviews={ComponentPreviews}
        useInitialHook={useInitial}
      >
        <App />
      </DevSupport>
    </Provider>
  </React.StrictMode>,
)
