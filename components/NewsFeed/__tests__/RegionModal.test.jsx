import RegionModal from '../RegionModal';
import { render } from 'testutils';

describe('Test RegionModal', () => {
  const listRef = {
    current: {
      scrollToOffset: jest.fn(),
    },
  };

  test('Should match snapshot', () => {
    const { toJSON } = render(
      <RegionModal listRef={listRef} isVisible={true} onClose={() => {}} />
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
