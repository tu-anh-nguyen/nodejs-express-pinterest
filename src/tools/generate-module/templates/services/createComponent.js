module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');

module.exports = async (args) => {
	try {
		const ${componentName} = await ${modelName}.create(args);
		return ${componentName};
	} catch (error) {
    throw new SugarError(error);
	}
};
`,
  name: `create${modelName}.js`,
});
