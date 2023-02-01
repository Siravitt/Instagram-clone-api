module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define(
    "Follow",
    {},
    {
      underscored: true,
    }
  );

  Follow.associate = (db) => {
    Follow.belongsTo(db.User, {
      as: "following",
      foreignKey: {
        name: "followingId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Follow.belongsTo(db.User, {
      as: "follower",
      foreignKey: {
        name: "followerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return Follow;
};
