import type {RecordSubscription} from 'pocketbase';
import {writable, type Writable} from 'svelte/store';

import * as api from './api';
import {handleChanges} from './pbUtils';
import type {Id, Item} from './types';

export type ListStore = {
    state: string;
    items?: Item[];
    error?: string;
} & (
    | {
          state: 'loading';
      }
    | {
          state: 'ready';
          items: Item[];
      }
    | {
          state: 'error';
          error: string;
      }
);

export function pbListStore(listId: Id): Writable<ListStore> {
    let oldItems: Item[] | undefined = undefined;
    let unsubscriber: (() => void) | undefined = undefined;

    type Setter = (value: ListStore) => void;

    async function fetchListAndStartWatchingChanges(setter: Setter) {
        try {
            const items = await api.fetchListItems(listId);
            oldItems = items;
            setter({
                state: 'ready',
                items: structuredClone(items),
            });
        } catch (error) {
            console.error('Error:', error);
            setter({
                state: 'error',
                error: 'List cannot be loaded',
            });
            return;
        }

        function handleChange({action, record}: RecordSubscription<Item>) {
            if (!oldItems) return;
            const idx = oldItems.findIndex((x) => x.id === record.id);
            let changed = false;
            if (['create', 'update'].includes(action) && idx === -1) {
                // New or updated item not on our list
                oldItems.push(record);
                changed = true;
            } else if (['create', 'update'].includes(action) && idx !== -1) {
                // Existing item changed (or created "again")
                oldItems[idx] = record;
                changed = true;
            } else if (action === 'delete' && idx !== -1) {
                // Item deleted
                oldItems = [
                    ...oldItems.slice(0, idx),
                    ...oldItems.slice(idx + 1),
                ];
                changed = true;
            }
            if (changed)
                setter({
                    state: 'ready',
                    items: structuredClone(oldItems),
                });
        }

        unsubscriber = await api.watchForChanges(listId, handleChange);
    }

    const backStore = writable<ListStore>({state: 'loading'}, (setter) => {
        fetchListAndStartWatchingChanges(setter);
        return () => unsubscriber?.();
    });

    return {
        ...backStore,
        set(value: ListStore) {
            backStore.set(value);
            handleChanges(oldItems ?? [], value.items ?? [], {
                create: (x: Item) => api.createListItem(listId, x),
                update: api.updateListItem,
                delete: api.deleteListItem,
            });
            oldItems = structuredClone(value.items);
        },
    };
}
