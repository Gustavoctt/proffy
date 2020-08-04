import Knex from 'knex';

//knex:migrate -> Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('connections', table => {
        table.increments('id').primary();


        //Conexão com qual professor
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');

        //Quando houve a conexão
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

//knex:migrate:rollback -> Volta a tras
export async function down(knex: Knex){
    return knex.schema.dropTable('connections');
}