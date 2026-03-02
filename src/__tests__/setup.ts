import '@testing-library/jest-dom';
import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

afterEach(() => {
  cleanup();
});

const _store: Record<string, string> = {};

function getItemImpl(key: string): string | null {
  return _store[key] ?? null;
}
function setItemImpl(key: string, value: string): void {
  _store[key] = value;
}
function removeItemImpl(key: string): void {
  delete _store[key];
}
function clearImpl(): void {
  Object.keys(_store).forEach((k) => delete _store[k]);
}

const localStorageMock = {
  getItem: vi.fn(getItemImpl),
  setItem: vi.fn(setItemImpl),
  removeItem: vi.fn(removeItemImpl),
  clear: vi.fn(clearImpl),
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
  writable: true,
});

afterEach(() => {
  vi.clearAllMocks();
  clearImpl();
  localStorageMock.getItem.mockImplementation(getItemImpl);
  localStorageMock.setItem.mockImplementation(setItemImpl);
  localStorageMock.removeItem.mockImplementation(removeItemImpl);
  localStorageMock.clear.mockImplementation(clearImpl);
});
