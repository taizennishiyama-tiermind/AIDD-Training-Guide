import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { Chapter } from './pages/Chapter'
import { Setup } from './pages/Setup'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/setup" element={<Setup />} />
          <Route path="/chapter/:id" element={<Chapter />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
