Configulator
============

Handles building a config object based on the environment in which the program is running and allows you to override
config properties by passing arguments over the command line.


Overview
========

Does your app run in multiple environments? If so, you more than likely have different settings per environment.
This module was created to ease the creation of configuration properties within multiple environments. The common
properties that do not change exist within the *default* property while the environment specific values live within
their respective environment property. Now, you can easily load the appropriate configuration based on your environment
with a single line of code.

Usage
=====

Getting the environment specific configiuration is simple. Follow these steps:

- Set the node environment variable, *NODE_ENV* to be the environment your program will be working in. While you are
developing, this will most likely be the *development* environment.
- Define your default and environment specific configurations in your config file. The name of the file is not
important as you should use dependency injection to inject the configuration file to your modules. Here is an example
configuration:

```javascript
config.js
/*jshint node: true*/
'use strict';

exports.wiretree = function configModule(configulator) {
  var config = {
    default: {
      status: {
        SUCCESS: 200,
        CREATED: 201,
        BAD_REQUEST: 400,
        NOT_FOUND: 404,
        INTERNAL_SERVER_ERROR: 500
      },
      methods: {
        GET: 'GET',
        PUT: 'PUT',
        POST: 'POST',
        DELETE: 'DELETE',
        PATCH: 'PATCH'
      },
      standardHeaders: {
        'Content-Type': 'application/json'
      },
      port: 8888,
    },
    development: {
      port: 8000
    },
    production: {
      port: 8001
    }
  };

  return configulator(config);
};
```


Note that in the above example I am using wiretree to inject configulator. You could require it as a dependency if you choose, but I recommend using a dependency injection framework, such as wiretree. It's simple to setup. Just update your tree as follows:

```javascript
var Wiretree = require('wiretree');
var wireTree = new Wiretree(__dirname);
var configulator = require('configulator');
wireTree.add(configulator, 'configulator');
```

In the example above, if you set NODE_ENV to be *development*, it will overwrite the port to be 8000 instead of 8888.

Overwriting values using arguments
=========================

You can also overwrite values using arguments. To do this, simply set your specified argument on *overrides*. For example:

```
	node myProgram.js --overrides.port=5827
```

This will override your environment settings and set the port to 5827, regardless of the environment you are running in.





