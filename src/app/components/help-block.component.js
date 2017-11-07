"use strict";
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
var Help_Block_1 = require("../classes/Help-Block");
var HelpBlockComponent = (function () {
    function HelpBlockComponent() {
    }
    return HelpBlockComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Help_Block_1.HelpBlock)
], HelpBlockComponent.prototype, "helpBlock", void 0);
HelpBlockComponent = __decorate([
    core_1.Component({
        selector: 'help-block',
        template: "\n            <div class=\"help-block\">\n                \n                <h3 class=\"padding-standard padding-bottom-none capitalise\">\n                    {{helpBlock.name}}\n                </h3>\n\n                <ul class=\"help-list\">\n                    <li *ngFor=\"let detail of helpBlock.details\">\n                        {{detail}}\n                    </li>\n                </ul>\n\n            </div>\n            ",
        styles: ["\n    \n    "]
    })
], HelpBlockComponent);
exports.HelpBlockComponent = HelpBlockComponent;
//# sourceMappingURL=help-block.component.js.map