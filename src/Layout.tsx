import './Layout.css'
import { JSX } from 'solid-js'

type Props = {
  children: JSX.Element[]
}

function Layout(props: Props) {
  return (
    <main class="layout">
      <header>
        <h1>Header</h1>
      </header>
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
