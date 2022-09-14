module.exports = (sequelize, DataTypes) => {
    const Demandes = sequelize.define("Demandes", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        idUser: {
            type: DataTypes.INTEGER,
            autoIncrement: false,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        startingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        endingDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        type: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    });

    Demandes.associate = function (models) {
        Demandes.hasOne(models.Types, {
            foreignKey: {
                name: 'idTypeKey',
                field: 'idType',
            },
            as: 'Types',
        }); 
    }; 
    return Demandes;
};