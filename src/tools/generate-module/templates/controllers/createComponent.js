module.exports = (componentName, modelName) => ({
  content: `const resp = require('../../helpers/response');
const ${componentName}Services = require('../../services/${componentName}');

module.exports = async (req, res, next) => {
	const args = req.body;
	try {
		const ${componentName} = await ${componentName}Services.create${modelName}(args);
		resp({
			res,
			data: ${componentName},
		});
	} catch (error) {
		next(error);
	}
};
`,
  name: `create${modelName}.js`,
});
