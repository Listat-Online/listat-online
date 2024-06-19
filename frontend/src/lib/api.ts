import PocketBase, {type RecordSubscription} from 'pocketbase';

import type {FetchFunction, Id, Item, List} from './types';

export function getPocketBase() {
    return new PocketBase('http://localhost:8090');
}

const pb = getPocketBase();
const lists = pb.collection<List>('list');
const listItems = pb.collection<Item>('list_item');
const listFilter = (listId: Id) => pb.filter('list={:listId}', {listId});

export async function fetchLists(): Promise<List[]> {
    return await lists.getFullList();
}

export async function fetchList(
    listId: Id,
    fetch: FetchFunction | undefined = undefined
) {
    return await lists.getOne(listId, {fetch});
}

export async function fetchListItems(listId: Id) {
    const response = await listItems.getList(1, 1000, {
        filter: listFilter(listId),
        sort: 'pos',
    });
    return response.items;
}

export async function createListItem(listId: Id, item: Partial<Item>) {
    if (!item.name) throw Error('Text cannot be empty');

    const oldItem = await fetchListItemByName(listId, item.name);
    if (oldItem) throw Error('Item with same name was already on the list');
    await listItems.create({...item, list: listId});
}

export async function deleteListItem(item: {id: Id}) {
    await listItems.delete(item.id);
}

export async function updateListItem(item: Partial<Item> & {id: Id}) {
    await listItems.update(item.id, item);
}

async function fetchListItemByName(listId: Id, name: string) {
    const response = await listItems.getList(1, 1, {
        filter: pb.filter('list={:listId} && name={:name}', {
            listId,
            name,
        }),
    });
    return response.items.length ? response.items[0] : null;
}

export type ChangeHandler<T> = (data: RecordSubscription<T>) => void;

export async function watchForChanges(
    listId: Id,
    handler: ChangeHandler<Item>
) {
    return await listItems.subscribe('*', handler, {
        filter: listFilter(listId),
    });
}
