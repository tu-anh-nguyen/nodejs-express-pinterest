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
    'CREATED'.blue,
    `${modelDirectiory}/${generateModelTemplates.name}`.green
  );

  const modelContent = fs
    .readFileSync(`${modelDirectiory}/index.js`)
    .toString();
  const firstIdx = modelContent.indexOf(`\n  module.exports = {`);
  const secondIdx = modelContent.indexOf(`  sequelize,`);
  console.log('firstIdx', firstIdx)
  console.log('secondIdx', secondIdx)
  const newContent =
    modelContent.slice(0, firstIdx) +
    `const ${modelName} = require('./${modelName}')(sequelize);\n` +
    modelContent.slice(firstIdx, secondIdx) +
    `  ${modelName},\n` +
    modelContent.slice(secondIdx);

  // fs.writeFileSync(`${modelDirectiory}/index.js`, newContent);

  console.log('UPDATED'.green, `${modelDirectiory}/index.js`.green);

  /** Route genration */
  const generateRouteTemplates = componentRoute(componentName, modelName);
  fs.writeFileSync(
    `${routeDirectiory}/${generateRouteTemplates.name}`,
    generateRouteTemplates.content
  );
  console.log(
    'CREATED'.blue,
    `${routeDirectiory}/${generateRouteTemplates.name}`.green
  );

  /** Controllers genration */
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
        'CREATED'.blue,
        `${controllersDirectory}/${template.name}`.green
      );
    });
  }

  /** Services genration */
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
    });

    console.log('CREATED'.blue, `${servicesDirectory}/${template.name}`.green);
  }
});
