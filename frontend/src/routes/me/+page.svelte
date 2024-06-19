<script lang="ts">
    import {goto} from '$app/navigation';

    import {authStore} from '$lib/stores';

    function logout() {
        authStore.logout();
        goto('/');
    }
</script>

<h1>Me</h1>

<pre>{JSON.stringify($authStore.model, undefined, '    ')}</pre>

<button on:click={logout}>Log Out</button>
