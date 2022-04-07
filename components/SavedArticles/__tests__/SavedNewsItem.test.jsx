import SavedNewsItem from '../SavedNewsItem';
import { render, fireEvent, waitFor } from '@testing-library/react-native';

describe('Test SavedNewsItem', () => {
  test('Should match snapshot', () => {
    const { toJSON } = render(
      <SavedNewsItem
        title={'title'}
        description={'description'}
        imageUrl={'imageUrl'}
        pubDate={'04/04/2022, 19:00'}
        onPress={() => {}}
      />
    );
    expect(toJSON()).toMatchSnapshot();
  });

  test('Should call onPress', () => {
    const onPress = jest.fn();
    const { getByText } = render(
      <SavedNewsItem
        title={'title'}
        description={'description'}
        imageUrl={'imageUrl'}
        pubDate={'04/04/2022, 19:00'}
        onPress={onPress}
      />
    );
    const item = getByText('title');

    fireEvent.press(item);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('Should use placeholder values', async () => {
    const { getAllByText } = render(
      <SavedNewsItem
        title={''}
        description={''}
        imageUrl={'imageUrl'}
        pubDate={''}
        onPress={() => {}}
      />
    );
    const textElements = getAllByText('-');
    await waitFor(() => expect(textElements).toHaveLength(3));
  });
});
