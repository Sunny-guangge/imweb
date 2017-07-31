/**
 * Created by sunny on 2017/7/26.
 */
$(function () {

    var baseurl = "http://172.16.0.52:10002";

    var m = {

        binding:function () {
            $(".adduserbuttonopen").on("click",function () {
                window.location.href="adduser.html";
            })
            $(".adddepartment").on("click",function () {
                window.location.href="adddepartment.html";
            })
            $(".productname").on("click",function () {
                window.location.href="index.html";
            })
        },

        init:function () {
            //所有部门列表
            var department = {
                type: "post",
                url: baseurl + "/work/im/allDepartmentlist",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
                        for (var j = 0; j < result.length; j++) {
                            var html = "";
                            html += '<tr class="tr">';
                            html += "<th>" + result[j].id + "</th>";
                            html += "<th>" + result[j].name + "</th>";
                            html += "<th>" + result[j].priority + "</th>"
                            html += '<th><button class="deletedepartmentclass" department_id = ' + result[j].id +'>删除</button></th>';
                            html += '<th><button class="checkdepartmentuser" department_id = ' + result[j].id + '>查看人员列表</button></th>';
                            html += '<th><button class="editdepartmentuser" department_id = ' + result[j].id + '>编辑</button></th>';
                            html += '</tr>';
                            $(".department").append(html);
                            //删除部门的操作
                            $(".deletedepartmentclass").on("click",function () {
                                if(window.confirm("确定要删除该部门吗？")){
                                    var departmentid = $(this).attr("department_id");
                                    var deletedepartmetn = {
                                        type:"post",
                                        url:baseurl + "/work/im/deletedepartment",
                                        data:{
                                            id:departmentid
                                        },
                                        success:function (data) {
                                            if (data.code == 10000){
                                                location.reload();
                                            }
                                        }
                                    }
                                    $.ajax(deletedepartmetn);
                                    return true;
                                }else {
                                    return false;
                                }
                            });
                            //查看部门人员的操作
                            $(".checkdepartmentuser").on("click",function () {
                                var departmentid = $(this).attr("department_id");
                                var departmentuserlist = {
                                    type:"post",
                                    url:baseurl + "/work/im/departmentuserlist",
                                    data:{
                                        departmentid:departmentid
                                    },
                                    success:function (data) {
                                        if (data.code == 10000){
                                            result = data.obj;
                                            m.pinjieuserlist(result);
                                        }
                                    }
                                }
                                $.ajax(departmentuserlist);
                            });
                            //进入编辑部门信息界面
                            $(".editdepartmentuser").on("click",function () {
                                var departmentid = $(this).attr("department_id");
                                window.location.href = "editdepartment.html?departmentid=" + departmentid;
                            })
                        }
                    }
                }
            };
            //显示所有用户的操作
            var userlist = {
                type: "post",
                url: baseurl + "/work/im/findalluser",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
                        m.pinjieuserlist(result);
                    }
                }
            }
            $.ajax(department)
            $.ajax(userlist)
        },
        //不同用户列表刷新用户列表的table
        pinjieuserlist:function (result) {
            $(".usertable").empty();
            if (result.length <= 0){

                $(".usertable").append("<p style='margin: 20px'>该部门还没有人员</p>");

                return;
            }
            $(".usertable").append('<tr><th>id</th><th>姓名</th><th>性别</th><th>手机号</th><th>邮箱</th><th>认证</th><th>操作</th><th>操作</th></tr>');
            for (var j = 0; j < result.length; j++) {
                var html = "";
                html += '<tr class="tr">';
                html += '<th>' + result[j].id + '</th>';
                html += '<th>' + result[j].name + '</th>';
                html += '<th>' + result[j].sex + '</th>';
                html += '<th>' + result[j].phone + '</th>';
                html += '<th>' + result[j].email + '</th>';
                var str = "";
                if (result[j].verifytype == 0) {
                    str = "未认证";
                } else if (result[j].verifytype == 1) {
                    str = "人脸识别";
                } else if (result[j].verifytype == 2) {
                    str = "声音识别";
                }
                html += '<th>' + str + '</th>';
                html += '<th><button class="deleteuserclass" data_id='+ result[j].phone +'>删除</button></th>';
                html += '<th><button class="changeuserclass" user_id = ' + result[j].id + '>修改</button></th>';
                html += '</tr>';
                $(".usertable").append(html);
                $(".deleteuserclass").on("click",function () {

                    if(window.confirm("确定要删除该用户吗？")){
                        var phonenum = $(this).attr("data_id");
                        var deleteuser = {
                            type:"post",
                            url:baseurl + "/work/im/deleteoneuser",
                            data:{
                                phone:phonenum
                            },
                            success: function (data) {
                                if (data.code == 10000){
                                    // $(this).parents(".tr").remove();
                                    location.reload();
                                }
                            }
                        }
                        $.ajax(deleteuser)
                        return true;
                    }else {
                        return false;
                    }
                }),
                    $(".changeuserclass").on("click",function () {
                        var userid = $(this).attr("user_id");
                        window.location.href = "changeuser.html?userid=" + userid;
                    })
            }
        }
    }
    m.init();
    m.binding();
})

