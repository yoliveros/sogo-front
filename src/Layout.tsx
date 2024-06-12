import './Layout.css'
import { JSX } from 'solid-js'
import Header from './lib/Layout/Header'

type Props = {
  children: JSX.Element[]
}

function Layout(props: Props) {
  return (
    <main class="layout">
      <Header />
      <div class="content">
        {props.children}
      </div>
      <footer>
        <h1>Footer</h1>
      </footer>
    </main>
  )
}

export default Layout
