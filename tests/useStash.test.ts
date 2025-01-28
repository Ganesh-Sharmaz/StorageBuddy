import { renderHook, act } from '@testing-library/react';
import useStash from '../src/useStash';

describe('useStash', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
  });

  test('should initialize with default value', () => {
    const { result } = renderHook(() => useStash('testKey', 'defaultValue', { type: 'local' }));
    expect(result.current[0]).toBe('defaultValue');
  });

  test('should update stored value', () => {
    const { result } = renderHook(() => useStash('testKey', 'defaultValue', { type: 'local' }));
    act(() => {
      result.current[1]('newValue');
    });
    expect(result.current[0]).toBe('newValue');
  });

  test('should retrieve stored value on mount', () => {
    localStorage.setItem('testKey', JSON.stringify({ value: 'storedValue', expires: null }));
    const { result } = renderHook(() => useStash('testKey', 'defaultValue', { type: 'local' }));
    expect(result.current[0]).toBe('storedValue');
  });
});