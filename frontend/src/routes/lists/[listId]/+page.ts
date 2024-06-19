import * as api from '$lib/api';

export async function load({params, fetch}) {
    const list = await api.fetchList(params.listId, fetch);
    return {title: list.name};
}
