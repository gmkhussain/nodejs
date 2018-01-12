'use strict';
module.exports = (sequelize, DataTypes) => {
    var employers = sequelize.define('employers', {
        name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'Company name field is required'
                },
                len: {
                    args: [2, 25],
                    msg: "Company name must be of min 2 and max 25 characters"
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    msg: 'EstablishedIn field is required'
                }
            }
        }
    }, {
        classMethods: {
            associate: function (models) {
                //employers.hasOne(models.user,{foreignKey:'user_id'});
            }
        }
    });
    return employers;
};