/**
 * This component shows bid and ask price for each FX pair
 * Dynamic ask,bid prices are read from context store and updated at every change only.
 */

import { Button, ButtonGroup, Paper } from '@mui/material';

import { useEffect, useReducer } from 'react';
import styled from 'styled-components';
import { IInstrumentData } from '../../types';
import { toFloat } from '../../utils';

const InstrumentLeft = styled('span')`
  position: absolute;
  top: 60px;
  left: 4px;
  padding: 2px;
`;

const InstrumentRight = styled('span')`
  position: absolute;
  top: 60px;
  right: 4px;
  padding: 2px;
`;

const StyledDecimal = styled.span`
  font-size: xx-large;
  align-content: baseline;
  display: contents;
`;
const StyledPaper = styled(Paper)`
  position: absolute;
  left: 42%;
  z-index: 1;
  height: 20px;
  align-items: center;
  background: #1a1919;
  color: white !important;
  background-color: #1a1919 !important;
  min-width: 60px;
  justify-content: center;
  padding: 0px 2px;
`;

const StyledBtn = styled(Button)`
  align-content: center;
  background-color: #005ce6 !important;
  font-size: large !important;
  padding: 20px !important;
  width: 100%;
  border: 1px solid black !important;
`;

const StyledBtnGrp = styled(ButtonGroup)`
  position: relative;
  width: 100%;
`;

interface IProps {
  insDetail: IInstrumentData | {};
}
const InstrumentPrice: React.FC<IProps> = ({ insDetail }) => {
  const { ask, bid, from, to } = insDetail as IInstrumentData;
  const bidWholeNos = bid.toString().split('.')[0];
  const bidFloatNos = bid.toString().split('.')[1] || '000';
  const askWholeNos = ask.toString().split('.')[0];
  const askFloatNos = ask.toString().split('.')[1] || '000';

  const [diffVal, setDiffVal] = useReducer(
    (state: string, newVal: number) => toFloat(Math.abs(newVal), 3),
    toFloat(Math.abs(ask - bid), 3),
  );

  useEffect(() => {
    setDiffVal(ask - bid);
  }, [ask, bid]);

  return (
    <StyledBtnGrp
      id="instrumentPrice"
      variant="contained"
      aria-label="outlined primary button group"
    >
      <StyledBtn id="bidPanel">
        <InstrumentLeft> {from} </InstrumentLeft>
        {bidWholeNos}.<StyledDecimal>{bidFloatNos}</StyledDecimal>
      </StyledBtn>

      <StyledPaper square={true} elevation={3}>
        {diffVal}
      </StyledPaper>
      <StyledBtn id="askPanel">
        <InstrumentRight> {to} </InstrumentRight>
        {askWholeNos}.<StyledDecimal>{askFloatNos}</StyledDecimal>
      </StyledBtn>
    </StyledBtnGrp>
  );
};

export default InstrumentPrice;
