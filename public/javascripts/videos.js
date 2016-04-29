$(document).ready(function(){
    $('button.player.player1').click(function(){
        if ($(this).hasClass('button_outline')) {
            $('button.player.player2').addClass('button_outline');
            $(this).removeClass('button_outline');
        } else {
            $('button.player.player2').removeClass('button_outline');
            $(this).addClass('button_outline');
        }
    });
    $('button.player.player2').click(function(){
    	if ($(this).hasClass('button_outline')) {
            $('button.player.player1').addClass('button_outline');
    		$(this).removeClass('button_outline');
    	} else {
        	$('button.player.player1').removeClass('button_outline');
            $(this).addClass('button_outline');
        }
    });
    var classNames, socket_toggle;
    // socket_toggle = io('http://tuftsknockout.herokuapp.com/');
    socket_toggle = io('http://localhost:3000/');
    $('button.motor').click(function(){
    	console.log("hi");
    	if ($(this).hasClass('button_on')) {
    		$(this).removeClass('button_on');
			classNames = $(this).attr('class').split(' ');
			console.log(classNames[classNames.length - 1]);
            socket_toggle.emit('toggle', { motor: classNames[classNames.length - 1] });
    	} else {
			classNames = $(this).attr('class').split(' ');
			console.log(classNames[classNames.length - 1]);
        	$(this).addClass('button_on');
            socket_toggle.emit('toggle', { motor: classNames[classNames.length - 1] });
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

   