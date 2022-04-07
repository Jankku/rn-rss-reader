import AboutSection from '../AboutSection';
import { render } from '@testing-library/react-native';

describe('Test AboutSection', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<AboutSection />);
    expect(toJSON()).toMatchSnapshot();
  });
});
