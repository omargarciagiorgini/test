//const faker = require('../../node_modules/@faker-js/faker');
const faker = require('faker');

'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     var dummyJSON = [];
     for(var i = 0 ; i < 100 ; i++){
        dummyJSON.push({
          first_name: faker.name.firstName(),
          last_name: faker.name.lastName(),
          email: faker.internet.email(),
          phone: faker.phone.phoneNumber(),
          ip: faker.internet.ip(),
          address: faker.address.streetAddress(),
          city: faker.address.cityName(),
          createdAt : new Date(),
          updatedAt : new Date()
        });
     }
     await queryInterface.bulkInsert('Users',dummyJSON,{});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {});
  }
};
