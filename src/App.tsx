import './App.css'
import { fetchUsers, selectUsers } from './store/reducers/usersSlice'
import { useAppDispatch, useAppSelector } from './hooks'
import { useEffect, useState } from 'react'
import Collapse, { type CollapseProps } from 'antd/es/collapse/Collapse'
import type { User } from './models'
import UserProfile from './components/userProfile/UserProfile'
import { Link } from 'react-router'

function App() {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()
  const [items, setItems] = useState<CollapseProps['items']>();

  useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

  useEffect(() => {
    const mapped = users.map((u: User) => ({
      key: u.id,
      label: u.name,
      children: <>
        <UserProfile user={u} />
        <Link to={`/posts/${u.id}`} className="button">See posts</Link>
      </>
    }))
    setItems(() => mapped);
  }, [users, setItems])

  return (
    <>
      {items ? <Collapse items={items} defaultActiveKey={['1']} /> : null}
    </>
  )
}

export default App
