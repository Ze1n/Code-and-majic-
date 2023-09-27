var CLOUD_WIDTH = 420;
var CLOUD_HEIGTH = 270;
var CLOUD_X = 150;
var CLOUD_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var barHeight = 150;


var renderCloud = function(ctx, x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGTH);
};

var getMaxElement  = function(arr) {
   var maxElement = arr[0];
   for (var i = 0; i < arr.length; i++) {
        if (maxElement < arr[i]) {
            maxElement = arr[i];
        }
   }

   return maxElement; 
};

window.renderStatistics = function(ctx, players, times) {
    renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, "rgba(0, 0, 0, 0.3)");
    renderCloud(ctx, CLOUD_X, CLOUD_Y, "#fff");
    
    ctx.fillStyle = "#000";

    ctx.font = "16px PTMono";
    ctx.textBaseline = "hanging";
    ctx.fillText("Ура, вы победили!", CLOUD_X + GAP, 2 * GAP);
    ctx.fillText("Список результатов:", CLOUD_X + GAP, 4 * GAP);
    ctx.rectBaseline = "bottom";

    var maxTime = getMaxElement(times);

    for (var i = 0; i < players.length; i++) {
        ctx.fillStyle = "#000";
        ctx.fillText(players[i], CLOUD_X + GAP + i * (GAP + BAR_WIDTH), TEXT_WIDTH + BAR_WIDTH + barHeight + GAP);
        ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + i * (GAP + BAR_WIDTH), TEXT_WIDTH + FONT_GAP + barHeight - (barHeight * times[i] / maxTime));

        if (players[i] == "Вы"){
            ctx.fillStyle = "rgba(255, 0, 0, 1)";
        }
        else {
            ctx.fillStyle = "rgba(0, 0, 255, " +  Math.random() + ")";
        }

        ctx.fillRect(CLOUD_X + GAP + i * (GAP + BAR_WIDTH), barHeight - barHeight * times[i] / maxTime + (TEXT_WIDTH + BAR_WIDTH), CLOUD_Y + GAP, barHeight * times[i] / maxTime);
    }
};
