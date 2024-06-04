/* @refresh reload */
import { render } from 'solid-js/web'
import { Router, Route } from '@solidjs/router'

import './index.css'
import Layout from './Layout'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import Login from './routes/Login'

const root = document.getElementById('root')

render(() =>
    <Router>
        <Route path="/" component={Layout}>
            <Route path="/" component={Home} />
        </Route>
        <Route path="*" component={NotFound} />
        <Route path="/login" component={Login} />
    </Router>
    , root!
)
