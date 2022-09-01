export const Formatter = new class {
    //有值是true
    NotNull(Params: string) {
        // Params = Params.trim();
        return Params != undefined && Params.length != undefined && Params != '';
    }
    isMail(Params: string) {
        //eslint-disable-next-line
        const regex = /^([a-zA-Z0-9_\.]{3,})\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,3})+$/;
        return regex.test(Params)
    }
    PasswordEnglishNumber(Params: string) {
        const regex = /^(?=.*[a-z])(?=.*\d)[a-z\d]/;
        return regex.test(Params)
    }
    UserNameSpecialSymbol(Params: string) {
        const regex = /[^a-zA-Z0-9\u4e00-\u9fa5]/;
        return regex.test(Params)
    }
}
