module.exports = (sequelize, Datatypes) => {
  const Story = sequelize.define(
    "Story",
    {
      image: {
        type: Datatypes.STRING,
        allowNull: false,
      },
      video: {
        type: Datatypes.STRING,
        allowNull: false,
      },
    },
    { underscored: true }
  );
  return Story;
};
