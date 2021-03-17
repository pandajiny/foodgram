import React, { createContext, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ReduxProvider } from "react-redux";
import { reduxStore } from "./modules/store";

export const UserContext = createContext<User | null>(null);
export const SetUserContext = createContext<React.Dispatch<
  React.SetStateAction<User | null>
> | null>(null);

interface ProviderProps {
  children: React.ReactNode;
}

function ContextProvider({ children }: ProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}

export function ProviderWrapper({ children }: ProviderProps) {
  return (
    <BrowserRouter>
      <ReduxProvider store={reduxStore}>
        <ContextProvider>{children}</ContextProvider>
      </ReduxProvider>
    </BrowserRouter>
  );
}
