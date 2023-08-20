// userState.js
import { atom } from 'recoil';

export const userState = atom({
  key: 'userState',
  default: {
    username: null,
    loading: true,
  },
});
