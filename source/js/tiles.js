var tiles1 = {
  0: "",
  1: "0a",
  2: "0d",
  3: "0e",
  4: "0c",
  5: "0b",
  6: "0b1b",
  7: "0c2b5b",
  8: "0c1a4a",
  9: "0a2a4a",
  '@': "0a2b",
  a: "00",
  b: "03",
  c: "04",
  d: "01",
  e: "02",
  f: "0111",
  g: "021c",
  h: "01311c",
  i: "0b11",
  j: "011b40",
  k: "002a4A",
  l: "0c2B51",
  A: "0A",
  B: "0D",
  C: "0E",
  D: "0B",
  E: "0C",
  F: "0B1B",
  G: "021C",
  H: "0B3A",
  I: "0b3A5B",
  J: "0B3a5b",
  L: "0c1A40",
  M: "0A2A4A",
  N: "0B4B1B3B",
  O: "0a0c3a",
  P: "0A0B3A3B0C",
  Q: "0A0B5A4B0C",
  R: "0a1a2a3a4a"
};

var tiles2 = {
  0: "",
  1: "0a",
  2: "0d",
  3: "0e",
  4: "0c",
  5: "0b",
  6: "0b1b",
  7: "0c2b5b",
  8: "0c1a4a",
  9: "0a2a4a",
  a: "0k",
  b: "0n",
  c: "0o",
  d: "0m",
  e: "0l",
  f: "0m0k",
  g: "0m0l",
  h: "0n4l",
  i: "0k5k0m",
  n: "0m1c",
  m: "5b2l4l1b",
  q: "3A1B5a0b",
  r: "0c1C",

  A: "0A",
  B: "0D",
  C: "0E",
  D: "0B",
  E: "0C",
  F: "0B2B",
  N: "5b2b4b1b",
  O: "0a0c3a",
  P: "0a3a0b3b",
  Q: "0b4b",
  R: "0a1a2a3a4a",
  S: "0c0a"

};

var t_set=[tiles1,tiles2];


function drawLnk(s, lk, sdw) {
  var cl = "255,255,255";
  switch (lk.ty) {
    case 0:
      cl = "0,255,0";
      s.lineStyle("rgba(0,0,0,.8)").lineWidth(1).fillStyle("rgba(0,0,0,.5)")
        .discPath(lk.pts, .05, true);
      if (!sdw)
        s.lineStyle("rgba(0,192,0,.9)").lineWidth(1).fillStyle("rgba(0,64,0,.4)")
         .discPath(lk.pts, .03, true,.01)
         .discPath(lk.pts, .02, true,.01)
         .discPath(lk.pts, .01, true,.02);

      break;
    case 1:
      cl = "255,0,0";
      s.lineStyle("rgba(0,0,0,.5)").lineWidth(5).fillStyle("rgba(0,0,0,.5)")
        .discPath(lk.pts, .04, true);
      if (!sdw)
        s.lineStyle("rgba(" + cl + ",.8)").lineWidth(1).fillStyle("rgba(" + cl + ",.5)")
        .discPath(lk.pts, .02, true);
      break;
    case 2:
      cl = "0,0,255";
      s.lineStyle("rgba(0,0,0,.8)").lineWidth(8)
        .linePath(lk.pts);
      if (!sdw) {
        s.lineStyle("rgba(" + cl + ",.8)").lineWidth(4).linePath(lk.pts);
        s.lineStyle("rgba(0,192,255,.6)").lineWidth(2).linePath(lk.pts);
      }
      break;
    case 3:
        cl = "192,255,128";
        s.lineStyle("rgba(0,0,0,.5)").lineWidth(5)
          .plusPath(lk.pts,0.05);
        if (!sdw) {
          s.lineStyle("rgba(192,128,0,.7)").lineWidth(5).plusPath(lk.pts,0.03);
          s.lineStyle("rgba(" + cl + ",1)").lineWidth(2).plusPath(lk.pts,0.025);
        }
        break;
  }
  if (lk.ed == 6) { //need to draw the start point
    s.lineStyle("rgba(" + cl + ",1)").lineWidth(3)
      .circle(.2, 0, .1);
  }
  if (lk.ed == 7) { //need to draw the end point
    s.lineStyle("rgba(" + cl + ",.8)").lineWidth(3)
      .line(-.3, -.1, -.1, -.1)
      .line(-.3, .1, -.1, .1)
      .line(-.3, .1, -.3, -.1)
      .line(-.1, .1, -.1, -.1);
  }
}

