module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        firstWorkingDay: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });
    
    Users.associate = function (models) {
        Users.hasOne(models.Holidays, {
            foreignKey: {
                name: 'idUserKey',
                field: 'idUser',
            },
            as: 'Holidays',
        }); 
        Users.hasMany(models.Demandes, {foreignKey: 'idUser'});
    }; 
    return Users;
};