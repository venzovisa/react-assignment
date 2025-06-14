import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import { Col } from 'antd/es/grid';
import Button from 'antd/es/button';
import { selectUsers } from '../../store/reducers/usersSlice';
import { fetchUsers } from '../../store/actions/usersActions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import Collapse, { type CollapseProps } from 'antd/es/collapse/Collapse';
import UserProfile from '../users/UserProfile';
import type { User } from '../../models';
import { useLoadingStatus } from '../../hooks/useLoadingStatus';
import Result from 'antd/es/result';
import { systemMessages } from '../../utils/utils';
import { useDelayedLoader } from '../../hooks/useDelayedLoader';
import ListLoader from '../loaders/ListLoader';

function Home() {
  const users = useAppSelector(selectUsers)
  const dispatch = useAppDispatch()
  const [items, setItems] = useState<CollapseProps['items']>();
  const { isLoading, isError } = useLoadingStatus("users");
  const showLoader = useDelayedLoader(isLoading);

  useEffect(() => { dispatch(fetchUsers()) }, [dispatch])

  useEffect(() => {
    const mapped = users.map((u: User) => ({
      key: u.id,
      label: u.name,
      children: <>
        <UserProfile user={u} >
          <Col span={5} >
            <Link to={`/posts/${u.id}`} >
              <Button type='primary'>See posts</Button>
            </Link>
          </Col>
        </UserProfile>
      </>
    }))
    setItems(() => mapped);
  }, [users, setItems])

  if (showLoader) {
    return <ListLoader length={3} />
  }

  if (isError) {
    return <>
      <Result
        status="warning"
        title={systemMessages.GENERAL_ERROR}
        extra={
          <Button type="primary" key="console" onClick={() => dispatch(fetchUsers())}>
            Retry
          </Button>
        }
      />
    </>
  }

  return (
    <>
      {items ? <Collapse items={items} defaultActiveKey={['1']} className='box-shadow' /> : null}
    </>
  )
}

export default Home
