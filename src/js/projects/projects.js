
var projectList;
var nums = 8;

var innerHtmls = function(curr) {
    var str = '';
    var last = Math.ceil(projectList.length / nums) === curr ? projectList.length : curr * nums;
    for (var i = (curr - 1) * nums; i < last; i++) {
        str += '<li class="project-item-li"><a target="_blank" class="g-full-block" href="' + htmlEncode(projectList[i].url) + '">';
        str += '<img src=' + htmlEncode(projectList[i].img) + ' >';
        str += '<p class="title">' + htmlEncode(projectList[i].title) + '</p>';
        str += '<p class="desc g-two-line-txt">' + htmlEncode(projectList[i].desc) + '</p></a></li>';
    }
    return str;
};

var getProjectsList = function() {
    $.getJSON("mock/projects/projects.json", function(data) {
        projectList = data.list;

        document.getElementById('g-list-ul').innerHTML = innerHtmls(1);
        window.laypage({
            cont: 'g-pagination',
            pages: Math.ceil(projectList.length / nums),
            jump: function(obj) {
                document.getElementById('g-list-ul').innerHTML = innerHtmls(obj.curr);
            }
        });
    });
};

getProjectsList();