import type {AuthModel, RecordAuthResponse} from 'pocketbase';
import PocketBase from 'pocketbase';
import {writable, type Readable} from 'svelte/store';

import * as api from './api';

type AuthData = {
    isLoggedIn: boolean;
    model?: AuthModel | null;
};

type LoginParams = {
    provider?: string;
    username?: string;
    password?: string;
} & ({provider: string} | {username: string; password: string});

type AuthStore = Readable<AuthData> & {
    login: (params: LoginParams) => Promise<RecordAuthResponse>;
    logout: () => void;
};

export function pbAuthStore(): AuthStore {
    const pb = api.getPocketBase();

    const backStore = writable(getAuthData(pb));

    pb.authStore.onChange((token, model) => {
        backStore.set({
            isLoggedIn: token ? true : false,
            model,
        });
    });

    return {
        subscribe: backStore.subscribe,
        login: async ({provider, username, password}: LoginParams) => {
            const users = pb.collection('users');
            let authData: RecordAuthResponse;
            if (!pb.authStore.isValid) {
                if (provider) {
                    authData = await users.authWithOAuth2({
                        provider,
                    });
                } else if (username && password) {
                    authData = await users.authWithPassword(
                        username,
                        password
                    );
                } else {
                    throw Error('No credentials given');
                }
            } else {
                authData = await users.authRefresh();
            }
            return authData;
        },
        logout: () => pb.authStore.clear(),
    };
}

function getAuthData(pb: PocketBase): AuthData {
    return {
        isLoggedIn: pb.authStore.isValid,
        model: pb.authStore.model,
    };
}
