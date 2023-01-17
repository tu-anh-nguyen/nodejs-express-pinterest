require('colors');
const fs = require('fs');
const {
  componentControllers,
  componentServices,
  componentModel,
  componentRoute,
} = require('./templates');
const rootDir = [
  './src/models',
  './src/services',
  './src/controllers',
  './src/routes',
];
const params = process.argv.slice(2);

rootDir.forEach((dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
});

params.forEach((param) => {
  if (!param) {
    console.error('Please supply a valid component name'.red);
    process.exit(1);
  }

  const tableName = param;
  const modelName = tableName
    .split('_')
    .map((name) => name[0].toUpperCase() + name.slice(1))
    .join('');
  const componentName = tableName[0] + modelName.slice(1);

  console.log(`Creating Component Templates with name: ${componentName}`);

  const controllersDirectory = `./src/controllers/${componentName}`;
  const modelDirectiory = `./src/models`;
  const routeDirectiory = `./src/routes/v1`;
  const servicesDirectory = `./src/services/${componentName}`;

  /** Model genration */
  console.log('========\nGenerating model');
  const generateModelTemplates = componentModel(
    componentName,
    modelName,
    tableName
  );
  fs.writeFileSync(
    `${modelDirectiory}/${generateModelTemplates.name}`,
    generateModelTemplates.content
  );
  console.log(
    'CREATED'.bgGreen,
    `${modelDirectiory}/${generateModelTemplates.name}`.green
  );

  const modelContent = fs
    .readFileSync(`${modelDirectiory}/index.js`)
    .toString();
  const firstIdx = modelContent.indexOf(`\nmodule.exports = {`);
  const secondIdx = modelContent.indexOf(`  sequelize,`);
  const newModelContent =
    modelContent.slice(0, firstIdx) +
    `const ${modelName} = require('./${modelName}')(sequelize);\n` +
    modelContent.slice(firstIdx, secondIdx) +
    `  ${modelName},\n` +
    modelContent.slice(secondIdx);
  fs.writeFileSync(`${modelDirectiory}/index.js`, newModelContent);
  console.log('UPDATED'.bgYellow, `${modelDirectiory}/index.js`.green);

  /** Route genration */
  console.log('========\nGenerating routes');
  const generateRouteTemplates = componentRoute(componentName, modelName);
  fs.writeFileSync(
    `${routeDirectiory}/${generateRouteTemplates.name}`,
    generateRouteTemplates.content
  );
  console.log(
    'CREATED'.bgGreen,
    `${routeDirectiory}/${generateRouteTemplates.name}`.green
  );

  const routeContent = fs
    .readFileSync(`${routeDirectiory}/index.js`)
    .toString();
  const routeImportIdx = routeContent.indexOf(`module.exports = router;`);
  const newRouteContent =
    routeContent.slice(0, routeImportIdx) +
    `const ${componentModel}Router = require('./${componentModel}');
router.use('/${tableName}s', ${componentModel}Router);\n` +
    routeContent.slice(routeImportIdx);
  console.log('routeContent', routeContent);
  console.log('routeImportIdx', routeImportIdx);
  console.log('newRouteContent', newRouteContent);
  // fs.writeFileSync(`${routeDirectiory}/index.js`, newRouteContent);
  console.log('UPDATED'.bgYellow, `${routeDirectiory}/index.js`.green);

  /** Controllers genration */
  console.log('========\nGenerating controllers');
  if (fs.existsSync(controllersDirectory)) {
    console.error(`Controllers ${componentName} already exists.`.red);
  } else {
    fs.mkdirSync(controllersDirectory);

    const generateControllersTemplates = componentControllers.map((template) =>
      template(componentName, modelName)
    );

    generateControllersTemplates.forEach((template) => {
      fs.writeFileSync(
        `${controllersDirectory}/${template.name}`,
        template.content
      );
      console.log(
        'CREATED'.bgGreen,
        `${controllersDirectory}/${template.name}`.green
      );
    });
  }

  /** Services genration */
  console.log('========\nGenerating services');
  if (fs.existsSync(servicesDirectory)) {
    console.error(`Services ${componentName} already exists.`.red);
  } else {
    fs.mkdirSync(servicesDirectory);
    const generateServicesTemplates = componentServices.map((template) =>
      template(componentName, modelName)
    );

    generateServicesTemplates.forEach((template) => {
      fs.writeFileSync(
        `${servicesDirectory}/${template.name}`,
        template.content
      );
      console.log(
        'CREATED'.bgGreen,
        `${servicesDirectory}/${template.name}`.green
      );
    });
  }
});
