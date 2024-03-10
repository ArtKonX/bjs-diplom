"use strict"

const newUser = new UserForm();

newUser.loginFormCallback = data => ApiConnector.login(data, checkLoginForm);

const checkLoginForm = (response) => { response.success ? location.reload() : newUser.setLoginErrorMessage(response.error) };

newUser.registerFormCallback = data => ApiConnector.login(data, checkregisterForm);

const checkregisterForm = (response) => { response.success ? location.reload() : newUser.setRegisterErrorMessage(response.error) };