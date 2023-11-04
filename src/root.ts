import { createElement } from 'react';
import { createRoot } from 'react-dom/client';
import { Root } from './components/Root';

const createRootElement = (id: string) => {
  const element = document.createElement('div');
  element.setAttribute('id', id);
  return element;
};

export const initializeRoot = () =>
  createRoot(
    document.querySelector('#root') ??
      document.body.appendChild(createRootElement('root')),
  ).render(createElement(Root));
