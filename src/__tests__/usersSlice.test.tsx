import { configureStore } from "@reduxjs/toolkit";
import "@testing-library/jest-dom";
import { faker } from '@faker-js/faker';
import usersReducer, { updateUser } from "../store/reducers/usersSlice";
import { fetchUsers } from "../store/actions/usersActions";
import type { UsersState } from "../models";
import { render, screen } from "@testing-library/react";
import UserProfileView from "../components/users/UserProfileView";

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

  test("should fetch users data", async () => {
    // Arrange
    const expectedState = {
      data: [
        {
          "id": 1,
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz",
          "address": {
            "street": "Kulas Light",
            "suite": "Apt. 556",
            "city": "Gwenborough",
            "zipcode": "92998-3874",
            "geo": {
              "lat": "-37.3159",
              "lng": "81.1496"
            }
          },
          "phone": "1-770-736-8031 x56442",
          "website": "hildegard.org",
          "company": {
            "name": "Romaguera-Crona",
            "catchPhrase": "Multi-layered client-server neural-net",
            "bs": "harness real-time e-markets"
          }
        },
      ],
      status: 'succeeded',
      error: null
    }
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
    await store.dispatch(fetchUsers());

    // Assert
    const state = (store.getState() as { users: UsersState }).users;
    expect(state).toEqual(expectedState);
  });

  test('should renders user data', async () => {
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

    // Act
    render(<UserProfileView user={initialUser} />);

    // Assert
    const name = await screen.findByText(initialUser.name);
    const username = await screen.findByText(`@${initialUser.username}`);
    const email = await screen.findByText(initialUser.email);
    const phone = await screen.findByText(initialUser.phone);
    const website = await screen.findByText(initialUser.website);
    const suiteAndStreet = await screen.findByText(`${initialUser.address.suite}, ${initialUser.address.street}`);
    const cityAndZipcode = await screen.findByText(`${initialUser.address.city}, ${initialUser.address.zipcode}`);
    const latAndLng = await screen.findByText(`${initialUser.address.geo.lat}, ${initialUser.address.geo.lng}`);
    const companyName = await screen.findByText(initialUser.company.name);
    const catchPhrase = await screen.findByTestId('catchPhrase');
    const companyBs = await screen.findByTestId('companyBs');
    expect(name).toBeInTheDocument();
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(phone).toBeInTheDocument();
    expect(website).toBeInTheDocument();
    expect(suiteAndStreet).toBeInTheDocument();
    expect(cityAndZipcode).toBeInTheDocument();
    expect(latAndLng).toBeInTheDocument();
    expect(companyName).toBeInTheDocument();
    expect(catchPhrase).toBeInTheDocument();
    expect(companyBs).toBeInTheDocument();
  });
});