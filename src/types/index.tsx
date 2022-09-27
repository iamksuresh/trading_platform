export interface IInstrumentData {
  ask: number;
  bid: number;
  from: string;
  to: string;
  instrumentId: string;
  timestamp: number;
}

export interface IOrderBookData {
  [key: string]: IInstrumentData;
}

export interface IThrottle {
  [key: string]: number;
}
