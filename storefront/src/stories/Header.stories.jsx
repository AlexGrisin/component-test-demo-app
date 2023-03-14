import React, { useState } from 'react';
import { Header } from '../components/Header';
import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { UserContext } from '../context/UserContext';

const user = {
  firstName: 'Test',
  lastName: 'User',
};

export default {
  title: 'DemoApp/Header',
  component: Header,
  parameters: {
    // More on Story layout: https://storybook.js.org/docs/react/configure/story-layout
    layout: 'fullscreen',
  },
};

const Template = args => {
  const [user, setUser] = useState(args.user);
  const value = { user, setUser };
  return (
    <UserContext.Provider value={value}>
      <Header />
    </UserContext.Provider>
  );
};

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user,
};
LoggedIn.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('welcome-message').textContent).toContain(user.firstName);
  expect(canvas.getByTestId('logout-button')).toBeInTheDocument();
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {
  user: {},
};
LoggedOut.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  expect(canvas.getByTestId('login-button')).toBeInTheDocument();
  expect(canvas.getByTestId('signup-button')).toBeInTheDocument();
};
