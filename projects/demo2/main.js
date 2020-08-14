import React from 'react'
import ReactDom from 'react-dom'
import 'style-loader!css-loader!html5-reset/assets/css/reset.css'
import './b.scss'

import App from './App.jsx'

ReactDom.render(<App />, document.querySelector('#app'))
