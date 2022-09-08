// ////top Sketch
// var sketchPink = function(p) {
//     p.setup = function() {
//       const myPinkCanvas = p.createCanvas(400, 400);
//       myPinkCanvas.parent("pinkCanvas");
//     }
  
//     p.draw = function() {
//       p.clear();
//       p.background(255, 100, 100);
//       p.ellipse(p.mouseX, p.mouseY, 20, 20);
//     }
//   }
  
//   //secondary sketch
//   var sketchBlue = function(p) {
//     p.setup = function() {
//       const myBlueCanvas = p.createCanvas(400, 400);
//       myBlueCanvas.parent("blueCanvas");
//     }
  
//     p.draw = function() {
//       p.clear();
//       p.background(100, 100, 255);
//       p.ellipse(p.mouseX, p.mouseY, 20, 20);
//     }
//   }
  
//   var myp5Blue = new p5(sketchBlue);
//   var myp5Pink = new p5(sketchPink);



// 
let t = 0
let offset
let waves = []

class Wave {
    // 构造这个wave
    constructor(color, h) {
        // 颜色是传入的
        this.waveColor = color
        // 高度是传入的
        this.waveHeight = h
        // 偏移量是随机数
        this.offset = random(100, 200)
        this.t = 0
    }
    // 展示
    display() {
        let xoff = 0
        fill(this.waveColor)

        // 开始画曲线
        beginShape()
        for (let x = 0; x <= width + 10; x += 50) {
            let yoff = map(noise(xoff + this.offset, this.t + this.offset), 0, 1, 0, 200)
            let y = this.waveHeight - yoff
            vertex(x, y)
            xoff += 0.1
        }
        vertex(width + 200, 600)
        vertex(0, 600)
        endShape(CLOSE)
        // 闭合曲线
    }

    update() {
        this.t += 0.006
    }
}
function setColor() {
    // http://boxingp.github.io/traditional-chinese-colors/
    // 墨，苍黑,黛蓝,鸦青,玄青,乌黑,黛,藏青,玄,靛蓝,绀青,水，铜绿，黛绿，黯
    // let colorSet = ["#50616D","#395260","#425066","#424C50","#3D3B4F","#392F41","#4A4266","#2E4E7E","#75664D","#622A1D","#065279", "#003371","#88ADA6","#549688","#426666","#41555D"]

    // 十二时辰色：
    let colorSet = ["#003472", "#41555D", "#50616D", "#425066", "#392F41", "#312520", "#665757", "#549688", "#057748", "#789262", "#845A33", "#8C4356", "#60281E", "#955539", "#A78E44", "#AE7000", "#A88462", "#808080", "#E29C45", "#50616D", "#425066", "#003371", "#2E4E7E", "#065279"]
    // second() 方便测试，不想每秒刷新换成hour()
    return colorSet[second() % 24]
}

function setup() {
    // 画布大小
    createCanvas(windowWidth, 600);
    //   noiseDetail参数类似谐和波，主要是抖动频次，振幅之类的差别，差不多就行了
    noiseDetail(2, 1.2)
    // 这个还是要有，没这个每层带个黑边
    noStroke()

    // 这里开始是新建的数组，定义的是波浪层数
    // fill要有是因得着色，删除全都看不见了。
    new Array(3).fill(10).map((_, i) => {
        // 这个a 是透明度的数值
        let a = 255 - 50 * i * 2
        // 关于颜色
        // 颜色要求1h变1个色，合不合理再说，1天变1个不过分....
        colorNow = setColor()
        let c = color(colorNow)
        c.setAlpha(a)
        //颜色完
        let h = height - 50 * i
        let w = new Wave(c, h)
        // 往waves里push 生成好的 wave类 
        waves.push(w)
    })
}
// setTimeout(setup, 1000);
function draw() {
    background('#13131b');
    smooth();
    //   生成好waves数组后，对每一个调用方法
    waves.forEach(w => {
        w.display()
        w.update()
    })

}
// 跟随当前窗口宽度
function windowResized() {
    resizeCanvas(windowWidth, 600);
}
//保存图片
function keyReleased() {
    if (key == "s" || key == "S") saveCanvas("color" + day() + second() + ".png");
    if (key == "r" || key == "R") setup();

}