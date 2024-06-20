import { JSX, createSignal, onMount, For, Match, Switch } from 'solid-js'
import './Home.css'
import FileTree from './FileTree'

interface FileSys {
  id?: string
  parent_id?: string
  name: string
  is_file: boolean
}

function Home(): JSX.Element {
  const [files, setFiles] = createSignal<FileTree>()
  const [fileSys, setFileSys] = createSignal<FileSys[]>([])
  const [dialogOpen, setDialogOpen] = createSignal(false)
  const [folderName, setFolderName] = createSignal('')
  const [parentId, setParentId] = createSignal<string | undefined>(undefined)

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
      .then(() => {
        getFiles()
      })
  }

  function createFolder(event: Event): void {
    event.preventDefault()

    const newFolder: FileSys = {
      parent_id: parentId(),
      name: folderName(),
      is_file: false,
    }

    fetch('http://localhost:8080/folder', {
      method: 'POST',
      body: JSON.stringify(newFolder),
    })
      .finally(() => {
        getFiles()
        setDialogOpen(false)
        setFolderName('')
      })
  }

  return (
    <main class="home">
      <section class="header">
        <button onClick={() => setDialogOpen(true)}>Create Folder</button>
        <label class="upload">
          Upload
          <input type="file" hidden onChange={handleUpload} />
        </label>
      </section>
      <section class="content">
        <For each={fileSys()}>{file =>
          <Switch>
            <Match when={file.is_file}>
              <div class="file"></div>
            </Match>
            <Match when={!file.is_file}>
              <div class="folder">{file.name}</div>
            </Match>
          </Switch>
        }</For>
      </section>

      <dialog open={dialogOpen()} onClose={() => setDialogOpen(false)}>
        <span class="close" onClick={() => setDialogOpen(false)}>X</span>
        <form onSubmit={createFolder} class="form">
          <input type="text" name="name" value={folderName()} onInput={e => setFolderName(e.currentTarget.value)} />
          <button type="submit">Create</button>
        </form>
      </dialog>
    </main>
  )
}

export default Home
