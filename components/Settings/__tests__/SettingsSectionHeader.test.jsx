import SettingsSectionHeader from '../SettingsSectionHeader';
import { render } from '@testing-library/react-native';

describe('Test SettingsSectionHeader', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(<SettingsSectionHeader title={'About'} />);
    expect(toJSON()).toMatchSnapshot();
  });
});
