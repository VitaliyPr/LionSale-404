function particles(e, t) {
  particleground(document.getElementById(e), {
    dotColor: "rgba(0, 0, 0, 1)",
    lineColor: "rgba(0, 0, 0, 0.05)",
    minSpeedX: .3,
    maxSpeedX: .6,
    minSpeedY: .3,
    maxSpeedY: .6,
    density: 1e4,
    curvedLines: !1,
    proximity: 250,
    parallaxMultiplier: 10,
    particleRadius: 4
  }), particleground(document.getElementById(t), {
    dotColor: "rgba(0, 0, 0, 1)",
    lineColor: "rgba(0, 0, 0, 0.05)",
    minSpeedX: .3,
    maxSpeedX: .6,
    minSpeedY: .3,
    maxSpeedY: .6,
    density: 1e4,
    curvedLines: !1,
    proximity: 250,
    parallaxMultiplier: 10,
    particleRadius: 4
  })
}! function (e, t) {
  "use strict";

  function i(e) {
    e = e || {};
    for (var t = 1; t < arguments.length; t++) {
      var i = arguments[t];
      if (i)
        for (var a in i) i.hasOwnProperty(a) && ("object" == typeof i[a] ? deepExtend(e[a], i[a]) : e[a] = i[a])
    }
    return e
  }

  function a(a, s) {
    function r() {
      if (Y) {
        g = t.createElement("canvas"), g.className = "pg-canvas", g.style.display = "block", a.insertBefore(g, a.firstChild), y = g.getContext("2d"), p();
        for (var i = Math.round(g.width * g.height / s.density), n = 0; i > n; n++) {
          var o = new f;
          o.setStackPos(n), M.push(o)
        }
        e.addEventListener("resize", function () {
          d()
        }, !1), t.addEventListener("mousemove", function (e) {
          b = e.pageX, O = e.pageY
        }, !1), C && !k && e.addEventListener("deviceorientation", function () {
          P = Math.min(Math.max(-event.beta, -30), 30), F = Math.min(Math.max(-event.gamma, -30), 30)
        }, !0), l(), m("onInit")
      }
    }

    function p() {
      g.width = a.offsetWidth, g.height = a.offsetHeight, y.fillStyle = s.dotColor, y.strokeStyle = s.lineColor, y.lineWidth = s.lineWidth
    }

    function l() {
      if (Y) {
        v = e.innerWidth, w = e.innerHeight, y.clearRect(0, 0, g.width, g.height);
        for (var t = 0; t < M.length; t++) M[t].updatePosition();
        for (t = 0; t < M.length; t++) M[t].draw();
        A || requestAnimationFrame(l)
      }
    }

    function d() {
      p();
      for (var e = a.offsetWidth, t = a.offsetHeight, i = M.length - 1; i >= 0; i--)(M[i].position.x > e || M[i].position.y > t) && M.splice(i, 1);
      var n = Math.round(g.width * g.height / s.density);
      if (n > M.length)
        for (; n > M.length;) {
          var o = new f;
          M.push(o)
        } else n < M.length && M.splice(n);
      for (i = M.length - 1; i >= 0; i--) M[i].setStackPos(i)
    }

    function h() {
      A = !0
    }

    function c() {
      A = !1, l()
    }

    function f() {
      switch (this.stackPos, this.active = !0, this.layer = Math.ceil(3 * Math.random()), this.parallaxOffsetX = 0, this.parallaxOffsetY = 0, this.position = {
        x: Math.ceil(Math.random() * g.width),
        y: Math.ceil(Math.random() * g.height)
      }, this.speed = {}, s.directionX) {
        case "left":
          this.speed.x = +(-s.maxSpeedX + Math.random() * s.maxSpeedX - s.minSpeedX).toFixed(2);
          break;
        case "right":
          this.speed.x = +(Math.random() * s.maxSpeedX + s.minSpeedX).toFixed(2);
          break;
        default:
          this.speed.x = +(-s.maxSpeedX / 2 + Math.random() * s.maxSpeedX).toFixed(2), this.speed.x += this.speed.x > 0 ? s.minSpeedX : -s.minSpeedX
      }
      switch (s.directionY) {
        case "up":
          this.speed.y = +(-s.maxSpeedY + Math.random() * s.maxSpeedY - s.minSpeedY).toFixed(2);
          break;
        case "down":
          this.speed.y = +(Math.random() * s.maxSpeedY + s.minSpeedY).toFixed(2);
          break;
        default:
          this.speed.y = +(-s.maxSpeedY / 2 + Math.random() * s.maxSpeedY).toFixed(2), this.speed.x += this.speed.y > 0 ? s.minSpeedY : -s.minSpeedY
      }
    }

    function u(e, t) {
      return t ? void(s[e] = t) : s[e]
    }

    function x() {
      console.log("destroy"), g.parentNode.removeChild(g), m("onDestroy"), o && o(a).removeData("plugin_" + n)
    }

    function m(e) {
      void 0 !== s[e] && s[e].call(a)
    }
    var g, y, v, w, S, X, Y = !!t.createElement("canvas").getContext,
      M = [],
      b = 0,
      O = 0,
      k = !navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|BB10|mobi|tablet|opera mini|nexus 7)/i),
      C = !!e.DeviceOrientationEvent,
      F = 0,
      P = 0,
      A = !1;
    return s = i({}, e[n].defaults, s), f.prototype.draw = function () {
      y.beginPath(), y.arc(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY, s.particleRadius / 2, 0, 2 * Math.PI, !0), y.closePath(), y.fill(), y.beginPath();
      for (var e = M.length - 1; e > this.stackPos; e--) {
        var t = M[e],
          i = this.position.x - t.position.x,
          a = this.position.y - t.position.y,
          n = Math.sqrt(i * i + a * a).toFixed(2);
        n < s.proximity && (y.moveTo(this.position.x + this.parallaxOffsetX, this.position.y + this.parallaxOffsetY), s.curvedLines ? y.quadraticCurveTo(Math.max(t.position.x, t.position.x), Math.min(t.position.y, t.position.y), t.position.x + t.parallaxOffsetX, t.position.y + t.parallaxOffsetY) : y.lineTo(t.position.x + t.parallaxOffsetX, t.position.y + t.parallaxOffsetY))
      }
      y.stroke(), y.closePath()
    }, f.prototype.updatePosition = function () {
      if (s.parallax) {
        if (C && !k) {
          var e = (v - 0) / 60;
          S = (F - -30) * e + 0;
          var t = (w - 0) / 60;
          X = (P - -30) * t + 0
        } else S = b, X = O;
        this.parallaxTargX = (S - v / 2) / (s.parallaxMultiplier * this.layer), this.parallaxOffsetX += (this.parallaxTargX - this.parallaxOffsetX) / 10, this.parallaxTargY = (X - w / 2) / (s.parallaxMultiplier * this.layer), this.parallaxOffsetY += (this.parallaxTargY - this.parallaxOffsetY) / 10
      }
      var i = a.offsetWidth,
        n = a.offsetHeight;
      switch (s.directionX) {
        case "left":
          this.position.x + this.speed.x + this.parallaxOffsetX < 0 && (this.position.x = i - this.parallaxOffsetX);
          break;
        case "right":
          this.position.x + this.speed.x + this.parallaxOffsetX > i && (this.position.x = 0 - this.parallaxOffsetX);
          break;
        default:
          (this.position.x + this.speed.x + this.parallaxOffsetX > i || this.position.x + this.speed.x + this.parallaxOffsetX < 0) && (this.speed.x = -this.speed.x)
      }
      switch (s.directionY) {
        case "up":
          this.position.y + this.speed.y + this.parallaxOffsetY < 0 && (this.position.y = n - this.parallaxOffsetY);
          break;
        case "down":
          this.position.y + this.speed.y + this.parallaxOffsetY > n && (this.position.y = 0 - this.parallaxOffsetY);
          break;
        default:
          (this.position.y + this.speed.y + this.parallaxOffsetY > n || this.position.y + this.speed.y + this.parallaxOffsetY < 0) && (this.speed.y = -this.speed.y)
      }
      this.position.x += this.speed.x, this.position.y += this.speed.y
    }, f.prototype.setStackPos = function (e) {
      this.stackPos = e
    }, r(), {
      option: u,
      destroy: x,
      start: c,
      pause: h
    }
  }
  var n = "particleground",
    o = e.jQuery;
  e[n] = function (e, t) {
    return new a(e, t)
  }, e[n].defaults = {
    minSpeedX: .1,
    maxSpeedX: .7,
    minSpeedY: .1,
    maxSpeedY: .7,
    directionX: "center",
    directionY: "center",
    density: 1e4,
    dotColor: "#666666",
    lineColor: "#666666",
    particleRadius: 7,
    lineWidth: 1,
    curvedLines: !1,
    proximity: 100,
    parallax: !0,
    parallaxMultiplier: 5,
    onInit: function () {},
    onDestroy: function () {}
  }, o && (o.fn[n] = function (e) {
    if ("string" == typeof arguments[0]) {
      var t, i = arguments[0],
        s = Array.prototype.slice.call(arguments, 1);
      return this.each(function () {
        o.data(this, "plugin_" + n) && "function" == typeof o.data(this, "plugin_" + n)[i] && (t = o.data(this, "plugin_" + n)[i].apply(this, s))
      }), void 0 !== t ? t : this
    }
    return "object" != typeof e && e ? void 0 : this.each(function () {
      o.data(this, "plugin_" + n) || o.data(this, "plugin_" + n, new a(this, e))
    })
  })
}(window, document),
function () {
  for (var e = 0, t = ["ms", "moz", "webkit", "o"], i = 0; i < t.length && !window.requestAnimationFrame; ++i) window.requestAnimationFrame = window[t[i] + "RequestAnimationFrame"], window.cancelAnimationFrame = window[t[i] + "CancelAnimationFrame"] || window[t[i] + "CancelRequestAnimationFrame"];
  window.requestAnimationFrame || (window.requestAnimationFrame = function (t) {
    var i = (new Date).getTime(),
      a = Math.max(0, 16 - (i - e)),
      n = window.setTimeout(function () {
        t(i + a)
      }, a);
    return e = i + a, n
  }), window.cancelAnimationFrame || (window.cancelAnimationFrame = function (e) {
    clearTimeout(e)
  })
}(), particleground(document.getElementById("particles-foreground"), {
  dotColor: "rgba(255, 255, 255, 1)",
  lineColor: "rgba(255, 255, 255, 0.05)",
  minSpeedX: .3,
  maxSpeedX: .6,
  minSpeedY: .3,
  maxSpeedY: .6,
  density: 5e4,
  curvedLines: !1,
  proximity: 250,
  parallaxMultiplier: 10,
  particleRadius: 4
}), particleground(document.getElementById("particles-background"), {
  dotColor: "rgba(255, 255, 255, 0.5)",
  lineColor: "rgba(255, 255, 255, 0.05)",
  minSpeedX: .075,
  maxSpeedX: .15,
  minSpeedY: .075,
  maxSpeedY: .15,
  density: 3e4,
  curvedLines: !1,
  proximity: 20,
  parallaxMultiplier: 20,
  particleRadius: 2
})