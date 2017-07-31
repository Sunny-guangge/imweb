/**
 * Created by sunny on 2017/7/27.
 */
var Utils = {
    validate:{
        mobileNo:function (mobile) {
            var pattern = /^(13|15|18|14|17)[0-9]{9}$/;
            if (pattern.test(mobile)){
                return true;
            }
            return false;
        },
        email:function (email) {
            var pattern =/^(\w-*_*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(pattern.test(email)){
                return true;
            }else{
                return false;
            }
        }
    }
}