import { createContext, useContext } from "react";

const Context = createContext<any>(null);

const useStore = () => {
    const store = useContext(Context);
    if (store === null)
      throw new Error("Please use this hook inside StoreProvider");
    return store;
  };

  export { useStore };
