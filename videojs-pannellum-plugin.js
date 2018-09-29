/*
 * Video.js plugin for Pannellum
 * Copyright (c) 2015-2018 Matthew Petroff
 * MIT License
 */

(function(document, videojs, pannellum) {
'use strict';

videojs.plugin('pannellum', function(config) {
    // Create Pannellum instance
    var player = this;
    var container = player.el();
    var vid = container.getElementsByTagName('video')[0],
        pnlmContainer = document.createElement('div');
    config = config || {};
    config.type = 'equirectangular';
    config.dynamic = true;
    config.showZoomCtrl = false;
    config.showFullscreenCtrl = false;
    config.autoLoad = true;
    config.panorama = vid;
    // config.autoRotate = 7.51095 * 3;
    // config.autoRotate = 15;
    config.autoRotate = 720 / 25.93;
    config.hfov = 65;
    config.pitch = 30;
    // config.yaw = -180;
    pnlmContainer.style.visibility = 'hidden';
    player.pnlmViewer = pannellum.viewer(pnlmContainer, config);
    container.insertBefore(pnlmContainer, container.firstChild);
    vid.style.display = 'none';
    // var vidlength = 25.93;
    var vidlength = 0;
    var lasttime = 0;

    // Handle update settings
    player.on('play', function() {
        // player.pnlmViewer.setYaw(-180, false);
        if (vid.readyState > 1)
            player.pnlmViewer.setUpdate(true);
    });
    player.on('canplay', function() {
        // vidlength = player.duration();
        // player.pnlmViewer.startAutoRotate(720/vidlength);
        if (!player.paused())
            player.pnlmViewer.setUpdate(true);
    });
    player.on('pause', function() {
        player.pnlmViewer.setUpdate(false);
    });
    player.on('loadeddata', function() {
        pnlmContainer.style.visibility = 'visible';
    });
    player.on('seeking', function() {
        if (player.paused())
            player.pnlmViewer.setUpdate(true);
    });
    player.on('seeked', function() {
        if (player.paused())
            player.pnlmViewer.setUpdate(false);
    });
    player.on('ended', function() {
        // player.pnlmViewer.stopAutoRotate();
        // pnlmContainer.style.visibility = 'hidden';
    });
    // player.on('timeupdate', function() {
        // var curtime = player.currentTime();
        // var yaw = (((curtime / vidlength) * 720) % 360)-180;
        // console.log([curtime, vidlength, yaw]);
        // if (yaw && isFinite(yaw)) {
        //     // player.pnlmViewer.setYaw(yaw, (curtime-lasttime)*1000);
        // }
        // lasttime = curtime;
    // });
});

})(document, videojs, pannellum);