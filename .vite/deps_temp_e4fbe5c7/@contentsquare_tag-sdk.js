import "./chunk-HXA6O6EE.js";

// node_modules/@contentsquare/tag-sdk/dist/esm/injectContentsquareScript.js
function injectContentsquareScript(scriptOptions) {
  var scriptElement = document.createElement("script");
  scriptElement.type = "text/javascript";
  scriptElement.defer = typeof scriptOptions.defer === "boolean" ? scriptOptions.defer : false;
  scriptElement.async = typeof scriptOptions.async === "boolean" ? scriptOptions.async : true;
  if (scriptOptions.integrity) {
    scriptElement.integrity = scriptOptions.integrity;
  }
  scriptElement.crossOrigin = "anonymous";
  if (scriptOptions.clientId) {
    scriptElement.src = "https://t.contentsquare.net/uxa/" + scriptOptions.clientId + ".js";
  } else if (scriptOptions.siteId) {
    window.hj = window.hj || function() {
      (window.hj.q = window.hj.q || []).push(arguments);
    };
    window._hjSettings = {
      hjid: scriptOptions.siteId
    };
    scriptElement.src = "https://static.hj.contentsquare.net/c/csq-" + scriptOptions.siteId + ".js";
  } else {
    return;
  }
  return document.head.appendChild(scriptElement);
}
export {
  injectContentsquareScript
};
//# sourceMappingURL=@contentsquare_tag-sdk.js.map
