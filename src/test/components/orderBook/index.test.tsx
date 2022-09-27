import { render, fireEvent, screen } from './testUtils';
import { CommonEnum } from '../../../enum/CommonEnum';
import OrderBook from '../../../components/orderBook';

jest.mock('../../../components/orderBook/Instrument', () => {
  const ComponentToMock = () => <div />;
  return ComponentToMock;
});

describe('Test OrderBook', () => {
  it('renders Application Header on load', async () => {
    const { container } = await render(<OrderBook />, {});
    const containerEle = container.querySelector('#orderBookContainer');

    expect(containerEle).toBeInTheDocument();
    expect(containerEle?.tagName).toEqual('DIV');
  });
});
