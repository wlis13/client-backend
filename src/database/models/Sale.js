module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    sellerId: { type: DataTypes.INTEGER, foreignKey: true },
    totalPrice: { type: DataTypes.FLOAT },
    deliveryAddress: { type: DataTypes.STRING },
    deliveryNumber: { type: DataTypes.STRING },
    saleDate: { 
      type: DataTypes.DATE,
    },
    status: { type: DataTypes.STRING }
  },
  {
  timestamps: false,
  tableName: 'sales',
  underscored: true,
  });

  Sale.associate = (models) => {
    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user'});
    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller'});
  }

  return Sale;
};
