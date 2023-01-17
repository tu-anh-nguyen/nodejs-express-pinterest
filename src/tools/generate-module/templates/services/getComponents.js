module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');

module.exports = async ({ limit, offset }) => {
	try {
		const ${componentName}s = await ${modelName}.findAll({
      limit: limit + 1,
      offset,
    });

		let nextPagination = null;

    if (${componentName}s.length > limit) {
      nextPagination = { limit, offset: offset + limit };
      ${componentName}s.pop();
    }

		return { ${componentName}s, nextPagination };
	} catch (error) {
		throw new SugarError(error);
	}
};
`,
  name: `get${modelName}s.js`,
});
