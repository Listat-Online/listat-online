<script lang="ts">
    import {page} from '$app/stores';

    import List from '$lib/components/List.svelte';
    import Notification from '$lib/components/Notification.svelte';
    import {pbListStore} from '$lib/pbListStore';

    export const list = pbListStore($page.params.listId);
</script>

<Notification />

{#if $list.state == 'ready'}
    <List bind:items={$list.items} />
{:else if $list.state == 'loading'}
    <span aria-busy="true">Loading...</span>
    <progress />
{:else if $list.state == 'error'}
    <div>Error: {$list.error}</div>
{/if}
