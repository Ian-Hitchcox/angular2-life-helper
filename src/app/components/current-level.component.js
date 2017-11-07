"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
// Classes
var level_1 = require("../classes/level");
// Components
var app_component_1 = require("./app.component");
// Services
var config_service_1 = require("../services/config-service");
var PERCENT_LIMITS = {
    RED: .25,
    YELLOW: .75,
    GREEN: 1
};
var CurrentLevelComponent = (function (_super) {
    __extends(CurrentLevelComponent, _super);
    function CurrentLevelComponent() {
        var _this = _super.call(this) || this;
        _this.addAmount = 15;
        return _this;
    }
    CurrentLevelComponent.prototype.ngOnInit = function () {
        this.CheckCurrentPercent(this.level);
    };
    CurrentLevelComponent.prototype.CheckCurrentPercent = function (level) {
        if (level.currentPercent <= PERCENT_LIMITS.RED) {
            this.UpdateImageUrl(level, 'red');
        }
        else if (level.currentPercent <= PERCENT_LIMITS.YELLOW) {
            this.UpdateImageUrl(level, 'yellow');
        }
        else {
            this.UpdateImageUrl(level, 'green');
        }
    };
    CurrentLevelComponent.prototype.AddToLevel = function (level, amount) {
        if (level && amount) {
            level.currentPercent = level.currentPercent === 1 ? level.currentPercent : level.currentPercent + (amount / 100);
            // Do not allow to go over 100%
            if (level.currentPercent > 1) {
                level.currentPercent = level.currentPercent - (level.currentPercent - 1);
            }
            this.CheckCurrentPercent(level);
            // Update our config
            var currentConfig = JSON.parse(config_service_1.ConfigService.GetConfig().toString());
            if (currentConfig) {
                var levelMap = new Map(currentConfig.levels);
                levelMap.set(level.name, level.currentPercent);
                currentConfig.levels = levelMap;
                config_service_1.ConfigService.SetConfig(currentConfig);
            }
        }
    };
    CurrentLevelComponent.prototype.UpdateImageUrl = function (level, newColour) {
        if (level && newColour) {
            // Colours in our file name are preceded by the last dash
            // Find last dash and give us what is after it.
            // Find the last . in the value returned above and grab the colour from just before it.
            var currentColour = this.level.imageUrl.split('-').pop().split('.').shift();
            if (currentColour === newColour) {
                return;
            }
            this.level.imageUrl = this.level.imageUrl.replace(currentColour, newColour);
        }
    };
    return CurrentLevelComponent;
}(app_component_1.AppComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", level_1.Level)
], CurrentLevelComponent.prototype, "level", void 0);
CurrentLevelComponent = __decorate([
    core_1.Component({
        selector: 'current-level',
        template: "<tr className=\"current-level\" *ngIf=\"level\">\n              \n                <td>\n                    <img width=\"50%\" height=\"10%\" class=\"level-image\"src=\"{{level.imageUrl}}\" />\n                </td>\n\n                <td>\n                    <span class=\"padding-standard level-name capitalise\">\n                        {{level.name | titlecase}}\n                    </span>\n                </td>\n\n                <td>\n                    <span class=\"padding-standard\">\n                        \n                        <span class=\"degrade-rate\">\n                        -{{level.degradeRate | percent}}\n                        </span>                 \n                        Per Hour\n                    </span>\n                </td>\n\n                <td>\n                    <span class=\"padding-standard current-percent\">\n                        {{level.currentPercent | percent:'2.2-2'}}\n                    </span>                \n                </td>\n\n                <td>\n                    <button mat-raised-button>Basic</button>\n                    <input [(ngModel)]=\"addAmount\" />\n                    <button (click)=\"AddToLevel(level, addAmount)\">+</button>\n                </td>\n            </tr>               \n            \n            ",
        styles: ["\n\n    .current-level {\n      margin-bottom: .5%;\n    }\n\n    td {\n      width: 20%;\n    }     \n\n    .level-image {\n      padding: 0 1.5%;\n      margin: 0;\n    }\n    \n    .level-name {\n      text-align: center;\n      font-size: 2em;\n      font-weight: bold;\n      margin-bottom: 5%;\n      width: 20%;\n    }\n\n    .current-percent {        \n      font-size: 2em;\n      font-weight: bolder;\n      width: 20%;\n    }\n\n    .degrade-rate {\n      font-size: 1.75em;\n      color: red;\n      width: 20%;\n    }\n\n    button {      \n      width: 20%;\n    }\n    \n    "]
    }),
    __metadata("design:paramtypes", [])
], CurrentLevelComponent);
exports.CurrentLevelComponent = CurrentLevelComponent;
//# sourceMappingURL=current-level.component.js.map