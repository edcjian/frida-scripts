function hook_ssl() {
    var base = Module.findBaseAddress("libflutter.so");
    var ssl_crypto_x509_session_verify_cert_chain = base.add(0x1f7e94).add(0x01);
    console.log("ssl_crypto_x509_session_verify_cert_chain: " + ssl_crypto_x509_session_verify_cert_chain);
    Interceptor.attach(ssl_crypto_x509_session_verify_cert_chain, {
        onEnter: function(args) {
            console.log("\n解除证书绑定校验")
        },
        onLeave: function(retval) {
            console.log("校验函数返回值: " + retval);
            retval.replace(0x1);
            console.log("解除成功\n---------------------");
        }
    });
}
setImmediate(hook_ssl)
