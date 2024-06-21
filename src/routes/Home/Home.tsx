import { JSX, createSignal, onMount, For, Match, Switch } from 'solid-js'
import './Home.css'

interface FileSys {
  id?: string
  parent_id?: string
  name: string
  is_file: boolean
}

interface Breadcrumb {
  name: string
  id: string | null
}

interface Parent {
  id: string
  name: string
}

function Home(): JSX.Element {
  const [fileSys, setFileSys] = createSignal<FileSys[]>([])
  const [allFiles, setAllFiles] = createSignal<FileSys[]>([])
  const [dialogOpen, setDialogOpen] = createSignal(false)
  const [folderName, setFolderName] = createSignal('')
  const [parentId, setParentId] = createSignal<Parent | undefined>(undefined)
  const [breadcrumb, setBreadcrumb] = createSignal<Breadcrumb[]>([{ name: 'root', id: null }])

  onMount(() => {
    getFiles()
  })


  function navigate(file: FileSys): void {
    setParentId({
      id: file.id as string,
      name: file.name as string
    })

    const newFileSys: FileSys[] = []
    allFiles().map((f: FileSys) => {
      if (f.parent_id === parentId()?.id) {
        newFileSys.push(f)
      }
    })

    setFileSys(newFileSys)

    setBreadcrumb(prev => {
      if (!file.id) {
        return [{
          name: 'root', id: null
        }]
      }

      for (let i = 0; i < prev.length; i++) {
        if (prev[i].id === parentId()?.id) {
          return prev.slice(0, i + 1)
        }
      }

      return prev.concat({ name: file.name as string, id: file.id as string })
    })
  }

  function getFiles(): void {
    fetch('http://localhost:8080/files')
      .then(response => response.json())
      .then((data: FileSys[]) => {
        let root: FileSys[] = data.filter((file: FileSys) => {
          if (parentId()) {
            return file.parent_id === parentId()?.id
          }

          if (!file.parent_id) {
            return file
          }
        })

        setFileSys(root)
        setAllFiles(data)
      })

  }

  function handleUpload(event: Event): void {
    const target = event.target as HTMLInputElement

    const formData = new FormData()
    formData.append('file', target.files![0])
    if (parentId()?.id) {
      formData.append('parent_id', parentId()?.id as string)
    }

    fetch('http://localhost:8080/upload', {
      method: 'POST',
      body: formData
    })
      .finally(() => {
        getFiles()
      })
  }

  function createFolder(event: Event): void {
    event.preventDefault()

    const newFolder: FileSys = {
      parent_id: parentId()?.id,
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
      <section class="breadcrumb">
        <For each={breadcrumb()}>
          {(breadcrumb: Breadcrumb) =>
            <div onClick={() => navigate({
              id: breadcrumb.id,
              name: breadcrumb.name,
              is_file: false
            })}>
              {breadcrumb.name}
            </div>}
        </For>
      </section>
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
              <div class="file">FL.{file.name}</div>
            </Match>
            <Match when={!file.is_file}>
              <div class="folder" onClick={() => navigate(file)}>
                FD.{file.name}
              </div>
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
