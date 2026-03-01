import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import type { Decorator } from '@storybook/react-vite';

/**
 * Decorator that wraps stories in a MemoryRouter for components using react-router hooks.
 */
export const withRouter: Decorator = (Story, context) => {
  const initialEntries = context.parameters?.router?.initialEntries || ['/'];
  return (
    <MemoryRouter initialEntries={initialEntries}>
      <Story />
    </MemoryRouter>
  );
};
