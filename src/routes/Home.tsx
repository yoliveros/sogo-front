import { JSX } from 'solid-js'
import './Home.css'

function Home(): JSX.Element {
  // let files: FileList | undefined = undefined

  function handleUpload(event: Event): void {
    const target = event.target as HTMLInputElement

    const formData = new FormData()
    formData.append('file', target.files![0])

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => data)
  }

  return (
    <main class="home">
      <section class="header">
        <label class="upload">
          Upload
          <input type="file" hidden onChange={handleUpload} />
        </label>
      </section>
      <section class="content">
      </section>
    </main>
  )
}

export default Home
