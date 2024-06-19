<script lang="ts">
    import {notification} from '$lib/stores';
    import type {Item as ItemType} from '$lib/types';

    import ListItem from './ListItem.svelte';

    type PartialItem = Pick<ItemType, 'id' | 'name' | 'complete'>;

    export let items: PartialItem[];

    let newItemName = '';

    const makeId = () =>
        Math.random().toString(36).substring(2, 17).padEnd(15, 'X');

    function addItem() {
        const item = {
            id: makeId(),
            name: newItemName,
            complete: false,
        };
        items = [...items, item];
        $notification = `Added to list: ${newItemName}`;
        newItemName = '';
    }

    function deleteItem(e: CustomEvent<PartialItem>) {
        $notification = `Deleted from list: ${e.detail.name}`;
        items = items.filter((x) => x.id !== e.detail.id);
    }

    function changeItem(e: CustomEvent<PartialItem>) {
        const item = e.detail;
        const idx = items.findIndex((x) => x.id === item.id);
        items[idx] = item;
        if (item.complete) $notification = `Set as complete: ${item.name}`;
        else $notification = `Set as incomplete: ${item.name}`;
    }
</script>

<form on:submit|preventDefault={addItem}>
    <!-- svelte-ignore a11y-no-redundant-roles -->
    <fieldset role="group">
        <!-- svelte-ignore a11y-autofocus -->
        <input
            name="item"
            type="text"
            placeholder="New item..."
            bind:value={newItemName}
            required
            autofocus
        />
        <button>Add</button>
    </fieldset>
</form>
<ul>
    {#each items as item (item.id)}
        <ListItem
            {item}
            on:delete-item={deleteItem}
            on:change-item={changeItem}
        />
    {/each}
</ul>

<style>
    ul {
        padding-left: 0;
    }
</style>
