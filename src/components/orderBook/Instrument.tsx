/**
 * This Component is responsible for each instrument pod.
 * Maintains Loading state until data is loaded
 */
import React, { useContext, useEffect, useReducer } from 'react';
import { Container } from '@mui/system';
import DownloadingIcon from '@mui/icons-material/Downloading';
import InstrumentHeader from './InstrumentHeader';
import InstrumentPrice from './InstrumentPrice';
import styled from 'styled-components';
import { WebsocketContext } from '../../contextProvider/WsContextProvider';
import { IInstrumentData } from '../../types';
import { MessageEnum } from '../../enum/MessageEnum';

const StyledContainer = styled(Container)`
  padding: 10px;
  background: #1a1919;
  color: white;
  min-height: 170px;
  overflow : auto;
`;

interface IProps {
  instrumentId: string;
}

const Instrument: React.FC<IProps> = ({ instrumentId: assetID }) => {
  const { subscribeToInstrumentId } = useContext(WebsocketContext); // use it just like a hook

  const iniStateVal = {
    from: '',
    to: '',
    ask: 0.0,
    bid: 0.0,
    instrumentId: '',
    timestamp: new Date().getTime(),
  };
  const [state, setState] = useReducer(
    (currState: Partial<IInstrumentData>, newState: Partial<IInstrumentData>) => {
      let newVal: IInstrumentData | {} = {};
      if (Object.keys(newState).length && newState.instrumentId) {
        const { instrumentId } = newState;
        const instrumentsArr = instrumentId.split('-');
        newVal = Object.assign({}, currState, newState, {
          from: instrumentsArr[0],
          to: instrumentsArr[1],
        });
      }
      return newVal;
    },
    iniStateVal,
  );

  useEffect(() => {
    setState(subscribeToInstrumentId(assetID));
  }, [subscribeToInstrumentId, assetID]);

  return (
    <StyledContainer id="instrumentPod">
      {!(state as IInstrumentData)?.instrumentId && (
        <>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <DownloadingIcon />
          </div>

          <h4 style={{ display: 'flex', justifyContent: 'center' }}>
            {MessageEnum.LOADING_DATA_TEXT} {assetID}
          </h4>
        </>
      )}
      {(state as IInstrumentData)?.instrumentId && (
        <>
          <InstrumentHeader
            from={(state as IInstrumentData).from}
            to={(state as IInstrumentData).to}
          />
          <InstrumentPrice insDetail={state} />
        </>
      )}
    </StyledContainer>
  );
};

export default Instrument;
