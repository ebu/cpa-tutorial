'use strict';

var fs      = require('fs');
var http    = require('http');
var request = require('request');

module.exports = function(self) {

  /**
   * Check that the function is called with the right context
   * and return the console, which returns the log output to
   * the browser.
   *
   * @param _this context which provides the console
   * @returns {Console} console object
   */

  var getConsole = function(_this) {
    if (! _this) {
      throw Error('Invalid usage: Method must be called using the explicit context "this". "this.setGithubCredentials(...)"');
    }
    return _this.getGlobal().console;
  };

  /**
   * Restart a container which has been started with `serviceName` label.
   * @param _this context
   * @param serviceName
   */

  var reloadContainer = function(_this, serviceName) {
    var customConsole = getConsole(_this);

    console.log('Restarting ', serviceName);
    // Reload Container
    var spawn = require('child_process').spawn;
    var s = spawn('docker-compose', ['restart', serviceName],
      {
        'cwd': '/opt/docker',
        'detached': true,
        'stdio': ['ignore', 'ignore', 'ignore']
      }).unref();
  };

  var formatHeaderName = function(header) {
    return header.replace(/\b[A-Za-z0-9_]+/g, function(match) {
      if (match === 'www') {
        return match.toUpperCase();
      }
      else {
        return match.charAt(0).toUpperCase() + match.substr(1);
      }
    });
  };

  var logJson = function(dest, data, prefix) {
    var json  = JSON.stringify(data, null, '  ');
    var lines = json.split('\n');

    dest.log('');

    lines.forEach(function(line) {
      dest.log(line);
    });
  };

  var headersToDiscard = {
    'x-powered-by': true,
    'set-cookie':   true
  };

  var logRequestOrResponse = function(dest, type, data) {
    switch (type) {
      case 'request':
        dest.log('//////// Request: ////////\n');
        dest.log(data.method + ' ' + data.uri + ' HTTP/1.1');
        break;

      case 'response':
        dest.log('//////// Response: ////////\n');
        dest.log(data.statusCode + ' ' + http.STATUS_CODES[data.statusCode]);
        break;

      default:
        dest.warn('Request type: ' + type + ' not handled');
        break;
    }

    for (var header in data.headers) {
      if (!headersToDiscard[header]) {
        dest.log(formatHeaderName(header) + ': ' + data.headers[header]);
      }
    }

    if (data.body) {
      if (data.body instanceof Object) {
        logJson(dest, data.body);
      }
      else {
        try {
          var data = JSON.parse(data.body);
          logJson(dest, data);
        }
        catch (SyntaxError) {
          dest.log(data.body);
        }
      }
    }

    dest.log('\n');
  };

  var prototype = {

    /**
     * Set Github credentials in the Authorization Provider and restart the
     * docker container.
     *
     * To generate credentials, please go to:
     * https://github.com/settings/applications/new
     *
     * For this tutorial, use the following parameters:
     *  - Application name : EBU CPA tutorial
     *  - Homepage URL: localhost:8001
     *  - Application description: EBU CPA tutorial
     *  - Authorization callback URL: http://localhost:8001/auth/github/callback
     *
     * @param clientId: Client ID of the GitHub developer application
     * @param clientSecret: Client Secret of the GitHub developer application
     */

    setGithubCredentials: function (clientId, clientSecret, self) {
      // Custom console to print information in the browser.
      var _this = this;
      var customConsole = getConsole(_this);

      // Write the new configuration file
      var content = [
        '# This file was automatically generated',
        'authprovider:',
        '  environment:',
        '    CPA_GITHUB_CLIENT_ID: ' + clientId,
        '    CPA_GITHUB_CLIENT_SECRET: ' + clientSecret
      ].join('\n');

      fs.writeFile('/opt/docker/github_credentials.yml', content, function (err) {
        if (err) {
          return customConsole.log(err);
        }

        customConsole.log('[OK]    Configuration saved.');
        customConsole.log('....    Restarting the Authorization provider with new configuration.');

        reloadContainer(_this, 'authprovider', function() {
          customConsole.log('[OK]    Authorization Provider restarted.');
          customConsole.log('===>    Go to part 1');
        });
      });
    },

    get: function (url) {
      var customConsole = getConsole(this);

      request
        .get(url)
        .on('response', function (response) {
          // logResponse(customConsole, response);
        })
        .on('error', function (error) {
          customConsole.warn(error);
        });
    },

    post: function (url, data, options) {
      var customConsole = getConsole(this);

      options = options || {};

      var requestOptions = {
        url:    url,
        method: 'POST'
      };

      if (options.form) {
        requestOptions.form = data;
      }
      else {
        requestOptions.body = data;
        requestOptions.json = true;
      }

      if (options.token) {
        requestOptions.headers = {
          'Authorization': 'Bearer ' + options.token
        };
      }

      request(requestOptions, function (error, response, body) {
        if (error) {
          customConsole.warn(error);
          return;
        }
      });
    }
  }

  self.setGithubCredentials = prototype.setGithubCredentials;
  self.get =                  prototype.get;
  self.post =                 prototype.post;

  require('request-debug')(request, function(type, data, r) {
    var dest = self.getGlobal().console;

    logRequestOrResponse(dest, type, data);
  });

  var message = '[OK]    Tutorial utilities successfully loaded.';
  return self.getGlobal().console.log(message);
};
