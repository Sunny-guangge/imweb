/**
 * Created by sunny on 2017/7/31.
 */
$(function () {
    var thisURL = document.URL;
    var  getval =thisURL.split('?')[1];
    var userid= getval.split("=")[1];

    var basicurl = "http://172.16.0.52:10002";

    var m = {
        init:function () {
            m.load();
        },
        //加载当前用户的基本信息
        load:function () {
            var userbasic = {
                type:"post",
                url:basicurl + "/work/im/checkuserbyid",
                data:{
                    id:userid
                },
                success:function (data) {
                    if(data.code == 10000){
                        $(".changeuserphone").val(data.obj.phone);
                        $(".changeusersex").val(data.obj.sex);
                        $(".changeuseremail").val(data.obj.email);
                        $(".changeusername").val(data.obj.name);
                    }
                }
            }
            $.ajax(userbasic);

            var department = {
                type: "post",
                url: basicurl + "/work/im/allDepartmentlist",
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
        }
    }
    m.init();
})