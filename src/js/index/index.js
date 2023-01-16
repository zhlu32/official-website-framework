$(function() {

    // projects
    var projectInnerHtmls = function(list) {
        var str = '';
        for (var i = 0; i < list.length; i++) {
            str += '<li class="project-two-item-li fl"><a target="_blank" class="g-full-block" href="' + htmlEncode(list[i].url) + '">';
            str += '<img src=' + htmlEncode(list[i].img) + ' >';
            str += '<p class="title g-two-line-txt">' + htmlEncode(list[i].title) + '</p>';
            str += '<p class="desc g-two-line-txt">' + htmlEncode(list[i].desc) + '</p></a></li>';
        }
        return str;
    };

    var getProjects = function() {
        $.getJSON("mock/projects/projects.json", function(data) {
            var projectList = data.list;
            if(projectList && projectList.length > 6) {
                projectList = projectList.splice(0, 6);
            }
            document.getElementById('projects-root').innerHTML = projectInnerHtmls(projectList);
        });
    };

    getProjects();

    // banner flipper
    function startBanner() {
        var btn_id1 = 0;
        var btn_id2 = 1;
        var settime = 5000;
        var setInt;
        $("#banner-root .banner-page").hide();
        $("#banner-root .banner-page").eq(0).fadeIn("slow");
        if($("#banner-root .banner-page").length > 1) {
            var indicatorHtml = '<ul>';
            for (var i = 0; i < $("#banner-root .banner-page").length; i++) {
                indicatorHtml += '<li><div class="banner-indicator"></div></li>';
            }
            indicatorHtml += '</ul>';
            document.getElementById('banner-indicator-root').innerHTML = indicatorHtml;

            $("#banner-indicator-root li .banner-indicator").eq(0).addClass("active");
            var next = function next() {
                btn_id2 = btn_id1 + 1;

                if(btn_id2 > $("#banner-root .banner-page").length - 1) {
                    btn_id2 = 0;
                }
                $("#banner-root .banner-page").eq(btn_id2).show();
                $("#banner-root .banner-page").eq(btn_id1).hide();
                $("#banner-indicator-root li .banner-indicator").removeClass("active");
                $("#banner-indicator-root li .banner-indicator").eq(btn_id2).addClass("active");
                btn_id1 = btn_id2;
            };

            setInt = setInterval(next, settime);

            $("#banner-indicator-root li").click(function() {
                var btn_id3 = $("#banner-indicator-root li").index(this);
                if(btn_id3 !== btn_id1) {
                    $("#banner-root .banner-page").eq(btn_id3).show();
                    $("#banner-root .banner-page").eq(btn_id1).hide();
                    $("#banner-indicator-root li .banner-indicator").removeClass("active");
                    $("#banner-indicator-root li .banner-indicator").eq(btn_id3).addClass("active");
                    btn_id1 = btn_id3;
                }
            });
            $("#banner-root").hover(
                function() {
                    clearInterval(setInt);
                },
                function() {
                    setInt = setInterval(next, settime);
                }
            );
        } else {
            $("#banner-indicator-root").hide();
        }
    }
    startBanner();

});