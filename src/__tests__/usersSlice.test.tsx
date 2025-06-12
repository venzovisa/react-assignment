import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { faker } from '@faker-js/faker';
import usersReducer, { fetchUsers, updateUser } from "../store/reducers/usersSlice";
import type { UsersState } from "../models";

describe("usersSlice", () => {
  let store: ReturnType<typeof configureStore>;

  test("should update user data", () => {
    // Arrange
    const initialUser = {
      "id": 1,
      "name": faker.person.fullName(),
      "username": faker.person.firstName(),
      "email": faker.internet.email(),
      "address": {
        "street": faker.location.streetAddress(),
        "suite": faker.location.buildingNumber(),
        "city": faker.location.city(),
        "zipcode": faker.location.zipCode(),
        "geo": {
          "lat": `${faker.location.latitude()}`,
          "lng": `${faker.location.longitude()}`
        }
      },
      "phone": faker.phone.number(),
      "website": faker.internet.domainName(),
      "company": {
        "name": faker.company.name(),
        "catchPhrase": faker.lorem.text(),
        "bs": faker.lorem.text()
      }
    }
    const updatedUser = {
      "id": 1,
      "name": faker.person.fullName(),
      "username": faker.person.firstName(),
      "email": faker.internet.email(),
      "address": {
        "street": faker.location.streetAddress(),
        "suite": faker.location.buildingNumber(),
        "city": faker.location.city(),
        "zipcode": faker.location.zipCode(),
        "geo": {
          "lat": `${faker.location.latitude()}`,
          "lng": `${faker.location.longitude()}`
        }
      },
      "phone": faker.phone.number(),
      "website": faker.internet.domainName(),
      "company": {
        "name": faker.company.name(),
        "catchPhrase": faker.lorem.text(),
        "bs": faker.lorem.text()
      }
    }
    store = configureStore({
      preloadedState: {
        users: {
          data: [initialUser],
          status: 'idle',
          error: null
        } as UsersState
      },
      reducer: {
        users: usersReducer,
      },
    });

    // Act
    store.dispatch(updateUser(updatedUser));

    // Assert
    const state = (store.getState() as { users: UsersState }).users;
    expect(state.data).toEqual([updatedUser]);
    expect(state.status).toEqual('idle');
    expect(state.error).toBeNull();
  });

  test.skip("should fetch users data", async () => {
    // Arrange
    store = configureStore({
      preloadedState: {
        users: {
          data: [],
          status: 'idle',
          error: null
        } as UsersState
      },
      reducer: {
        users: usersReducer,
      },
    });

    // Act
    usersReducer(undefined, fetchUsers());

    // Assert
    const state = (store.getState() as { users: UsersState }).users;
    expect(state.data).toEqual([]);
    expect(state.status).toEqual('idle');
    expect(state.error).toBeNull();
  });
});
