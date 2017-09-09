/**
 * Created by zhi on 2017/8/13.
 */
;(function () {
    /*
     * @var star_r：star半径系数，系数越大，半径越大
     * @var star_alpha：生成star的透明度，star_alpha越大，透明度越低
     * @var initStarsPopulation：初始化stars的个数
     * @var move_distance：star位移的距离，数值越大，位移越大
     * */
    var config = {
        star_r: 3,
        star_alpha: 5,
        initStarsPopulation: 150,
        move_distance: 0.25,
        maxDistFromCursor: 50,
    };
    var stars = [],
        canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        WIDTH,
        HEIGHT;

    function CanvasStar() {
    }

    var initConfig = function (conf) {
        if (conf instanceof Object) {
            for (var item in conf) {
                config[item] = conf[item];
            }
        }
    };

    CanvasStar.prototype.init = function (conf) {
        initConfig(conf);//初始化设置

        ctx.strokeStyle = "white";
        ctx.shadowColor = "white";
        for (var i = 0; i < config.initStarsPopulation; i++) {
            stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT), true);
            //stars[i].draw();
        }
        ctx.shadowBlur = 0;
        animate();
    };

    /* 设置单个 star
     * @param id：id
     * @param x：x坐标
     * @param y：y坐标
     * @param useCache：是否使用缓存
     * */
    function Star(id, x, y, useCacha) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.useCacha = useCacha;
        this.cacheCanvas = document.createElement('canvas');
        this.cacheCtx = this.cacheCanvas.getContext('2d');
        this.r = Math.floor(Math.random() * config.star_r) + 1;
        this.cacheCtx.width = 6 * this.r;
        this.cacheCtx.height = 6 * this.r;
        var alpha = (Math.floor(Math.random() * 10) + 1) / config.star_alpha;
        this.color = 'rgba(255, 255, 255,' + alpha + ')';
        if (useCacha) {
            this.cache();
        }
    }


    Star.prototype = {
        draw: function () {
            if (!this.useCacha) {
                ctx.save();
                ctx.fillStyle = this.color;
                ctx.shadowBlur = this.r * 2;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
                ctx.closePath();
                ctx.fill();
                ctx.restore();
            } else {
                ctx.drawImage(this.cacheCanvas, this.x - this.r, this.y - this.r);
            }
        },
        cache: function () {
            this.cacheCtx.save();
            this.cacheCtx.fillStyle = this.color;
            this.cacheCtx.shadowColor = 'white';
            this.cacheCtx.shadowBlur = this.r * 2;
            this.cacheCtx.beginPath();
            this.cacheCtx.arc(this.r * 3, this.r * 3, this.r, 0, 2 * Math.PI);
            this.cacheCtx.closePath();
            this.cacheCtx.fill();
            this.cacheCtx.restore();
        },
        move: function () {
            this.y -= config.move_distance;
            if (this.y <= -10) {
                this.y += HEIGHT + 10;
            }
            this.draw();
        },

        die: function () {
            stars[this.id] = null;
            delete stars[this.id];
        }
    }

    function setCanvasSize() {
        WIDTH = document.documentElement.clientWidth;
        HEIGHT = document.documentElement.clientHeight;
        canvas.setAttribute("width", WIDTH);
        canvas.setAttribute("height", HEIGHT);

    }

    function animate() {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);

        for (var i in stars) {
            stars[i].move();
        }

        requestAnimationFrame(animate);
    }

    setCanvasSize();

    // 最后将插件对象暴露给全局对象
    _global = (function () {
        return this || (0, eval)('this');
    }());
    if (typeof module !== "undefined" && module.exports) {
        module.exports = CanvasStar;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return CanvasStar;
        });
    } else {

        !('CanvasStar' in _global) && (_global.CanvasStar = CanvasStar);
    }
})();
