cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/de.appplant.cordova.plugin.printer/www/printer.js",
        "id": "de.appplant.cordova.plugin.printer.Printer",
        "clobbers": [
            "plugin.printer",
            "cordova.plugins.printer"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.2.2",
    "de.appplant.cordova.plugin.printer": "0.7.1"
}
// BOTTOM OF METADATA
});