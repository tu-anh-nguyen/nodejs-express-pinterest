module.exports = (componentName, modelName) => ({
  content: `const resp = require('../../helpers/response');
const ${componentName}Services = require('../../services/${componentName}');

module.exports = async (req, res, next) => {
  const { limit, offset } = req.query;
	try {
		const ${componentName} = await ${componentName}Services.get${modelName}s({ limit, offset });
		resp({
			res,
			data: ${componentName},
		});
	} catch (error) {
		next(error);
	}
};
`,
  name: `get${modelName}s.js`,
});
