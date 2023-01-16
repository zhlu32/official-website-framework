$(function() {

    var TYPE = {
        FACULTY: 'faculty',
        POSTDOC: 'postdoc',
        STUDENTS: 'students'
    };
    var currentType;
    var facultyList;
    var studentsList;
    var postdocList;
    var facultyInit = false;
    var studentsInit = false;
    var postdocInit = false;

    var getfacultyList = function() {
        $.getJSON("mock/position/faculty.json", function(data) {
            facultyList = data;
            onTabclick(currentType);
        });
    };
    var getStuentList = function() {
        $.getJSON("mock/position/students.json", function(data) {
            studentsList = data;
            onTabclick(currentType);
        });
    };
    var getpostdocList = function() {
        $.getJSON("mock/position/postdoc.json", function(data) {
            postdocList = data;
            onTabclick(currentType);
        });
    };

    // 获取参数
    var getQuery = function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r != null) {
            return unescape(r[2]);
        }
        return null;
    };

    var getInnerHtml = function(facultyList) {
        var str = '';
        if (facultyList && facultyList.list && facultyList.list.length > 0) {
            for (var i = 0; i < facultyList.list.length; i++) {
                str += '<li class="g-list-li">';
                str += '<p class="title">' + htmlEncode(facultyList.list[i].title) + '</p>';
                for (var j = 0; j < facultyList.list[i].contents.length; j++) {
                    str += '<p class="key">' + htmlEncode(facultyList.list[i].contents[j].key) + '</p>'; 
                    for (var k = 0; k < facultyList.list[i].contents[j].values.length; k++) {
                        str += '<p class="value">' + htmlEncode(facultyList.list[i].contents[j].values[k]) + '</p>'; 
                    }
                }
                str += "</li>";
            }
            str += '<div class="g-section-content" style="text-align: center; margin: 0 auto; padding-top: 70px; padding-bottom: 30px;">';
            str += '<a target="_blank" class="send-summary" href="mailto:' + facultyList.email + '">投递简历</a>';
        }

        return str;
    };

    var onTabclick = function(type) {
        currentType = type;
        if(type === TYPE.FACULTY) {
            if(!facultyList) {
                getfacultyList();
                return;
            }
        }else if(type === TYPE.POSTDOC) {
            if(!postdocList) {
                getpostdocList();
                return;
            }
        }else {
            if(!studentsList) {
                getStuentList();
                return;
            }
        }

        var divs = $('#tab-content .g-list-ul');
        // 隐藏所有选中项内容
        divs.hide();

        if(type === TYPE.FACULTY) {
            if(facultyList.list.length > 0) {
                divs.eq(0).show();
            }

            if(!facultyInit) {
                facultyInit = true;
                document.getElementById('faculty-list-ul').innerHTML = getInnerHtml(facultyList);
            }
        }else if (type === TYPE.POSTDOC) {
            if(postdocList.list.length > 0) {
                divs.eq(1).show();
            }

            if(!postdocInit) {
                postdocInit = true;
                document.getElementById('postdoc-list-ul').innerHTML = getInnerHtml(postdocList);
            }
        }else {
            if(studentsList.list.length > 0) {
                divs.eq(2).show();
            }

            if(!studentsInit) {
                studentsInit = true;
                document.getElementById('students-list-ul').innerHTML = getInnerHtml(studentsList);
            }
        }
    };

    // tab按钮切换
    $('.g-section-content .position-category-item').on('click', function() {
        $(this).addClass("position-category-item-select").siblings().removeClass("position-category-item-select");
        var index = $(this).index();

        if (index === 0) {
            $('.g-section-content #category-img-faculty').show();
            $('.g-section-content #category-img-postdoc').hide();
            $('.g-section-content #category-img-students').hide();
            $('.g-section-content #category-img-engineer').hide();
            onTabclick(TYPE.FACULTY);
        }else if(index === 1) {
            $('.g-section-content #category-img-faculty').hide();
            $('.g-section-content #category-img-postdoc').show();
            $('.g-section-content #category-img-students').hide();
            $('.g-section-content #category-img-engineer').hide();
            onTabclick(TYPE.POSTDOC);
        }else {
            $('.g-section-content #category-img-faculty').hide();
            $('.g-section-content #category-img-postdoc').hide();
            $('.g-section-content #category-img-students').show();
            $('.g-section-content #category-img-engineer').hide();
            onTabclick(TYPE.STUDENTS);
        }
    });

    var getType = function() {
        currentType = getQuery('type');
        if(!currentType) {
            currentType = TYPE.FACULTY;
        }

        if (currentType === TYPE.FACULTY) {
            $('.g-section-content .position-category-item:nth-child(1)').trigger("click");
        } else if (currentType === TYPE.POSTDOC) {
            $('.g-section-content .position-category-item:nth-child(2)').trigger("click");
        }else {
            $('.g-section-content .position-category-item:nth-child(3)').trigger("click");
        }
    };

    getType();
});