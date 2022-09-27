/**
 * Application root
 * Performance is improved by stopping, connecting to sockets api using Page Visibility API
 */
import React, { useEffect, useState } from 'react';
import Header from './components/header';
import OrderBook from './components/orderBook';
import WebSocketContextProvider from './contextProvider/WsContextProvider';

function App() {
  const [isPageVisible, setIsPageVisible] = useState(true);

  // Page Visibility detection
  useEffect(() => {
    // Set the name of the hidden property and the change event for visibility
    let hidden: string = '';
    let visibilityChange: string = '';

    if (typeof document.hidden !== 'undefined') {
      // Opera 12.10 and Firefox 18 and later support
      hidden = 'hidden';
      visibilityChange = 'visibilitychange';
    } else {
      // @ts-ignore
      if (typeof document.msHidden !== 'undefined') {
        hidden = 'msHidden';
        visibilityChange = 'msvisibilitychange';
      } else {
        // @ts-ignore
        if (typeof document.webkitHidden !== 'undefined') {
          hidden = 'webkitHidden';
          visibilityChange = 'webkitvisibilitychange';
        }
      }
    }
    const handleVisibilityChange = () => {
      const isHidden = document.hidden;
      if (isHidden) {
        document.title = 'Orderbook Paused';
        setIsPageVisible(false);
      } else {
        document.title = 'Orderbook';
        setIsPageVisible(true);
      }
    };

    // Warn if the browser doesn't support addEventListener or the Page Visibility API
    // Handle page visibility change
    document.addEventListener(visibilityChange, handleVisibilityChange, false);
  }, []);

  return (
    <>
      {isPageVisible ? (
        <>
          <WebSocketContextProvider>
            <div className="App">
              <Header />
              <OrderBook />
            </div>
          </WebSocketContextProvider>
        </>
      ) : (
        'Hidden Page'
      )}
    </>
  );
}

export default App;
