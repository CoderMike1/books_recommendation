

//space to storage common variables that are used by more than one function

import { createContext, useState, useEffect } from "react";
export const SessionStorageContext = createContext();
export function SessionStorageProvider({ children }) {
  const [isLogged, setIsLogged] = useState(() => {
    return sessionStorage.getItem("isLogged") === "true";
  });

  const [accessToken, setAccessToken] = useState(() => {
    return sessionStorage.getItem("accessToken") || null;
  })




  useEffect(() => {
    sessionStorage.setItem("isLogged", isLogged);
  }, [isLogged]);

   useEffect(() => {
    if (accessToken) {
      sessionStorage.setItem("accessToken", accessToken);
    } else {
      sessionStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  return (
    <SessionStorageContext.Provider value={{ isLogged, setIsLogged, accessToken, setAccessToken }}>
      {children}
    </SessionStorageContext.Provider>
  );
}
