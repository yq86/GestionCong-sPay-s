// create table Demandes
module.exports = (sequelize, DataTypes) => {
    try {
        const Demandes = sequelize.define("Demandes", {
            startingDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            endingDate: {
                type: DataTypes.DATE,
                allowNull: false
            },
            
            description: {
                type: DataTypes.TEXT,
                allowNull: true
            }
        });
        return Demandes;
    } catch (error) {
        console.error(error);
    }  
};