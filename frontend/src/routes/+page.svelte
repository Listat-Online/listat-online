<script lang="ts">
    import {authStore} from '$lib/stores';

    import image from './listat-online.svg';
</script>

<h1>Welcome!</h1>

<p>Welcome to create lists online.</p>

<figure>
    <a href={$authStore.isLoggedIn ? '/lists' : '/login'}>
        <img src={image} alt="Listat Online" />
    </a>
</figure>
