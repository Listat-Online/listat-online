<script lang="ts">
    import {fetchLists} from '$lib/api';

    const listPromise = fetchLists();
</script>

{#await listPromise}
    <div aria-busy="true">Loading lists...</div>
    <progress />
{:then lists}
    <ul>
        {#each lists as list}
            <li><a href="/lists/{list.id}">{list.name}</a></li>
        {/each}
    </ul>
{:catch}
    <div>Cannot load lists.</div>
{/await}
