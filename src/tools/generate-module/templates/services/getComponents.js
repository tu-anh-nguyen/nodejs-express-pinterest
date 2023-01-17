module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');

module.exports = async (params) => {
  const limit = +params.limit || 10;
  const offset = +params.offset || 0;
	try {
		const ${componentName}s = await ${modelName}.findAll({
      limit: limit + 1,
      offset,
    });

		let nextPaging = null;

    if (${componentName}s.length > limit) {
      nextPaging = { limit, offset: offset + limit };
      ${componentName}s.pop();
    }

		return { ${componentName}s, nextPaging };
	} catch (error) {
		throw new SugarError(error);
	}
};
`,
  name: `get${modelName}s.js`,
});
