import { createContext, ReactNode, useState, FC, useEffect } from "react";

export interface UserContextInterface {
  id: string;
  login: string;
  name: string;
}

interface UserContextType {
  user: UserContextInterface | null;
  handleUser: (user: UserContextInterface) => void;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode;
}

const UserContextProvider: FC<UserContextProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserContextInterface | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleUser = (user: UserContextInterface) => {
    setUser(user);
  };

  return (
    <UserContext.Provider value={{ user, handleUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
