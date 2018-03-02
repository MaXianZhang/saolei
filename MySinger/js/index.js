// 数据接口地址
var dataUrl = './data/data.json';
// 音频管理对象
var audioManager;
// 作用域
var $scope = $(document.body);
// loading 浮层
// 这个浮层是因为在手机上查看的话文件夹在比较慢，所以先展示浮层提醒用户正在加载
// 样式和代码分别在index.html/index.css中有定义
var $loadingLayer = $('.loading-layer');

/********** AudioManager ********/
var AudioManager = function (dataList) {
    // 数据列表


    if(typeof dataList == 'object'){
        this.dataList = dataList;
    }else{
        this.dataList = JSON.parse(dataList);
    }

    console.log(typeof this.dataList);
    console.log(dataList,this.dataList);

    // 数据索引
    this.index = 0;
    // 数据长度
    this.len = dataList.length;
    // audip对象
    this.audio = new Audio();
    this.audio.preload = 'auto';
    // 当前音频的长度
    this.duration = dataList[0].duration;
    this.setAudio();
    this.bindAudioEvent();
    // 用来表示是否播放
    this.autoPlay = false;
}

AudioManager.prototype = {
    // 播放下一首
    playNext: function() {
        this.index++;
        if (this.index === this.len) {
            this.index = 0;
        }
        this.setAudio();
    },
    // 播放上一首
    playPrev: function() {
        this.index--;

        if (this.index === -1) {
            this.index = this.len - 1;
        }
        this.setAudio();
    },
    // 播放指定一首
    playIndex: function (index) {
        this.index = index;
        this.autoPlay = true;

        this.setAudio();
    },
    // 获得当前的播放歌曲信息
    getCurInfo: function () {
        return this.dataList[this.index];
    },
    // audio 对象的各种事件
    bindAudioEvent: function () {
        var _self = this;

        $(this.audio).on('ended', function () {
            _self.playNext();
        });

        // loadeddata 事件在手机上只有点击了播放按钮才触发
        $(this.audio).on('loadedmetadata', function () {

            if (_self.autoPlay) {
                this.play();
            }

            $loadingLayer.hide();
        });
    },
    // 设置 Audio
    setAudio: function () {
        var data = this.dataList[this.index];

        this.duration = data.duration;
        this.audio.src = data.audio;

        $scope.trigger('changeAudio');
    },
    // 设置当前歌曲的总时长
    getDurationTime: function () {
        var duration = this.duration;

        return duration;
    },
    // 设置当前播放时间
    // 如果传了ratio，则根据比例取时间，否则按照当前播放时间
    getCurTime: function (ratio) {
        var curTime,
            time;

        if (ratio) {
            curTime = ratio * this.duration;
        } else {
            curTime = this.audio.currentTime;
        }

        return Math.round(curTime);
    },
    // 跳转播放
    jumpToPlay: function (ratio) {
        var time = ratio * this.duration;
        // var time = formatTime(audioManager.getCurTime(ration));


            console.log(time,this.audio.currentTime);


        this.autoPlay = true;

        this.audio.currentTime = time;
            // console.log(time,this.audio);

        // 避免在暂停状态县拖拽导致不播放
        this.audio.play();
    },
    // 获取当前播放的比例
    getPlayRation: function () {
        return this.audio.currentTime / this.duration;
    },
    play: function () {
        this.autoPlay = true;

        this.audio.play();
    },
    pause: function () {
        this.autoPlay = false;

        this.audio.pause();
    }
};
/********** AudioManager End ********/

