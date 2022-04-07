import NewsItem from '../NewsItem';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Settings } from 'luxon';

describe('Test NewsItem', () => {
  beforeAll(() => {
    Settings.defaultZone = 'utc';
    Settings.now = () => new Date('Wed, 06 Apr 2022 17:35:00 +0300').valueOf();
  });

  afterAll(() => {
    Settings.defaultZone = 'local';
  });

  test('Should match snapshot', () => {
    const { toJSON } = render(
      <NewsItem
        title={'title'}
        description={'description'}
        imageUrl={'imageUrl'}
        pubDate={'Wed, 06 Apr 2022 17:28:12 +0300'}
        onPress={() => {}}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <NewsItem
        title={'title'}
        description={'description'}
        imageUrl={'imageUrl'}
        pubDate={'Wed, 06 Apr 2022 17:28:12 +0300'}
        onPress={onPress}
      />
    );
    const item = getByText('title');

    fireEvent.press(item);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Should use placeholder values', () => {
    const { getAllByText } = render(
      <NewsItem title={''} description={''} imageUrl={'imageUrl'} pubDate={''} onPress={() => {}} />
    );
    const textElements = getAllByText('-');
    waitFor(() => expect(textElements).toHaveLength(3));
  });
});
