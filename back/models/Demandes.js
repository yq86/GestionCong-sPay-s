module.exports = (sequelize, DataTypes) => {
    try {
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
        idType: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Types',
                key: 'idType'
            }
        },
        status: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    },{
        updatedAt: false,
        createdAt: false
    });
    return Demandes;
} catch (error) {
    console.error(error);
}  
};