module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      profileImage: DataTypes.STRING,
      bio: DataTypes.STRING,
    },
    {
      underscored: true,
    }
  );

  User.associate = (db) => {
    User.hasMany(db.Post, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Comment, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Like, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Chat, {
      as: "sender",
      foreignKey: {
        name: "senderId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Chat, {
      as: "receiver",
      foreignKey: {
        name: "receiverId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Follow, {
      as: "following",
      foreignKey: {
        name: "followingId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
    User.hasMany(db.Follow, {
      as: "follower",
      foreignKey: {
        name: "followerId",
        allowNull: false,
      },
      onDelete: "RESTRICT",
    });
  };

  return User;
};
