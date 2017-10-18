var ShanBeiTip = function () {
    this.init();
};

ShanBeiTip.prototype.default = {
    charOffset: 12
};

ShanBeiTip.prototype.init = function () {
    var tipEl = document.createElement('div');
    tipEl.className = 'shanbei-tip';
    var wordEl = document.createElement('div');
    wordEl.className = 'shanbei-tip-word';
    var audioEl = document.createElement('div');
    audioEl.className = 'shanbei-tip-audio';
    var descEl = document.createElement('div');
    descEl.className = 'shanbei-tip-desc';
    tipEl.appendChild(wordEl);
    tipEl.appendChild(audioEl);
    tipEl.appendChild(descEl);
    document.body.appendChild(tipEl);
};

ShanBeiTip.prototype.setWord = function (word) {
    var wordEl = document.querySelector('.shanbei-tip .shanbei-tip-word');
    wordEl.textContent = word.toString();
};
ShanBeiTip.prototype.setDesc = function (desc) {
    var descEl = document.querySelector('.shanbei-tip .shanbei-tip-desc');
    descEl.textContent = desc.toString();
};


ShanBeiTip.prototype.showAt = function (x, y) {
    var tipEl = document.querySelector('.shanbei-tip');
    tipEl.style.display = 'block';
    tipEl.style.left = (x - tipEl.clientWidth / 2) + 'px';
    tipEl.style.top = (y + this.default.charOffset) + 'px';
    this.adjustPosition();
    tipEl.style.visibility = 'visible';
};

ShanBeiTip.prototype.adjustPosition = function () {
    var tipEl = document.querySelector('.shanbei-tip');
    var left = Number(tipEl.style.left.substring(0, tipEl.style.left.length - 2));
    var top = Number(tipEl.style.top.substring(0, tipEl.style.top.length - 2));

    var totalWidth = window.innerWidth > document.body.clientWidth ?
      document.body.clientWidth : window.innerWidth;
    var totalHeight = window.innerHeight > document.body.clientHeight ?
      document.body.clientHeight : window.innerHeight;
    var tipWidth = tipEl.clientWidth;
    var tipHeight = tipEl.clientHeight;
    console.log(window);
    
    if (left + tipWidth > totalWidth) {//不能超过左侧边界
        tipEl.style.left = (totalWidth - tipWidth) + 'px';
    }
    if (left < 0) {//不能超过右侧边界
        tipEl.style.left = 0;
    }
    if (top + tipHeight > totalHeight) {
        
        tipEl.style.top = (top - tipHeight - this.default.charOffset * 2) + 'px';
    }
    if (top < 0) {//不能超过上边界
        tipEl.style.top = 0;
    }
    console.log(document.body.clientWidth);
    console.log(tipEl.clientWidth);
    console.log(tipEl.style.left);

};

ShanBeiTip.prototype.hide = function () {
    var tipEl = document.querySelector('.shanbei-tip');
    tipEl.style.visibility = 'hidden';
};

ShanBeiTip.prototype.query = function (word) {
    this.setWord(word);
    this.setDesc('n.描述；刻画；类型；说明书');
};