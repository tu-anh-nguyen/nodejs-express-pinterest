module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');
const { Err${modelName}NotFound } = require('../../pkg/appError');

module.exports = async (id) => {
	try {
		const ${componentName} = await ${modelName}.findOne({ where: { id } });

		if (!${componentName}) {
      throw new SugarError(Err${modelName}NotFound);
		}

		return ${componentName};
	} catch (error) {
		throw new SugarError(error);
	}
};
`,
  name: `find${modelName}ById.js`,
});
