import SettingsStack from '../SettingsStack';
import { render } from 'testutils';

describe('Test SettingsStack', () => {
  test('Should render SettingsScreen', async () => {
    const { getByText } = render(<SettingsStack />);

    expect(getByText('Theme')).toBeDefined();
    expect(getByText('About')).toBeDefined();
  });
});
