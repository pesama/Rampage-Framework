/**
 * This class is the one who manages all canvas painting. Every canvas working class must implement this class
 * @author Pelayo Sánchez Margareto
 * @date Feb 15th, 2011
 * @version 1.0
 *
 * @param target The canvas element to handle
 */

Rampage.gui.canvas.Canvas = function(target) {
    this._target = target;
    this._context = this._target.getContext('2d');

    this.getWidth = function() {
        return this._target.width;
    }

    this.getHeight = function() {
        return this._target.height;
    }

    this.setGlobalAlpha = function(global_alpha) {
        this._context.globalAlpha = global_alpha;
    }

    this.setGlobalCompositeOperation = function(global_composite_operation) {
        this._context.globalCompositeOperation = global_composite_operation;
    }

    this.setStrokeStyle = function(stroke_style) {
        this._context.strokeStyle = stroke_style;
    }

    this.setFillStyle = function(fill_style) {
        this._context.fillStyle = fill_style;
    }

    this.setLineWidth = function(line_width) {
        this._context.lineWidth = line_width;
    }

    this.setLineCap = function(line_cap) {
        this._context.lineCap = line_cap;
    }

    this.setLineJoin = function(line_join) {
        this._context.lineJoin = line_join;
    }

    this.setMiterLimit = function(miter_limit) {
        this._context.miterLimit = miter_limit;
    }

    this.setShadowOffsetX = function(shadow_offset_x) {
        this._context.shadowOffsetX = shadow_offset_x;
    }

    this.setShadowOffsetY = function(shadow_offset_y) {
        this._context.shadowOffsetY = shadow_offset_y;
    }

    this.setShadowBlur = function(shadow_blur) {
        this._context.shadowBlur = shadow_blur;
    }

    this.setShadowColor = function(shadow_color) {
        this._context.shadowColor = shadow_color;
    }

    this.setFont = function(font) {
        this._context.font = font;
    }

    this.setTextAlign = function(text_align) {
        this._context.textAlign = text_align;
    }

    this.setTextBaseline = function(text_baseline) {
        this._context.textBaseline = text_baseline;
    }

    //Canvas function adaptors
    this.toDataUrl = function() {
	this._target.toDataURL();
    }

    this.save = function() {
	this._context.save();
    }

    this.restore = function() {
	this._context.restore();
    }

    this.scale = function(x, y) {
	this._context.scale(x, y);
    }

    this.rotate = function(angle) {
	this._context.rotate(angle);
    }

    this.translate = function(x, y) {
	this._context.translate(x, y);
    }

    this.transform = function(a, b, c, d, e, f) {
	this._context.transform(a, b, c, d, e, f);
    }

    this.setTransform = function(a, b, c, d, e, f) {
	this._context.setTransform(a, b, c, d, e, f);
    }

    this.createLinearGradient = function(x0, y0, x1, y1) {
	this._context.createLinearGradient(x0, y0, x1, y1);
    }

    this.createRadialGradient = function(x0, y0, r0, x1, y1, r1) {
	this._context.createRadiusGradient(x0, y0, r0, x1, y1, r1);
    }

    this.createPattern = function(image, repetition) {
	this._context.createPattern(image, repetition);
    }

    this.clearRect = function(x, y, w, h) {
	this._context.clearRect(x, y, w, h);
    }

    this.fillRect = function(x, y, w, h) {
	this._context.fillRect(x, y, w, h);
    }

    this.strokeRect = function(x, y, w, h) {
	this._context.strokeRect(x, y, w, h);
    }

    this.beginPath = function() {
	this._context.beginPath();
    }

    this.closePath = function() {
	this._context.closePath();
    }

    this.moveTo = function(x, y) {
	this._context.moveTo(x, y);
    }

    this.lineTo = function(x, y) {
	this._context.lineTo(x, y);
    }

    this.quadraticCurveTo = function(cpx, cpy, x, y) {
	this._context.quadraticCurveTo(cpx, cpy, x, y);
    }

    this.bezierCurveTo = function(cp1x, cp1y, cp2x, cp2y, x, y) {
	this._context.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    }

    this.arcTo = function(x1, y1, x2, y2, r) {
	this._context.arcTo(x1, y1, x2, y2, r);
    }

    this.rect = function(x, y, w, h) {
	this._context.rect(x, y, w, h);
    }

    this.arc = function(x, y, r, sa, ea, cw) {
	this._context.arc(x, y, r, sa, ea, cw);
    }

    this.fill = function() {
	this._context.fill();
    }

    this.stroke = function() {
	this._context.stroke();
    }

    this.clip = function() {
	this._context.clip();
    }

    this.isPointInPath = function(x, y) {
	this._context.isPointInPath(x, y);
    }

    this.drawFocusRing = function(el, xc, yc, cdc) {
	this._context.drawFocusRing(el, xc, yc, cdc);
    }

    this.drawImage = function() {
	this._context.drawImage();
    }

    this.createImageData = function() {
	this._context.createImageData();
    }

    this.getImageData = function() {
	this._context.getImageData();
    }

    this.putImageData = function() {
	this._context.putImageData();
    }
}

Rampage.ready();