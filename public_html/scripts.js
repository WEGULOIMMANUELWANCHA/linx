function tone(length, type) {
    var current = context.currentTime, oscillator = context.createOscillator(), gain = context.createGain();
    return type && (oscillator.type = type), oscillator.frequency.value = 0, gain.gain.value = 0, 
    oscillator.connect(gain), gain.connect(context.destination), oscillator.start(0), 
    oscillator.stop(current + length), {
        f: function() {
            1 == arguments.length && (oscillator.frequency.value = arguments[0]);
            for (var i = 0; i < arguments.length; i += 1) oscillator.frequency.linearRampToValueAtTime(arguments[i], current + i / (arguments.length - 1) * length);
            return this;
        },
        v: function() {
            1 == arguments.length && (gain.gain.value = arguments[0]);
            for (var i = 0; i < arguments.length; i += 1) gain.gain.linearRampToValueAtTime(arguments[i], current + i / (arguments.length - 1) * length);
            return this;
        }
    };
}

function bez(len, xs, ys, xe, ye, xc, yc) {
    for (var cv = [], i = 0; i < len; i += 1) {
        var t = i / (len - 1), ti = 1 - t;
        cv.push({
            x: ti * ti * xs + 2 * ti * t * xc + t * t * xe,
            y: ti * ti * ys + 2 * ti * t * yc + t * t * ye
        });
    }
    return cv;
}

function buildGrid(el, init) {
    for (var grd = [], i = 0; i < 30; i += 1) {
        var t = tile("0");
        el.appendChild(t), t.t_i = i, t.t_dir = i % 6, t.setTransform(), grd.push(t);
    }
    return grd;
}

function ti_to_x(i) {
    return i % 5 * h_k * 2;
}

function ti_to_y(i) {
    return Math.floor(i / 5) * h_j * 2 - (i % 5)(h_j);
}

function cgrad(ctx, s, c1, c2) {
    var grd = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    return grd.addColorStop(0, c1), grd.addColorStop(1, c2), grd;
}

function gs(res) {
    var ngs = Object.create(_gs);
    return res || (res = 100), ngs.res = res, ngs.canvas = document.createElement("canvas"), 
    ngs.canvas.width = res, ngs.canvas.height = res, ngs.ctx = ngs.canvas.getContext("2d"), 
    ngs.ctx.translate(+ngs.canvas.width / 2, +ngs.canvas.height / 2), ngs.ctx.scale(ngs.canvas.width, ngs.canvas.height), 
    ngs.ctx.lineCap = "round", ngs.ctx.textAlign = "center", ngs.ctx.textBaseline = "middle", 
    ngs;
}

function h_ni(i) {
    return (i + 36) % 6;
}

function start() {
    console.log("start up code");
}

function drawLnks(s, lk) {
    for (var i = 0; i < lk.length; i += 1) s.lineStyle("rgba(0,0,0,.5)").lineWidth(1).fillStyle("rgba(0,0,0,.5)").discPath(lk[i].pts, .05, !0), 
    s.lineStyle("rgba(255,0,0,.8)").lineWidth(1).fillStyle("rgba(255,0,0,.5)").discPath(lk[i].pts, .03, !0);
}

function tile(ti, txt) {
    var tc = document.createElement("div");
    txt && (tc.innerHTML = txt), tc.classList.add("tile"), tc.lk = [];
    for (var tds = t_set[ti], i = 0; i < tds.length; i += 2) {
        var start = Number(tds.charAt(i)), dist = 1;
        switch (tds.charAt(i + 1)) {
          case "b":
            dist = 2;
            break;

          case "c":
            dist = 3;
        }
        var end = h_ni(start + dist);
        tc.lk.push({
            st: start,
            ed: end,
            ty: 0,
            pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
        });
    }
    tc.t_t = document.createElement("div"), tc.t_t.classList.add("top");
    var top = gs(200).lineStyle("rgba(0,0,128,.8)").lineWidth(2).fillStyle("rgba(0,0,255,.1)").hex(.95, !0);
    return drawLnks(top, tc.lk), top.setbg(tc.t_t), tc.appendChild(tc.t_t), tc.t_b = document.createElement("div"), 
    tc.t_b.classList.add("bot"), gs(200).lineStyle("rgba(0,128,128,.8)").lineWidth(2).hex(.95).echo(10, 0, 0, 0, 0, 0, 0, 1, .1, 1, 0).setbg(tc.t_b), 
    tc.appendChild(tc.t_b), tc.setTransform = function() {
        var x = 25 * ti_to_x(tc.t_i), y = 25 * ti_to_y(tc.t_i);
        tc.style.transform = "translate3d(" + x + "vmin," + y + "vmin,0vmin)";
    }, tc;
}

