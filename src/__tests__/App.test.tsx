// src/__tests__/App.test.tsx

import { render, screen } from '@testing-library/react';
import App from '../App.tsx';
import { localStorageMock } from '../__mocks__/localStorage.ts';

describe("<App />", () => {
  test('demo', () => {
    expect(true).toBe(true);
  });

  test('Renders the main page', () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    render(<App />);
    expect(screen.getByText('Todo Application')).toBeTruthy();
  });
});
