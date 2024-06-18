import { JSX, createSignal, onMount, For } from 'solid-js'
import './Home.css'
import FileTree from './FileTree'

interface FileSys {
  id: string
  parent_id: string
  name: string
}

function Home(): JSX.Element {
  const [files, setFiles] = createSignal<FileTree>()
  const [fileSys, setFileSys] = createSignal<FileSys[]>([])

  onMount(() => {
    getFiles()
  })

  function getFiles(): void {
    fetch('http://localhost:8080/files')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setFileSys(data)
      })

  }

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
        <For each={fileSys()}>{file => <div>{file.name}</div>}</For>
      </section>
    </main>
  )
}

export default Home
