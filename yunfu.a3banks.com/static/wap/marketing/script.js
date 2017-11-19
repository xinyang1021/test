// JavaScript Document
/*睡前官网首页 js
 * by 王晓军
 * */
(function (window, jQuery) {
    jQuery(document).ready(function ($) {
        console.log(navigator.userAgent)
        var p1 = new Image();
        p1.src = "img/phone1.png";
        var p2 = new Image();
        p2.src = "img/phone2.png";

        function w1800(){
            if ($("html").width() > 1800) {
                $(".container").addClass("w1800");
                $(".fifth .center").addClass("w1800");
            }else{
                $(".container").removeClass("w1800");
                $(".fifth .center").removeClass("w1800");
            }
        };

        w1800();


        $('#fullpage').fullpage({
            navigation: true,
            verticalCentered: false,
            scrollOverflow: true,
            anchors: ['firstPage', 'secondPage'],
            afterLoad: function (anchorLink, index) {
 
                initPillows();

            },
            afterRender: function () {
                var pluginContainer = $(this);
                //alert("The resulting DOM structure is ready");

                //防止第一页加载未渲染好时 出现第二页内容
                $(".second .starmoon").css("display", "block");

                smileChange.start();

                $(".third .smile img").mouseenter(function () {
                    smileChange.stop();
                    //console.log(smileChange.intervalId);
                }).mouseleave(function () {
                    smileChange.start();
                });


                initHouse();

 

                /*imageFitDiv($(".hearttalk"),900.0,748);*/

            },
            afterReBuild: function () {
                w1800();
                initMobiles();
                initPillows();
                initPops();
                initHearts();
                //使connection部分的f2 f3大小重新计算
                $(".connection .f2,.connection .f2b,.connection .f3,.connection .f3b").removeAttr("style");
                initConn();
                initHouse();
            }

        });

        (function androiddown() {
            $(".androiddown").click(function () {
                window.location.href = "http://www.shuiqian.cc/public/Bedtime.apk";
            });

        })(); 


        //使枕头的图片适应div
        function initPillows() {
            imageFitDiv($(".pillows"), "img", 1022.0, 137);

            //对starmoon设置宽度，以便使用margin 0 auto来居中
            $(".hablock .starmoon").width($(".hablock .help img").width());
        }

        //初始化pop提示框的位置
        function initPops() {
            imageFitDiv($(".pop1"), "img", 282.0, 188);
            imageFitDiv($(".pop2"), "img", 282.0, 188);
            imageFitDiv($(".pop3"), "img", 282.0, 188);

            //Help部分 377*313
            //失恋了怎么办部分 282*188
            $(".pop4").css({
                width:$("#help").width()/377*282.0+"px",
                height:$("#help").height()/313*188.0+"px"

            });
            //原图pop4相对于help left 275
            $(".pop4").offset({
                left:$("#help").offset().left+275.0/377*$("#help").width(),
                top:$("#help").offset().top
            });


            //pop1在原图的位置：left 70
            //原图 pillows 773 103
            popPosition($(".pop1"), 70.0 / 773 * $(".pillows img").width(), 0);
            popPosition($(".pop2"), 298.0 / 773 * $(".pillows img").width(), 13.0 / 91 * $(".pop1 img").height());//top距离相对于pop1 img算出
            popPosition($(".pop3"), 574.0 / 773 * $(".pillows img").width(), -10.0 / 91 * $(".pop1 img").height());


            popSpanPosition($(".pop1"));
            popSpanPosition($(".pop2"));
            popSpanPosition($(".pop3"));


        }

        function initHearts() {
            var w = $(".third .talk").width();
            var h = $(".third .talk").height();
            var originW = 900.0;
            var originH = 748.0;

            //475 102

            $(".third .gn").css({
                width: 180.0 / 611 * w + "px",
                height: 149.0 / 508 * h + "px",
                left: (475 / originW * w) + "px",
                top: (102 / originH * h) + "px"
            });

        }

        //使联系的图片适应div
        function initConn() {
            //imageFitDiv($(".connection"),"img",312.0,463);
            imageFitDiv(".connection", ".connwrap", 500.0, 742.0, "");


            originf2bW = $(".fourth .connection .f2b").width();
            originf3bW = $(".fourth .connection .f3b").width();
            //使f2 f3图片的大小不随父级百分比变化而再次变化
            //为监听鼠标事件 transform
            $(".connection .f2").css({
                width: $(".connection .f2").width() + 'px',
                height: $(".connection .f2").height() + 'px'
            });
            $(".connection .f3").css({
                width: $(".connection .f3").width() + 'px',
                height: $(".connection .f3").height() + 'px'
            });
            //console.log(getNowStyle($(".f3b")[0],"width"));

            //然后增大f2b f3b的宽度
        }

       


        //使图片适应div，宽高等比例，不超过div
        function imageFitDiv(div, find, imgOriginWidth, imgOriginHeight) {
            var w = $(div).width();
            var h = $(div).height();
            if (w / h >= imgOriginWidth / imgOriginHeight) {
                $(div).find(find).height(h + "px");
                $(div).find(find).width(h / imgOriginHeight * imgOriginWidth + "px");
            } else {
                $(div).find(find).width(w + "px");
                $(div).find(find).height(w / imgOriginWidth * imgOriginHeight + "px");

            }
        }
 
 

        //定位pop内的span文字
        function popSpanPosition(pop1) {
            var span = $(pop1).find("span");
            span.css({
                left: (span.parent().find("img").width() - span.width()) / 2.0 + "px",
                top: (span.parent().find("img").height() - span.height()) / 2.0 + "px"
            });
        }

        var smileChange = {
            start: function () {
                var that = this;//内层的内层函数的this会出问题
                this.intervalId = setInterval(function () {
                    clearTimeout(that.timeoutId);
                    $(".third .smile img").attr("src", "img/smile-on-2.png");
                    that.timeoutId = setTimeout(function () {
                        $(".third .smile img").attr("src", "img/smile-off-2.png");
                    }, 500);
                    //console.log("start  timeout ID "+that.timeoutId);
                }, 1000);


            },
            stop: function () {
                console.log("stop timeout id" + this.timeoutId);
                clearInterval(this.intervalId);
                clearTimeout(this.timeoutId);
                console.log("stop interval id" + this.intervalId);
            },
            changing: 0,
            intervalId: 0,
            timeoutId: 0
        }

        //记录鼠标进入时的坐标
        var enterX = 0, enterY = 0;

         

        function parallax(e) {
            var that = this;
            var offset = $(that).offset();
            var x1 = offset.left;
            var y1 = offset.top;

            //find可能和当前元素相同
            var find = $(this).find(e.data.find)[0];
            find || (find = $(this));

            var w = $(find).width();
            var h = $(find).height();
            var centerX = x1 + w / 2.0;
            var centerY = y1 + h / 2.0;

            var x2 = e.clientX;
            var y2 = e.clientY;

            var deltaX = x2 - x1;
            var deltaY = y2 - y1;

            //delta center
            var dcX = x2 - centerX;
            var dcY = y2 - centerY;

            //move delta
            var moveX = x2 - enterX;
            var moveY = y2 - enterY;
 

        }

        var getNowStyle = function (element, attr) {
            return element.currentStyle ? element.currentStyle[attr] : getComputedStyle(element, null)[attr];
        }


    });

})(window, jQuery);