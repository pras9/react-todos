// src/__tests__/App.test.tsx

import { render, screen } from '@testing-library/react';
import Todos from '../Todos.tsx';
import { localStorageMock } from '../../__mocks__/localStorage.ts';

describe("<Todos />", () => {
  test('Should display the first todo from localStorage', () => {
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });
    localStorage.setItem('todos', '[{"id":1720972634131,"title":"This is first todo","completed":false}]');
    render(<Todos />);
    expect(screen.getByText('This is first todo')).toBeTruthy();
  });
})
