import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { faker } from '@faker-js/faker';
import todosReducer, { fetchTodos, toggleTodo } from "../store/reducers/todosSlice";
import type { TodosState } from "../models";

describe("todosSlice", () => {
    let store: ReturnType<typeof configureStore>;

    test("should toggle todo status", () => {
        // Arrange
        const initialTodos = [
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": false
            },
            {
                "userId": 1,
                "id": 2,
                "title": faker.lorem.text(),
                "completed": false
            },
        ]
        const updatedTodos = [
            {
                "userId": 1,
                "id": 1,
                "title": "delectus aut autem",
                "completed": true
            },
            initialTodos[1]
        ]
        store = configureStore({
            preloadedState: {
                todos: {
                    data: initialTodos,
                    status: 'idle',
                    error: null
                } as TodosState
            },
            reducer: {
                todos: todosReducer,
            },
        });

        // Act
        store.dispatch(toggleTodo({ id: 1, completed: true }));

        // Assert
        const state = (store.getState() as { todos: TodosState }).todos;
        expect(state.data).toEqual(updatedTodos);
        expect(state.status).toEqual('idle');
        expect(state.error).toBeNull();
    });

    test("should fetch todos data", async () => {
        // Arrange
        const expectedState = {
            data: [
                {
                    userId: 1,
                    id: 1,
                    title: "delectus aut autem",
                    completed: false,
                },
                {
                    userId: 1,
                    id: 2,
                    title: "quis ut nam facilis et officia qui",
                    completed: false,
                },
            ],
            status: 'succeeded',
            error: null
        }
        store = configureStore({
            preloadedState: {
                todos: {
                    data: [],
                    status: 'idle',
                    error: null
                } as TodosState
            },
            reducer: {
                todos: todosReducer,
            },
        });

        // Act
        await store.dispatch(fetchTodos());

        // Assert
        const state = (store.getState() as { todos: TodosState }).todos;
        expect(state).toEqual(expectedState);
    });
});
