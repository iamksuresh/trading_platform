# Ignite - FX Trading Platform
## Trading dashboard for FX pairs
- This is react based responsive dashboard for FX trading

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
-  Tested in node 16.15.0 , npm 8.9.0 , chrome browser

```sh
cd <root-folder>
npm i
npm start
```
- UI will start at port 3000

## Good to know 
- For the purpose of demo, coinflex websockets api are used.
- Testing strategy is implemented but few cases are to be covered.
- Pure JS WebSocket API is used to implement websocket calls
- UI is demo only and further improvements are advised.
