/// <reference path="../pb_data/types.d.ts" />
migrate(
    (db) => {
        const collection = new Collection({
            id: 'rxzrffczilc29u2',
            created: '2024-06-18 12:16:41.547Z',
            updated: '2024-06-18 12:16:41.547Z',
            name: 'list',
            type: 'base',
            system: false,
            schema: [
                {
                    system: false,
                    id: 'ph6hc3vr',
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
                    id: 'knlc9l9r',
                    name: 'owner',
                    type: 'relation',
                    required: true,
                    presentable: false,
                    unique: false,
                    options: {
                        collectionId: '_pb_users_auth_',
                        cascadeDelete: true,
                        minSelect: null,
                        maxSelect: 1,
                        displayFields: null,
                    },
                },
            ],
            indexes: [],
            listRule: '@request.auth.id = owner.id',
            viewRule: '@request.auth.id = owner.id',
            createRule: '@request.auth.id = owner.id',
            updateRule: '@request.auth.id = owner.id',
            deleteRule: '@request.auth.id = owner.id',
            options: {},
        });

        return Dao(db).saveCollection(collection);
    },
    (db) => {
        const dao = new Dao(db);
        const collection = dao.findCollectionByNameOrId('rxzrffczilc29u2');

        return dao.deleteCollection(collection);
    }
);