/********** controlManager Start ********/
var controlManager = (function () {
    // dom结构
    var $songImg = $('.song-img img'),
        $songInfo = $('.song-info'),
        // infoTmple = __inline('../tmpl/info.tmpl'),
        // 点赞按钮和播放按钮
        $likeBtn = $('.like-btn'),
        $playBtn = $('.play-btn'),
        // 当前时间和总时长dom结构
        $timeCur = $('.cur-time'),
        $timeDuration = $('.all-time'),
        // 用来存储用户点赞信息，true为已赞，false未赞
        // 存在本地只是为了模拟
        likeList = [false, false, false, false, false],
        frameId;


    // 绑定控制事件
    function addControlEvent () {
        $playBtn.on('click', function (){
            if ($(this).hasClass('playing')) {
                audioManager.pause();
                cancelAnimationFrame(frameId);
            } else {
                audioManager.play();
                setProcess();
            }
            $(this).toggleClass('playing');
        });
        $('.next-btn').on('click', function (){
            audioManager.playNext();
        });
        $('.prev-btn').on('click', function (){
            audioManager.playPrev();
        });
        $('.like-btn').on('click', function (){
            var index = audioManager.index;

            if (likeList[index]) {
                return;
            } else {
                $('.like-btn').addClass('disabled');
                likeList[index] = true;
            }
        });
        console.log(' 添加事件完毕')

    }

    // 格式化 时间
    function formatTime (during) {
        var minute = Math.floor(during / 60),
            second = during - minute * 60;

        // 确保是两位
        if (minute < 10) {
            minute = '0' + minute;
        }
        if (second < 10) {
            second = '0' + second;
        }
        return minute + ':' + second;
    }

    // 设置播放时进度条
    function setProcess () {
        console.log(204,"这里在执行")
        cancelAnimationFrame(frameId); // 如果这里不清除，每setaudio一次就会设置一个animationframe，导致bug

        var $proTop = $('.pro-top'),
            frame = function () {
                var playRatio = audioManager.getPlayRation(),
                    translatePercent = (playRatio - 1) * 100,
                    time = formatTime(audioManager.getCurTime());

                $timeCur.text(time);

                if (translatePercent <= 1) {
                    $proTop.css({
                        transform: 'translateX(' + translatePercent + '%)',
                        '-webkit-transform': 'translateX(' + translatePercent + '%)'
                    });

                    frameId = requestAnimationFrame(frame);
                } else {
                    $proTop.css({
                        transform: 'translateX(0)',
                        '-webkit-transform': 'translateX(0)'
                    });
                    cancelAnimationFrame(frameId);
                }
            };
        frame();
    }

    // 重置进度条
    function resetProcess () {
        console.log(235,"这里在执行")

        var $proTop = $('.pro-top'),
            $curTime = $('.cur-time');

        $proTop.css({
            transform: 'translateX(-100%)',
            '-webkit-transform': 'translateX(-100%)'
        });

        $curTime.text('01:00');
    }

    // 渲染页面信息
    function renderInfo () {
        var curData = audioManager.getCurInfo();
        function setImage (src) {
            var img = new Image();

            $(img).on('load', function () {
                $songImg.attr('src', src);
                blurImg(this, $('.content-wrap'));
            });

            img.src = src;
        };

        // 设置歌曲信息
        // $songInfo.html(infoTmple(curData));
        $songInfo.html('<h1 class="song-name">'+ curData.song + '</h1>\
                        <h3 class="singer-name">'+ curData.singer + '</h3>\
                        <h3 class="album-name">专辑：'+ curData.album + '</h3>\
                        <h3 class="rhythm">编曲：'+ curData.rhythm + '</h3>\
                        <h3 class="lyric">歌词：'+ curData.lyric + '</h3>');
        // 设置专辑图片和背景模糊图
        // console.log(263,curData.image)
        setImage(curData.image);
        // 渲染总时间
        $timeDuration.text(formatTime(audioManager.getDurationTime()));
        // 渲染like按钮
        if (likeList[audioManager.index]) {
            $likeBtn.addClass('disabled');
        } else {
            $likeBtn.removeClass('disabled');
        }

        console.log('渲染页面信息完毕')
    }

    // 绑定进度条touch事件
    function addProcessEvent () {
        var $slidePoint = $('.slide-point'),
            $proTop = $('.pro-top'),
            offsetX = $('.pro-wrap').offset().left,
            width = $('.pro-wrap').width();

        $slidePoint.on('touchstart', function () {
            // 在开始touch的时候取消掉设置进度条，将控制权交给toouch事件
            cancelAnimationFrame(frameId);
        }).on('touchmove', function (e) {
            var x = e.changedTouches[0].clientX - offsetX,
                ration = x / width,
                translatePercent = (ration - 1) * 100,
                time = formatTime(audioManager.getCurTime(ration));

                console.log(audioManager.getCurTime(ration));

            if (ration > 1) {
                return false;
            }

            $timeCur.text(time);

            $proTop.css({
                transform: 'translateX(' + translatePercent + '%)',
                '-webkit-transform': 'translateX(' + translatePercent + '%)'
            });

            return false;
        }).on('touchend', function (e) {
            var ratio = (e.changedTouches[0].clientX - offsetX) / width;

            audioManager.jumpToPlay(ratio);
            $playBtn.addClass('playing');
            setProcess();
        });
        console.log('绑定进度条事件完毕');
    }

    // 初始
    var init = function () {
        renderInfo();
        addControlEvent();
        addProcessEvent();
        $scope.on('changeAudio', function () {
            $loadingLayer.show();

            renderInfo();
            // 优化点 如果是默认播放的话再setProcess
            // 如果是暂停状态下，需要resetProcess
            // 减少不必要的运算
            if (audioManager.autoPlay) {
                setProcess();
            } else {
                resetProcess();
            }
        });
    }

    return {
        init: init
    }
})();

