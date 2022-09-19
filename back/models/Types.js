module.exports = (sequelize, DataTypes) => {
    try {
        const Types = sequelize.define("Types", {
            name: {
                type: DataTypes.STRING,
                unique: true,
            }
        },{
            updatedAt: false,
            createdAt: false
        });
        Types.associate = function (models) {
            Types.hasMany(models.Demandes, {foreignKey: 'idType', as:'type'});
        }; 
    
        Types.sync().then((types) => {
            types.bulkCreate([
                { name: "maladie" },
                { name: "maternité" },
                { name: "mariage" },
                { name: "funéraille" },
                { name: "demenagement" }
            ],{ignoreDuplicates: true}); 
            
        });
            
        return Types;
    } catch (error) {
        console.error(error);
    }    
};

