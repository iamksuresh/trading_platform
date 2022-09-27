import React, { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { WebsocketContext } from '../../../contextProvider/WsContextProvider';

const customRender = async (ui: ReactElement, { ...renderOptions }: any) => {
  const contextProps = {
    isReady: true,
    ThrottleSocketUpdate: 3000,
    FXPairs: 'BTC-USD-SWAP-LIN',
    subscribeToInstrumentId: jest.fn().mockImplementation(() => {
      return {
        'btc-usd-swap-lin': {
          from: 'btc',
          to: 'usd',
          ask: 100.5,
          bid: 100.0,
          timestamp: new Date().getTime(),
          instrumentId: 'btc-usd',
        },
      };
    }),
  };
  const rendered = render(
    <WebsocketContext.Provider value={contextProps}>{ui}</WebsocketContext.Provider>,
    renderOptions,
  );
  return {
    // ws,
    ...rendered,
  };
};

export * from '@testing-library/react';
export { customRender as render };
