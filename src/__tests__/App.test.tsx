// src/__tests__/App.test.tsx

import { render } from '@testing-library/react';
import App from '../App';
import { localStorageMock } from '../__mocks__/localStorage';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', () => {
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });
  render(<App />);
  expect(true).toBeTruthy();
});
