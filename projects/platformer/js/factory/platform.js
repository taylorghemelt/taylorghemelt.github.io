(function (window) {
    'use strict';
    window.opspark = window.opspark || {};
    let opspark = window.opspark;
    window.opspark.platform = window.opspark.platform || {};
    
    opspark.platform.factory = function (game) {
        game.platforms = game.add.group();
        game.platforms.enableBody = true;
        
        function create(x, y, scaleX, scaleY, immovable) {
            var platform = game.platforms.create(x, y, 'platform');
            platform.scale.setTo(scaleX || 1, scaleY || 1);
            platform.body.immovable = immovable || true;
            return platform;
        }
        opspark.platform.create = create;
    };
})(window);

createPlatform(400, 460);           // normal platform
createPlatform(300, 200, 0.3)       // small horizontal platform (30% the normal width)
createPlatform(500, 500, 0.3, 10)   // tall vertical wall (30% the normal width and 10x the height)