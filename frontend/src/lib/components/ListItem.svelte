<script lang="ts">
    import {createEventDispatcher} from 'svelte';

    import type {Item} from '$lib/types';

    type PartialItem = Pick<Item, 'id' | 'complete' | 'name'>;

    export let item: PartialItem;

    const dispatch = createEventDispatcher<{
        'change-item': PartialItem;
        'delete-item': PartialItem;
    }>();
</script>

<li>
    <input
        type="checkbox"
        checked={item.complete}
        on:change={() =>
            dispatch('change-item', {
                ...item,
                complete: !item.complete,
            })}
    />
    <span class={item.complete ? 'complete-row' : ''}>
        {item.name}
    </span>
    <button on:click={() => dispatch('delete-item', item)}>🗑️</button>
</li>

<style>
    li {
        list-style-type: none;
        display: flex;
        align-items: center;
    }
    button {
        margin-left: auto;
    }
    .complete-row {
        text-decoration: line-through;
        color: gray;
    }
</style>
