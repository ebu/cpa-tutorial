"use strict";

module.exports = function(self)
{
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
      throw Error("Invalid usage: Method must be called using explicitely the context \"this\" . \"this.setGithubCredentials(...)\"")
    }
    return _this.getGlobal().console;
  }

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
  }

  var prototype = {

    /**
     * Set Github credentials in the Authorization Provider and restart the docker container.
     *
     * To generate credentials, please go to : https://github.com/settings/applications/new
     *
     * For this tutorial, use the following parameters:
     *    - Application name : EBU CPA tutorial
     *    - Homepage URL: localhost:8001
     *    - Application description: EBU CPA tutorial
     *    - Authorization callback URL: http://localhost:8001/auth/github/callback
     *
     * @param clientId: Client ID of the github developer application
     * @param clientSecret: Client Secret of the github developer application
     */
    setGithubCredentials: function (clientId, clientSecret, self) {
      // Custom console to print information in the browser.
      var _this = this;
      var customConsole = getConsole(_this);

      // Write the new configuration file
      var fs = require('fs');
      var content = "# This file was automatically generated \nauthprovider:\n  environment:  \n    CPA_GITHUB_CLIENT_ID: " + clientId + " \n    CPA_GITHUB_CLIENT_SECRET: " + clientSecret;

      fs.writeFile("/opt/docker/github_credentials.yml", content, function (err) {
        if (err) {
          return customConsole.log(err);
        }

        customConsole.log("[OK]    Configuration saved.");
        customConsole.log("....    Restarting the Authorization provider with new configuration.");

        reloadContainer(_this, "authprovider", function() {
          customConsole.log("[OK]    Authorization Provider restarted.");
          customConsole.log("===>    Go to part 1");
        });
      });
    },

    get: function (url) {
      var customConsole = getConsole(this);
      var request = require('request');

      request
        .get(url)
        .on('response', function (response) {
          customConsole.log(response.statusCode);
        })
        .on('error', function (error) {
          customConsole.warn(error);
        });
    },

    post: function (url, data, options) {
      var customConsole = getConsole(this);
      var request = require('request');

      var requestOptions = {
        url:    url,
        method: 'POST',
        body:   data,
        json:   true
      };

      if (options.token) {
        requestOptions.headers = {
          "WWW-Authenticate": "Bearer " + options.token;
        };
      }

      request(requestOptions, function (error, response, body) {
        if (error) {
          customConsole.warn(error);
          return;
        }

        customConsole.log('Status: ' + response.statusCode);
        customConsole.log('\n' + JSON.stringify(body, null, '  '));
      });
    }
  }

  self.setGithubCredentials = prototype.setGithubCredentials;
  self.get =                  prototype.get;
  self.post =                 prototype.post;

  var message = "[OK]    Tutorial utilities successfully loaded.";
  return self.getGlobal().console.log(message);
};
