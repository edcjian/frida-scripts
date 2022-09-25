Java.perform(function() {
    var clazz = Java.use('com.tiger.app1.axj.manager.AdManager');
    clazz.getAppVersion.implementation = function() {

        var ret = this.getAppVersion();
console.log(ret);
        return '1.0.1';
    }
    let MovieDetailActivity = Java.use("com.tiger.app1.axj.ui.movie.activity.MovieDetailActivity");
    const gson = Java.use('com.google.gson.Gson');

    MovieDetailActivity["a"].overload('com.tiger.app1.axj.module.MovieDetailResponse$DataEntity').implementation = function (dataEntity) {
        console.log(this.f.value);
        this.d.value.getMoviePlayUrl(this.f.value);
        let LoginManager = Java.use("com.tiger.app1.axj.manager.LoginManager");
LoginManager["isLogin"].implementation = function () {
    console.log('isLogin is called');
    let ret = this.isLogin();
    console.log('isLogin ret value is ' + ret);
    return true
};
let rt =Java.use("com.tiger.app1.axj.manager.LoginManager");
rt.getCurUserInfo.implementation = function () {
    console.log('getCurUserInfo is called');
    let ret = this.getCurUserInfo();
    console.log('getCurUserInfo ret value is ' + ret);
    return ret
};
    }
})
