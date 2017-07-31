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
            var department = {
                type: "post",
                url: baseurl + "/work/im/allDepartmentlist",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
                        var html = "";
                        for (var j = 0; j < result.length; j++) {
                            html += "<th>" + result[j].name + "</th>";
                            html += '<th><button class="deletedepartmentclass" department_id = ' + result[j].id +'>删除</button></th>';
                            html += '<th><button>查看人员列表</button></th>';
                        }
                        $(".department").append(html);
                        $(".deletedepartmentclass").on("click",function () {
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
                        })
                    }
                }
            };
            var userlist = {
                type: "post",
                url: baseurl + "/work/im/findalluser",
                data: "",
                success: function (data) {
                    if (data.code == 10000) {
                        result = data.obj;
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
                            }),
                            $(".changeuserclass").on("click",function () {
                                var userid = $(this).attr("user_id");
                                window.location.href = "changeuser.html?userid=" + userid;
                            })
                        }
                    }
                }
            }
            $.ajax(department)
            $.ajax(userlist)
        }
    }
    m.init();
    m.binding();
})

