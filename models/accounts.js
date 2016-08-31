"use strict"

module.exports = function(sequelize, DataTypes) {
    var Accounts = sequelize.define("Accounts", {
        username: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        email_id: {
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.STRING
        }
    }, {
       tableName: 'accounts'
    });

    return Accounts;
}
