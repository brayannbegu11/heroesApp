import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";

describe("Pruebas en authReducer", () => {
  test("should return the default state", () => {
    const state = authReducer({ logged: false }, {});
    expect(state).toEqual({ logged: false });
  });
  test("should call the login and set up the user", () => {
    const action = {
      type: types.login,
      payload: {
        name: "Brayann",
        id: "123",
      },
    };
    const state = authReducer({ logged: false }, action);
    expect(state).toEqual({
      logged: true,
      user: action.payload,
    });
  });
  test("should call the logout and set up the user", () => {
    const state = {
      logged: true,
      user: { id: "123", name: "Brayann" },
    };
    const action = {
        type: types.logout
    };
    const newState = authReducer(state, action);
    console.log(newState);
    expect(newState).toEqual({logged: false})
  });
});
