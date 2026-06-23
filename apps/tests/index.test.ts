import axios, { AxiosError } from 'axios';
import { describe, expect, it } from 'bun:test';
import { BACKEND } from './config';

describe('auth endpoints', (req, res) => {
  const username = `testuser ${Math.random()}`;

  it('Signup doesnt work if username isnt provided', async () => {
    try {
      const response = await axios.post(`${BACKEND}/api/v1/signup`, {
        password: '123123',
      });

      expect(1).toBe(2);
    } catch (error) {
      if (error instanceof AxiosError) {
        expect(error.status).toBe(411);
      } else {
        expect(1).toBe(2);
      }
    }
  });

  it('Signup does work if username isnt provided', async () => {
    const response = await axios.post(`${BACKEND}/api/v1/signup`, {
      username,
      password: '123123',
    });
  });
});