/********** controlManager End ********/

/***** 通过 ajax 取数据 *******/
var success = function (d) {
    console.log('请求数据成功')

    // 初始化 audioManager
    // d = JSON.parse(d);
    audioManager = new AudioManager(d);
    controlManager.init();

    // 渲染播放列表
    renderList(d);
}

function getData(url, cb) {

    $.ajax({
        url: url,
        type: 'GET',
        success: cb,
        error: function () {
            alert('deal wrong');
        }
    })
}
getData(dataUrl, success);

/********** END *********/

// 渲染播放列表
function renderList (data) {
    // var tmpl = __inline('../tmpl/list.tmpl'),
    // var $html = $(tmpl(data));
    function gethtml(data) {
        if(typeof data == 'object'){
            var obj = data;
        }else{
            var obj = JSON.parse(data);
        }
        var len = obj.length;
        var ret = '';

        for (var i = 0; i < len; i++) {
            var curData = obj[i];
            ret += '<li data-index="'+ i + '">\
                    <h3>'+ curData.song + '<span> - '+ curData.singer + '</span></h3>\
                </li>';
        }

        return ret;
    }

    $('.play-list ul').html(gethtml(data));
    addListEvent();
    console.log('渲染播放列表完毕')
}

// 绑定点击播放列表事件
function addListEvent () {
    var $listBtn = $('.list-btn'),
        $playList = $('.play-list'),
        $closeBtn = $playList.find('.close-btn');

    // 打开播放列表
    $listBtn.on('click', function () {
        $playList.find('li').removeClass('playing').eq(audioManager.index).addClass('playing');
        $playList.css({
            transform: 'translateY(0)',
            '-webkit-transform': 'translateY(0)'
        });
    });
    // 点击播放列表歌曲
    $playList.on('click', 'li' ,function () {
        var self = $(this),
            index = self.data('index');

        self.siblings('.playing').removeClass('playing');
        self.addClass('playing');
        audioManager.playIndex(index);
        $('.play-btn').addClass('playing');

        setTimeout(function () {
            $closeBtn.trigger('click');
        }, 500)
    });
    // 点击关闭按钮
    $closeBtn.on('click', function () {
        $playList.css({
            transform: 'translateY(100%)',
            '-webkit-transform': 'translateY(100%)'
        });
    });

    console.log('绑定点击播放列表事件完毕');
}
