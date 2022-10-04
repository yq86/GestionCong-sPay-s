"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var http_1 = require("@angular/common/http");
var login_component_1 = require("./components/login/login.component");
var demandes_component_1 = require("./components/demandes/demandes.component");
var admin_component_1 = require("./components/admin/admin.component");
var manager_component_1 = require("./components/manager/manager.component");
var auth_guard_service_1 = require("./auth/auth-guard.service");
var role_guard_service_1 = require("./auth/role-guard.service");
var routes = [];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [
                http_1.HttpClientModule,
                router_1.RouterModule.forRoot([
                    {
                        path: '',
                        redirectTo: 'login',
                        pathMatch: 'full'
                    },
                    {
                        path: 'login',
                        component: login_component_1.LoginComponent
                    },
                    {
                        path: 'employee-demandes',
                        component: demandes_component_1.DemandesComponent,
                        canActivate: [auth_guard_service_1.AuthGuardService]
                    },
                    {
                        path: 'manager',
                        component: manager_component_1.ManagerComponent,
                        canActivate: [role_guard_service_1.RoleGuardService],
                        data: {
                            role: '2',
                            role2: '1'
                        }
                    },
                    {
                        path: 'admin',
                        component: admin_component_1.AdminComponent,
                        canActivate: [role_guard_service_1.RoleGuardService],
                        data: {
                            role: '1'
                        }
                    },
                    { path: '**', redirectTo: '' }
                ])
            ],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;

//# sourceMappingURL=app-routing.module.js.map
