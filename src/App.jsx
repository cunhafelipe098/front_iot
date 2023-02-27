import { Header } from './components/Header'
import { Post }   from './components/Post'
import './global.css'
import styles from './App.module.css'
import { Sidebar } from './components/Sidebar'

function App() {

  return (
    <>

      <Header />
      <div className={styles.wrapper}>
        <Post/>
        <Sidebar />
      </div>
    </>
    
  )
}

export default App
