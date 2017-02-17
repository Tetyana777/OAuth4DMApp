OAuth4DMApp is a small project being part of the "Doom Metal" app development project.

Source codes enable web developers to integrate them in their web apps as the LOGIN part applying user authentication and authorization via OAuth 2.0 protocol.

OAuth4DMApp is developed using NodeJS Express framework, PassportJS authentication middleware, OAuth2orize authorization server toolkit for NodeJS, Mongoose MongoDB, Winston logging library and GulpJS (for automated development workflow).

The general overview of the contents of the project files folders:
- "app-src/.. /. .js": models, controllers and PassportJS configuration file;
- "db": database files (empty by default);
- "libs/log.js": Winston log file configuration;
- "routes": app routing files;
- "app.js" : the main project Javascript file;
- "debug.log": log file(Winston-configured);
- "gulpfile.js": running the tasks('jshint', 'server'(express), 'users'(MongoDB), 'nodemon'(NodeJS));
- "package.json": list of packages installed/needed for the project.

Testing tools used: POSTMAN.
