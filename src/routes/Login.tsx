import { useNavigate } from '@solidjs/router'
import { onMount } from 'solid-js'

function Login() {
  const navigate = useNavigate()

  onMount(() => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/')
    }
  })

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const username = formData.get('username') as string
    const password = formData.get('password') as string
    const response = fetch('http://localhost:8080/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    }).then((res) => res.json()).then((res) => res)

    // alert(JSON.stringify(response.then((res) => res.message)))

    console.log(response)

    // localStorage.setItem('token', '123')
    navigate('/')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label for="username">Username</label>
        <input type="text" id="username" name="username" />
        <label for="password">Password</label>
        <input type="password" id="password" name="password" />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