function drawLnks(s, lk, sdw) {
  for (var i = 0; i < lk.length; i += 1)
    drawLnk(s, lk[i], sdw);
}

function tile(tileSet,ti, at, txt) {
  var tc = document.createElement('div');
  var tSetIndex=dec(tileSet).val;
  var tileAnimation=dec(tileSet).cls;
  if (txt) tc.innerHTML = txt;
  tc.classList.add('tile');

  tc.lk = [];

  var tds = t_set[tSetIndex][ti];
  for (var i = 0; i < tds.length; i += 2) {
    var start = Number(tds.charAt(i));
    var sc = dec(tds.charAt(i + 1));
    var end = 0;
    if (sc.val < 3)
      end = h_ni(start + sc.val + 1);
    else if (sc.val == 3)
      end = 6;
    else
      end = 7;
    tc.lk.push({
      st: start,
      ed: end,
      ty: sc.cls,
      pts: bez(20, h_mx[start], h_my[start], h_mx[end], h_my[end], 0, 0)
    });
  }
  if (tc.lk.length > 0) {
    //create the top layer
    tc.t_t = document.createElement('div');
    tc.t_t.classList.add('top');
    t_thm.top(tc.t_t, tc.lk);
    tc.appendChild(tc.t_t);
    //create the bottom layer
    tc.t_b = document.createElement('div');
    tc.t_b.classList.add('bot');
    tc.t_b.style.animation = "hover " + rdm(5, 10) + "s infinite";
    t_thm.bot(tc.t_b, tc.lk);
    tc.appendChild(tc.t_b);
  }
  if (at) { //create the action button to get pressed
    tc.t_a = document.createElement('div');
    tc.t_a.classList.add('act');
    var act = gs(200)
    .lineStyle("rgba(0,0,0,1)").lineWidth(6)
    .line(0, -.4, .1, -.35).line(0, -.3, .1, -.35)
    .lineStyle("rgba(255,255,0,1)").lineWidth(4)
    .line(0, -.4, .1, -.35).line(0, -.3, .1, -.35)
    .echo(10, 0, 0, 0, 0, -60, 0, 1, 1, .1, 1)
      .rotSym(5);
    act.setbg(tc.t_a);
    tc.appendChild(tc.t_a);
    tc.t_a.addEventListener("click", function() {
      ae.rothex();
      tc.t_dir = tc.t_dir + 1;
      tc.setTransform();
    });
    if (lv_id==1) {
      tc.t_aex = document.createElement('div');
      tc.t_aex.innerHTML="Tap to Rotate Hex";
      tc.t_aex.classList.add('act_tuttext');
      tc.appendChild(tc.t_aex);
    }


  }


  tc.style.transform = "translate3d(0vmin,0vmin,100vmin)";
  tc.setTransformFuture = function(tm) {
    setTimeout(function() {
      tc.setTransform();
      ae.tiled();
    }, tm * 1000);
  };


  tc.setTransform = function() {
    var x = ti_to_x(tc.t_i) * 25;
    var y = ti_to_y(tc.t_i) * 25;
    tc.style.transform = "translate3d(" + x + "vmin," + y + "vmin,-.1vmin) rotateZ(" + tc.t_dir * 60 + "deg)";
  }

  return tc;
}
