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
) => {
  if (websocket) {
    websocket.onmessage = ({ data }: any) => transformSocketMsg({ data });
  }

  const transformSocketMsg = ({ data }: { data: any }) => {
    const parsedData = JSON.parse(data);
    if (Object.keys(parsedData) && parsedData.table) {
      const { asks, bids, instrumentId, timestamp } = parsedData?.data[0];
      const receivedTimeStamp = parseInt(timestamp, 10);

      if (!throttleTime[instrumentId] || throttleTime[instrumentId] < receivedTimeStamp) {
        setThrottleTime({ [instrumentId]: receivedTimeStamp + ThrottleSocketUpdate });

        setOrderBookData({
          [instrumentId.toLowerCase()]: {
            ask: bestAskPrice(asks),
            bid: bestBidPrice(bids),
            timestamp,
            instrumentId,
          },
        });
      }
    }
  };

  const bestBidPrice = (bids: number[][]) => {
    // business logic for best bid price
    const lowestBid = bids.reduce((acc: any, curr: any): number[] => {
      acc.push(curr[0]);
      return acc;
    }, []);
    return toFloat(Math.max(...lowestBid), 3);
  };

  const bestAskPrice = (asks: number[][]) => {
    // business logic for best ask price
    const lowestAsk = asks.reduce((acc: any, curr: any): number[] => {
      acc.push(curr[0]);
      return acc;
    }, []);
    return toFloat(Math.max(...lowestAsk), 3);
  };
};
