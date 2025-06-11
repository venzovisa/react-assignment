import { useSelector } from "react-redux";
import UserProfile from "../userProfile/UserProfile"
import { selectUserById } from "../../store/reducers/usersSlice";
import { Link, useParams } from "react-router";
import { deletePost, fetchPostsByUserId, selectPosts } from "../../store/reducers/postsSlice";
import { useAppDispatch } from "../../hooks";
import { useEffect } from "react";
import PostsForm from "./PostsForm";
import Empty from "antd/es/empty";
import Breadcrumb from "antd/es/breadcrumb";

const Posts = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUserById(Number(userId)));
    const posts = useSelector(selectPosts);


    const handleDelete = (id: number) => {
        dispatch(deletePost(id));
    }

    useEffect(() => { dispatch(fetchPostsByUserId(userId)) }, [dispatch, userId]);

    return (
        <>
            <Breadcrumb
                items={[
                    {
                        title: <Link to="/">Home</Link>,
                    },
                    {
                        title: 'User',
                    },
                    {
                        title: 'Posts',
                    },
                ]}
                style={{ paddingInline: '24px' }}
            />
            {user ? <UserProfile user={user} /> : <Empty />}
            <h2>Posts</h2>
            {posts ? posts.map(post => <PostsForm key={post.id} initialData={post} handleDelete={handleDelete} />) : <Empty />}
        </>
    )
}

export default Posts;