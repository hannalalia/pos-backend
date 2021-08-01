'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
      username: 'hannalalia',
      email:'lalia_hanna@yahoo.com',
      password:'test123',
      firstName:'Hanna',
      lastName:'Lalis',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
      username: 'testuser123',
      email:'testuser123@gmail.com',
      password:'test123',
      firstName:'John',
      lastName:'Doe',
      createdAt: new Date(),
      updatedAt: new Date()
     }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
