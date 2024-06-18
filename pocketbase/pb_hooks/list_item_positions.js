/// <reference path="../pb_data/types.d.ts" />

onRecordBeforeCreateRequest((e) => {
    if (!e.record.pos) {
        const itemWithMaxPos = $app.dao().findRecordsByFilter(
            'list_item',
            "list = {:listId} && pos != ''",
            '-pos', // sort by pos, descending
            1, // limit
            0, // offset
            {listId: e.record.get('list')}
        );
        const maxPos = itemWithMaxPos?.[0]?.get?.('pos') || 0;
        e.record.set('pos', maxPos + 1000000);
    }
}, 'list_item');
