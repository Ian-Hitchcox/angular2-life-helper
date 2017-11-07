"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
// Paths
var IMAGE_FOLDER = './app/media/images/';
// Services
var cookie_service_1 = require("../services/cookie-service");
var config_service_1 = require("../services/config-service");
// Media
var level_data_1 = require("../media/data/level-data");
var LEVELS = level_data_1.LevelData;
var blocks = [];
LEVELS.map(function (level, i) {
    var block = {
        name: level.name,
        details: level.details
    };
    blocks.push(block);
});
// Reference to all HelpBlock's
var HELP_BLOCKS = blocks;
var AppComponent = (function () {
    function AppComponent() {
        this.levels = LEVELS;
        this.helpBlocks = HELP_BLOCKS;
        this.config = {
            lastVisit: '',
            levels: new Map()
        };
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Attempt to get any previously saved config in the cookie
        var curConfig = config_service_1.ConfigService.GetConfig() || this.config;
        // Ensure we have valid json for our config
        curConfig = typeof curConfig === 'object' ? curConfig : JSON.parse(curConfig.toString());
        // If we already have a config in the cookie, use details from that.
        if (curConfig['levels'].length) {
            // Turn the returned object from json into an ES6 map           
            curConfig['levels'] = new Map(curConfig['levels']);
            // Create a new map to hold the updated values            
            var newMap_1 = new Map();
            // Apply the correct rate of degradation from our last visit.
            curConfig['levels'].forEach(function (value, name) {
                // Find same level in LEVELS array
                var levelIndex = _this.levels.findIndex(function (level, i) {
                    return level.name === name;
                });
                var updatedPercent = _this.ApplyDegradationSinceLastVisit(_this.levels[levelIndex].degradeRate, value, curConfig['lastVisit']);
                // Store new value in our temporary map
                newMap_1.set(name, updatedPercent);
                // Update its current percent
                _this.levels[levelIndex].currentPercent = updatedPercent;
            });
            // Ensure our config has the new calculated values from the loop above
            curConfig['levels'] = newMap_1;
        }
        else {
            this.levels.map(function (level) {
                curConfig = _this.ExecuteSetup(level.name, level.currentPercent, level.degradeRate, curConfig);
            });
        }
        var today = new Date();
        var todayString = today.toUTCString();
        // Update last visited reference
        curConfig['lastVisit'] = todayString;
        // Save our updated config in the cookie
        config_service_1.ConfigService.SetConfig(curConfig);
    };
    // Default setup used when no cookie has been set
    AppComponent.prototype.ExecuteSetup = function (name, currentPercent, degradeRate, config) {
        currentPercent = this.ApplyDegradationSinceLastVisit(currentPercent, degradeRate, config.lastVisit);
        config['levels'].set(name, currentPercent);
        return config;
    };
    // Ensures degradation of levels is applied since last visit.
    AppComponent.prototype.ApplyDegradationSinceLastVisit = function (degradeRate, currentPercent, lastVisit) {
        var now = Date.now();
        var lastVisitDate = new Date(lastVisit).getTime();
        var secondsSinceLastVisit = (now - lastVisitDate) / 1000;
        var hoursSinceLastVisit = secondsSinceLastVisit / 3600;
        // If we have visited before, apply the calculation, otherwise set to 1.
        currentPercent = lastVisit ? currentPercent - (degradeRate * hoursSinceLastVisit) : 1;
        // Dont let the percentage drop below 0
        if (currentPercent < 0) {
            currentPercent = 0;
        }
        return currentPercent;
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        template: "<div>\n              \n              <h1 class=\"title\">Life Helper</h1>\n              \n              <section class=\"margin-standard\">\n                \n                <p class=\"introduction-text\">A tool to help you keep track of the essentials.</p>\n\n              </section>\n\n              <section class=\"margin-standard\">\n                \n                <h2 class=\"subtitle padding-standard\">Current levels</h2>\n                \n                <ul class=\"current-levels\">\n                  <li>\n                    <current-level *ngFor=\"let level of levels\" [level]=\"level\"></current-level>                    \n                  </li>\n                </ul>\n              </section>\n\n              <section class=\"margin-standard\">\n                \n                <h2 class=\"subtitle padding-standard padding-bottom-none\">Level guide</h2>\n\n                <ul>\n                    <help-block *ngFor=\"let helpBlock of helpBlocks\" [helpBlock]=\"helpBlock\"></help-block>                  \n                </ul>\n\n              </section>\n              \n            </div>",
        styles: ["\n\n      .title {\n        text-align: center;\n        color: white;\n      }\n\n      .subtitle {\n        margin: 0;\n      }\n\n      section {\n        border: 1px solid white;\n        border-radius: .75%;\n      }\n\n      .introduction-text {\n        padding: 2.5%;\n        font-size: 1.25em;\n      }\n\n      .current-levels {\n        margin: 0 0 1.5% 0;\n        padding: 0;\n        list-style: none;\n      }      \n\n      help-block {\n        display: inline-block;\n        width: 33%;\n      }\n\n      .help-list {\n        padding-bottom: 0;\n      }\n   \n    "],
        providers: [cookie_service_1.CookieService, config_service_1.ConfigService]
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map