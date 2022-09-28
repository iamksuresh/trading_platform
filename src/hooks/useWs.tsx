/**
 * Custom hook, responsible for listening to socket responses
 * Transform resp data to custom data
 * All business logic like - best ask,bid price, floating precision is taken care here
 * Consumer components, use this data to render on UI
 *
 */
import { IThrottle } from '../types';
import { toFloat } from '../utils';

export const useWs = (
  websocket: any,
  throttleTime: IThrottle,
  setThrottleTime: any,
  setOrderBookData: any,
  ThrottleSocketUpdate: number,
  saveDataUntilThrottle: any,
) => {
  if (websocket) {
    websocket.onmessage = ({ data }: any) => transformSocketMsg({ data });
  }

  const transformSocketMsg = ({ data }: { data: any }) => {
    const parsedData = JSON.parse(data);
    // const saveAsksUntilThrottle: any = {};
    if (Object.keys(parsedData) && parsedData.table) {
      const { asks, bids, instrumentId, timestamp } = parsedData?.data[0];
      const receivedTimeStamp = parseInt(timestamp, 10);

      if (!saveDataUntilThrottle[instrumentId]) {
        saveDataUntilThrottle[instrumentId] = {
          ask: [],
          bid: [],
        };
      }
      saveDataUntilThrottle[instrumentId]['ask'].push(...getAskPrice(asks));
      saveDataUntilThrottle[instrumentId]['bid'].push(...getBidPrice(bids));

      if (!throttleTime[instrumentId] || throttleTime[instrumentId] < receivedTimeStamp) {
        setThrottleTime({ [instrumentId]: receivedTimeStamp + ThrottleSocketUpdate });
        updateOrderBook(instrumentId, timestamp);
        saveDataUntilThrottle[instrumentId] = {};
      }
    }
  };

  const updateOrderBook = (instrumentId: string, timestamp: string) => {
    setOrderBookData({
      [instrumentId.toLowerCase()]: {
        ask: toFloat(Math.max(...saveDataUntilThrottle[instrumentId].ask), 3),
        bid: toFloat(Math.max(...saveDataUntilThrottle[instrumentId].bid), 3), //bestBidPrice(bids),
        timestamp,
        instrumentId,
      },
    });
  };
  const getBidPrice = (bids: number[][]) =>
    // business logic for best bid price
    bids.reduce((acc: any, curr: any): number[] => {
      acc.push(curr[0]);
      return acc;
    }, []);

  const getAskPrice = (asks: number[][]) =>
    // business logic for best ask price
    asks.reduce((acc: any, curr: any): number[] => {
      acc.push(curr[0]);
      return acc;
    }, []);
};
