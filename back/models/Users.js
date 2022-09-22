// create table Users
module.exports = (sequelize, DataTypes) => {
    try{
        const Users = sequelize.define("Users", {
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
        },{
            updatedAt: false,
            createdAt: false
        });  
        Users.associate = function (models) {
            Users.hasOne(models.Holidays, {onDelete: "cascade"});       
            Users.hasMany(models.Demandes, {onDelete: "cascade"});
        }; 
        return Users;
    } catch (error) {
        console.error(error);
    }  
};
