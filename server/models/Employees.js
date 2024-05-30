

module.exports = (sequelize, DataTypes)=>{


    const Employees=sequelize.define("Employees",{

        name:{
            type:DataTypes.STRING,
            allowNull:false,

        },

        dob:{
            type:DataTypes.STRING,
            allowNull:false,

        },

        phone:{
            type:DataTypes.STRING,
            allowNull:false
        },

        role:{
            type:DataTypes.STRING,
            allowNull:false,

        }

    });

    return Employees




}
