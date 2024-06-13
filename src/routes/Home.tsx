import { JSX } from 'solid-js'
import './Home.css'

function Home(): JSX.Element {
  let files: FileList | undefined = undefined

  function handleUpload(event: Event) {
    const target = event.target as HTMLInputElement
    files = target.files!
    console.log(files)
  }

  return (
    <main class="home">
      <section class="header">
        <label class="upload">
          Upload
          <input ref={files} type="file" multiple hidden onChange={handleUpload} />
        </label>
      </section>
      <section class="content">
      </section>
    </main>
  )
}

export default Home
