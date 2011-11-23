{
    "id": "zeMobile",
    "closure-library": "closure-library/closure/goog",
    "paths": ["js"],
    "inputs": "js/zemobile/start.js",
    "mode": "RAW",
    "checks": {
      // Unfortunately, the Closure Library violates these in many places.
      // "accessControls": "ERROR",
      // "visibility": "ERROR"

      "checkRegExp": "ERROR",
      "checkTypes": "ERROR",
      "checkVars": "ERROR",
      "deprecated": "ERROR",
      "fileoverviewTags": "ERROR",
      "invalidCasts": "ERROR",
      "missingProperties": "ERROR",
      "nonStandardJsDocs": "ERROR",
      "undefinedVars": "ERROR"
    }

}