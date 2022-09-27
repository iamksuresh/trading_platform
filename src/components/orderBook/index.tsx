/**
 * Order book Container
 * Reads instrument id's from context Store and renders Pod for each instrument
 */

import React, { useContext } from 'react';
import Grid from '@mui/material/Grid';
import Instrument from './Instrument';
import { WebsocketContext } from '../../contextProvider/WsContextProvider';

const OrderBook: React.FC<any> = (props) => {
  const { FXPairs } = useContext(WebsocketContext);

  const showPods = () => {
    return FXPairs.split(',').map((val: string, index: number) => (
      <Grid key={`${val}_${index}`} item={true} xs={12} sm={6} md={6} lg={4} xl={3}>
        <Instrument instrumentId={val} />
      </Grid>
    ));
  };

  return (
    <Grid id="orderBookContainer" container={true} direction="row" spacing={2}>
      {showPods()}
    </Grid>
  );
};

export default OrderBook;
