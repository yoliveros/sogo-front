import { onMount } from 'solid-js'
import { A, useNavigate } from '@solidjs/router'

function Header() {
  const navigate = useNavigate()

  onMount(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
  })

  function handleLogout(): void {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav>
      <ul class="menu">
        <li><A href="/">Home</A></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  )
}

export default Header
