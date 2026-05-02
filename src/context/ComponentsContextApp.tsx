import React, { useContext } from "react"
import { AuthContext, AuthContextType } from "@/context/AuthContextProvider";

function withAuth<T extends AuthContextType>(Component: React.ComponentType<T>) {
  return (
    props: Omit<T, keyof AuthContextType>
  ) => {
    const contextValue = useContext(AuthContext);
    return <Component {...(props as T)} {...contextValue} />
  };
}

export default withAuth;
