import Knex from 'knex';

//knex:migrate -> Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('users', table => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.string('avatar').notNullable();
        table.string('whatsapp').notNullable();
        table.string('bio').notNullable();
        table.boolean('is_teacher').notNullable();
    });
}

//knex:migrate:rollback -> Volta a tras
export async function down(knex: Knex){
    return knex.schema.dropTable('users');
}