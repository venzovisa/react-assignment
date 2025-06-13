import { Link, Route, Routes } from "react-router";
import Home from './components/home/Home.tsx';
import Posts from './components/posts/Posts.tsx';
import Todos from './components/todos/Todos.tsx';
import Result from 'antd/es/result/index';

const MainContent = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
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
        </>
    )
}

export default MainContent;