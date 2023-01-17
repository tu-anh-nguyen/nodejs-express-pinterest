module.exports = (componentName, modelName) => ({
  content: `const resp = require('../../helpers/response');
const ${componentName}Services = require('../../services/${componentName}');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	try {
		const ${componentName} = await ${componentName}Services.delete${modelName}(id);
		resp({
			res,
			data: ${componentName},
		});
	} catch (error) {
		next(error);
	}
};
`,
  name: `delete${modelName}.js`,
});
