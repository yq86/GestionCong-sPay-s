module.exports = (sequelize, DataTypes) => {
    const Holidays = sequelize.define("Holidays", {
        idUser: {
            type: DataTypes.INTEGER,
            allowNull: true,
            autoIncrement: false,
            primaryKey: true,
            references: {
                model: 'Users',
                key: 'id'
            }
        },
        holidaysAvailable: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        holidaysTaken: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
    return Holidays;
};