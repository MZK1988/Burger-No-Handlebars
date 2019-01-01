


module.exports = function(sequelize, DataTypes) {
    var Order = sequelize.define("Order", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },

      devour: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });

    return Order;
};
