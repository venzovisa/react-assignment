import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Link, Route, Routes } from "react-router"
import { Provider } from 'react-redux'
import { store } from './store/store.ts'
import Posts from './components/posts/Posts.tsx'
import Todos from './components/todos/Todos.tsx'
import Result from 'antd/es/result/index'
import Navigation from './Navigation.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/posts/:userId" element={<Posts />} />
          <Route path="/tasks" element={<Todos />} />
          <Route path="*" element={
            <Result
              status="404"
              title="404"
              subTitle="Sorry, the page you visited does not exist."
              extra={<Link to="/" className='button' title='Go back home'>Go back home</Link>}
            />
          } />
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
)
