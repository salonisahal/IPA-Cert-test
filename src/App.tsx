import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import TopBar from './components/TopBar'

const App = () => (
  <div className="flex min-h-screen bg-background">
    <Sidebar />
    <div className="flex flex-1 flex-col">
      <TopBar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  </div>
)

export default App
