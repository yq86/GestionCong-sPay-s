"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var jwt_decode_1 = require("jwt-decode");
var RoleGuardService = /** @class */ (function () {
    function RoleGuardService(auth, router) {
        this.auth = auth;
        this.router = router;
    }
    RoleGuardService.prototype.canActivate = function (route) {
        // this will be passed from the route config
        // on the data property
        var role = route.data['role'];
        if (route.data['role2']) {
            console.log(route.data['role2']);
            this.role2 = route.data['role2'];
        }
        var token = localStorage.getItem('accessToken');
        if (token != null) {
            // decode the token to get its payload
            this.tokenPayload = jwt_decode_1["default"](token);
            console.log(this.tokenPayload);
            console.log(this.tokenPayload.role);
            console.log(role);
            if (this.role2) {
                if ((this.tokenPayload.role != role) && (this.tokenPayload.role != this.role2)) {
                    this.router.navigate(['login']);
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (this.tokenPayload.role != role) {
                    this.router.navigate(['login']);
                    return false;
                }
                else {
                    return true;
                }
            }
        }
        else {
            return false;
        }
    };
    RoleGuardService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], RoleGuardService);
    return RoleGuardService;
}());
exports.RoleGuardService = RoleGuardService;

//# sourceMappingURL=role-guard.service.js.map
