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
   * @param done Callback function
   */
  var reloadContainer = function(_this, serviceName, done) {
    var customConsole = getConsole(_this);

    // Reload Container
    var exec = require('child_process').exec;
    exec('docker-compose up -d ' + serviceName,
      {
        'cwd': '/opt/docker'
      },
      function (error, stdout, stderr) {
        if (!stderr.indexOf("Recreating " + serviceName)) {
          customConsole.log("[OK]    Successfuly restarted the Authentication Provider");
          return;
        }

        customConsole.log("[skip]  " + stdout + stderr);
        if (error !== null) {
          customConsole.log('[?]  exec error: ' + error);
          throw Error("Error while reloading the container: ", error)
        }
      });
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
        customConsole.log("[OK]    Restarting services with new configuration.");

        reloadContainer(_this, "authprovider", function() {
          customConsole.log("[OK]    Authorization Provider restarted.");
          customConsole.log("===>    Go to part 1");
          reloadContainer(_this, "", function() {
            customConsole.log("[OK]    Everything restarted.");
          });
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

    post: function (url) {
      var customConsole = getConsole(this);
      var request = require('request');
      request
        .post(url)
        .on('response', function (response, content) {
          customConsole.log({ 'statusCode': response.statusCode });
        })
        .on('error', function (error) {
          customConsole.warn(error);
        });
    }
  }

  self.setGithubCredentials = prototype.setGithubCredentials;
  self.get =                  prototype.get;
  self.post =                 prototype.post;

  var message = "[OK]    Tutorial utilities successfully loaded.";
  return self.getGlobal().console.log(message);
};
