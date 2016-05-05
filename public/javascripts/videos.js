$(document).ready(function(){
    var socket_toggle;
    socket_toggle = io(document.location.protocol+'//'+document.location.host);
    // socket_toggle = io('http://tuftsknockout.herokuapp.com/');
    // socket_toggle = io('http://localhost:3000/');
    $('button.player.player1').click(function(){
        if ($(this).hasClass('button_outline')) {
            $('button.player.player2').addClass('button_outline');
            $(this).removeClass('button_outline');
            socket_toggle.emit('player', { player: 2 });
        } else {
            $('button.player.player2').removeClass('button_outline');
            $(this).addClass('button_outline');
            socket_toggle.emit('player', { player: 1 });
        }
    });
    $('button.player.player2').click(function(){
    	if ($(this).hasClass('button_outline')) {
            $('button.player.player1').addClass('button_outline');
    		$(this).removeClass('button_outline');
            socket_toggle.emit('player', { player: 1 });
    	} else {
        	$('button.player.player1').removeClass('button_outline');
            $(this).addClass('button_outline');
            socket_toggle.emit('player', { player: 2 });
        }
    });
    var classNames;
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
    $('#right-menu').sidr({
      name: 'sidr-right',
      side: 'right',
      source: '#sidr'

    });

    $('#carousel-steps').bind('slid.bs.carousel', function (e) {

        if ($('#carousel-steps li.indicators1').hasClass('active')) {
            console.log("hi");
            $('div.text1').addClass('red_text');
            $('div.text2').removeClass('red_text');
            $('div.text3').removeClass('red_text');
            $('div.text4').removeClass('red_text');
        }
        if ($('#carousel-steps li.indicators2').hasClass('active')) {
            console.log("hi");
            $('div.text1').removeClass('red_text');
            $('div.text2').addClass('red_text');
            $('div.text3').removeClass('red_text');
            $('div.text4').removeClass('red_text');
        }
        if ($('#carousel-steps li.indicators3').hasClass('active')) {
            console.log("hi");
            $('div.text1').removeClass('red_text');
            $('div.text2').removeClass('red_text');
            $('div.text3').addClass('red_text');
            $('div.text4').removeClass('red_text');
        }
        if ($('#carousel-steps li.indicators4').hasClass('active')) {
            console.log("hi");
            $('div.text1').removeClass('red_text');
            $('div.text2').removeClass('red_text');
            $('div.text3').removeClass('red_text');
            $('div.text4').addClass('red_text');
        }
    });


});

   