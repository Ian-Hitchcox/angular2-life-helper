"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var cookie_service_1 = require("./cookie-service");
var ConfigService = (function () {
    function ConfigService() {
    }
    ConfigService.GetConfig = function () {
        return cookie_service_1.CookieService.GetCookie('life-helper-config');
    };
    ConfigService.SetConfig = function (config) {
        return cookie_service_1.CookieService.SetCookie('life-helper-config', config, 9990000);
    };
    return ConfigService;
}());
ConfigService = __decorate([
    core_1.Injectable()
], ConfigService);
exports.ConfigService = ConfigService;
//# sourceMappingURL=config-service.js.map