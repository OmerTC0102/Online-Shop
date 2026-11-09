import { createContext, useReducer } from "react";

export const AuthContext = createContext(null);

const initialState = {
  user: null,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGGED_IN":
      return { ...state, user: action.payload };

    case "LOGGED_OUT":
      return { ...state, user: null };

    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const loginUser = (user) => {
    dispatch({ type: "LOGGED_IN", payload: user });
  };

  const logoutUser = () => {
    dispatch({ type: "LOGGED_OUT" });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}