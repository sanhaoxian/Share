$(document).ready(function(){
    var image=0;
    var len = $(".image-box").find("li").length;
    //用find()方法获取当前元素集合中每个元素的后代，通过选择器来筛选查找；
    function play(){
        image++;
        if(image==len){
            image=0;
        }
        $(".image-box>li:eq("+image+")").fadeIn(1500).siblings().fadeOut(1499);
    };
    setInterval(play,6000);
 
    //全屏滚动代码：
    //$('.panel').css({'height': $(window).height()});

});