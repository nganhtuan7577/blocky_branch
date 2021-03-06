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
/*@ngInject*/
export default function SignUpController($translate, toast, loginService, userService) {
    var vm = this;

    vm.user = {
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        password2: '',
    };

    vm.signUp = signUp;

    function signUp() {
        if (vm.user.password !== vm.user.password2) {
            toast.showError($translate.instant('login.passwords-mismatch-error'));
        } else {
            loginService.signUp(vm.user).then(function success(response) {
                var token = response.data.token;
                var refreshToken = response.data.refreshToken;
                userService.setUserFromJwtToken(token, refreshToken, true);
            }, function fail() {
            });
        }
    }
}
