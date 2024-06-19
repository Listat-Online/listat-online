import {writable} from 'svelte/store';

import {pbAuthStore} from './pbAuthStore';

export const notification = writable('Welcome to Listat Online!');
export const modalIsOpen = writable(false);

export const authStore = pbAuthStore();
