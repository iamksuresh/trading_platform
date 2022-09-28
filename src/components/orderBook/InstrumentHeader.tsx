/**
 * This component show FX pairs for each pod
 */
import React from 'react';

interface IProps {
  from: string;
  to: string;
}

const InstrumentHeader: React.FC<IProps> = (props) => {
  const { from, to } = props;
  return (
    <h3
      style={{
        display: 'flex',
      }}
    >
      <u style={{marginRight : '2px'}}>{from} </u>
      {to}
    </h3>
  );
};

export default InstrumentHeader;
