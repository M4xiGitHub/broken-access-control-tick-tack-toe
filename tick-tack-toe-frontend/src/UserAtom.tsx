import { atom, useAtom } from 'jotai';

import { atomWithStorage } from 'jotai/utils';
import exp from 'constants';

export interface UserAtom{
  userId : number;
  username : string;
  gamesDraw : number;
  gamesDisconnected : number;
  gamesOtherDisconnected : number;
  gamesPlayed : number;
  gamesWon: number;
  gamesLost: number;
}

export const authenticated = atomWithStorage('authStatus', false);
export const jwt = atomWithStorage('jwt', null);

export const gameId = atom<null|string>(null);

export const userAtom = atom<null|UserAtom>(null);
export const userId = atomWithStorage('userId', 0);

export const registerAtom = atom(
  null,
  async (get, set, credentials) => {
    const { username, password } = credentials as { username: string, password: string };
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password })
      });
      if (!response.ok) {
        throw new Error('Failed to login !!!!!');
      }
      const data = await response.json();
      set(authenticated, true);
      set(jwt, data.access_token);
      // console.log('Register successful:', data);
    } catch (error) {
        // console.error('Register failed:', error);
        set(authenticated, false);
        throw new Error("");      
    }
  }
);

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
        throw new Error('Failed to login !!!!!');
      }
      const data = await response.json();
      set(authenticated, true);
      set(jwt, data.access_token);

      // console.log('Login successful:', data);
    } catch (error) {
      // console.error('Login failed :(   :', error);
      set(authenticated, false);
      throw new Error("");      
    }
  }
);
