<script lang="ts">
    import {goto} from '$app/navigation';
    import {ClientResponseError} from 'pocketbase';

    import {authStore, modalIsOpen} from '$lib/stores';

    let username = '';
    let password = '';
    let loginFailureText = '';
    let errorModalCloseButton: HTMLButtonElement;
    let passwordInput: HTMLInputElement;

    async function handleLoginFormSubmit() {
        login('local');
    }

    async function login(provider: string) {
        try {
            if (provider == 'local') {
                await authStore.login({username, password});
            } else {
                await authStore.login({provider});
            }
            goto('/lists');
        } catch (error) {
            $modalIsOpen = true;
            loginFailureText = 'Error while logging in';
            if (error instanceof ClientResponseError) {
                if (provider == 'local' && error.status === 400) {
                    loginFailureText = 'Invalid credentials';
                } else {
                    console.error('Login Error:', error.toJSON());
                }
            } else {
                console.error('Login Error', error);
            }
        }
    }

    function onModalIsOpenChange(isOpen: boolean) {
        if (isOpen) {
            setTimeout(() => errorModalCloseButton.focus(), 0);
        } else if (loginFailureText && username) {
            passwordInput.focus();
        }
    }

    $: onModalIsOpenChange($modalIsOpen);
</script>

<h1>Login</h1>

<dialog open={$modalIsOpen}>
    <article>
        <header>
            <button
                aria-label="Close"
                on:click={() => ($modalIsOpen = false)}
                rel="prev"
            />
            <strong>Login Failed!</strong>
        </header>
        <p>
            {loginFailureText}
        </p>
        <footer>
            <button
                on:click={() => ($modalIsOpen = false)}
                bind:this={errorModalCloseButton}
            >
                Close
            </button>
        </footer>
    </article>
</dialog>

<form on:submit|preventDefault={handleLoginFormSubmit}>
    <article>
        <header>
            <strong>Login with Username and Password</strong>
        </header>
        <label>
            Username
            <input type="text" name="username" bind:value={username} />
        </label>
        <label>
            Password
            <input
                type="password"
                name="password"
                bind:value={password}
                bind:this={passwordInput}
            />
        </label>
        <footer>
            <button disabled={!username || !password}> Login </button>
        </footer>
    </article>
</form>

<hr />

<article>
    <header>
        <strong>Login with External Identity</strong>
    </header>
    <button on:click={() => login('github')}>Login with GitHub</button>
    <button on:click={() => login('gitlab')}>Login with GitLab</button>
</article>
