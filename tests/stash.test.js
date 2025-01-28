"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stash_1 = __importDefault(require("../src/stash"));
describe('Stash', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = '';
    });
    test('set and get from localStorage', () => {
        stash_1.default.set('testKey', 'testValue', { type: 'local' });
        expect(stash_1.default.get('testKey', { type: 'local' })).toBe('testValue');
    });
    test('set and get from sessionStorage', () => {
        stash_1.default.set('testKey', 'testValue', { type: 'session' });
        expect(stash_1.default.get('testKey', { type: 'session' })).toBe('testValue');
    });
    test('set and get from cookies', () => {
        stash_1.default.set('testKey', 'testValue', { type: 'cookie' });
        expect(stash_1.default.get('testKey', { type: 'cookie' })).toBe('testValue');
    });
    test('remove from localStorage', () => {
        stash_1.default.set('testKey', 'testValue', { type: 'local' });
        stash_1.default.remove('testKey', { type: 'local' });
        expect(stash_1.default.get('testKey', { type: 'local' })).toBeNull();
    });
    test('clear localStorage', () => {
        stash_1.default.set('testKey1', 'testValue1', { type: 'local' });
        stash_1.default.set('testKey2', 'testValue2', { type: 'local' });
        stash_1.default.clear({ type: 'local' });
        expect(stash_1.default.get('testKey1', { type: 'local' })).toBeNull();
        expect(stash_1.default.get('testKey2', { type: 'local' })).toBeNull();
    });
    test('expired data should return null', () => {
        stash_1.default.set('testKey', 'testValue', { type: 'local', expires: '1ms' });
        setTimeout(() => {
            expect(stash_1.default.get('testKey', { type: 'local' })).toBeNull();
        }, 2);
    });
});
