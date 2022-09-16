module.exports = (sequelize, DataTypes) => {
    try{
    const Holidays = sequelize.define("Holidays", {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        holidaysAvailable: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
        holidaysTaken: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    },{
        updatedAt: false,
        createdAt: false
    });
    return Holidays;
} catch (error) {
    console.error(error);
}  
};