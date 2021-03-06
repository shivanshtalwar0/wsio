"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("./interface");
var WebSockIo = /** @class */ (function () {
    function WebSockIo(url) {
        this.events = {};
        this.url = url;
        this.conn = new WebSocket(this.url);
    }
    WebSockIo.prototype.close = function () {
        this.conn.close();
    };
    WebSockIo.prototype.on = function (socketEvent, listener) {
        var _this = this;
        this.events[socketEvent] = { eventTarget: new EventTarget(), handler: listener };
        this.conn.onmessage = function (even) {
            var payload = JSON.parse(even.data);
            if (!_this.events.hasOwnProperty(payload.event))
                _this.events[payload.event] = { eventTarget: new EventTarget(), handler: listener };
            var customEvent = new CustomEvent(payload.event, { detail: payload });
            _this.events[payload.event].eventTarget.dispatchEvent(customEvent);
        };
        Object.keys(this.events).forEach(function (ev) {
            _this.events[ev].eventTarget.addEventListener(ev, _this.events[ev].handler);
        });
    };
    WebSockIo.prototype.off = function (socketEvent, listener, capture) {
        if (capture === void 0) { capture = false; }
        this.events[socketEvent].eventTarget.removeEventListener(socketEvent, listener, { capture: capture });
    };
    WebSockIo.prototype.waitForConnectionToOpen = function (socketEvent, data) {
        var _this = this;
        this.conn.onopen = function () {
            _this.emit(socketEvent, data);
        };
    };
    WebSockIo.prototype.emit = function (socketEvent, data) {
        var payload = { event: socketEvent, data: data };
        if (this.conn.readyState == this.conn.OPEN) {
            this.conn.send(JSON.stringify(payload));
        }
        else if (this.conn.readyState == this.conn.CONNECTING) {
            this.waitForConnectionToOpen(socketEvent, data);
        }
        else {
            throw "Socket Connection Closed :(";
        }
    };
    return WebSockIo;
}());
exports.default = WebSockIo;
