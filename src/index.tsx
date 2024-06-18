/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import './index.css'
import Layout from './Layout'
import Home from './routes/Home/Home'
import NotFound from './routes/NotFound'

const root = document.getElementById('root')

render(() =>
  <Router>
    <Route path="/" component={Layout}>
      <Route path="/" component={Home} />
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
  , root!
)
