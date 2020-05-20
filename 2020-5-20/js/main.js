let canvas;
let stage;
let container;
let captureContainers;
let captureIndex;

function init() {
    canvas = document.getElementById("canvas");
    stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var w = canvas.width;
    var h = canvas.height;

    container = new createjs.Container();
    stage.addChild(container);

    captureContainers = [];
    captureIndex = 0;

    for (var i = 0; i < 100; i++) {
        const heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
        heart.y = -100;
        container.addChild(heart);
    }

    const text = new createjs.Text(
        "又是一年520\n" +
        "但从今年开始\n" +
        "每年的520都将会变得那么\n" +
        "美好、独特、难忘\n而这一切都是因为一个人\n\n" +

        "诸嘉钰\n" +
        "因为你，我懂得了怎样去爱一个人\n" +
        "因为你，我尝试了爱情的美妙和甜蜜\n" +
        "因为你，我的生命才更加充满色彩\n" +
        "我的眼里只有你\n" +
        "我的心里只有你\n" +
        "我的一生一世的生命里只有你\n\n" +

        "爱心现在应该已经充满整个屏幕了\n" +
        "感觉像是在变魔术一样\n\n" +

        "我要是会魔法就好了\n" +
        "立刻把自己变到你的身后\n" +
        "然后突然抱住你\n" +
        "你肯定会转过来\n" +
        "然后我就一边搂着你一边吻你\n" +
        "让那些想说的话都先憋在肚子里吧\n" +
        "此刻我只想这样拥抱着你\n" +
        "然后再边聊边做那些被疫情耽误的事情\n\n" +

        "但还是得面对现实\n" +
        "不过只要有你陪着我\n" +
        "就不害怕寂寞\n\n" +

        "我爱你，诸嘉钰\n" +
        "爱你爱你爱你\n" +
        "苗锦洲 2020/05/19 18:57",
        "bold 20px Arial", "#312");
    text.textAlign = "center";
    text.x = w / 2;
    text.y = h / 12 - text.getMeasuredLineHeight();
    stage.addChild(text);
    for (i = 0; i < 100; i++) {
        var captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }
    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);
}

function tick(event) {
    var w = canvas.width;
    var h = canvas.height;
    var l = container.numChildren;

    captureIndex = (captureIndex + 1) % captureContainers.length;
    stage.removeChildAt(0);
    var captureContainer = captureContainers[captureIndex];
    stage.addChildAt(captureContainer, 0);
    captureContainer.addChild(container);

    for (var i = 0; i < l; i++) {
        var heart = container.getChildAt(i);
        if (heart.y < -50) {
            heart._x = Math.random() * w;
            heart.y = h * (1 + Math.random()) + 50;
            heart.perX = (1 + Math.random() * 2) * h;
            heart.offX = Math.random() * h;
            heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
            heart.velY = -Math.random() * 2 - 1;
            heart.scaleX = heart.scaleY = Math.random() * 2 + 1;
            heart._rotation = Math.random() * 40 - 20;
            heart.alpha = Math.random() * 0.85 + 0.05;
            heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
        }
        var int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
        heart.y += heart.velY * heart.scaleX / 2;
        heart.x = heart._x + Math.cos(int) * heart.ampX;
        heart.rotation = heart._rotation + Math.sin(int) * 30;
    }

    captureContainer.updateCache("source-over");

    stage.update(event);
}

init();
