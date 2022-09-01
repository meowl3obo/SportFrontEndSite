import { $priceCenterSite } from './http';
import { ILoginData, ILoginSiteData, IUpdateNameData, IUpdatePassword, IRegisterData, IForgetData, IVerifyData, ISetNewPasswordData } from '@/type/User'

export const Login = async function (loginData: ILoginData) {
    const result = await $priceCenterSite('POST', '/auth/login', { body: loginData });
    return result;
}

export const LoginForSite = async function(data: ILoginSiteData){
    const loginForSiteResult = await $priceCenterSite('POST', '/auth/loginforsite', { body: data });
    return loginForSiteResult;
}

export const Register = async function (registerData: IRegisterData) {
    const result = await $priceCenterSite('POST', '/auth/register', { body: registerData });
    return result;
}

export const ForgetPassword = async function (forgetData: IForgetData) {   //RequestPWD.vue (Done)
    const result = await $priceCenterSite('POST', '/auth/requestpassword', { body: forgetData });
    return result;
}

export const SetNewPassword = async function (passwordData: ISetNewPasswordData) {   //ForgetPWD.vue (Done)
    const result = await $priceCenterSite('POST', '/auth/forgetpassword', { body: passwordData });
    return result;
}

export const Validate = async function (verifyData: IVerifyData) {   //Validate.vue (Done)
    const result = await $priceCenterSite('POST', '/auth/validate', { body: verifyData });
    return result;
}

export const UpdateUserName = async function (updateData: IUpdateNameData) {
    const result = await $priceCenterSite('POST', '/auth/updateusername', { body: updateData });
    return result;
}

export const UpdatePassword = async function (updateData: IUpdatePassword) {
    const result = await $priceCenterSite('POST', '/auth/updatepassword', { body: updateData });
    return result;
}