<script lang="ts">
    import {onDestroy} from 'svelte';
    import {elasticOut} from 'svelte/easing';
    import {fly} from 'svelte/transition';

    import {notification} from '$lib/stores';

    export let hideDelayMs = 3000;
    let visible = false;
    let timerHandle: number | undefined = undefined;

    function clear() {
        $notification = '';
        visible = false;
    }

    function onMessageOrDelayChange(message: string, delayMs: number) {
        clearTimeout(timerHandle);
        if (!message) {
            visible = false;
        } else {
            visible = true;
            timerHandle = setTimeout(clear, delayMs);
        }
    }
    $: onMessageOrDelayChange($notification, hideDelayMs);

    onDestroy(() => clearTimeout(timerHandle));
</script>

{#if visible}
    <button
        on:click={clear}
        transition:fly={{
            delay: 250,
            duration: 500,
            x: 0,
            y: -100,
            opacity: 0.5,
            easing: elasticOut,
        }}
    >
        {$notification}
    </button>
{/if}

<style>
    button {
        background-color: var(--pico-secondary-background);
        color: var(--pico-secondary-inverse);
        border-width: 0px;
        opacity: 90%;
        z-index: 100;
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 1em;
        border-radius: 0.5rem;
        padding: 0.5rem 2rem;
    }
</style>
