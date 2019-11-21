knex migrate:up 20191120220840_create-users.js;
knex migrate:up 20191120220845_create-items.js;
knex seed:run --specific=001-users;
knex seed:run --specific=002-items;
