"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(userService, router) {
        this.userService = userService;
        this.router = router;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    LoginComponent.prototype.initForm = function () {
        this.form = new forms_1.FormGroup({
            username: new forms_1.FormControl(''),
            password: new forms_1.FormControl('')
        });
        //  this.userLogin = { userName: "", password: "" };
        //  this.user = {};
        //  this.error = null;
    };
    LoginComponent.prototype.submit = function () {
        var _this = this;
        if (this.form.invalid) {
            return;
        }
        this.userLogin = { userName: this.form.value.username, password: this.form.value.password };
        this.userService.login(this.userLogin).subscribe(function (response) {
            if (response) {
                console.log(response);
                window.localStorage.setItem('name', _this.form.value.username);
                window.localStorage.setItem('accessToken', response.accesstoken);
                if (response.user.role == 3) {
                    _this.router.navigate(['employee-demandes']);
                }
                else if (response.user.role == 2) {
                    _this.router.navigate(['manager']);
                }
                else if (response.user.role == 1) {
                    _this.router.navigate(['admin']);
                }
            }
            else {
                _this.error = "username or password invalid";
                _this.initForm();
                console.log(localStorage.getItem('accessToken'));
            }
        }, function (error) {
            alert(error.message);
        });
    };
    LoginComponent.prototype.initError = function () {
        this.error = null;
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;

//# sourceMappingURL=login.component.js.map
