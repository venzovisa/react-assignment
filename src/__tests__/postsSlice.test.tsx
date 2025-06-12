import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { faker } from '@faker-js/faker';
import postsReducer, { updatePost, deletePost } from "../store/reducers/postsSlice";
import type { PostsState } from "../models";

describe("postsSlice", () => {
    let store: ReturnType<typeof configureStore>;

    test("should update post data", () => {
        // Arrange
        const initialPost = {
            "userId": 1,
            "id": 1,
            "title": faker.lorem.words(),
            "body": faker.lorem.text()
        }
        const updatedPost = {
            "userId": 1,
            "id": 1,
            "title": faker.lorem.words(),
            "body": faker.lorem.text()
        }
        store = configureStore({
            preloadedState: {
                posts: {
                    data: [initialPost],
                    status: 'idle',
                    error: null
                } as PostsState
            },
            reducer: {
                posts: postsReducer,
            },
        });

        // Act
        store.dispatch(updatePost(updatedPost));

        // Assert
        const state = (store.getState() as { posts: PostsState }).posts;
        expect(state.data).toEqual([updatedPost]);
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });

    test("should delete a post", () => {
        // Arrange
        const initialPost = {
            "userId": 1,
            "id": 1,
            "title": faker.lorem.words(),
            "body": faker.lorem.text()
        }
        store = configureStore({
            preloadedState: {
                posts: {
                    data: [initialPost],
                    status: 'idle',
                    error: null
                } as PostsState
            },
            reducer: {
                posts: postsReducer,
            },
        });

        // Act
        store.dispatch(deletePost(1));

        // Assert
        const state = (store.getState() as { posts: PostsState }).posts;
        expect(state.data).toEqual([]);
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });
});
