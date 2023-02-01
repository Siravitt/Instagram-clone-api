module.exports = (sequelize, Datatypes) => {
  const Chat = sequelize.define(
    "Chat",
    {
      message: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      messageImg: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    {
      underscored: true,
    }
  );

  Chat.associate = (db) => {
    Chat.belongsTo(db.User, {
      as: "sender",
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    Chat.belongsTo(db.User, {
      as: "receiver",
      foreignKey: {
        name: "receiverId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };
  return Chat;
};
