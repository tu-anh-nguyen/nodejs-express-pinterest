module.exports = (componentName, modelName) => ({
  content: `const resp = require('../../helpers/response');
const ${componentName}Services = require('../../services/${componentName}');

module.exports = async (req, res, next) => {
	const { id } = req.params;
	const args = req.body;
	try {
		const ${componentName} = await ${componentName}Services.update${modelName}(id, args);
		resp({
			res,
			data: ${componentName},
		});
	} catch (error) {
		next(error);
	}
};
`,
  name: `update${modelName}.js`,
});
