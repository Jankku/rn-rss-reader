import useDebounce from '../useDebounce';
import { renderHook, act } from '@testing-library/react-hooks/native';

describe('Test useDebounce', () => {
  beforeEach(() => {
    jest.useFakeTimers('modern');
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('Should have inital value', () => {
    const value = 'test';
    const delay = 500;
    const { result } = renderHook(() => useDebounce(value, delay));

    expect(result.current).toBe(value);
  });

  test('Should update value when timer is completed', () => {
    let value = '1';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    expect(result.current).toBe('1');

    value = '2';
    rerender();

    act(() => jest.runAllTimers());

    expect(result.current).toBe('2');
  });

  test("Shouldn't update value when timer is not completed", () => {
    let value = '1';
    const { result, rerender } = renderHook(() => useDebounce(value, 500));

    expect(result.current).toBe('1');

    value = '2';
    rerender();

    act(() => jest.advanceTimersByTime(300));

    expect(result.current).toBe('1');
  });
});
