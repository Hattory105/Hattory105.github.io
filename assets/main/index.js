window.__require = function e(t, n, r) {
  function s(o, u) {
    if (!n[o]) {
      if (!t[o]) {
        var b = o.split("/");
        b = b[b.length - 1];
        if (!t[b]) {
          var a = "function" == typeof __require && __require;
          if (!u && a) return a(b, !0);
          if (i) return i(b, !0);
          throw new Error("Cannot find module '" + o + "'");
        }
        o = b;
      }
      var f = n[o] = {
        exports: {}
      };
      t[o][0].call(f.exports, function(e) {
        var n = t[o][1][e];
        return s(n || e);
      }, f, f.exports, e, t, n, r);
    }
    return n[o].exports;
  }
  var i = "function" == typeof __require && __require;
  for (var o = 0; o < r.length; o++) s(r[o]);
  return s;
}({
  character: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "52759OS7npEa7WhvIWu2RWR", "character");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        moveSpeed: 1,
        game: {
          default: null,
          type: cc.Node
        }
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.w:
          this.pressDown = false;
          this.pressLeft = false;
          this.pressRight = false;
          this.pressUp = true;
          break;

         case cc.macro.KEY.s:
          this.pressUp = false;
          this.pressLeft = false;
          this.pressRight = false;
          this.pressDown = true;
          break;

         case cc.macro.KEY.a:
          this.pressUp = false;
          this.pressDown = false;
          this.pressRight = false;
          this.pressLeft = true;
          break;

         case cc.macro.KEY.d:
          this.pressUp = false;
          this.pressDown = false;
          this.pressLeft = false;
          this.pressRight = true;
        }
      },
      initChar: function initChar() {
        this.dirChangeable = true;
        this.pressUp = false;
        this.pressDown = false;
        this.pressLeft = false;
        this.pressRight = false;
        this.moveUp = false;
        this.moveDown = false;
        this.moveLeft = false;
        this.moveRight = false;
      },
      onLoad: function onLoad() {
        this.boundLeft = -this.game.node.width / 2 + this.game.node.getComponent("utils").outlinePrefab.data.width / 2 + this.game.node.getComponent("utils").gapX;
        this.boundRight = this.game.node.width / 2 - this.game.node.getComponent("utils").outlinePrefab.data.width / 2 - this.game.node.getComponent("utils").gapX;
        this.boundBot = -this.game.node.height / 2 + this.game.node.getComponent("utils").outlinePrefab.data.height / 2 + this.game.node.getComponent("utils").gapY;
        this.boundTop = this.game.node.height / 2 - this.game.node.getComponent("utils").outlinePrefab.data.height / 2 - this.game.node.getComponent("utils").gapY;
        this.initChar();
        this.col = this.game.startCell.x;
        this.row = this.game.startCell.y;
        this.currentCel = cc.v2(this.col, this.row);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.zIndex = 2;
      },
      onDestroy: function onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      },
      checkMovedInCell: function checkMovedInCell() {
        if (this.moveUp) {
          this.dirChangeable = false;
          this.node.y += this.moveSpeed;
          if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.y > this.currentCelY) {
            this.node.y = this.currentCelY;
            this.dirChangeable = true;
            this.currentCel = cc.v2(this.col, this.row);
            return cc.v2(this.currentCelX, this.currentCelY);
          }
        } else if (this.moveDown) {
          this.dirChangeable = false;
          this.node.y -= this.moveSpeed;
          if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.y < this.currentCelY) {
            this.node.y = this.currentCelY;
            this.dirChangeable = true;
            this.currentCel = cc.v2(this.col, this.row);
            return cc.v2(this.currentCelX, this.currentCelY);
          }
        } else if (this.moveRight) {
          this.dirChangeable = false;
          this.node.x += this.moveSpeed;
          if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.x > this.currentCelX) {
            this.node.x = this.currentCelX;
            this.dirChangeable = true;
            this.currentCel = cc.v2(this.col, this.row);
            return cc.v2(this.currentCelX, this.currentCelY);
          }
        } else if (this.moveLeft) {
          this.dirChangeable = false;
          this.node.x -= this.moveSpeed;
          if ((this.col != this.currentCel.x || this.row != this.currentCel.y) && this.node.x < this.currentCelX) {
            this.node.x = this.currentCelX;
            this.dirChangeable = true;
            this.currentCel = cc.v2(this.col, this.row);
            return cc.v2(this.currentCelX, this.currentCelY);
          }
        }
        return null;
      },
      checkHitObstacle: function checkHitObstacle(obstArray) {
        for (var i = 0; i < obstArray.length; i++) if (obstArray[i].x == this.node.x && obstArray[i].y == this.node.y) return i;
        return null;
      },
      checkHitCapturedCell: function checkHitCapturedCell(obstArray) {
        if (null != this.capturedCell && (this.col != this.capturedCell.x || this.row != this.capturedCell.y)) for (var i = 0; i < obstArray.length; i++) if (obstArray[i].x == this.node.x && obstArray[i].y == this.node.y) return i;
        return null;
      },
      updateCapturedCell: function updateCapturedCell() {
        this.capturedCell = cc.v2(this.col, this.row);
      },
      resetCapturedCell: function resetCapturedCell() {
        this.capturedCell = cc.v2(-1, -1);
      },
      update: function update(dt) {
        this.col = Math.ceil((this.node.x + this.game.node.width / 2) / this.game.node.getComponent("utils").outlinePrefab.data.width);
        this.row = Math.ceil((this.node.y + this.game.node.height / 2) / this.game.node.getComponent("utils").outlinePrefab.data.height);
        this.currentCelX = this.col * this.game.node.getComponent("utils").outlinePrefab.data.width + this.game.node.getComponent("utils").gapX - this.game.node.getComponent("utils").outlinePrefab.data.width / 2 - this.game.node.width / 2;
        this.currentCelY = this.row * this.game.node.getComponent("utils").outlinePrefab.data.height + this.game.node.getComponent("utils").gapY - this.game.node.getComponent("utils").outlinePrefab.data.height / 2 - this.game.node.height / 2;
        if (this.node.x < this.boundLeft) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (this.node.x > this.boundRight) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (this.node.y < this.boundBot) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (this.node.y > this.boundTop) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (this.game.winGoal.x == this.node.x && this.game.winGoal.y == this.node.y) {
          cc.director.loadScene("Win");
          return;
        }
        if (this.dirChangeable) if (this.pressUp) {
          this.moveUp = true;
          this.moveDown = false;
          this.moveLeft = false;
          this.moveRight = false;
        } else if (this.pressDown) {
          this.moveUp = false;
          this.moveDown = true;
          this.moveLeft = false;
          this.moveRight = false;
        } else if (this.pressLeft) {
          this.moveUp = false;
          this.moveDown = false;
          this.moveLeft = true;
          this.moveRight = false;
        } else if (this.pressRight) {
          this.moveUp = false;
          this.moveDown = false;
          this.moveLeft = false;
          this.moveRight = true;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  continue_button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6fbfdFVwi1KQ5W6GnjRqeoj", "continue_button");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var backgroundNode = cc.find("background");
        this.node.on("touchstart", function() {
          cc.director.loadScene("Stage_0" + (backgroundNode.stage + 1));
          cc.game.removePersistRootNode(backgroundNode);
        }, this.node);
        this.node.on("touchmove", function(event) {
          var delta = event.touch.getDelta();
          this.x += delta.x;
          this.y += delta.y;
        }, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  current_marker: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c76acacvkhLMJgn94s6dRLx", "current_marker");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").current_marker();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  fade_in: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "a2b5edVuJ5Gh6pPk6yboZgD", "fade_in");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").fade_in();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  fade_out: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "27807qbMxxNALLlqWpl+gNR", "fade_out");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").fade_out();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      }
    });
    cc._RF.pop();
  }, {} ],
  gameover: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "3fc962FZCJA76m6EIXt0srR", "gameover");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        stageScene: cc.SceneAsset
      },
      onLoad: function onLoad() {},
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  "limiter_-2_dBFS": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe9beerzcNA14dDiTeZM8hm", "limiter_-2_dBFS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").limiter_negative_2_dBFS();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  "limiter_-5_dBFS": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "cbb6bwD8sFCt4sZ0Ig+9DOv", "limiter_-5_dBFS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").limiter_negative_5_dBFS();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  limiter_0_dBFS: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "c8ebbfEQc9CSIgxDyyHrMEd", "limiter_0_dBFS");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").limiter_0_dBFS();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  normal_loop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "6cc20VQ0xVEC5Xx2Hjoas61", "normal_loop");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").normal_loop();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  scenario_A: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "916e3mRAflLfIxIOQSFuqkj", "scenario_A");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").scenario_A_trigger();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  scenario_B: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "01cf1N8FwxEiJK0eQihkI1q", "scenario_B");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").scenario_B_trigger();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  scenario_C: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "594f6sOD3JAYLjh/MFw37T+", "scenario_C");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").scenario_C_trigger();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  seamless_loop: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "2f94eHBCntHb7UYvgWfWilu", "seamless_loop");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        this.node.on("touchstart", function() {
          this.parent.getComponent("sound_lib").seamless_loop();
        }, this.node);
        this.node.on("touchmove", function(event) {}, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  sound_lib_ts: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9c2faOaXvZPD4ZL8MSnrffs", "sound_lib_ts");
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _a = cc._decorator, ccclass = _a.ccclass, property = _a.property;
    var NewClass = function(_super) {
      __extends(NewClass, _super);
      function NewClass() {
        var _this = null !== _super && _super.apply(this, arguments) || this;
        _this.audioTestDisplay = null;
        _this.seamlessAudioList = [];
        _this.fadeAudioList = [];
        _this.fps = 0;
        _this.frameCount = 0;
        _this.totalVolume = 0;
        _this.audioList = [];
        return _this;
      }
      NewClass.prototype.onLoad = function() {
        this.SeamlessAudio = cc.Class({
          properties: {
            clip: cc.AudioClip,
            id: 0,
            startBuffer: 0,
            endBuffer: 0
          },
          getId: function() {
            return this.id;
          },
          setId: function(value) {
            this.id = value;
          },
          getStartBuffer: function() {
            return this.startBuffer;
          },
          setStartBuffer: function(value) {
            this.startBuffer = value;
          },
          getEndBuffer: function() {
            return this.endBuffer;
          },
          setEndBuffer: function(value) {
            this.endBuffer = value;
          }
        });
        this.FadeAudio = cc.Class({
          properties: {
            id: 0,
            fadeRate: 0,
            endVolume: 0,
            fadeCheckTime: 0,
            endTime: 0
          },
          getId: function() {
            return this.id;
          },
          setId: function(value) {
            this.id = value;
          },
          getFadeRate: function() {
            return this.fadeRate;
          },
          setFadeRate: function(value) {
            this.fadeRate = value;
          },
          getEndVolume: function() {
            return this.endVolume;
          },
          setEndVolume: function(value) {
            this.endVolume = value;
          },
          getFadeCheckTime: function() {
            return this.fadeCheckTime;
          },
          setFadeCheckTime: function(value) {
            this.fadeCheckTime = value;
          },
          getEndTime: function() {
            return this.endTime;
          },
          setEndTime: function(value) {
            this.endTime = value;
          }
        });
        this.startTime = new Date().getTime();
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.resources.load("Sounds/spark_man", function(err, clip) {
          self.clip_1 = clip;
        });
        cc.resources.load("Sounds/Loop", function(err, clip) {
          self.clip_2 = clip;
        });
        this.markerTest = false;
        this.totalLimiter(-2);
      };
      NewClass.prototype.limiter = function(clip, volume, threshold) {
        var audio = document.createElement("audio");
        audio.src = clip.nativeUrl;
        var context = new AudioContext();
        var source = context.createMediaElementSource(audio);
        var preGain = context.createGain();
        var limiter = context.createDynamicsCompressor();
        limiter.threshold.value = threshold;
        limiter.knee.value = 0;
        limiter.ratio.value = 20;
        limiter.attack.value = .005;
        limiter.release.value = .05;
        source.connect(preGain);
        preGain.connect(limiter);
        limiter.connect(context.destination);
        threshold /= 20;
        var newVolume = Math.pow(10, threshold);
        console.log("New volume: " + newVolume);
        if (newVolume < volume) return newVolume;
        return volume > 1 ? 1 : volume;
      };
      NewClass.prototype.totalLimiter = function(threshold) {
        threshold /= 20;
        this.totalVolume = Math.pow(10, threshold);
        console.log("Limiter: " + this.totalVolume);
      };
      NewClass.prototype.setLimiterAuto = function() {
        if (this.totalVolume > 0 && this.audioList.length > 0) {
          this.totalVolume /= this.audioList.length;
          var orgTotalVolume = 0;
          for (var i = 0; i < this.audioList.length; i++) 1 == cc.audioEngine.getState(i) && (orgTotalVolume += cc.audioEngine.getVolume(i));
          console.log("Original total volume: " + orgTotalVolume);
          var rate = this.totalVolume / orgTotalVolume;
          console.log("Rate: " + rate);
          for (var i = 0; i < this.audioList.length; i++) {
            console.log("Old volume " + i + " : " + cc.audioEngine.getVolume(i));
            var newVolume = cc.audioEngine.getVolume(i) * rate;
            newVolume < cc.audioEngine.getVolume(i) && cc.audioEngine.setVolume(this.audioList[i], newVolume);
            console.log("New volume " + i + " : " + cc.audioEngine.getVolume(i));
          }
          this.totalVolume *= this.audioList.length;
        }
      };
      NewClass.prototype.play = function(clip, loop, volume, threshold) {
        if (0 == this.totalVolume) return cc.audioEngine.play(clip, loop, this.limiter(clip, volume, threshold));
        var id = cc.audioEngine.play(clip, loop, this.limiter(clip, volume, threshold));
        this.audioList.push(id);
        return id;
      };
      NewClass.prototype.getFormat = function(clip) {
        return clip.nativeUrl.substr(clip.nativeUrl.length - 3, 3).toLowerCase();
      };
      NewClass.prototype.playSeamlessAudio = function(id, startBuffer, endBuffer) {
        startBuffer /= 1e3;
        endBuffer /= 1e3;
        var audio = new this.SeamlessAudio();
        audio.setId(id);
        audio.setStartBuffer(startBuffer);
        audio.setEndBuffer(endBuffer);
        this.seamlessAudioList.push(audio);
      };
      NewClass.prototype.seamlessProcess = function() {
        for (var i = 0; i < this.seamlessAudioList.length; i++) cc.audioEngine.isLoop(this.seamlessAudioList[i].getId()) && 1 == cc.audioEngine.getState(this.seamlessAudioList[i].getId()) && cc.audioEngine.getCurrentTime(this.seamlessAudioList[i].getId()) > cc.audioEngine.getDuration(this.seamlessAudioList[i].getId()) - this.seamlessAudioList[i].getEndBuffer() && cc.audioEngine.setCurrentTime(this.seamlessAudioList[i].getId(), this.seamlessAudioList[i].getStartBuffer());
      };
      NewClass.prototype.playFadeAudio = function(id, startVolume, endVolume, requiredTime) {
        if (this.fps > 0) {
          var remainingTime = 1e3 * (cc.audioEngine.getDuration(id) - cc.audioEngine.getCurrentTime(id));
          (0 == requiredTime || remainingTime < requiredTime) && (requiredTime = remainingTime);
          cc.audioEngine.setVolume(id, startVolume);
          var audio = new this.FadeAudio();
          audio.setId(id);
          audio.setEndVolume(endVolume);
          audio.setFadeCheckTime(new Date().getTime());
          audio.setEndTime(audio.getFadeCheckTime() + requiredTime);
          this.updateFadeRate(audio);
          this.fadeAudioList.push(audio);
        }
      };
      NewClass.prototype.updateFadeRate = function(audio) {
        var remainTime = audio.getEndTime() - new Date().getTime();
        var totalFrame = remainTime / 1e3 * this.fps;
        var volumeGap = audio.getEndVolume() - cc.audioEngine.getVolume(audio.getId());
        audio.setFadeRate(volumeGap / totalFrame);
      };
      NewClass.prototype.fadeProcess = function() {
        for (var i = 0; i < this.fadeAudioList.length; i++) if (cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) != this.fadeAudioList[i].getEndVolume()) {
          if (this.fadeAudioList[i].getFadeRate() > 0) {
            if (cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) > this.fadeAudioList[i].getEndVolume()) {
              cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), this.fadeAudioList[i].getEndVolume());
              continue;
            }
          } else if (this.fadeAudioList[i].getFadeRate() < 0 && cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) < this.fadeAudioList[i].getEndVolume()) {
            cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), this.fadeAudioList[i].getEndVolume());
            continue;
          }
          this.updateFadeRate(this.fadeAudioList[i]);
          cc.audioEngine.setVolume(this.fadeAudioList[i].getId(), cc.audioEngine.getVolume(this.fadeAudioList[i].getId()) + this.fadeAudioList[i].getFadeRate());
        }
      };
      NewClass.prototype.getFPS = function() {
        if (new Date().getTime() - this.startTime >= 1e3) {
          this.fps = this.frameCount;
          this.frameCount = 0;
          this.startTime = new Date().getTime();
        }
        this.frameCount += 1;
      };
      NewClass.prototype.markerToTimeInSec = function(marker) {
        var timeArray = marker.split(":");
        var hour = 0;
        var min = 0;
        var sec = 0;
        var milSec = 0;
        if (4 == timeArray.length) {
          hour = parseInt(timeArray[0]);
          min = parseInt(timeArray[1]);
          sec = parseInt(timeArray[2]);
          milSec = parseInt(timeArray[3]);
        } else if (3 == timeArray.length) {
          min = parseInt(timeArray[0]);
          sec = parseInt(timeArray[1]);
          milSec = parseInt(timeArray[2]);
        } else if (2 == timeArray.length) {
          sec = parseInt(timeArray[0]);
          milSec = parseInt(timeArray[1]);
        } else 1 == timeArray.length && (milSec = parseInt(timeArray[0]));
        var totalSec = 3600 * hour + 60 * min + sec + milSec / 1e3;
        return totalSec;
      };
      NewClass.prototype.playAtMarker = function(id, marker) {
        cc.audioEngine.setCurrentTime(id, this.markerToTimeInSec(marker));
      };
      NewClass.prototype.getCurrentTimeMarker = function(id) {
        var currentTime = cc.audioEngine.getCurrentTime(id);
        var hour = Math.floor(currentTime / 3600);
        var min = Math.floor(currentTime / 60);
        min > 59 && (min = 59);
        var sec = Math.floor(currentTime - 3600 * hour - 60 * min);
        var milSec = currentTime - Math.floor(currentTime);
        milSec *= 1e3;
        milSec > 999 && (milSec = 999);
        var marker = hour + ":" + min + ":" + sec + ":" + Math.round(milSec);
        return marker;
      };
      NewClass.prototype.onKeyDown = function(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.q:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_2, true, 1, 0);
          this.playSeamlessAudio(this.id, 0, 0);
          console.log("Normal loop");
          this.audioTestDisplay.string = "Normal loop";
          break;

         case cc.macro.KEY.w:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_2, true, 1, 0);
          this.playSeamlessAudio(this.id, 0, 0);
          console.log("Seamless loop");
          this.audioTestDisplay.string = "Seamless loop";
          break;

         case cc.macro.KEY.e:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_1, true, 1, 0);
          this.playFadeAudio(this.id, 0, 1, 2e4);
          console.log("Fade in");
          this.audioTestDisplay.string = "Fade in in 20 secs";
          break;

         case cc.macro.KEY.r:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_1, true, 1, 0);
          this.playFadeAudio(this.id, 1, 0, 15e3);
          console.log("Fade out");
          this.audioTestDisplay.string = "Fade out in 15 secs";
          break;

         case cc.macro.KEY.t:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_1, true, 1, 0);
          this.playAtMarker(this.id, "0:1:2:0");
          console.log("Play at 0:1:2:0");
          this.audioTestDisplay.string = "Play audio at 0:1:2:0";
          break;

         case cc.macro.KEY.y:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.id = this.play(self.clip_1, true, 1, 0);
          this.playAtMarker(this.id, "0:2:5:50");
          console.log("Play at 0:2:5:50");
          this.audioTestDisplay.string = "Play audio at 0:2:5:50";
          break;

         case cc.macro.KEY.u:
          this.markerTest = false;
          cc.audioEngine.stopAll();
          this.play(self.clip_1, true, 1, -2);
          this.playAtMarker(this.play(self.clip_1, true, .5, -2), "0:2:5:50");
          this.playAtMarker(this.play(self.clip_1, true, .5, -2), "0:0:55:50");
          console.log("Limiter");
          this.audioTestDisplay.string = "Limiter";
          break;

         case cc.macro.KEY.i:
          if (this.markerTest) {
            var currentTime = this.getCurrentTimeMarker(this.id);
            console.log("Playing at " + currentTime);
            this.audioTestDisplay.string = "Playing at " + currentTime;
          } else {
            cc.audioEngine.stopAll();
            this.id = this.play(self.clip_1, true, 1, -2);
            var currentTime = this.getCurrentTimeMarker(this.id);
            console.log("Playing at " + currentTime);
            this.audioTestDisplay.string = "Playing at " + currentTime;
            this.markerTest = true;
          }
        }
      };
      NewClass.prototype.update = function(dt) {
        this.getFPS();
        this.seamlessProcess();
        this.fadeProcess();
        this.setLimiterAuto();
      };
      __decorate([ property(cc.Label) ], NewClass.prototype, "audioTestDisplay", void 0);
      NewClass = __decorate([ ccclass ], NewClass);
      return NewClass;
    }(cc.Component);
    exports.default = NewClass;
    cc._RF.pop();
  }, {} ],
  sound_lib: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "0a228QCnPxFUKKZybvIrMTt", "sound_lib");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        audioTestDisplay: {
          default: null,
          type: cc.Label
        },
        debug_1: {
          default: null,
          type: cc.Label
        },
        debug_2: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.seamlessAudioList = [];
        this.SeamlessAudio = cc.Class({
          properties: {
            audio: null,
            startBuffer: 0,
            endBuffer: 0
          },
          getAudio: function getAudio() {
            return this.audio;
          },
          setAudio: function setAudio(value) {
            this.audio = value;
          },
          getStartBuffer: function getStartBuffer() {
            return this.startBuffer;
          },
          setStartBuffer: function setStartBuffer(value) {
            this.startBuffer = value;
          },
          getEndBuffer: function getEndBuffer() {
            return this.endBuffer;
          },
          setEndBuffer: function setEndBuffer(value) {
            this.endBuffer = value;
          }
        });
        this.fadeAudioList = [];
        this.FadeAudio = cc.Class({
          properties: {
            audio: null,
            fadeRate: 0,
            endVolume: 0,
            fadeCheckTime: 0,
            endTime: 0
          },
          getAudio: function getAudio() {
            return this.audio;
          },
          setAudio: function setAudio(value) {
            this.audio = value;
          },
          getAudioSrc: function getAudioSrc() {
            return this.audio.getAudio();
          },
          getFadeRate: function getFadeRate() {
            return this.fadeRate;
          },
          setFadeRate: function setFadeRate(value) {
            this.fadeRate = value;
          },
          getEndVolume: function getEndVolume() {
            return this.endVolume;
          },
          setEndVolume: function setEndVolume(value) {
            this.endVolume = value;
          },
          getFadeCheckTime: function getFadeCheckTime() {
            return this.fadeCheckTime;
          },
          setFadeCheckTime: function setFadeCheckTime(value) {
            this.fadeCheckTime = value;
          },
          getEndTime: function getEndTime() {
            return this.endTime;
          },
          setEndTime: function setEndTime(value) {
            this.endTime = value;
          }
        });
        this.LimiterAudio = cc.Class({
          properties: {
            id: 0,
            limitDBFS: 0,
            maxPCM: 0,
            audio: null,
            fading: false
          },
          getId: function getId() {
            return this.id;
          },
          setId: function setId(value) {
            this.id = value;
          },
          getLimitDBFS: function getLimitDBFS() {
            return this.limitDBFS;
          },
          setLimitDBFS: function setLimitDBFS(value) {
            this.limitDBFS = value;
          },
          getMaxPCM: function getMaxPCM() {
            return this.maxPCM;
          },
          setMaxPCM: function setMaxPCM(value) {
            this.maxPCM = value;
          },
          getAudio: function getAudio() {
            return this.audio;
          },
          setAudio: function setAudio(value) {
            this.audio = value;
          },
          isFading: function isFading() {
            return this.fading;
          },
          setFading: function setFading(value) {
            this.fading = value;
          }
        });
        this.playingList = [];
        this.startTime = new Date().getTime();
        this.fps = 0;
        this.frameCount = 0;
        this.totalVolume = 0;
        this.totalLimiter = -999;
        this.audioList = [];
        this.limitRate = .02;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        cc.resources.load("Sounds/spark_man", function(err, clip) {
          self.clip_1 = clip;
        });
        cc.resources.load("Sounds/Loop", function(err, clip) {
          self.clip_2 = clip;
        });
        cc.resources.load("Sounds/shadow_man", function(err, clip) {
          self.clip_3 = clip;
        });
        cc.resources.load("Sounds/spark_mandrill", function(err, clip) {
          self.clip_4 = clip;
        });
        cc.resources.load("Sounds/MP3/Intro_A", function(err, clip) {
          self.Intro_A = clip;
        });
        cc.resources.load("Sounds/MP3/Intro_B", function(err, clip) {
          self.Intro_B = clip;
        });
        cc.resources.load("Sounds/MP3/Loop", function(err, clip) {
          self.Loop = clip;
        });
        cc.resources.load("Sounds/MP3/Outro_A", function(err, clip) {
          self.Outro_A = clip;
        });
        cc.resources.load("Sounds/MP3/Outro_B", function(err, clip) {
          self.Outro_B = clip;
        });
        cc.resources.load("Sounds/MP3/Outro_B_Test", function(err, clip) {
          self.Outro_B_Test = clip;
        });
        cc.resources.load("Sounds/MP3/Outro_C_Test", function(err, clip) {
          self.Outro_C_Test = clip;
        });
        this.markerTest = false;
        this.fade = "";
        this.checkMarker = "";
        this.step = -1;
        this.scenario = "";
        this.gameCallMarker = 0;
      },
      setTotalLimiter: function setTotalLimiter(threshold) {
        this.totalLimiter = threshold;
      },
      setVolumeRate: function setVolumeRate(rate) {
        this.limitRate = rate;
      },
      getTotalLimiter: function getTotalLimiter() {
        return this.totalLimiter;
      },
      setLimiterAuto: function setLimiterAuto() {
        if (this.playingList.length > 0) if (this.totalLimiter > -999) {
          var totalMaxPCM = 0;
          var numOfPlaying = 0;
          for (var i = 0; i < this.playingList.length; i++) {
            if (0 == i) {
              this.debug_1.string = "";
              this.debug_2.string = "";
            }
            this.debug_1.string += "Audio " + i + " at " + this.playingList[i].getAudio().currentTime + "\n";
            if (!this.playingList[i].getAudio().paused && this.playingList[i].getAudio().currentTime > 0 && !this.playingList[i].isFading()) {
              this.debug_2.string += "Audio " + i + " maxPCM: " + this.playingList[i].getMaxPCM() + "\n";
              totalMaxPCM += this.playingList[i].getMaxPCM();
              numOfPlaying += 1;
            }
          }
          if (0 == numOfPlaying) return;
          var totalDBFS = -999;
          0 != totalMaxPCM && (totalDBFS = 20 * Math.log10(totalMaxPCM * Math.sqrt(2)));
          var newVolume = 0;
          var currentDBFS = totalDBFS - .8 * numOfPlaying;
          if (currentDBFS > this.totalLimiter) for (var _i = 0; _i < this.playingList.length; _i++) if (!this.playingList[_i].getAudio().paused && this.playingList[_i].getAudio().currentTime > 0) {
            newVolume = this.playingList[_i].getAudio().volume - this.limitRate;
            newVolume > 0 && (this.playingList[_i].getAudio().volume = newVolume);
          }
        } else for (var _i2 = 0; _i2 < this.playingList.length; _i2++) if (!this.playingList[_i2].getAudio().paused && this.playingList[_i2].getAudio().currentTime > 0 && !this.playingList[_i2].isFading()) {
          var dBFS = 20 * Math.log10(this.playingList[_i2].getMaxPCM() * Math.sqrt(2)) - .8;
          if (dBFS > this.playingList[_i2].getLimitDBFS()) {
            var _newVolume = this.playingList[_i2].getAudio().volume -= this.limitRate;
            _newVolume > 0 && (this.playingList[_i2].getAudio().volume = _newVolume);
          }
        }
      },
      play: function play(clip, loop, volume, limitDBFS) {
        var audioCtx = new AudioContext();
        var url = clip.nativeUrl;
        var audio = new Audio(url);
        var processor = audioCtx.createScriptProcessor(2048, 1, 1);
        var source;
        audio.addEventListener("canplaythrough", function() {
          if (void 0 == source) {
            source = audioCtx.createMediaElementSource(audio);
            source.connect(processor);
            source.connect(audioCtx.destination);
            processor.connect(audioCtx.destination);
            audio.loop = loop;
          }
        }, false);
        audio.volume = volume;
        audio.play();
        var limiterAudio = new this.LimiterAudio();
        limiterAudio.setId(this.playingList.length);
        limiterAudio.setAudio(audio);
        limiterAudio.setLimitDBFS(limitDBFS);
        this.playingList.push(limiterAudio);
        var str = this.getFormat(limiterAudio.getId());
        processor.onaudioprocess = function(evt) {
          var input = evt.inputBuffer.getChannelData(0), len = input.length, aud = null, maxPCM = Math.abs(input[0]);
          null == aud && (aud = limiterAudio);
          for (var i = 0; i < len; i++) Math.abs(input[i]) > maxPCM && (maxPCM = Math.abs(input[i]));
          aud.setMaxPCM(maxPCM);
        };
        return limiterAudio.getId();
      },
      pause: function pause(id) {
        this.playingList[id].getAudio().pause();
      },
      uncacheAll: function uncacheAll() {
        for (var i = 0; i < this.playingList.length; i++) {
          this.playingList[i].getAudio().pause();
          this.playingList[i].getAudio().currentTime = 0;
        }
        this.playingList = [];
        this.seamlessAudioList = [];
        this.fadeAudioList = [];
      },
      getFormat: function getFormat(id) {
        var formatStr = this.playingList[id].getAudio().src;
        return formatStr.substr(formatStr.length - 3, 3).toLowerCase();
      },
      playSeamlessAudio: function playSeamlessAudio(id, startBuffer, endBuffer) {
        startBuffer /= 1e3;
        endBuffer /= 1e3;
        var audio = new this.SeamlessAudio();
        audio.setAudio(this.playingList[id].getAudio());
        audio.setStartBuffer(startBuffer);
        audio.setEndBuffer(endBuffer);
        this.seamlessAudioList.push(audio);
        this.playingList[id].currentTime = startBuffer;
      },
      seamlessProcess: function seamlessProcess() {
        for (var i = 0; i < this.seamlessAudioList.length; i++) this.seamlessAudioList[i].getAudio().loop && !this.seamlessAudioList[i].getAudio().paused && this.seamlessAudioList[i].getAudio().currentTime > this.seamlessAudioList[i].getAudio().duration - this.seamlessAudioList[i].getEndBuffer() && (this.seamlessAudioList[i].getAudio().currentTime = this.seamlessAudioList[i].getStartBuffer());
      },
      playFadeAudio: function playFadeAudio(id, startVolume, endVolume, requiredTime) {
        if (this.fps > 0) {
          this.playingList[id].setFading(true);
          this.playingList[id].getAudio().volume = startVolume;
          var audio = new this.FadeAudio();
          audio.setAudio(this.playingList[id]);
          audio.setEndVolume(endVolume);
          audio.setFadeCheckTime(new Date().getTime());
          var remainingTime = 1e3 * (audio.getAudioSrc().duration - audio.getAudioSrc().currentTime);
          !this.playingList[id].getAudio().loop && (0 == requiredTime || remainingTime < requiredTime) && (requiredTime = remainingTime);
          audio.setEndTime(audio.getFadeCheckTime() + requiredTime);
          this.updateFadeRate(audio);
          this.fadeAudioList.push(audio);
        }
      },
      updateFadeRate: function updateFadeRate(audio) {
        var remainTime = audio.getEndTime() - new Date().getTime();
        var totalFrame = remainTime / 1e3 * this.fps;
        var volumeGap = audio.getEndVolume() - audio.getAudioSrc().volume;
        audio.setFadeRate(volumeGap / totalFrame);
      },
      fadeProcess: function fadeProcess() {
        for (var i = 0; i < this.fadeAudioList.length; i++) if (this.fadeAudioList[i].getAudioSrc().volume != this.fadeAudioList[i].getEndVolume()) {
          this.updateFadeRate(this.fadeAudioList[i]);
          var newVolume = this.fadeAudioList[i].getAudioSrc().volume + this.fadeAudioList[i].getFadeRate();
          this.fadeAudioList[i].getFadeRate() > 0 ? newVolume > this.fadeAudioList[i].getEndVolume() && (newVolume = this.fadeAudioList[i].getEndVolume()) : this.fadeAudioList[i].getFadeRate() < 0 && newVolume < this.fadeAudioList[i].getEndVolume() && (newVolume = this.fadeAudioList[i].getEndVolume());
          this.fadeAudioList[i].getAudioSrc().volume = newVolume;
          console.log("Volume at " + (new Date().getTime() - this.fadeAudioList[i].getFadeCheckTime()) + " " + this.fadeAudioList[i].getAudioSrc().volume);
          if (this.fadeAudioList[i].getAudioSrc().volume == this.fadeAudioList[i].getEndVolume()) {
            this.fadeAudioList[i].getAudio().setFading(false);
            this.fadeAudioList.splice(i, 1);
            i--;
          }
        }
        this.fadeAudioList.length > 0 && ("in" == this.fade ? this.audioTestDisplay.string = "Fade in in " + Math.round(this.idleTime(this.id, 2e4, 0) / 1e3) + " secs" : "out" == this.fade && (this.audioTestDisplay.string = "Fade out in " + Math.round(this.idleTime(this.id, 15e3, 0) / 1e3) + " secs"));
      },
      getFPS: function getFPS() {
        if (new Date().getTime() - this.startTime >= 1e3) {
          this.fps = this.frameCount;
          this.frameCount = 0;
          this.startTime = new Date().getTime();
        }
        this.frameCount += 1;
      },
      markerToTimeInSec: function markerToTimeInSec(marker) {
        var timeArray = marker.split(":");
        var hour = 0;
        var min = 0;
        var sec = 0;
        var milSec = 0;
        if (4 == timeArray.length) {
          hour = parseInt(timeArray[0]);
          min = parseInt(timeArray[1]);
          sec = parseInt(timeArray[2]);
          milSec = parseInt(timeArray[3]);
        } else if (3 == timeArray.length) {
          min = parseInt(timeArray[0]);
          sec = parseInt(timeArray[1]);
          milSec = parseInt(timeArray[2]);
        } else if (2 == timeArray.length) {
          sec = parseInt(timeArray[0]);
          milSec = parseInt(timeArray[1]);
        } else 1 == timeArray.length && (milSec = parseInt(timeArray[0]));
        var totalSec = 3600 * hour + 60 * min + sec + milSec / 1e3;
        return totalSec;
      },
      playAtMarker: function playAtMarker(id, marker) {
        this.playingList[id].getAudio().currentTime = this.markerToTimeInSec(marker);
      },
      getCurrentTimeMarker: function getCurrentTimeMarker(id) {
        var currentTime = this.playingList[id].getAudio().currentTime;
        return this.timeInSecToMarker(currentTime);
      },
      timeInSecToMarker: function timeInSecToMarker(currentTime) {
        var hour = Math.floor(currentTime / 3600);
        var min = Math.floor(currentTime / 60);
        min > 59 && (min = 59);
        var sec = Math.floor(currentTime - 3600 * hour - 60 * min);
        var milSec = currentTime - Math.floor(currentTime);
        milSec *= 1e3;
        milSec > 999 && (milSec = 999);
        var marker = hour + ":" + min + ":" + sec + ":" + Math.round(milSec);
        return marker;
      },
      normal_loop: function normal_loop() {
        this.fade = "";
        this.markerTest = false;
        this.scenario = "";
        this.totalVolume = 0;
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.id = this.play(self.clip_2, true, 1, 0);
        this.playSeamlessAudio(this.id, 0, 0);
        console.log("Normal loop");
        this.audioTestDisplay.string = "Normal loop";
      },
      seamless_loop: function seamless_loop() {
        this.fade = "";
        this.markerTest = false;
        this.scenario = "";
        this.totalVolume = 0;
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.id = this.play(self.clip_2, true, 1, 0);
        this.playSeamlessAudio(this.id, 50, 50);
        console.log("Seamless loop");
        this.audioTestDisplay.string = "Seamless loop";
      },
      current_marker: function current_marker() {
        this.fade = "";
        this.totalVolume = 0;
        this.scenario = "";
        if (this.markerTest) {
          var _currentTime = this.getCurrentTimeMarker(this.id);
          console.log("Playing at " + _currentTime);
          this.audioTestDisplay.string = "Playing at " + _currentTime;
        } else {
          if (this.playingList.length > 0) {
            this.uncacheAll();
            this.audioTestDisplay.string = "Uncached all";
            return;
          }
          this.id = this.play(self.clip_1, true, 1, -2);
          var currentTime = this.getCurrentTimeMarker(this.id);
          console.log("Playing at " + currentTime);
          this.audioTestDisplay.string = "Playing at " + currentTime;
          this.markerTest = true;
        }
      },
      fade_in: function fade_in() {
        this.fade = "in";
        this.markerTest = false;
        this.scenario = "";
        this.totalVolume = 0;
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.id = this.play(self.clip_1, true, 1, 0);
        this.playFadeAudio(this.id, 0, 1, 2e4);
        this.gameCallMarker = new Date().getTime();
        console.log("Fade in");
      },
      fade_out: function fade_out() {
        this.fade = "out";
        this.markerTest = false;
        this.scenario = "";
        this.totalVolume = 0;
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.id = this.play(self.clip_1, true, 1, 0);
        this.playFadeAudio(this.id, 1, 0, 15e3);
        this.gameCallMarker = new Date().getTime();
        console.log("Fade out");
      },
      limiter_negative_5_dBFS: function limiter_negative_5_dBFS() {
        this.fade = "";
        this.markerTest = false;
        this.scenario = "";
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.setTotalLimiter(-5);
        this.play(self.clip_1, true, 1, 0);
        this.play(self.clip_2, true, 1, 0);
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:2:5:50");
        this.playAtMarker(this.play(self.clip_4, true, 1, 0), "0:0:55:50");
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:0:45:50");
        console.log("Limiter at -5 dBFS");
        this.audioTestDisplay.string = "Limiter at -5 dBFS";
      },
      limiter_negative_2_dBFS: function limiter_negative_2_dBFS() {
        this.fade = "";
        this.markerTest = false;
        this.scenario = "";
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.setTotalLimiter(-2);
        this.play(self.clip_1, true, 1, 0);
        this.play(self.clip_2, true, 1, 0);
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:2:5:50");
        this.playAtMarker(this.play(self.clip_4, true, 1, 0), "0:0:55:50");
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:0:45:50");
        console.log("Limiter at -5 dBFS");
        this.audioTestDisplay.string = "Limiter at -2 dBFS";
      },
      limiter_0_dBFS: function limiter_0_dBFS() {
        this.fade = "";
        this.markerTest = false;
        this.scenario = "";
        if (this.playingList.length > 0) {
          this.uncacheAll();
          this.audioTestDisplay.string = "Uncached all";
          return;
        }
        this.setTotalLimiter(0);
        this.play(self.clip_1, true, 1, 0);
        this.play(self.clip_2, true, 1, 0);
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:2:5:50");
        this.playAtMarker(this.play(self.clip_4, true, 1, 0), "0:0:55:50");
        this.playAtMarker(this.play(self.clip_3, true, 1, 0), "0:0:45:50");
        console.log("Limiter at 0 dBFS");
        this.audioTestDisplay.string = "Limiter at 0 dBFS";
      },
      scenario_A_trigger: function scenario_A_trigger() {
        this.fade = "";
        this.markerTest = false;
        this.totalVolume = 0;
        "A" != this.scenario && (this.step = -1);
        this.scenario = "A";
        if (this.step < 0 || 5 == this.step) {
          if (this.playingList.length > 0) {
            this.uncacheAll();
            this.audioTestDisplay.string = "Uncached all";
            return;
          }
          this.step = 0;
        } else if (2 == this.step) {
          this.gameCallMarker = this.getCurrentTimeMarker(this.id);
          this.nextBeatInMilSec = this.displayNextBeat = this.getNextBeatInMilSec(this.id, this.gameCallMarker, 444.444, 1);
          this.step += 1;
        }
      },
      scenario_B_trigger: function scenario_B_trigger() {
        this.fade = "";
        this.markerTest = false;
        this.totalVolume = 0;
        "B" != this.scenario && (this.step = -1);
        this.scenario = "B";
        if (this.step < 0 || 5 == this.step) {
          if (this.playingList.length > 0) {
            this.uncacheAll();
            this.audioTestDisplay.string = "Uncached all";
            return;
          }
          this.step = 0;
          this.nextBeatInMilSec = 0;
        } else if (2 == this.step) {
          this.pause(this.preId);
          this.gameCallMarker = this.getCurrentTimeMarker(this.id);
          this.nextBeatInMilSec = this.displayNextBeat = this.getNextBeatInMilSec(this.id, this.gameCallMarker, 444.444, 1);
          this.step += 1;
        }
      },
      scenario_C_trigger: function scenario_C_trigger() {
        this.fade = "";
        this.markerTest = false;
        this.totalVolume = 0;
        "C" != this.scenario && (this.step = -1);
        this.scenario = "C";
        if (this.step < 0 || 4 == this.step) {
          if (this.playingList.length > 0) {
            this.uncacheAll();
            this.audioTestDisplay.string = "Uncached all";
            return;
          }
          this.step = 0;
        } else if (1 == this.step) {
          this.gameCallMarker = this.getCurrentTimeMarker(this.id);
          this.nextBeatInMilSec = this.displayNextBeat = this.getNextBeatWithAlign(this.id, this.gameCallMarker, "0:0:0:573", 444.444);
          this.nextBeatAfterGCInMilSec = this.getNextBeatInMilSec(this.id, this.gameCallMarker, 444.444, 1);
          this.triggerPoint = this.nextBeatInMilSec - 573;
          this.step += 1;
        }
      },
      onKeyDown: function onKeyDown(event) {
        switch (event.keyCode) {
         case cc.macro.KEY.q:
          this.normal_loop();
          break;

         case cc.macro.KEY.w:
          this.seamless_loop();
          break;

         case cc.macro.KEY.e:
          this.fade_in();
          break;

         case cc.macro.KEY.r:
          this.fade_out();
          break;

         case cc.macro.KEY.t:
          this.limiter_negative_5_dBFS();
          break;

         case cc.macro.KEY.y:
          this.limiter_0_dBFS();
          break;

         case cc.macro.KEY.u:
          this.limiter_negative_2_dBFS();
          break;

         case cc.macro.KEY.i:
          this.current_marker();
          break;

         case cc.macro.KEY.o:
          this.scenario_A_trigger();
          break;

         case cc.macro.KEY.p:
          this.scenario_B_trigger();
          break;

         case cc.macro.KEY.l:
          this.scenario_C_trigger();
        }
      },
      compareTime: function compareTime(time_1_milsec, time_2_milsec, limitGap) {
        return time_2_milsec - time_1_milsec < limitGap;
      },
      getNextBeatInMilSec: function getNextBeatInMilSec(id, currentMarker, gapOfBeats, numOfNextBeat) {
        var durationInMilSec = 1e3 * this.playingList[id].getAudio().duration;
        var timeInMilSec = 1e3 * this.markerToTimeInSec(currentMarker);
        this.compareTime(timeInMilSec, durationInMilSec, 100) && (timeInMilSec -= 100);
        var numOfPassedBeats = Math.floor(timeInMilSec / gapOfBeats);
        var totalBeats = Math.ceil(durationInMilSec / gapOfBeats);
        var diff = totalBeats - numOfPassedBeats - numOfNextBeat;
        var nextBeatInMilSec = 0;
        if (0 == diff) return durationInMilSec;
        nextBeatInMilSec = diff > 0 ? gapOfBeats * (numOfPassedBeats + numOfNextBeat) : gapOfBeats * diff;
        return nextBeatInMilSec;
      },
      getNextBeatWithAlign: function getNextBeatWithAlign(id, currentMarker, alignMarker, gapOfBeats) {
        var nextBeatInMilSec = this.getNextBeatInMilSec(id, currentMarker, gapOfBeats, 1);
        var alignTimeInMilSec = 1e3 * this.markerToTimeInSec(alignMarker);
        var currentTimeInMilSec = 1e3 * this.markerToTimeInSec(currentMarker);
        if (alignTimeInMilSec > gapOfBeats) while (nextBeatInMilSec - alignTimeInMilSec < currentTimeInMilSec) nextBeatInMilSec += gapOfBeats;
        return nextBeatInMilSec;
      },
      idleTime: function idleTime(id, endTimeInMilSec, limitGap) {
        var timeGapInMilSec = endTimeInMilSec - 1e3 * this.playingList[id].getAudio().currentTime;
        timeGapInMilSec <= limitGap && (this.nextBeatInMilSec = 0);
        timeGapInMilSec < 0 && (timeGapInMilSec = 0);
        return timeGapInMilSec;
      },
      scenarioA: function scenarioA() {
        if ("A" == this.scenario) if (0 == this.step) {
          this.nextBeatInMilSec = 0;
          this.id = this.play(self.Intro_A, false, 1, 0);
          this.preId = this.id;
          this.step += 1;
        } else if (1 == this.step) {
          this.checkMarker = this.getCurrentTimeMarker(this.id);
          if (this.compareTime(1e3 * this.markerToTimeInSec(this.checkMarker), 1e3 * this.playingList[this.id].getAudio().duration, 120)) {
            this.pause(this.id);
            this.id = this.play(self.Loop, true, 1, 0);
            this.playSeamlessAudio(this.id, 0, 50);
            this.step += 1;
          }
          this.audioTestDisplay.string = "Scenario A: Intro A at " + this.getCurrentTimeMarker(this.id);
        } else if (2 == this.step) {
          this.checkMarker = this.getCurrentTimeMarker(this.id);
          this.audioTestDisplay.string = "Scenario A: Loop at " + this.checkMarker;
        } else if (3 == this.step) if (this.nextBeatInMilSec > 0) this.audioTestDisplay.string = "Scenario A: Loop at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro A triggers on next beat " + this.timeInSecToMarker(this.nextBeatInMilSec / 1e3) + "\nWaiting until next beat after " + this.idleTime(this.id, this.nextBeatInMilSec, 50) + " secs"; else {
          this.pause(this.id);
          this.id = this.play(self.Outro_A, false, 1, 0);
          this.playingList[this.id].getAudio().currentTime = .04;
          this.step += 1;
        } else if (4 == this.step) {
          this.audioTestDisplay.string = "Scenario A: Outro A at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro A triggered on next beat " + this.timeInSecToMarker(this.displayNextBeat / 1e3);
          this.playingList[this.id].getAudio().paused && this.playingList[this.id].getAudio().currentTime >= this.playingList[this.id].getAudio().duration && (this.step += 1);
        }
      },
      scenarioB: function scenarioB() {
        if ("B" == this.scenario) if (0 == this.step) {
          this.nextBeatInMilSec = 0;
          this.id = this.play(self.Intro_B, false, 1, 0);
          this.step += 1;
        } else if (1 == this.step) {
          (0 == this.nextBeatInMilSec || isNaN(this.nextBeatInMilSec)) && (this.nextBeatInMilSec = this.getNextBeatInMilSec(this.id, "0:0:0:0", 573, 1));
          if (this.compareTime(1e3 * this.playingList[this.id].getAudio().currentTime, this.nextBeatInMilSec, 120)) {
            this.preId = this.id;
            this.id = this.play(self.Loop, true, 1, 0);
            this.playSeamlessAudio(this.id, 0, 50);
            this.nextBeatInMilSec = 0;
            this.step += 1;
          }
          this.audioTestDisplay.string = "Scenario B: Intro B at " + this.getCurrentTimeMarker(this.id) + "\nLoop triggers on next beat " + this.timeInSecToMarker(this.nextBeatInMilSec / 1e3);
        } else if (2 == this.step) {
          this.checkMarker = this.getCurrentTimeMarker(this.id);
          this.compareTime(1e3 * this.playingList[this.preId].getAudio().currentTime, 1e3 * this.playingList[this.preId].getAudio().duration, .5) ? this.audioTestDisplay.string = "Scenario B: Loop at " + this.checkMarker : this.audioTestDisplay.string = "Scenario B: Intro B at " + this.getCurrentTimeMarker(this.preId) + "\nLoop at " + this.checkMarker;
        } else if (3 == this.step) if (this.nextBeatInMilSec > 0) this.audioTestDisplay.string = "Scenario A: Loop at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro B triggers on next beat " + this.timeInSecToMarker(this.nextBeatInMilSec / 1e3) + "\nWaiting until next beat after " + this.idleTime(this.id, this.nextBeatInMilSec, 50) + " secs"; else {
          this.preId = this.id;
          this.id = this.play(self.Outro_B_Test, false, 1, 0);
          this.playFadeAudio(this.preId, this.playingList[this.preId].getAudio().volume, 0, 888);
          this.step += 1;
        } else if (4 == this.step) {
          if (this.playingList[this.preId].getAudio().volume > 0) this.audioTestDisplay.string = "Scenario B: Loop at " + this.getCurrentTimeMarker(this.preId) + " fading out until marker (0:0:0:888) of Outro B\nScenario B: Outro B at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro B triggered on next beat " + this.timeInSecToMarker(this.displayNextBeat / 1e3); else {
            if (!this.playingList[this.preId].getAudio().paused) {
              this.pause(this.preId);
              this.playingList[this.preId].getAudio().currentTime = 0;
            }
            this.audioTestDisplay.string = "Loop finished fading out at marker (0:0:0:888)\nScenario B: Outro B at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro B triggered on next beat " + this.timeInSecToMarker(this.displayNextBeat / 1e3);
          }
          this.playingList[this.id].getAudio().paused && this.playingList[this.id].getAudio().currentTime >= this.playingList[this.id].getAudio().duration && (this.step += 1);
        }
      },
      scenarioC: function scenarioC() {
        if ("C" == this.scenario) if (0 == this.step) {
          this.nextBeatInMilSec = 0;
          this.id = this.play(self.Loop, true, 1, 0);
          this.playSeamlessAudio(this.id, 0, 50);
          this.step += 1;
        } else if (1 == this.step) this.audioTestDisplay.string = "Scenario C: Loop at " + this.getCurrentTimeMarker(this.id); else if (2 == this.step) if (this.nextBeatInMilSec > 0) this.audioTestDisplay.string = "Scenario C: Loop at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro C triggers at " + this.timeInSecToMarker(this.triggerPoint / 1e3) + "\nWaiting until Outro C triggers after " + this.idleTime(this.id, this.triggerPoint, 50) + " secs"; else {
          this.preId = this.id;
          this.id = this.play(self.Outro_C_Test, false, 1, 0);
          this.playFadeAudio(this.preId, this.playingList[this.preId].getAudio().volume, 0, 573);
          this.step += 1;
        } else if (3 == this.step) {
          if (this.playingList[this.preId].getAudio().volume > 0) this.audioTestDisplay.string = "Scenario C: Loop at " + this.getCurrentTimeMarker(this.preId) + " fading out until next " + (Math.round((this.displayNextBeat - this.nextBeatAfterGCInMilSec) / 444.444) + 1) + " beat(s) " + this.timeInSecToMarker(this.displayNextBeat / 1e3) + "\nScenario C: Outro C at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro C triggered at " + this.timeInSecToMarker(this.triggerPoint / 1e3); else {
            if (!this.playingList[this.preId].getAudio().paused) {
              this.pause(this.preId);
              this.playingList[this.preId].getAudio().currentTime = 0;
            }
            this.audioTestDisplay.string = "Loop finished fading out after " + (Math.round((this.displayNextBeat - this.nextBeatAfterGCInMilSec) / 444.444) + 1) + " beat(s) " + this.timeInSecToMarker(this.displayNextBeat / 1e3) + "\nScenario C: Outro B at " + this.getCurrentTimeMarker(this.id) + "\nGame call detected at " + this.gameCallMarker + " and Outro C triggered at " + this.timeInSecToMarker(this.triggerPoint / 1e3);
          }
          this.playingList[this.id].getAudio().paused && this.playingList[this.id].getAudio().currentTime >= this.playingList[this.id].getAudio().duration && (this.step += 1);
        }
      },
      update: function update(dt) {
        this.getFPS();
        this.seamlessProcess();
        this.fadeProcess();
        this.setLimiterAuto();
        this.scenarioA();
        this.scenarioB();
        this.scenarioC();
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_01: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fe62esqIT1NuJH8BnGJbNtJ", "stage_01");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        flowerPrefab: {
          default: null,
          type: cc.Prefab
        },
        fencePrefab: {
          default: null,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 1;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.flowerPool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var flower = cc.instantiate(this.flowerPrefab);
          this.flowerPool.put(flower);
        }
        var x = -1;
        this.map = [ x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, x, x, x, x, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, x, x, x, 1, 1, x, 1, 1, 1, 1, 1, 1, 1, 1, x, x, x, x, 1, x, x, x, x, 1, x, x, x, x, x, x, x, 1, 1, x, x, x, x, 1, 1, 1, 1, x, 1, x, x, x, x, x, x, x, 1, 1, x, x, x, x, x, x, x, 1, x, 1, x, 2, x, x, x, x, x, 1, 1, x, x, 1, 1, 1, 1, x, 1, x, 1, x, x, x, x, x, x, x, 1, 1, x, x, x, x, x, x, x, 1, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, x, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, 1, 1, x, x, x, x, x, x, 1, x, x, x, x, 1, 1, 1, 1, x, x, x, x, x, 0, x, x, x, x, 1, x, x, x, x, 1, 1, 1, 1, x, x, x, x, x ];
        this.flowerPos = [];
        this.fencePos = [];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.fencePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.fencePool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.fencePos.length; _i2++) this.fencePos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.fencePos[_i2], this.fencePrefab, this.fencePool, true);
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.flowerPrefab, this.flowerPool, this.flowerPos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.flowerPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.fencePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        null != pos && (this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.flowerPrefab, this.flowerPool, this.flowerPos, this.player));
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_02: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "9f568r/ZNJGUr7VpNV88MMP", "stage_02");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        flowerPrefab: {
          default: null,
          type: cc.Prefab
        },
        fencePrefab: {
          default: null,
          type: cc.Prefab
        },
        grassPrefab: {
          default: null,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 2;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.flowerPool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var flower = cc.instantiate(this.flowerPrefab);
          this.flowerPool.put(flower);
        }
        var x = -1;
        this.map = [ 0, x, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, 1, 1, x, 1, x, 2, x, x, x, x, x, 1, 1, 1, 1, x, 1, 1, 1, 1, x, x, 1, x, 1, 1, 1, 1, 1, 1, x, x, x, x, x, x, x, x, x, x, 2, 1, x, 2, x, x, x, x, x, x, 2, 1, 1, 1, x, x, 2, x, x, 1, x, x, x, x, 1, x, x, 2, x, x, x, x, x, 2, x, x, 1, 1, 1, 1, x, x, x, x, x, x, x, x, x, x, x, x, 1, 1, x, x, x, 2, 1, x, x, 3, 1, 1, 1, 1, 1, x, 1, 1, 1, 2, 1, x, x, x, x, 1, 1, 1, 1, x, x, x, x, x, x, x, x, 1, 2, 1, x, x, x, x, x, x, 1, 1, x, x, x, x, x, x, x, x, 1, 1, 1, x, x, x, x, x, x, 1, 1, 1, 1, 1, x, x, x, x, 2, 2, x, x, x, x, 1, 2, 2, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, x, 1, 1, 1, x, x, x, x, x, x, 1, 1, x, x, x, x ];
        this.flowerPos = [];
        this.fencePos = [];
        this.grassPos = [];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.fencePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] ? this.grassPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 3 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.fencePool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.fencePos.length; _i2++) this.fencePos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.fencePos[_i2], this.fencePrefab, this.fencePool, true);
        this.grassPool = new cc.NodePool();
        for (var _i3 = 0; _i3 < this.grassPos.length; _i3++) this.grassPos[_i3] = this.node.getComponent("utils").createObstacle(this.node, this.grassPos[_i3], this.grassPrefab, this.grassPool, true);
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.flowerPrefab, this.flowerPool, this.flowerPos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.flowerPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.fencePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.grassPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        null != pos && (this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.flowerPrefab, this.flowerPool, this.flowerPos, this.player));
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_03: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4c03cOA6b5NwJrEBCeAe5V5", "stage_03");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        flowerPrefab: {
          default: null,
          type: cc.Prefab
        },
        fencePrefab: {
          default: null,
          type: cc.Prefab
        },
        grassPrefab: {
          default: null,
          type: cc.Prefab
        },
        sheepPrefab: {
          default: null,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 3;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.flowerPool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var flower = cc.instantiate(this.flowerPrefab);
          this.flowerPool.put(flower);
        }
        var x = -1;
        this.map = [ x, x, x, 1, x, x, x, x, x, 1, x, x, x, x, x, x, x, x, x, x, 2, x, 1, x, 1, 1, 1, x, 1, x, x, x, x, x, 1, 1, 1, x, x, x, x, 1, x, 1, 1, 1, x, 1, 1, 1, 1, 1, x, 1, x, x, x, x, x, x, 1, x, 2, x, x, x, x, x, x, x, 1, x, x, x, 3, x, x, 1, x, x, 3, x, x, x, x, x, x, x, x, 1, 1, x, x, x, 2, x, 1, 1, 1, x, x, x, 3, x, 0, x, x, x, 1, x, x, 1, x, x, x, 1, 1, 1, x, x, 2, x, x, x, x, 1, 1, 1, x, 2, x, x, x, x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, 3, x, x, 2, x, 1, 1, x, x, x, x, x, x, x, x, x, x, x, 4, x, x, x, x, x, 1, 1, x, x, x, x, 3, x, x, x, 1, 1, x, x, x, x, x, x, 1, 1, x, x, 1, 1, 1, x, x, x, x, 1, 1, x, x, x, x, x, x, x, x, x, 1, 1, 1, 1, x, x, x, x, 1, 1, x, x, 2, x, x ];
        this.flowerPos = [];
        this.fencePos = [];
        this.grassPos = [];
        this.sheepPos = [];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.fencePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] ? this.grassPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 3 == this.map[_i] ? this.sheepPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 4 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.fencePool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.fencePos.length; _i2++) this.fencePos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.fencePos[_i2], this.fencePrefab, this.fencePool, true);
        this.grassPool = new cc.NodePool();
        for (var _i3 = 0; _i3 < this.grassPos.length; _i3++) this.grassPos[_i3] = this.node.getComponent("utils").createObstacle(this.node, this.grassPos[_i3], this.grassPrefab, this.grassPool, true);
        this.sheepIndexList = [];
        this.sheepPool = new cc.NodePool();
        for (var _i4 = 0; _i4 < this.sheepPos.length; _i4++) {
          this.sheepPos[_i4] = this.node.getComponent("utils").createObj(this.node, this.sheepPos[_i4], this.sheepPrefab, this.sheepPool, true);
          this.sheepIndexList.push(this.node.getComponent("utils").objCollection.length - 1);
        }
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.flowerPrefab, this.flowerPool, this.flowerPos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
        this.hitSheep = false;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.flowerPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.fencePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.grassPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        var sheepTmp = this.player.checkHitObstacle(this.sheepPos);
        if (null != sheepTmp) {
          this.sheepPos.splice(sheepTmp, 1);
          this.node.getComponent("utils").objCollection[this.sheepIndexList[sheepTmp]].removeFromParent(true);
          this.hitSheep = true;
          this.sheepIndexList.splice(sheepTmp, 1);
          return;
        }
        null != pos ? this.hitSheep || (this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.flowerPrefab, this.flowerPool, this.flowerPos, this.player)) : this.hitSheep = false;
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_04: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "39f4bizjyRE3b7P1Wzb+TSU", "stage_04");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        snowFlakePrefab: {
          default: null,
          type: cc.Prefab
        },
        iglooPrefab: {
          default: null,
          type: cc.Prefab
        },
        iceSkatePrefab: {
          default: null,
          type: cc.Prefab
        },
        snowballPrefab: {
          default: null,
          orgPos: 0,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 4;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.snowFlakePool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var snowFlake = cc.instantiate(this.snowFlakePrefab);
          this.snowFlakePool.put(snowFlake);
        }
        var x = -1;
        this.map = [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, x, x, x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, x, x, x, x, 2, 2, 2, 2, 2, 2, 2, x, x, x, x, x, x, x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, 2, 2, 2, x, 2, 2, 2, x, x, 2, 2, 2, x, x, x, x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, 2, 2, 2, 2, 2, 2, x, x, 2, 2, 2, 2, 2, 2, x, x, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 3, x, 2, 2, 2, 2, 2, 2, x, x, x, x, 2, 2, 2, 2, 2, 2, 2 ];
        this.snowFlakePos = [];
        this.iglooPos = [];
        this.iceSkatePos = [];
        this.snowballPos = [ cc.v2(7, 15), cc.v2(7, 22), cc.v2(12, 18), cc.v2(12, 26), cc.v2(16, 20), cc.v2(16, 30) ];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.iglooPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] ? this.iceSkatePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 3 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.iglooPool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.iglooPos.length; _i2++) this.iglooPos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.iglooPos[_i2], this.iglooPrefab, this.iglooPool, true);
        this.iceSkatePool = new cc.NodePool();
        for (var _i3 = 0; _i3 < this.iceSkatePos.length; _i3++) this.iceSkatePos[_i3] = this.node.getComponent("utils").createObstacle(this.node, this.iceSkatePos[_i3], this.iceSkatePrefab, this.iceSkatePool, true);
        this.snowballIndexList = [];
        this.snowballPool = new cc.NodePool();
        for (var _i4 = 0; _i4 < this.snowballPos.length; _i4++) {
          this.snowballPos[_i4] = this.node.getComponent("utils").createObj(this.node, this.snowballPos[_i4], this.snowballPrefab, this.snowballPool, true);
          this.snowballIndexList.push(this.node.getComponent("utils").objCollection.length - 1);
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].orgPos = this.snowballPos[_i4].y;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].zIndex = 4;
        }
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
        this.spdUpAmount = 1;
        this.spdUp = false;
        this.snowballSpd = 1;
        this.maxSnowballPerCol = 2;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.snowFlakePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.iglooPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != pos) {
          if (this.spdUp) {
            for (var _i5 = 0; _i5 < this.iceSkatePos.length; _i5++) if (this.iceSkatePos[_i5].x == pos.x && this.iceSkatePos[_i5].y == pos.y) return;
            this.player.moveSpeed -= this.spdUpAmount;
            this.spdUp = false;
          } else for (var i = 0; i < this.iceSkatePos.length; i++) if (this.iceSkatePos[i].x == pos.x && this.iceSkatePos[i].y == pos.y) {
            this.player.moveSpeed += this.spdUpAmount;
            this.spdUp = true;
            this.player.resetCapturedCell();
            return;
          }
          this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, this.player);
        }
        for (var _i6 = 0; _i6 < this.snowballIndexList.length; _i6++) {
          var snowballIndex = this.snowballIndexList[0] + _i6;
          if (this.node.getComponent("utils").checkCollapsed(this.player, this.node.getComponent("utils").objCollection[snowballIndex], this.player.node.width / 2 + this.snowballPrefab.data.width / 2 - 15)) {
            cc.director.loadScene("GameOver");
            return;
          }
          if ((_i6 + 1) % this.maxSnowballPerCol == 0 && this.node.getComponent("utils").objCollection[snowballIndex].y < -this.node.height / 2 - this.snowballPrefab.data.height / 2) for (var j = 0; j < this.maxSnowballPerCol; j++) this.node.getComponent("utils").objCollection[snowballIndex - j].y = this.node.getComponent("utils").objCollection[snowballIndex - j].orgPos;
          this.node.getComponent("utils").objCollection[snowballIndex].y -= this.snowballSpd;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_05: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "4b569GcxL1DSZ/Kq7gyTXMb", "stage_05");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        snowFlakePrefab: {
          default: null,
          type: cc.Prefab
        },
        iglooPrefab: {
          default: null,
          type: cc.Prefab
        },
        iceSkatePrefab: {
          default: null,
          type: cc.Prefab
        },
        snowballPrefab: {
          default: null,
          orgPos: 0,
          dir: 1,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 5;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.snowFlakePool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var snowFlake = cc.instantiate(this.snowFlakePrefab);
          this.snowFlakePool.put(snowFlake);
        }
        var x = -1;
        this.map = [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, x, x, 2, 2, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, x, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, x, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, x, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, 3, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, x, 2, x, x, 2 ];
        this.snowFlakePos = [];
        this.iglooPos = [];
        this.iceSkatePos = [];
        this.snowballPos = [ cc.v2(-5, 11), cc.v2(25, 9), cc.v2(-5, 7), cc.v2(25, 5), cc.v2(-5, 3), cc.v2(25, 1) ];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.iglooPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] ? this.iceSkatePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 3 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.iglooPool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.iglooPos.length; _i2++) this.iglooPos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.iglooPos[_i2], this.iglooPrefab, this.iglooPool, true);
        this.iceSkatePool = new cc.NodePool();
        for (var _i3 = 0; _i3 < this.iceSkatePos.length; _i3++) this.iceSkatePos[_i3] = this.node.getComponent("utils").createObstacle(this.node, this.iceSkatePos[_i3], this.iceSkatePrefab, this.iceSkatePool, true);
        this.snowballIndexList = [];
        this.snowballPool = new cc.NodePool();
        var dirTmp = 1;
        for (var _i4 = 0; _i4 < this.snowballPos.length; _i4++) {
          this.snowballPos[_i4] = this.node.getComponent("utils").createObj(this.node, this.snowballPos[_i4], this.snowballPrefab, this.snowballPool, true);
          this.snowballIndexList.push(this.node.getComponent("utils").objCollection.length - 1);
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].orgPos = this.snowballPos[_i4].x;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].dir = dirTmp;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].zIndex = 4;
          dirTmp *= -1;
        }
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
        this.spdUpAmount = 1;
        this.spdUp = false;
        this.snowballSpd = 2.5;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.snowFlakePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.iglooPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != pos) {
          if (this.spdUp) {
            for (var _i5 = 0; _i5 < this.iceSkatePos.length; _i5++) if (this.iceSkatePos[_i5].x == pos.x && this.iceSkatePos[_i5].y == pos.y) return;
            this.player.moveSpeed -= this.spdUpAmount;
            this.spdUp = false;
          } else for (var i = 0; i < this.iceSkatePos.length; i++) if (this.iceSkatePos[i].x == pos.x && this.iceSkatePos[i].y == pos.y) {
            this.player.moveSpeed += this.spdUpAmount;
            this.spdUp = true;
            this.player.resetCapturedCell();
            return;
          }
          this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, this.player);
        }
        for (var _i6 = 0; _i6 < this.snowballIndexList.length; _i6++) {
          var snowballIndex = this.snowballIndexList[0] + _i6;
          if (this.node.getComponent("utils").checkCollapsed(this.player, this.node.getComponent("utils").objCollection[snowballIndex], this.player.node.width / 2 + this.snowballPrefab.data.width / 2 - 15)) {
            cc.director.loadScene("GameOver");
            return;
          }
          -1 == this.node.getComponent("utils").objCollection[snowballIndex].dir ? this.node.getComponent("utils").objCollection[snowballIndex].x < -this.node.width / 2 - this.snowballPrefab.data.width / 2 && (this.node.getComponent("utils").objCollection[snowballIndex].x = this.node.getComponent("utils").objCollection[snowballIndex].orgPos) : this.node.getComponent("utils").objCollection[snowballIndex].x > this.node.width / 2 + this.snowballPrefab.data.width / 2 && (this.node.getComponent("utils").objCollection[snowballIndex].x = this.node.getComponent("utils").objCollection[snowballIndex].orgPos);
          this.node.getComponent("utils").objCollection[snowballIndex].x += this.snowballSpd * this.node.getComponent("utils").objCollection[snowballIndex].dir;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  stage_06: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f71a6lysIRMHr3C9vXaUGNW", "stage_06");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        background: {
          default: null,
          stage: 0,
          score: 0,
          totalScore: 0,
          type: cc.Node
        },
        snowFlakePrefab: {
          default: null,
          type: cc.Prefab
        },
        iglooPrefab: {
          default: null,
          type: cc.Prefab
        },
        iceSkatePrefab: {
          default: null,
          type: cc.Prefab
        },
        snowballPrefab: {
          default: null,
          orgPos: 0,
          dir: 1,
          type: cc.Prefab
        },
        winGoal: {
          default: null,
          type: cc.Node
        },
        character: {
          default: null,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        cc.game.addPersistRootNode(this.background);
        this.background.zIndex = -1;
        this.background.stage = 6;
        this.player = this.character.getComponent("character");
        this.character.getComponent("character").game = this;
        var size = this.node.getComponent("utils").outlinePool.size();
        this.snowFlakePool = new cc.NodePool();
        for (var i = 0; i < size; i++) {
          var snowFlake = cc.instantiate(this.snowFlakePrefab);
          this.snowFlakePool.put(snowFlake);
        }
        var x = -1;
        this.map = [ 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, x, 2, 2, 2, 2, x, x, x, x, x, x, x, x, 2, 2, 1, x, x, x, 1, x, 1, 1, x, 1, x, 1, 1, 2, 1, x, 1, 1, 2, 1, x, 1, x, 1, x, 1, 1, x, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, x, 1, x, 1, x, x, x, x, 1, 2, 2, 2, 2, x, 2, 2, 2, 2, 2, 2, x, x, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, x, 1, 1, 1, x, 1, 1, 1, x, 1, 1, 1, x, 1, 1, 2, x, x, 1, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 2, x, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, x, x, 1, x, 1, x, 1, x, 1, x, 1, x, 1, x, 1, x, 1, x, 1, x, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 1, 2, 1, 1, 2, x, x, 2, 2, x, x, x, 2, 2, x, x, x, 2, 2, x, x, x, x, 3 ];
        this.snowFlakePos = [];
        this.iglooPos = [];
        this.iceSkatePos = [];
        this.snowballPos_1 = [ cc.v2(3.5, 15), cc.v2(3.5, 22), cc.v2(3.5, 29), cc.v2(8.5, 15), cc.v2(8.5, 22), cc.v2(8.5, 29), cc.v2(13.5, 15), cc.v2(13.5, 22), cc.v2(13.5, 29), cc.v2(18.5, 15), cc.v2(18.5, 22), cc.v2(18.5, 29) ];
        this.snowballPos_2 = [ cc.v2(22, 3) ];
        var maxRow = this.node.getComponent("utils").rowCount;
        var maxCol = this.node.getComponent("utils").colCount;
        var colCount = 0;
        for (var _i = 0; _i < this.map.length; _i++) {
          if (_i == colCount + maxCol) {
            maxRow -= 1;
            colCount += maxCol;
          }
          0 == this.map[_i] ? this.startCell = cc.v2(_i + 1 - colCount, maxRow) : 1 == this.map[_i] ? this.iglooPos.push(cc.v2(_i + 1 - colCount, maxRow)) : 2 == this.map[_i] ? this.iceSkatePos.push(cc.v2(_i + 1 - colCount, maxRow)) : 3 == this.map[_i] && this.winGoal.setPosition(this.node.getComponent("utils").getCellPos(_i + 1 - colCount, maxRow));
        }
        this.iglooPool = new cc.NodePool();
        for (var _i2 = 0; _i2 < this.iglooPos.length; _i2++) this.iglooPos[_i2] = this.node.getComponent("utils").createObstacle(this.node, this.iglooPos[_i2], this.iglooPrefab, this.iglooPool, true);
        this.iceSkatePool = new cc.NodePool();
        for (var _i3 = 0; _i3 < this.iceSkatePos.length; _i3++) this.iceSkatePos[_i3] = this.node.getComponent("utils").createObstacle(this.node, this.iceSkatePos[_i3], this.iceSkatePrefab, this.iceSkatePool, true);
        this.snowballIndexList_1 = [];
        this.snowballPool = new cc.NodePool();
        for (var _i4 = 0; _i4 < this.snowballPos_1.length; _i4++) {
          this.snowballPos_1[_i4] = this.node.getComponent("utils").createObj(this.node, this.snowballPos_1[_i4], this.snowballPrefab, this.snowballPool, true);
          this.snowballIndexList_1.push(this.node.getComponent("utils").objCollection.length - 1);
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].orgPos = this.snowballPos_1[_i4].y;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].zIndex = 4;
        }
        this.snowballIndexList_2 = [];
        var dirTmp = -1;
        for (var _i5 = 0; _i5 < this.snowballPos_2.length; _i5++) {
          this.snowballPos_2[_i5] = this.node.getComponent("utils").createObj(this.node, this.snowballPos_2[_i5], this.snowballPrefab, this.snowballPool, true);
          this.snowballIndexList_2.push(this.node.getComponent("utils").objCollection.length - 1);
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].orgPos = this.snowballPos_2[_i5].x;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].dir = dirTmp;
          this.node.getComponent("utils").objCollection[this.node.getComponent("utils").objCollection.length - 1].zIndex = 4;
        }
        var startPos = this.node.getComponent("utils").getCellPos(this.startCell.x, this.startCell.y);
        this.player.node.setPosition(startPos);
        this.background.score = this.node.getComponent("utils").putObj(this.node, startPos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, null);
        this.background.totalScore = this.node.getComponent("utils").totalScore;
        this.spdUpAmount = 1;
        this.spdUp = false;
        this.snowballSpd = 2.5;
        this.maxSnowballPerCol = 3;
      },
      start: function start() {},
      update: function update(dt) {
        var pos = this.player.checkMovedInCell();
        if (null != this.player.checkHitCapturedCell(this.snowFlakePos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != this.player.checkHitObstacle(this.iglooPos)) {
          cc.director.loadScene("GameOver");
          return;
        }
        if (null != pos) {
          if (this.spdUp) {
            for (var _i6 = 0; _i6 < this.iceSkatePos.length; _i6++) if (this.iceSkatePos[_i6].x == pos.x && this.iceSkatePos[_i6].y == pos.y) return;
            this.player.moveSpeed -= this.spdUpAmount;
            this.spdUp = false;
          } else for (var i = 0; i < this.iceSkatePos.length; i++) if (this.iceSkatePos[i].x == pos.x && this.iceSkatePos[i].y == pos.y) {
            this.player.moveSpeed += this.spdUpAmount;
            this.spdUp = true;
            this.player.resetCapturedCell();
            return;
          }
          this.background.score = this.node.getComponent("utils").putObj(this.node, pos, this.snowFlakePrefab, this.snowFlakePool, this.snowFlakePos, this.player);
        }
        for (var _i7 = 0; _i7 < this.snowballIndexList_1.length; _i7++) {
          var snowballIndex = this.snowballIndexList_1[0] + _i7;
          if (this.node.getComponent("utils").checkCollapsed(this.player, this.node.getComponent("utils").objCollection[snowballIndex], this.player.node.width / 2 + this.snowballPrefab.data.width / 2 - 15)) {
            cc.director.loadScene("GameOver");
            return;
          }
          if ((_i7 + 1) % this.maxSnowballPerCol == 0 && this.node.getComponent("utils").objCollection[snowballIndex].y < -this.node.height / 2 - this.snowballPrefab.data.height / 2) for (var j = 0; j < this.maxSnowballPerCol; j++) this.node.getComponent("utils").objCollection[snowballIndex - j].y = this.node.getComponent("utils").objCollection[snowballIndex - j].orgPos;
          this.node.getComponent("utils").objCollection[snowballIndex].y -= this.snowballSpd;
        }
        for (var _i8 = 0; _i8 < this.snowballIndexList_2.length; _i8++) {
          var _snowballIndex = this.snowballIndexList_2[0] + _i8;
          if (this.node.getComponent("utils").checkCollapsed(this.player, this.node.getComponent("utils").objCollection[_snowballIndex], this.player.node.width / 2 + this.snowballPrefab.data.width / 2 - 15)) {
            cc.director.loadScene("GameOver");
            return;
          }
          -1 == this.node.getComponent("utils").objCollection[_snowballIndex].dir ? this.node.getComponent("utils").objCollection[_snowballIndex].x < -this.node.width / 2 - this.snowballPrefab.data.width / 2 && (this.node.getComponent("utils").objCollection[_snowballIndex].x = this.node.getComponent("utils").objCollection[_snowballIndex].orgPos) : this.node.getComponent("utils").objCollection[_snowballIndex].x > this.node.width / 2 + this.snowballPrefab.data.width / 2 && (this.node.getComponent("utils").objCollection[_snowballIndex].x = this.node.getComponent("utils").objCollection[_snowballIndex].orgPos);
          this.node.getComponent("utils").objCollection[_snowballIndex].x += (this.snowballSpd + 1) * this.node.getComponent("utils").objCollection[_snowballIndex].dir;
        }
      }
    });
    cc._RF.pop();
  }, {} ],
  try_again_button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f3f0eyy+UpCZYkbNUx+p+8q", "try_again_button");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {},
      onLoad: function onLoad() {
        var backgroundNode = cc.find("background");
        this.node.on("touchstart", function() {
          cc.director.loadScene("Stage_0" + backgroundNode.stage);
          cc.game.removePersistRootNode(backgroundNode);
        }, this.node);
        this.node.on("touchmove", function(event) {
          var delta = event.touch.getDelta();
          this.x += delta.x;
          this.y += delta.y;
        }, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  tutorial_button: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "492a6Z5BnBJe54liizQyoTQ", "tutorial_button");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        tutorial_0: {
          default: null,
          isActive: true,
          type: cc.Node
        },
        tutorial_1: {
          default: null,
          isActive: false,
          type: cc.Node
        }
      },
      onLoad: function onLoad() {
        this.tutorial_1.active = false;
        var here = this;
        var endTut = false;
        this.node.on("touchstart", function() {
          if (endTut) cc.director.loadScene("Stage_01"); else {
            here.tutorial_1.active = here.tutorial_1.isActive = !here.tutorial_1.isActive;
            endTut = true;
          }
        }, this.node);
        this.node.on("touchmove", function(event) {
          var delta = event.touch.getDelta();
          this.x += delta.x;
          this.y += delta.y;
        }, this.node);
        this.node.on("touchend", function() {}, this.node);
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  "use_v2.0.x_cc.Toggle_event": [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "f7811KgWW1DQqkapdCFBdRb", "use_v2.0.x_cc.Toggle_event");
    "use strict";
    cc.Toggle && (cc.Toggle._triggerEventInScript_check = true);
    cc._RF.pop();
  }, {} ],
  utils: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "8f0dei9/LdB9b4+M+5RK3bS", "utils");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        outlinePrefab: {
          default: null,
          type: cc.Prefab
        },
        scoreDisplay: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        this.boundLeft = -this.node.width / 2;
        this.boundBot = -this.node.height / 2;
        this.gapX = this.node.width % this.outlinePrefab.data.width / 2;
        this.gapY = this.node.height % this.outlinePrefab.data.height / 2;
        this.outlinePool = new cc.NodePool();
        this.colCount = Math.floor(this.node.width / this.outlinePrefab.data.width);
        this.rowCount = Math.floor(this.node.height / this.outlinePrefab.data.height);
        this.totalScore = this.rowCount * this.colCount;
        for (var i = 0; i < this.totalScore; i++) {
          var outline = cc.instantiate(this.outlinePrefab);
          this.outlinePool.put(outline);
          this.createOutline(this.node, i);
        }
        this.score = 0;
        this.scoreDisplay.zIndex = 3;
        this.objCollection = [];
      },
      getCellPos: function getCellPos(col, row) {
        return cc.v2(this.gapX + this.boundLeft + this.outlinePrefab.data.width / 2 + this.outlinePrefab.data.width * (col - 1), this.gapY + this.boundBot + this.outlinePrefab.data.height / 2 + this.outlinePrefab.data.height * (row - 1));
      },
      createOutline: function createOutline(parentNode, order) {
        var outline = null;
        outline = this.outlinePool.size() > 0 ? this.outlinePool.get() : cc.instantiate(this.outlinePrefab);
        outline.parent = parentNode;
        var row = Math.floor(order / this.colCount);
        var col = order;
        order > this.colCount - 1 && (col = order - this.colCount * row);
        outline.setPosition(this.getCellPos(col + 1, row + 1));
      },
      createObj: function createObj(parentNode, pos, objPrefab, pool, getCellPos) {
        var obj = cc.instantiate(objPrefab);
        pool.put(obj);
        getCellPos && (pos = this.getCellPos(pos.x, pos.y));
        obj = pool.size() > 0 ? pool.get() : cc.instantiate(objPrefab);
        obj.parent = parentNode;
        obj.setPosition(pos);
        obj.zIndex = 1;
        this.objCollection.push(obj);
        return pos;
      },
      createObstacle: function createObstacle(parentNode, pos, objPrefab, pool, getCellPos) {
        this.totalScore -= 1;
        return this.createObj(parentNode, pos, objPrefab, pool, getCellPos);
      },
      putObj: function putObj(parentNode, pos, objPrefab, pool, objPosArray, character) {
        this.createObj(parentNode, pos, objPrefab, pool, false);
        objPosArray.push(cc.v2(pos.x, pos.y));
        this.score += 1;
        this.scoreDisplay.string = "Score: " + this.score + "/" + this.totalScore;
        null != character && character.updateCapturedCell();
        return this.score;
      },
      checkCollapsed: function checkCollapsed(obj_1, obj_2, checkDist) {
        var dis = obj_1.node.position.sub(obj_2.getPosition()).mag();
        return dis < checkDist;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ],
  win: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "fd775mVDYRNwYD3xdD4elDw", "win");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        scoreDisplay: {
          default: null,
          type: cc.Label
        }
      },
      onLoad: function onLoad() {
        var backgroundNode = cc.find("background");
        this.scoreDisplay.string = "SCORE: " + backgroundNode.score + "/" + backgroundNode.totalScore;
      },
      start: function start() {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "character", "continue_button", "current_marker", "fade_in", "fade_out", "gameover", "limiter_-2_dBFS", "limiter_-5_dBFS", "limiter_0_dBFS", "normal_loop", "scenario_A", "scenario_B", "scenario_C", "seamless_loop", "sound_lib", "sound_lib_ts", "stage_01", "stage_02", "stage_03", "stage_04", "stage_05", "stage_06", "try_again_button", "tutorial_button", "utils", "win", "use_v2.0.x_cc.Toggle_event" ]);