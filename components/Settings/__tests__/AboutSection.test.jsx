import AboutSection from '../AboutSection';
import { render } from '../../../utils/testutils';

describe('Test AboutSection', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<AboutSection />);
    expect(toJSON()).toMatchSnapshot();
  });
});
