"use strict";
var $coin = $('.coin'),
    coinSide = 0,
    sideMax = 1,
    sideMin = 0;

var infoText = {
    "block": $('.info'),
    "0": 'Push this coin to spin it.',
    "1": 'Processing...'
}

$coin.on('click',function(){
    if ( $coin.hasClass('clickable') ){
        $coin.removeClass('clickable');
        $(infoText.block).html(infoText["1"]);
        var oldSide = Math.floor($coin.attr("data-coin"));
        var newSide = Math.floor(Math.random() * (sideMax - sideMin + 1)) + sideMin;
        
        if (newSide == 1){
            var animaPos = 0;
            var anima = setInterval(function(){
                animaPos = Math.floor(animaPos) - 128;
                $coin.css("background-position", animaPos + "px 0");
                if (animaPos <= -1408) {
                    clearInterval(anima);
                    $coin.addClass('clickable');
                    $(infoText.block).html(infoText["0"]);
                }
            },20);
        }else{
            var animaPos = -1408;
            var anima = setInterval(function(){
                animaPos = Math.floor(animaPos) + 128;
                $coin.css("background-position", animaPos + "px 0");
                if (animaPos >= 0) {
                    clearInterval(anima);
                    $coin.addClass('clickable');
                    $(infoText.block).html(infoText["0"]);
                }
            },20);
        }
//            $coin.attr("data-coin",coinSide);
//            
    }
});