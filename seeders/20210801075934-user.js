'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
      _id:'0829c16e-f2be-11eb-9a03-0242ac130003',
      username: 'hannalalia',
      email:'lalia_hanna@yahoo.com',
      password:'test123',
      firstName:'Hanna',
      lastName:'Lalis',
      createdAt: new Date(),
      updatedAt: new Date()
     },
     {
       _id:"0829c16e-f2be-11eb-9a03-0242ac130003",
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
