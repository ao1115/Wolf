$(function () {
    //点击游戏规则显示游戏规则
    $('.rules').click(function () {
        $('.rule').stop().fadeIn(100)
    })
    //点击关闭按钮隐藏游戏规则
    $('.close').click(function () {
        $('.rule').stop().fadeOut(100)
    })
    //监听开始按钮
    $('.start').click(function () {
        $(this).stop().fadeOut(100)
        progressHandler()
        startWolfAnimation()

    })

    //监听重新开始按钮
    $('.reStart').click(function () {
        $('.mask').stop().fadeOut(100)
        $('.progress').css("width", "180px")
        progressHandler()
        startWolfAnimation()
    })

    //处理进度条的方法
    function progressHandler() {
        let timer = setInterval(function () {
            let progressWidth = $('.progress').width()
            progressWidth = progressWidth - 5 //获取进度条的宽度，再减
            $('.progress').css({
                width: progressWidth
            })
            if (progressWidth <= 0) { //如果进度条宽度为0，显示游戏结束
                clearInterval(timer)
                $('.mask').stop().fadeIn(100)
                stoWolfAnimation()
            }
        }, 1000)
    }
})


//灰太狼动画的方法
let wolfTimer
let wolfIndex
let wolfIndexEnd


function startWolfAnimation() {
    // 1.定义两个数组保存所有灰太狼和小灰灰的图片
    let wolf_1 = ['../images/h0.png', '../images/h1.png', '../images/h2.png', '../images/h3.png', '../images/h4.png', '../images/h5.png', '../images/h6.png', '../images/h7.png', '../images/h8.png', '../images/h9.png'];
    let wolf_2 = ['../images/x0.png', '../images/x1.png', '../images/x2.png', '../images/x3.png', '../images/x4.png', '../images/x5.png', '../images/x6.png', '../images/x7.png', '../images/x8.png', '../images/x9.png'];
    // 2.定义一个数组保存所有可能出现的位置
    var arrPos = [
        { left: "100px", top: "115px" },
        { left: "20px", top: "160px" },
        { left: "190px", top: "142px" },
        { left: "105px", top: "193px" },
        { left: "19px", top: "221px" },
        { left: "202px", top: "212px" },
        { left: "120px", top: "275px" },
        { left: "30px", top: "295px" },
        { left: "209px", top: "297px" }
    ];

    //创建图片
    let $wolfImage = $('<img src="" class = "wolfImage">')
    //图片显示的位置,随机生成数
    let postIndex = Math.round(Math.random() * 8)
    //灰太狼和小灰灰交替出现
    let wolfType = Math.round(Math.random()) === 1 ? wolf_1 : wolf_2
    $wolfImage.css({
        position: 'absolute',
        left: arrPos[postIndex].left,
        top: arrPos[postIndex].top
    })
    wolfIndex = 0
    wolfIndexEnd = 5
    wolfTimer = setInterval(function () {
        if (wolfIndex > wolfIndexEnd) {
            $wolfImage.remove()
            clearInterval(wolfTimer)
            startWolfAnimation()
        }

        //设置图片的内容
        $wolfImage.attr('src', wolfType[wolfIndex])
        wolfIndex++
    }, 150)


    //把图片插入到页面当中
    $('.container').append($wolfImage)
    gameRules($wolfImage)
}
function gameRules($wolfImage) {

    $wolfImage.one('click', (function () {
        wolfIndex = 5
        wolfIndexEnd = 9
        let $src = $(this).attr('src')
        let flag = $src.indexOf("h") >= 0
        console.log($('.score').text())
        if (flag) {
            $('.score').text(parseInt($('.score').text()) + 10)

        } else {
            $('.score').text(parseInt($('.score').text()) - 10)
        }
    }))
}

//停止灰太狼出现动画
function stoWolfAnimation() {
    $('.wolfImage').remove()
    clearInterval(wolfTimer)
}
