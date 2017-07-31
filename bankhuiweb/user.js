/**
 * Created by sunny on 2017/7/27.
 */
$(function () {
    var baseurl = "http://172.16.0.52:10002";
    var m = {
        init:function () {
            m.binding();
            m.load();
        },
        binding:function () {
            var $name = $("input[name=addusername]");
            var $phone = $("input[name=adduserphone]");
            var $email = $("input[name=adduseremail]");
            var $sex = $(".addusersex");
            var $department = $(".adduserdepartment");

            $(".adduserbutton").on("click",function () {
                if (m.checkphone($phone.val()) && m.checkemail($email.val()) && m.checksex($sex.val()) && m.checkdepartment($department.val())){
                    m.adduser();
                }
            })
        },
        load:function () {
            var department = {
                type: "post",
                url: baseurl + "/work/im/allDepartmentlist",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
                        var html11 = "";
                        for (var j = 0; j < result.length; j++) {
                            html11 += "<option value=" + result[j].id + ">" + result[j].name + "</option>>";
                        }
                        $(".adduserdepartment").append(html11);
                    }
                }
            };
            $.ajax(department);
        },
        adduser:function () {
            var name = $("input[name=addusername]").val();
            var phone = $("input[name=adduserphone]").val();
            var email = $("input[name=adduseremail]").val();
            var sex = $(".addusersex").val();
            var department = $(".adduserdepartment").val();
            var opts = {
                type:"get",
                url:baseurl + "/work/im/register",
                dataType:"json",
                data:{
                    name:name,
                    phone:phone,
                    email:email,
                    sex:sex,
                    departmentid:department
                },
                success:function (data) {
                    if (data.code == 10000){
                        window.location.href = "index.html";
                    }
                }
            }
            $.ajax(opts);
        },
        checkphone:function (value) {
            return Utils.validate.mobileNo(value);
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