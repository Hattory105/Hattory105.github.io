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
  HelloWorld: [ function(require, module, exports) {
    "use strict";
    cc._RF.push(module, "280c3rsZJJKnZ9RqbALVwtK", "HelloWorld");
    "use strict";
    cc.Class({
      extends: cc.Component,
      properties: {
        label: {
          default: null,
          type: cc.Label
        },
        text: "Hello, World!",
        adSpot: "unique_ad_1",
        isReady: false,
        iNumberPress: 0
      },
      cacheAds: function(_cacheAds) {
        function cacheAds() {
          return _cacheAds.apply(this, arguments);
        }
        cacheAds.toString = function() {
          return _cacheAds.toString();
        };
        return cacheAds;
      }(function() {
        console.log("calling cache Jio Ad");
        false == this.isReady && VMAX.cacheAd(this.adSpot);
        VMAX.onAdReady = function(AdPlacementId) {
          if (AdPlacementId == this.adSpot) {
            this.isReady = true;
            console.log("VMAX: onAdReady adSpot");
          }
          console.log("VMAX: onAdReady");
        };
        VMAX.onAdError = function(AdPlacementId, errorCode) {
          console.log("VMAX: onAdError: ", errorCode);
          if (AdPlacementId == this.adSpot) {
            this.isReady = false;
            console.log("VMAX: onAdError adSpot");
          }
        };
        VMAX.onAdClose = function(AdPlacementId) {
          console.log("onAdClose");
          this.isReady = false;
          setTimeout(function() {
            console.log("VMAX: onAdClose");
            cacheAds();
          }, 3e3);
        };
      }),
      showAds: function showAds() {
        true == this.isReady && VMAX.showAd(this.adSpot);
      },
      onKeyDown1: function onKeyDown1(event) {
        console.log("---TL, onKeyDown iNumberPress: " + this.iNumberPress);
        console.log("---TL, onKeyDown keyCode1: " + event.keyCode);
        console.log("---TL, onKeyDown keyCode2: " + event["which"]);
      },
      onLoad: function onLoad() {
        var _this = this;
        this.label.string = this.text;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown1, this);
        document.addEventListener("keydown", function(event) {
          console.log("---TL, onKeyDown2 iNumberPress: " + _this.iNumberPress);
          console.log("---TL, onKeyDown2 keyCode1: " + event.keyCode);
          console.log("---TL, onKeyDown2 keyCode2: " + event["which"]);
          switch (event.keyCode) {
           case 53:
           case 13:
            _this.iNumberPress++;
            if (2 == _this.iNumberPress) {
              console.log("---TL, iNumberPress == 2");
              _this.cacheAds();
            }
            if (4 == _this.iNumberPress) {
              console.log("---TL, iNumberPress == 4");
              _this.showAds();
              _this.iNumberPress = 0;
            }
          }
        });
      },
      update: function update(dt) {}
    });
    cc._RF.pop();
  }, {} ]
}, {}, [ "HelloWorld" ]);