
module.exports = async (sequelize, DataTypes) => {
    try {
        let Types = sequelize.define("Types", {
            idType: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                unique: true,
            }
        },{
            updatedAt: false,
            createdAt: false
        }).sync().then((types) => {
            types.bulkCreate([
                { name: "maladie" },
                { name: "maternité" },
                { name: "mariage" },
                { name: "funéraille" },
                { name: "demenagement" }
    ],{ignoreDuplicates: true}); 
});
            
            Types.associate = function (models) {
                Types.hasMany(models.Demandes, {foreignKey: 'idType'});
            }; 
        
            return Types;
    } catch (error) {
        console.error(error);
    }    
};

