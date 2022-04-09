import SettingsScreen from '../SettingsScreen';
import { render } from '../../utils/testutils';

describe('Test SettingsScreen', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<SettingsScreen />);
    expect(toJSON()).toMatchSnapshot();
  });
});
