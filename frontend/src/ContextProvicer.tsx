import React, { createContext, useState } from "react";

export const UserContext = createContext<User | null>(null);
export const SetUserContext = createContext<React.Dispatch<
  React.SetStateAction<User | null>
> | null>(null);

export function ContextProvider(props: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {props.children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
}
