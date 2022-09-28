# Ignite - FX Trading platform
## Trading dashboard for FX pairs using WebSockets

#### Live demo - https://iamksuresh.github.io/trading_platform/
#### readme - https://github.com/iamksuresh/trading_platform

#### screenshots
-   Desktop - https://github.com/iamksuresh/trading_platform/blob/master/screenshots/desktop.png
-   Tablet - https://github.com/iamksuresh/trading_platform/blob/master/screenshots/tablet.png

## Features
- React based responsive web application 
- JS sockets for high performant real-time data access
- configurable FX pods using env
- Throttling of data for configurable intervals to improve UI performance
- React context Api based State management.
- Subscription and handling of multiple instruments are handled with context api
- Clear separartion of concern between incoming data and transformed UI data, updated at regular intervals(configurable).
- Using Visibility API to stop / start websocket.
- UI rendering is light with only required parts updated as required. 

## Technology stack
-   React, WebSockets, TypeScript, material-ui, react hooks
#### Testing
-   React-testing-library for testing components

## Installation
-  Pre-requisite - [Node.js](https://nodejs.org/) latest. 
-  git clone https://github.com/iamksuresh/trading_platform.git
-  Tested in node 16.15.0 , npm 8.9.0 , chrome browser

```sh
cd <root-folder>
npm i
npm start
```
- UI will start at port 3000

## Improvements
- UI performance is greatly improved using throttling of FX data for configurable intervals.
-- FX prices are collected until defined interval
-- ASK - Lowest ASK value is updated in the UI dashboard
-- BID - Highest BID value is updated in the UI dashboard
- Handling of multiple instruments
-- This is done at the store level using react Context API
-- Clear separation of concers between subscribing and processing of incoming individual FX pairs data

## Good to know 
- For the purpose of demo, coinflex websockets api are used. 
-- https://docs.coinflex.com/#websocket-api-subscriptions-public-orderbook-depth
- Testing strategy is implemented but few cases are to be covered.
- Pure JS WebSocket API is used to implement websocket calls
- UI is demo only and further improvements are advised.

