// PocketBase Utils

export function handleChanges<T extends {id: string}>(
    oldItems: T[],
    newItems: T[],
    handlers: {
        create?: (iteemi: T) => void;
        update?: (iteemi: T, vanhaIteemi: T) => void;
        delete?: (iteemi: T) => void;
    }
) {
    // Make a mapping from item ids to items
    const oldItemsById = oldItems.reduce((m, i) => m.set(i.id, i), new Map());

    const newItemIds = new Set();

    // Find new and changed items
    for (const iteemi of newItems) {
        newItemIds.add(iteemi.id);
        const oldItem = oldItemsById.get(iteemi.id);
        if (oldItem === undefined) {
            handlers?.create?.(iteemi);
        } else if (!areRecordsEqual(iteemi, oldItem)) {
            handlers?.update?.(iteemi, oldItem);
        }
    }

    // Check if anything has been deleted
    for (const item of oldItems) {
        if (!newItemIds.has(item.id)) handlers?.delete?.(item);
    }
}

function areRecordsEqual<T extends {[key: string]: unknown}>(
    obj1: T,
    obj2: T
) {
    const isDiffKey = (key: string) =>
        !commonPbKeys.has(key) && obj1[key] !== obj2[key];
    if (Object.keys(obj1).some(isDiffKey)) return false;
    if (Object.keys(obj2).some(isDiffKey)) return false;
    return true;
}

const commonPbKeys = new Set([
    'collectionId',
    'collectionName',
    'created',
    'updated',
]);
