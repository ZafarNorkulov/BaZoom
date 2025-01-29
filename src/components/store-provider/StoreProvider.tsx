import { useInitData } from "@vkruglikov/react-telegram-web-app";
import { createContext, useContext, useMemo } from "react";
import RootStore from "../../stores/RootStore";

const Context = createContext<RootStore | null>(null);
interface StoreProviderProps {
  children: React.ReactNode;
}

const StoreProvider = ({ children }: StoreProviderProps) => {
  const [, initData] = useInitData();
  const store = useMemo(() => {
    return new RootStore(initData!);
  }, [initData]);
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

const useStore = () => {
    const store = useContext(Context);
    if (store === null)
      throw new Error("Please use this hook inside StoreProvider");
    return store;
  };

  export default StoreProvider;
  export { useStore };
