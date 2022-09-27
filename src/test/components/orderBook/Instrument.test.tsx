import { render, fireEvent, screen } from './testUtils';
import { CommonEnum } from '../../../enum/CommonEnum';
import Instrument from '../../../components/orderBook/Instrument';
import { MessageEnum } from '../../../enum/MessageEnum';

jest.mock('../../../hooks/useWs', () => jest.fn());

describe('Test Instrument', () => {
  it('should render Instrument', async () => {
    const { container } = await render(<Instrument instrumentId={'BTC-USD-SWAP-LIN'} />, {});

    const containerEle = container.querySelector('#instrumentPod');
    expect(containerEle).toBeInTheDocument();
  });
});
