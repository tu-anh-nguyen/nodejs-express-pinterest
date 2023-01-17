module.exports = (componentName, modelName) => ({
  content: `const { SugarError } = require('../../helpers/errors');
const { ${modelName} } = require('../../models');
const { Err${modelName}NotFound } = require('../../pkg/appError');

module.exports = async (id, args) => {
	try {
		const ${componentName} = await ${modelName}.findOne({
      where: {
        id: id,
      },
    });

    if (!${componentName}) {
      throw new SugarError(Err${modelName}NotFound);
    }

    ${componentName}.set(args);
    await ${componentName}.save();

		return ${componentName};
	} catch (error) {
		throw new SugarError(error);
	}
};
`,
  name: `update${modelName}.js`,
});
