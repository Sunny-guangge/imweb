/**
 * Created by sunny on 2017/7/31.
 */
$(function () {
    var thisURL = document.URL;
    var  getval =thisURL.split('?')[1];
    var departmentid= getval.split("=")[1];

    var m = {
        init:function () {
            m.load();

            $(".editnewdepartment").on("click",function () {
                m.changedepartment();
            })
        },
        changedepartment:function () {
            var introduce = $("textarea[name=editdepartmentintroduce]").val();
            var priority = $("input[name=editdepartmentpriority]").val();
            var opts = {
                type:"get",
                url:Utils.validate.baseurl() + "editdepartment",
                dataType:"json",
                data:{
                    id:departmentid,
                    introduce:introduce,
                    priority:priority
                },
                success:function (data) {
                    if (data.code == 10000){
                        window.location.href = "../html/index.html";
                    }
                }
            }
            $.ajax(opts);
        },
        //加载当前部门的基本信息
        load:function () {
            var departmentbasic = {
                type:"post",
                url:Utils.validate.baseurl() + "checkdepartment",
                data:{
                    id:departmentid
                },
                success:function (data) {
                    if(data.code == 10000){
                        $(".editdepartmentname").val(data.obj.name);
                        $(".editdepartmentintroduce").val(data.obj.introduce);
                        $(".editdepartmentpriority").val(data.obj.priority);
                    }
                }
            }
            $.ajax(departmentbasic);
        }
    }
    m.init();
})