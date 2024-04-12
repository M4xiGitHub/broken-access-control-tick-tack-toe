import { atom, useAtom } from 'jotai';

import { atomWithStorage } from 'jotai/utils';

export const authenticated = atomWithStorage('authStatus', false);

// Atom for login logic remains unchanged
export const loginAtom = atom(
  null,
  async (get, set, credentials) => {
    const { username, password } = credentials as { username: string, password: string };
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Failed to login');
      }
      const data = await response.json();
      set(authenticated, true);
      console.log('Login successful:', data);
    } catch (error) {
      console.error('Login failed:', error);
      set(authenticated, false);
    }
  }
);
