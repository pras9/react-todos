import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TodoType } from '../types';

const Todos: React.FC = () => {
  const initialTodos = JSON.parse(localStorage.getItem('todos') || '[]');
  const [todos, setTodos] = useState(initialTodos as TodoType[]);

  useEffect(() => {
    if (todos) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const input = document.getElementById('todoInput') as HTMLInputElement;
      if (input.value) {
        const todo: TodoType = {
          id: Date.now(),
          title: input.value,
          completed: false
        }
        setTodos([todo, ...todos]);
        input.value = '';
      }
    }
  };

  const onToggle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const id = Number(e.target.id);
    const completed = e.target.checked;
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo: TodoType) => todo.id === id);
    newTodos.splice(todoIndex, 1);
    if (completed) {
      setTodos([...newTodos, {...todos[todoIndex], completed}]);
    } else {
      setTodos([{...todos[todoIndex], completed}, ...newTodos]);
    }
  };

  const deleteTodo = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const id = Number(e.currentTarget.dataset.todoid);
    const newTodos = [...todos];
    const todoIndex = newTodos.findIndex((todo: TodoType) => todo.id === id);
    newTodos.splice(todoIndex, 1);
    setTodos(newTodos);
  };

  return (
    <TodosContainer>
      <h2>Todo Application</h2>
      <TodoInput placeholder='Input some text here' id='todoInput' name='todoInput' onKeyUp={onEnter} />
      <TodoUl>
        {todos.map((todo: TodoType) => (
          <Todoli key={todo.id}>
            <input type='checkbox' id={String(todo.id)} onChange={onToggle} checked={todo.completed} />
            <Del href='#' data-todoid={String(todo.id)} title='Delete' onClick={deleteTodo}>-</Del>
            <Todo completed={String(todo.completed)}>{todo.title}</Todo>
          </Todoli>
        ))}
      </TodoUl>
    </TodosContainer>
  );
};

export default Todos;

const TodoInput = styled.input`
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  width: calc(100% - 20px);
  margin-bottom: 10px;
  font-size: 16px;
`;
const TodosContainer = styled.div`
  padding: 10px;
  width: 60%;
  margin: 20px auto;
`;
const TodoUl = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
const Todoli = styled.div`
  border-bottom: 1px dotted #ccc;
`;
const Todo = styled.span<{ completed: string }>`
  padding: 10px 0;
  font-size: 18px;
  text-decoration: ${(props) => (props.completed === 'true' ? 'line-through' : 'none')};
`;
const Del = styled.a`
  margin: 0 10px;
  cursor: pointer;
  color: red;
  text-decoration: none;
  font-size: 28px;
`;