var context = new AudioContext(), ae = {
    beep: function() {
        tone(1, "square").v(0, 1, 1, 1, 0).f(300);
    },
    home: function() {
        tone(1.5).v(1, 1, 1, 1, 0).f(100, 300, 100, 200, 100, 150, 50);
    },
    start: function() {
        tone(1).v(0, 1, .7).f(400, 100, 400, 100, 300, 300, 300, 300);
    },
    death: function() {
        tone(2).v(1, 0, .8, 0, .5, 0).f(150, 100);
    },
    spdup: function() {
        tone(1).v(0, .7, .7, .7, .3, .7, .9, .3, 1, 0).f(100, 200);
    },
    spddn: function() {
        tone(1).v(0, 1, 1, 1, .3, .9, .9, .3, .7, 0).f(200, 100);
    },
    click: function() {
        tone(.1).v(0, .3, .5).f(100, 100, 200);
    }
}, _gs = {
    line: function(x, y, x2, y2) {
        return this.ctx.beginPath(), this.ctx.moveTo(x, y), this.ctx.lineTo(x2, y2), this.ctx.stroke(), 
        this;
    },
    circle: function(x, y, r) {
        return this.ctx.beginPath(), this.ctx.arc(x, y, r, 0, 2 * Math.PI, !1), this.ctx.stroke(), 
        this;
    },
    lineStyle: function(s) {
        return this.ctx.strokeStyle = s, this;
    },
    fillStyle: function(s) {
        return this.ctx.fillStyle = s, this;
    },
    lineGrad: function(c1, c2) {
        return this.ctx.strokeStyle = cgrad(this.ctx, .5, c1, c2), this;
    },
    fillGrad: function(c1, c2) {
        return this.ctx.fillStyle = cgrad(this.ctx, 15, c1, c2), this;
    },
    lineWidth: function(w) {
        return this.ctx.lineWidth = w / 100, this;
    },
    linePath: function(pts, fill) {
        this.ctx.beginPath(), this.ctx.moveTo(pts[0].x, pts[0].y);
        for (var i = 1; i < pts.length; i += 1) this.ctx.lineTo(pts[i].x, pts[i].y);
        return this.ctx.stroke(), fill && this.ctx.fill(), this;
    },
    discPath: function(pts, r, fill) {
        for (var i = 0; i < pts.length; i += 1) this.ctx.beginPath(), this.ctx.arc(pts[i].x, pts[i].y, r, 0, 2 * Math.PI), 
        this.ctx.stroke(), fill && this.ctx.fill();
        return this;
    },
    hex: function(w, fill) {
        this.ctx.beginPath(), this.ctx.moveTo(h_vx[5] * w, h_vy[5] * w);
        for (var i = 0; i < 6; i += 1) this.ctx.lineTo(h_vx[i] * w, h_vy[i] * w);
        return this.ctx.stroke(), fill && this.ctx.fill(), this;
    },
    text: function(t, x, y, h, fill) {
        return this.ctx.save(), this.ctx.lineWidth = h / 5, this.ctx.translate(-x, -y), 
        this.ctx.scale(.01 * h, .01 * h), this.ctx.font = "10px sans-serif", fill ? this.ctx.fillText(t, 0, 0) : this.ctx.strokeText(t, 0, 0), 
        this.ctx.restore(), this;
    },
    setbg: function(el) {
        var data = this.canvas.toDataURL();
        return el.style.backgroundImage = "url(" + data + ")", this;
    },
    echo: function(frames, xs, ys, xe, ye, rots, rote, ss, se, alphas, alphae) {
        for (var ngs = gs(this.res), i = 0; i < frames; i += 1) {
            var re = i / frames, rs = 1 - re;
            ngs.ctx.save(), ngs.ctx.rotate((rots * rs + rote * re) * Math.PI / 180), ngs.ctx.translate(xs * rs + xe * re, ys * rs + ye * re), 
            ngs.ctx.scale(ss * rs + se * re, ss * rs + se * re), ngs.ctx.globalAlpha = alphas * rs + alphae * re, 
            ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs.ctx.restore();
        }
        return ngs;
    },
    rotSym: function(num) {
        return this.echo(num, 0, 0, 0, 0, 0, 360, 1, 1, 1, 1);
    },
    mirror: function(x, y) {
        var ngs = gs(this.res);
        return ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs.ctx.scale(x ? -1 : 1, y ? -1 : 1), 
        ngs.ctx.drawImage(this.canvas, -.5, -.5, 1, 1), ngs;
    }
}, h_r = .5, h_i = .25, h_j = .44301, h_k = .375, h_l = .2165, h_vx = [ h_i, h_r, h_i, -h_i, -h_r, -h_i ], h_vy = [ -h_j, 0, h_j, h_j, 0, -h_j ], h_mx = [ 0, h_k, h_k, 0, -h_k, -h_k ], h_my = [ -h_j, -h_l, h_l, h_j, h_l, -h_l ], t_set = {
    0: "0a2a4a",
    1: "0a2b",
    2: "0c2b5b",
    3: "0b1b",
    4: "0c",
    5: "0b",
    6: "0a"
};
//# sourceMappingURL=scripts.js.map