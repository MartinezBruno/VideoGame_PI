const {DataTypes} = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = sequelize => {
   // defino el modelo
   sequelize.define(
      'videogame',
      {
         id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false,
         },
         name: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         description: {
            type: DataTypes.STRING,
            allowNull: false,
         },
         released: {
            type: DataTypes.STRING,
         },
         rating: {
            type: DataTypes.DECIMAL,
         },
         platforms: {
            type: DataTypes.JSON,
            allowNull: false,
         },
         createdOnDb: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
            //Diferencio de los juegos traidos desde la api a los creados
         },
      },
      {
         timestamps: false,
      },
   )
}
