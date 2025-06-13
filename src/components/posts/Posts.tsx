import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router";
import Empty from "antd/es/empty";
import Breadcrumb from "antd/es/breadcrumb";
import Result from "antd/es/result";
import Button from "antd/es/button";
import Alert from "antd/es/alert";
import { selectUserById } from "../../store/reducers/usersSlice";
import { deletePost, fetchPostsByUserId, selectPosts } from "../../store/reducers/postsSlice";
import { useAppDispatch } from "../../hooks/hooks";
import { useLoadingStatus } from "../../hooks/useLoadingStatus";
import { useDelayedLoader } from "../../hooks/useDelayedLoader";
import UserProfile from "../users/UserProfile";
import PostsForm from "./PostsForm";
import { systemMessages } from "../../utils/utils";
import ListLoader from "../loaders/ListLoader";
import styles from './PostsForm.module.css';

const Posts = () => {
    const { userId } = useParams();
    const dispatch = useAppDispatch();
    const user = useSelector(selectUserById(Number(userId)));
    const posts = useSelector(selectPosts);
    const { isLoading, isError, error } = useLoadingStatus("posts");
    const showLoader = useDelayedLoader(isLoading, 500);

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

            <h2 className={styles.postTitle}>Posts</h2>

            {isError && error === 'posts/deletePost/rejected' ? <Alert message={systemMessages.GENERAL_ERROR} type="error" style={{ margin: '0 auto', maxWidth: '600px' }} /> : null}

            {showLoader ? <ListLoader length={3} customStyles={{ maxWidth: "600px" }} /> : null}

            {isError && error === 'posts/fetchPostsByUserId/rejected' ? <Result
                status="warning"
                title={systemMessages.GENERAL_ERROR}
                extra={
                    <Button type="primary" key="console" onClick={() => dispatch(fetchPostsByUserId(userId))}>
                        Retry
                    </Button>
                }
            /> : null}

            {posts && posts.length ? posts.map(post =>
                <PostsForm key={post.id} initialData={post} handleDelete={handleDelete} />)
                : (!isError && !isLoading) ? <Empty /> : null}
        </>
    )
}

export default Posts;