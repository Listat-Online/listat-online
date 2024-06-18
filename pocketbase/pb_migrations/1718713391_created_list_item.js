/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'h8gu0jg75wi570m',
            created: '2024-06-18 12:23:11.932Z',
            updated: '2024-06-18 12:23:11.932Z',
            name: 'list_item',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: 'a8h6cuv9',
                    name: 'list',
                    type: 'relation',
                    required: true,
                    presentable: false,
                    unique: false,
                    options: {
                        collectionId: 'rxzrffczilc29u2',
                        cascadeDelete: true,
                        minSelect: null,
                        maxSelect: 1,
                        displayFields: null,
                    },
                },
                {
                    system: false,
                    id: 'juecw7h7',
                    name: 'pos',
                    type: 'number',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {
                        min: null,
                        max: null,
                        noDecimal: true,
                    },
                },
                {
                    system: false,
                    id: 'egobkx1i',
                    name: 'name',
                    type: 'text',
                    required: true,
                    presentable: true,
                    unique: false,
                    options: {
                        min: 1,
                        max: 200,
                        pattern: '',
                    },
                },
                {
                    system: false,
                    id: '3t6lu15e',
                    name: 'complete',
                    type: 'bool',
                    required: false,
                    presentable: false,
                    unique: false,
                    options: {},
                },
            ],
            indexes: [],
            listRule: '@request.auth.id = list.owner.id',
            viewRule: '@request.auth.id = list.owner.id',
            createRule: '@request.auth.id = list.owner.id',
            updateRule: '@request.auth.id = list.owner.id',
            deleteRule: '@request.auth.id = list.owner.id',
            options: {},
        });

        return Dao(db).saveCollection(collection);
    },
    (db) => {
        const dao = new Dao(db);
        const collection = dao.findCollectionByNameOrId('h8gu0jg75wi570m');

        return dao.deleteCollection(collection);
    }
);
