import { createContext } from "react";

const StreamContext = createContext<
  React.MutableRefObject<MediaStream | undefined> | undefined
>(undefined);

const StreamReadyContext = createContext<boolean>(false);

export { StreamContext, StreamReadyContext };
