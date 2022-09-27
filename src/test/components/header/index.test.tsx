import React from 'react';
import { render, screen } from '@testing-library/react';
import { CommonEnum } from '../../../enum/CommonEnum';
import Header from '../../../components/header';

describe('Test Header', () => {
  it('renders Application Header on load', () => {
    const { container } = render(<Header />);
    const HeaderEle = screen.getByText(CommonEnum.ORDER_BOOK);
    expect(HeaderEle).toBeInTheDocument();
  });

  it('checks the header tag to be H2', () => {
    const { container } = render(<Header />);
    const HeaderEle = container.querySelector('#appHeader');

    expect(HeaderEle?.getAttribute('id')).toEqual('appHeader');
    expect(HeaderEle?.tagName).toEqual('H2');
  });
});
