'use strict';
var Circle = function (ctx, x, y, radius, config) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.config = {
        strokeStyle: "#000",
        lineWidth: "1"
    };

    jQuery.extend(this.config, config);
};

Circle.prototype = new Sprite();

/**
 *draw方法的实现
 */
Circle.prototype.draw = function () {
    this.ctx.beginPath();
    this.ctx.lineWidth = this.config.lineWidth;
    this.ctx.strokeStyle = this.config.strokeStyle;
    this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true)

    this.ctx.stroke();
}