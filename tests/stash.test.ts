import Stash from '../src/stash';


describe('Stash', () => {
  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie = '';
  });

  test('set and get from localStorage', () => {
    Stash.set('testKey', 'testValue', { type: 'local' });
    expect(Stash.get('testKey', { type: 'local' })).toBe('testValue');
  });

  test('set and get from sessionStorage', () => {
    Stash.set('testKey', 'testValue', { type: 'session' });
    expect(Stash.get('testKey', { type: 'session' })).toBe('testValue');
  });

  test('set and get from cookies', () => {
    Stash.set('testKey', 'testValue', { type: 'cookie' });
    expect(Stash.get('testKey', { type: 'cookie' })).toBe('testValue');
  });

  test('remove from localStorage', () => {
    Stash.set('testKey', 'testValue', { type: 'local' });
    Stash.remove('testKey', { type: 'local' });
    expect(Stash.get('testKey', { type: 'local' })).toBeNull();
  });

  test('clear localStorage', () => {
    Stash.set('testKey1', 'testValue1', { type: 'local' });
    Stash.set('testKey2', 'testValue2', { type: 'local' });
    Stash.clear({ type: 'local' });
    expect(Stash.get('testKey1', { type: 'local' })).toBeNull();
    expect(Stash.get('testKey2', { type: 'local' })).toBeNull();
  });

  test('expired data should return null', () => {
    Stash.set('testKey', 'testValue', { type: 'local', expires: '1ms' });
    setTimeout(() => {
      expect(Stash.get('testKey', { type: 'local' })).toBeNull();
    }, 2);
  });
});