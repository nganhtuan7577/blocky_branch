/*
 * Copyright © 2016-2017 The Blocky Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export default angular.module('blocky.api.login', [])
    .factory('loginService', LoginService)
    .name;

/*@ngInject*/
function LoginService($http, $q, types) {

    var service = {
        activate: activate,
        changePassword: changePassword,
        hasUser: hasUser,
        login: login,
        resetPassword: resetPassword,
        sendResetPasswordLink: sendResetPasswordLink,
        signUp: signUp
    }

    return service;

    function hasUser() {
        return true;
    }

    function login(user) {
        var deferred = $q.defer();
        var loginRequest = {
            email: user.name,
            password: user.password
        };
        $http.post('http://api.easytech.vn:3000/api/v1/user/login', loginRequest).then(function success(response) {
            deferred.resolve(response);
        }, function fail(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }

    function sendResetPasswordLink(email) {
        var deferred = $q.defer();
        var url = '/api/noauth/resetPasswordByEmail?email=' + email;
        $http.post(url, null).then(function success(response) {
            deferred.resolve(response);
        }, function fail() {
            deferred.reject();
        });
        return deferred.promise;
    }

    function resetPassword(resetToken, password) {
        var deferred = $q.defer();
        var url = '/api/noauth/resetPassword?resetToken=' + resetToken + '&password=' + password;
        $http.post(url, null).then(function success(response) {
            deferred.resolve(response);
        }, function fail() {
            deferred.reject();
        });
        return deferred.promise;
    }

    function activate(activateToken, password) {
        var deferred = $q.defer();
        var url = '/api/noauth/activate?activateToken=' + activateToken + '&password=' + password;
        $http.post(url, null).then(function success(response) {
            deferred.resolve(response);
        }, function fail() {
            deferred.reject();
        });
        return deferred.promise;
    }

    function changePassword(currentPassword, newPassword) {
        var deferred = $q.defer();
        var url = '/api/auth/changePassword?currentPassword=' + currentPassword + '&newPassword=' + newPassword;
        $http.post(url, null).then(function success(response) {
            deferred.resolve(response);
        }, function fail() {
            deferred.reject();
        });
        return deferred.promise;
    }

    function signUp(user) {
        var deferred = $q.defer();
        var signUpRequest = {
            //firstname: user.firstname,
            //lastname: user.lastname,
            email: user.email,
            password: user.password
        };
        var url = types.baseApiUrl + '/user/signup';
        $http.post(url, signUpRequest).then(function success(response) {
            deferred.resolve(response);
        }, function fail(response) {
            deferred.reject(response);
        });
        return deferred.promise;
    }
}
