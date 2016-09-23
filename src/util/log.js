let enabledModules = {};

export function initializeLogging() {
  // Parse query string parameters to enable logging.
  const queryStringArgs = window.location.search.replace('?', "").split('&');
  for (let i = 0; i < queryStringArgs.length; i++) {
    if (queryStringArgs[i].search(new RegExp("log=", "i")) !== -1) {
      queryStringArgs[i].substr(4).split(",").forEach( (value, index, array) => {
        enableLogging(value);
      });
    }
  }
}

// Enables debug logging for a specified module.
export function enableLogging(module) {
  const moduleUpperCase = module.toUpperCase();
  if (!enabledModules[moduleUpperCase])
    console.log("Logging enabled for " + moduleUpperCase);
  enabledModules[moduleUpperCase] = true;
}

// Disables debug logging for a specified module.
export function disableLogging(module) {
  const moduleUpperCase = module.toUpperCase();
  if (enabledModules[moduleUpperCase])
    console.log("Logging disabled for " + moduleUpperCase);
  enabledModules[moduleUpperCase] = false;
}

/* 
  Returns a logging function to log debug output for the specified module.
  The logging function expects an object with at least one of the following
  properties.
    - title: a string
    - message: a string
    - valuesMap: an array of key-value pairs

  The console log output will take the form of:
    <module> - *[title]* [message] [valuesMap entries...]
*/
export function logger(module) {
  const moduleUpperCase = module.toUpperCase();

  return function(logMessage) {
    if (enabledModules[moduleUpperCase]) {
      let outputString = moduleUpperCase + " - ";

      if ("title" in logMessage)
        outputString += "*" + logMessage.title + "* ";

      if ("message" in logMessage)
        outputString += logMessage.message + " ";

      if ("valuesMap" in logMessage) {
        outputString += logMessage.valuesMap.reduce(
          (previousValue, currentValue, currentIndex, array) => {
            return previousValue + currentValue[0] + ": " + currentValue[1] + (currentIndex !== array.length - 1 ? ", " : " ");
          }, ""
        );
      }

      console.log(outputString);
    }
  }
}