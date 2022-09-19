module.exports = (sequelize, DataTypes) => {
    try{
    const Holidays = sequelize.define("Holidays", {
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