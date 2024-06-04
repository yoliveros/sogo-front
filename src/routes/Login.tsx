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
        localStorage.setItem('token', '123')
        console.log({ username, password })
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
