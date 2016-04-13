$(document).ready(function(){
    $('button.player.player1').click(function(){
    	if ($(this).hasClass('button_outline')) {
    		$(this).removeClass('button_outline');
    	} else {
        	$(this).addClass('button_outline');
        }
        if($('button.player.player2').hasClass('button_outline')) {
        	$('button.player.player2').removeClass('button_outline');
        }
    });
    $('button.player.player2').click(function(){
    	if ($(this).hasClass('button_outline')) {
    		$(this).removeClass('button_outline');
    	} else {
        	$(this).addClass('button_outline');
        }
        if($('button.player.player1').hasClass('button_outline')) {
        	$('button.player.player1').removeClass('button_outline');
        }
    });
    $('button.motor').click(function(){
    	console.log("hi");
    	if ($(this).hasClass('button_on')) {
    		$(this).removeClass('button_on');
    	} else {
        	$(this).addClass('button_on');
        }
    });
});

   