import ThemeSection from '../ThemeSection';
import { render } from '@testing-library/react-native';

describe('Test ThemeSection', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<ThemeSection />);
    expect(toJSON()).toMatchSnapshot();
  });
});
