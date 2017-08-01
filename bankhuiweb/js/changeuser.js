/**
 * Created by sunny on 2017/7/31.
 */
$(function () {
    var thisURL = document.URL;
    var  getval =thisURL.split('?')[1];
    var userid= getval.split("=")[1];

    var m = {
        init:function () {
            m.load();
            
            $(".changeuserbutton").on("click",function () {
                var $name = $("input[name=changeusername]");
                var $email = $("input[name=changeuseremail]");
                var $sex = $(".changeusersex");
                var $department = $(".changeuserdepartment");
                if(m.checkemail($email.val()) && m.checksex($sex.val()) && m.checkdepartment($department.val())){
                    m.changeuser();
                }
            })
        },
        changeuser:function () {
            var name = $("input[name=changeusername]").val();
            var email = $("input[name=changeuseremail]").val();
            var sex = $(".changeusersex").val();
            var department = $(".changeuserdepartment").val();
            var opts = {
                type:"get",
                url:Utils.validate.baseurl() + "changeuserbasicmessage",
                dataType:"json",
                data:{
                    name:name,
                    email:email,
                    sex:sex,
                    departmentid:department,
                    userid:userid
                },
                success:function (data) {
                    if (data.code == 10000){
                        window.location.href = "../html/index.html";
                    }
                }
            }
            $.ajax(opts);
        },
        //加载当前用户的基本信息
        load:function () {
            var userbasic = {
                type:"post",
                url:Utils.validate.baseurl() + "checkuserbyid",
                data:{
                    id:userid
                },
                success:function (data) {
                    if(data.code == 10000){
                        $(".changeuserphone").val(data.obj.phone);
                        $(".changeusersex").val(data.obj.sex);
                        $(".changeuseremail").val(data.obj.email);
                        $(".changeusername").val(data.obj.name);
                        $(".changeuserdepartment").val(data.obj.departmentid);
                    }
                }
            }
            $.ajax(userbasic);

            var department = {
                type: "post",
                url: Utils.validate.baseurl() + "allDepartmentlist",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
                        var html11 = "";
                        for (var j = 0; j < result.length; j++) {
                            html11 += "<option value=" + result[j].id + ">" + result[j].name + "</option>>";
                        }
                        $(".changeuserdepartment").append(html11);
                    }
                }
            };
            $.ajax(department);
        },
        checkemail:function (value) {
            return Utils.validate.email(value);
        },
        checksex:function (value) {
            if(value == null || value == "请选择"){
                return false;
            }
            return true;
        },
        checkdepartment:function (value) {
            if(value == null || value == "请选择"){
                return false;
            }
            return true;
        }
    }
    m.init();
})