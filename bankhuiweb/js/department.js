/**
 * Created by sunny on 2017/7/27.
 */
$(function () {
    var m = {
        init:function () {
            m.bidding();
        },

        bidding:function () {
            var $name = $("input[name=departmentname]");

            $(".submitnewdepartment").on("click",function () {
                if(m.checkname($name.val())){
                    m.adddepartment();
                }
            })
        },

        adddepartment:function () {
            var name = $("input[name=departmentname]").val();
            var introduce = $("input[name=departmentintroduce]").val();

            var opts = {
                url : Utils.validate.baseurl() + "savedepartment",
                type:"post",
                data:{
                    name:name,
                    introduce:introduce
                },
                dataType:"json",
                success:function (data) {
                    if (data.code == 10000){
                        alert("添加部门成功");
                    }else {
                    }
                }
            }
            $.ajax(opts);
        },

        //检查输入的名称是否为空
        checkname:function (value) {
            if($.trim(value).length == 0){
                return false;
            }
            return true;
        }
    }
    m.init();
})