'use strict';
var Rectangle = function (ctx, x, y, width, height, config) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.w = width;
    this.h = height;
    this.config = {
        strokeStyle: "#fff",
        lineWidth: "1",
        fillStyle: "#fff"
    };

    jQuery.extend(this.config, config);
};

Rectangle.prototype = new Sprite();

/**
 *draw方法的实现
 */
Rectangle.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.strokeStyle = this.config.strokeStyle;
    this.ctx.stroke();
    this.ctx.fillStyle = this.config.fillStyle;
    this.ctx.fillRect(this.x, this.y, this.w, this.h);
};
