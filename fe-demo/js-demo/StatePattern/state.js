var State = function () {

};
State.prototype.download = function () {
    throw new Error("该方法必须被重载");
};
State.prototype.pause = function () {
    throw new Error("该方法必须被重载");
};
State.prototype.fail = function () {
    throw new Error("该方法必须被重载");
};
State.prototype.finish = function () {
    throw new Error("该方法必须被重载");
};


var ReadyState = function (oDownload) {
    State.apply(this);
    this.oDownload = oDownload;
};

ReadyState.prototype = new State();
ReadyState.prototype.download = function () {
    this.oDownload.setState(this.oDownload.getState("downloading"));
    console.log("开始下载!");
};

ReadyState.prototype.pause = function () {
    throw new Error("还没开始下载,不能暂停");
};
ReadyState.prototype.fail = function () {
    throw new Error("文件还没开始下载,怎么能是失败呢");
};
ReadyState.prototype.finish = function () {
    throw new Error("文件还没开始下载,当然也不能完成");
};

var Download = function () {
    this.oState = new ReadyState(this);
};

Download.prototype.setState = function (oState) {
    this.oState = oState;
};

Download.prototype.download = function () {
    this.oState.download();
};

Download.prototype.pause = function () {
    this.oState.pause();
};

Download.prototype.fail = function () {
    this.oState.fail();
};

Download.prototype.finish = function () {
    this.oState.finish();
};

Download.prototype.getState = function (state) {
    switch (state) {
        case "ready":
            return new ReadyState(this);//准备状态
        case "downloading":
            return new DownloadingState(this);//下载中状态
        case "paused":
            return new DownloadPausedState(this);//暂停状态
        case "fnished":
            return new DownloadedState(this);//下载完毕状态
        case "failed":
            return new DownloadFailedState(this);//下载失败状态
        default: break;
    }
};

var DownloadingState = function (oDownload) {
    State.apply(this);
    this.oDownload = oDownload;
};

DownloadingState.prototype = new State();
DownloadingState.prototype.download = function () {
  throw new Error("文件已经在下载中");
};

DownloadingState.prototype.fail = function () {
  this.oDownload.setState(this.oDownload.getState('failed'));
  console.log('下载失败');
};

DownloadingState.prototype.pause = function () {
    this.oDownload.setState(this.oDownload.getState('paused'));
    console.log('暂停下载');
};

DownloadingState.prototype.finish = function () {
    this.oDownload.setState(this.oDownload.getState('finished'));
    console.log('下载完成');
};

var DownloadPausedState = function (oDownload) {
    State.apply(this);
    this.oDownload = oDownload;
};

DownloadPausedState.prototype = new State();
DownloadPausedState.prototype.download = function () {
    this.oDownload.setState(this.oDownload.getState('downloading'));
    console.log("继续下载");
};
DownloadPausedState.prototype.pause = function () {
    throw new Error("已经暂停下载");
};
DownloadPausedState.prototype.fail = function () {
    this.oDownload.setState(this.oDownload.getState('failed'));
    console.log("下载失败");
};
DownloadPausedState.prototype.finish = function () {
    this.oDownload.setState(this.oDownload.getState('finished'));
    console.log("下载完成");
};

var DownloadFailedState = function (oDownload) {
    State.apply(this);
    this.oDownload = oDownload;
};

DownloadFailedState.prototype = new State();
DownloadFailedState.prototype.download = function () {
    this.oDownload.setState(this.oDownload.getState('downloading'));
    console.log("尝试重新下载");
};

DownloadFailedState.prototype.fail = function () {
    throw new Error("下载已失败，如何再次失败？");
};

DownloadFailedState.prototype.pause = function () {
    throw new Error("下载已失败，如何暂停？");
};

DownloadFailedState.prototype.finish = function () {
    throw new Error("下载已失败，如何成功？");
};

var DownloadedState = function (oDownload) {
    State.apply(this);
    this.oDownload = oDownload;
};

DownloadedState.prototype = new State();
DownloadedState.prototype.download = function () {
    this.oDownload.setState(this.oDownload.getState('downloading'));
    console.log("重新下载");
};

DownloadedState.prototype.pause = function () {
    throw new Error("下载已成功，暂停无意义");
};

DownloadedState.prototype.fail = function () {
    throw new Error("下载已成功，失败无意义");
};

DownloadedState.prototype.finish = function () {
    throw new Error("下载已成功，再次成功无意义");
};