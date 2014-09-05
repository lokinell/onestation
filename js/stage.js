var Stage = function (ctx /*canvas object*/) {
    'use strict';

    var inBound = function(sprite, w, h){
        var maxRadius = 30;
        var sx = sprite.x;
        var sy = sprite.y;
        if (sx > -maxRadius && sx < w+maxRadius && sy > -maxRadius && sy < h+maxRadius) {
            return true;
        }

        return false;
    };

    var w = ctx.canvas.width;
    var h = ctx.canvas.height;

    return {
        sprites : [],
        interval : null,

        begin: function () {
            this.interval = setInterval(
                (function (param) {
                    return function () {
                        param.render();
                    }
                })(this)
                , 20);
        },

        stop: function () {
            this.sprites = [];
            clearInterval(this.interval);
        },

        render: function () {
            ctx.clearRect(-w, -h, w+w, h+h);
            for (var i in this.sprites) {
                if(this.sprites[i]) {
                    this.sprites[i].draw();
                }
            }
        },

        addSprite: function (sprite) {
            this.sprites.push(sprite);
        },

        deleteSprite: function () {
            for (var i in this.sprites) {
                if(!inBound(this.sprites[i], w, h)) {
                   this.sprites.splice(i, 1);
                }
            }

        }

    }
};
