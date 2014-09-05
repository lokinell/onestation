var Sprite = function () {
    'use strict';

    return {

        speed: {x:1, y: 1},

        draw: function () {

        },

        move: function () {
            this.x += this.speed.x;
            this.y += this.speed.y;
        },

        moveTo: function(x, y){
            this.x = x;
            this.y = y;
        },

        setWidth: function(width) {
            this.w = width;
        },

        setHeight: function (height) {
           this.h = height;
        }

    }
};
