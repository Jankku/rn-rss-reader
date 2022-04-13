import ThemeSection from '../ThemeSection';
import { render } from 'testutils';

describe('Test ThemeSection', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<ThemeSection />);
    expect(toJSON()).toMatchSnapshot();
  });
});
