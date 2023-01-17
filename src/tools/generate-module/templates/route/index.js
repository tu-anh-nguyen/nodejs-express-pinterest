module.exports = (componentName, modelName) => {
  return {
    content: `const ${componentName}Controller = require('../../controllers/${componentName}');
const router = require('express').Router();
    
router.post('/', ${componentName}Controller.create${modelName});
router.get('/', ${componentName}Controller.get${modelName}s);
router.get('/:id', ${componentName}Controller.find${modelName}ById);
router.put('/:id', ${componentName}Controller.update${modelName});
router.delete('/:id', ${componentName}Controller.delete${modelName});

module.exports = router;
`,
    name: `${componentName}.js`,
  };
};
