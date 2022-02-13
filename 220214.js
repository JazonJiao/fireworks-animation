/*** 2022-02-10
 * ----args list parameters----
 * @mandatory (number) x, y, w, h
 * @optional (number) start, end; (array) color
 */

class Love extends PointBase {
  constructor(ctx, args) {
    super(ctx, args);
    this.duration = 4;  // seconds
    this.n_seg = 149;  // number of segments
    this.scale = args.scale || 1;

    this.timer = new Timer2(frames(this.duration));
  }

  show() {
    this.s.stroke(249, 9, 99);
    this.s.strokeWeight(6);
    if (this.s.frameCount <= this.start) return;

    let t = this.timer.advance();
    let dt = 2 / (this.n_seg) * this.s.PI;  // t ranges from 0 to 2*pi
    for (let i = 0; i < this.n_seg; i++) {
      if (i / this.n_seg > t) break;
      // let t1 = dt * i;
      // let t2 = t1 + dt;
      let t1 = dt * i + this.s.PI;
      let t2 = t1 + dt + this.s.PI;

      // use the following parametric equation to draw love:
      // x = 14 sin^3(t)
      // y = 12 cos(t) - 5 cos(2t) - 2 cos(3t) - cos(4t)
      let c = Math.cos;
      this.s.line(
        this.x - this.scale * 14 * Math.sin(t1) ** 3,
        this.y + this.scale * (-12 * c(t1) + 5 * c(2 * t1) + 2 * c(3 * t1) + c(4 * t1)),
        this.x - this.scale * 14 * Math.sin(t2) ** 3,
        this.y + this.scale * (-12 * c(t2) + 5 * c(2 * t2) + 2 * c(3 * t2) + c(4 * t2))
      );

    }
  }
}


const Graph01 = function(s) {
  let t = {
    love: frames(1),
    txt: frames(6),
  };
  let tnr;
  s.preload = function() {
    tnr = s.loadFont('./font/times.ttf');
  };
  s.setup = function () {
    setup2D(s);
    s.love = new Love(s, {
      start: t.love, x: 579, y: 199, scale: 9
    });
    s.txt = [];
    s.txt[0] = new TextWriteIn(s, {
      str: "Happy Valentine’s Day to Jessie!", x: 349, y: 437, font: tnr, start: t.txt
    });
    s.txt[1] = new TextWriteIn(s, {
      str: "——Jazon Jiao", x: 761, y: 499, font: tnr, start: t.txt + 49
    });
    s.txt[2] = new TextWriteIn(s, {
      str: "2022.02.14", x: 829, y: 547, font: tnr, start: t.txt + 69, size: 19
    });
    s.d = new Dragger(s, [s.txt, s.love]);
  };
  s.draw = function () {
    s.background(0);
    for (let x of s.txt) x.show();
    s.love.show();
    s.d.show();
  };

};

let p = new p5(Graph01);
