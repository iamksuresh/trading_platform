import { render, fireEvent, screen } from './testUtils';
import { CommonEnum } from '../../../enum/CommonEnum';
import InstrumentPrice from '../../../components/orderBook/InstrumentPrice';
import { MessageEnum } from '../../../enum/MessageEnum';

describe('Test InstrumentPrice', () => {
  it('should render Instrument Price', async () => {
    const mockProp = {
      ask: 100.0,
      bid: 99.99,
      from: 'btc',
      to: 'usd',
    };

    const { container } = await render(<InstrumentPrice insDetail={mockProp} />, {});

    const containerEle = container.querySelector('#instrumentPrice');
    expect(containerEle).toBeInTheDocument();

    const askPanel = container.querySelector('#askPanel');
    expect(askPanel).toBeInTheDocument();

    const bidPanel = container.querySelector('#bidPanel');
    expect(bidPanel).toBeInTheDocument();
  });
});
