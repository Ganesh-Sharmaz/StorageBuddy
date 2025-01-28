"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@testing-library/react");
const useStash_1 = __importDefault(require("../src/useStash"));
describe('useStash', () => {
    beforeEach(() => {
        localStorage.clear();
        sessionStorage.clear();
        document.cookie = '';
    });
    test('should initialize with default value', () => {
        const { result } = (0, react_1.renderHook)(() => (0, useStash_1.default)('testKey', 'defaultValue', { type: 'local' }));
        expect(result.current[0]).toBe('defaultValue');
    });
    test('should update stored value', () => {
        const { result } = (0, react_1.renderHook)(() => (0, useStash_1.default)('testKey', 'defaultValue', { type: 'local' }));
        (0, react_1.act)(() => {
            result.current[1]('newValue');
        });
        expect(result.current[0]).toBe('newValue');
    });
    test('should retrieve stored value on mount', () => {
        localStorage.setItem('testKey', JSON.stringify({ value: 'storedValue', expires: null }));
        const { result } = (0, react_1.renderHook)(() => (0, useStash_1.default)('testKey', 'defaultValue', { type: 'local' }));
        expect(result.current[0]).toBe('storedValue');
    });
});
