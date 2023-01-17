module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');

module.exports = async ({ limit: _limit, offset: _offset }) => {
  const limit = +_limit || 10;
  const offset = +_offset || 0;
	try {
		const ${componentName}s = await ${modelName}.findAll({
      limit: limit + 1,
      offset,
    });

    const total = await ${modelName}.count();
		let nextPaging = null;

    if (${componentName}s.length > limit) {
      nextPaging = { limit, offset: offset + limit };
      ${componentName}s.pop();
    }

		return { ${componentName}s, nextPaging, total };
	} catch (error) {
		throw new SugarError(error);
	}
};
`,
  name: `get${modelName}s.js`,
});
