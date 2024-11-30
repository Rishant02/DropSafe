"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { User } from "@/types";

type UserContextType = {
  user: User | null;
  loading: boolean;
  setUser: (user: User) => void;
  clearUser: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({
  children,
  initialUser,
}: {
  children: React.ReactNode;
  initialUser?: User;
}) => {
  const [user, setUser] = useState<User | null>(initialUser || null);
  const [loading, setLoading] = useState(!initialUser);
  const clearUser = () => setUser(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!initialUser) {
        setLoading(true);
        try {
          const res = await fetch("/api/current-user", { method: "GET" });
          if (res.ok) {
            const data = await res.json();
            setUser(data.user);
          } else {
            clearUser();
          }
        } catch (err) {
          clearUser();
        } finally {
          setLoading(false);
        }
      }
      fetchUser();
    };
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, clearUser, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
