# test

use node version 17 or higher
first , run 'npm install'
run migrations with  npx sequelize-cli db:migrate on /db directory

to feed the DB with fake data in order to test the system run :
npx sequelize-cli db:seed:all

After each migration, dont forget to update the models