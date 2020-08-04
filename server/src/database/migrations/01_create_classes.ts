import Knex from 'knex';

//knex:migrate -> Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('classes', table => {
        table.increments('id').primary();
        table.string('subject').notNullable();
        table.decimal('cost').notNullable();

        //Professor que da a aula
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

//knex:migrate:rollback -> Volta a tras
export async function down(knex: Knex){
    return knex.schema.dropTable('classes');
}