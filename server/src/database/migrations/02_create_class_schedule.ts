import Knex from 'knex';

//knex:migrate -> Cria a tabela
export async function up(knex: Knex){
    return knex.schema.createTable('class_schadule', table => {
        table.increments('id').primary();

        table.integer('week_day').notNullable();
        table.integer('from').notNullable();
        table.integer('to').notNullable();

        //Classe que o professor da aula
        table.integer('class_id')
            .notNullable()
            .references('id')
            .inTable('classes')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

//knex:migrate:rollback -> Volta a tras
export async function down(knex: Knex){
    return knex.schema.dropTable('class_schadule');
}