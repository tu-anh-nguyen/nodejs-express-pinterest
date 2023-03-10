const { SugarError } = require('../../helpers/errors');
const { User } = require('../../models');

module.exports = async (params) => {
  const limit = +params.limit || 10;
  const offset = +params.offset || 0;
  try {
    const users = await User.findAll({
      limit: +limit + 1,
      offset,
    });

    const total = await User.count();
    let nextPaging = null;

    if (users.length > limit) {
      nextPaging = { limit, offset: offset + limit };
      users.pop();
    }

    return { users, nextPaging, total };
  } catch (error) {
    throw new SugarError(error);
  }
};
