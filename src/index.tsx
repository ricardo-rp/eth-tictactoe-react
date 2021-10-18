import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './App'
import Web3 from 'web3'
import { provider } from 'web3-core'
import { Web3ReactProvider } from '@web3-react/core'

function getLibrary(provider: provider) {
  return new Web3(provider)
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
