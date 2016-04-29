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
    var classNames, socket;
    $('button.motor').click(function(){
    	console.log("hi");
    	if ($(this).hasClass('button_on')) {
    		$(this).removeClass('button_on');
			classNames = $(this).attr('class').split(' ');
			console.log(classNames[classNames.length - 1]);
            socket = io('http://localhost:3000/');
            socket.emit('toggle', { motor: classNames[classNames.length - 1] });
    	} else {
			classNames = $(this).attr('class').split(' ');
			console.log(classNames[classNames.length - 1]);
        	$(this).addClass('button_on');
            socket = io('http://localhost:3000/');
            socket.emit('toggle', { motor: classNames[classNames.length - 1] });
        }
    });

    $('.btn-toggle').click(function() {
        $(this).find('.btn').toggleClass('active');  
        
        if ($(this).find('.btn-primary').size()>0) {
            $(this).find('.btn').toggleClass('btn-primary');
        }
        $(this).find('.btn').toggleClass('btn-default');
       
    });
});

   