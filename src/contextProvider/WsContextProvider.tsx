/**
 * This is a Store for Orderbook
 * It is responsible for Websocket initialization, connection and closing of connection
 * When a new FX pair is registered to render on UI , socket connection is re-established
 * Raw JS WebSocket object is used for socket connections
 */

import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { ConnectionStatusEnum } from '../enum/ConnectionStatusEnum';
import { WebSocketEnum } from '../enum/WebSocketEnum';
import { useEnv } from '../hooks/useEnv';
import { useWs } from '../hooks/useWs';
import { IOrderBookData, IThrottle } from '../types';

interface Props {
  children: ReactNode;
}

// Export socket context for consumers
export const WebsocketContext = createContext<any>({});

const WsContextProvider: React.FC<Props> = ({ children }) => {
  const socket = useRef<any>(null);
  const [isReady, setIsReady] = useState(false);

  // read data from env variables
  const { FXPairs, ThrottleLimit } = useEnv();

  const [orderBookData, setOrderBookData] = useReducer(
    (state: IOrderBookData | {}, newState: Partial<IOrderBookData>) => {
      const newVal = Object.assign({}, state, newState);
      return newVal;
    },
    {},
  );

  const [instrumentArgs, setInstrumentArgs] = useState<any>([]);

  const [throttleTime, setThrottleTime] = useReducer(
    (state: IThrottle | {}, newState: IThrottle) => {
      return Object.assign(state, newState);
    },
    {},
  );

  useEffect(() => {
    connect();
    return () => {
      if (socket.current?.readyState === ConnectionStatusEnum.OPEN) {
        socket.current.close();
      }
    };
  }, []);

  const connect = () => {
    const websocket = new WebSocket(WebSocketEnum.URL);

    socket.current = websocket;
    websocket.onopen = () => {
      setIsReady(true);
      fetchOrders();
    };
    socket.current.onclose = () => {
      setIsReady(false);
    };
  };

  const resetThrottleTime = () => {
    setThrottleTime({});
  };

  const resetWebSocketConnection = useCallback(() => {
    socket.current.close();
    connect();
    resetThrottleTime();
  }, [instrumentArgs]);

  const fetchOrders = () => {
    // send FX pairs to server
    if (instrumentArgs.length) {
      socket.current.send(
        JSON.stringify({
          op: 'subscribe',
          tag: 10,
          args: instrumentArgs,
        }),
      );
    }
  };

  useWs(socket.current, throttleTime, setThrottleTime, setOrderBookData, ThrottleLimit);

  useEffect(() => {
    if (instrumentArgs.length) {
      resetWebSocketConnection();
    }
  }, [instrumentArgs, resetWebSocketConnection]);

  // Consumers subscribe to and register for FX pairs
  const subscribeToInstrumentId = useMemo(
    () => (instrumentId: string) => {
      if (instrumentArgs.indexOf(`depth:${instrumentId}`) < 0) {
        setInstrumentArgs([...instrumentArgs, `depth:${instrumentId}`]);
      }
      return (orderBookData as IOrderBookData)[instrumentId.toLowerCase()] || {};
    },
    [instrumentArgs, orderBookData],
  );

  const renderChild = useMemo(() => {
    return (
      <WebsocketContext.Provider
        value={{
          isReady,
          socket: socket.current,
          subscribeToInstrumentId,
          ThrottleLimit,
          FXPairs,
        }}
      >
        <>{children}</>
      </WebsocketContext.Provider>
    );
  }, [children, isReady, socket, subscribeToInstrumentId]);

  return <>{renderChild}</>;
};

export default WsContextProvider;
