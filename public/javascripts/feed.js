// Array for feed images
var imgArray = ['https://ribbonaroundabomb.files.wordpress.com/2013/06/hipster-art-three-of-the-possessed.jpg',
                'https://41.media.tumblr.com/dec02412e0834d4a0d7f5f518cde3ab1/tumblr_mf0e9t1dGp1rhrqzqo1_1280.jpg',
                'https://s-media-cache-ak0.pinimg.com/564x/24/3d/c2/243dc20dd6d5b00f713de85458182537.jpg',
                'http://s5.favim.com/610/69/Favim.com-hot-art-beautiful-black-633061.jpg',
                'http://favim.com/610/201108/24/Favim.com-black-black-and-white-cute-girl-hair-129749.jpg',
                'http://artfucksme.com/wp-content/uploads/2015/04/gia3.jpg',
                'https://d13yacurqjgara.cloudfront.net/users/464297/screenshots/1849217/dribbb2-01_1x.jpg',
                'http://animalnewyork.com/wp-content/uploads/glitch-pillows.jpg',
                'https://i.ytimg.com/vi/l8gT1KywQpU/maxresdefault.jpg',
                'https://s-media-cache-ak0.pinimg.com/736x/7e/fe/f0/7efef0e2ba68011139130b19ff6aaf87.jpg',
                'https://i.ytimg.com/vi/UsfhWF6mE7A/maxresdefault.jpg',
                'https://s-media-cache-ak0.pinimg.com/236x/89/da/4c/89da4cd694aa1a134a8db877f68517b9.jpg',
                'http://wallpapers.wallhaven.cc/wallpapers/full/wallhaven-326146.jpg',
                'https://cdn-img-2.wanelo.com/p/eb6/752/4fa/2b3876bbab34d77bac4d463/x354-q80.jpg',
                'http://s2.favim.com/orig/30/amazing-astronaut-beautiful-earth-hipster-Favim.com-245303.jpg',
                'https://s-media-cache-ak0.pinimg.com/236x/fd/5b/1c/fd5b1c54cb4f4fd484c0a27e6a1885de.jpg',
                'https://s-media-cache-ak0.pinimg.com/736x/06/7f/a1/067fa1766c1e02258e9bb751460a47bd.jpg',
                'https://pbs.twimg.com/media/Ce0fLfjUAAAQbs8.jpg',
                'http://wallup.net/wp-content/uploads/2016/01/239135-No_Mans_Sky-video_games-pixel_art-fan_art-736x459.jpg',
                'http://cdn.arenabg.com/resize/500/-/var/assets/posters/2013-05/ea31966a0c2e34bd6982873170f36cc79bdf31e7.jpg',
                'http://static.giantbomb.com/uploads/original/3/35099/2184043-fez9.jpg',
                'https://pbs.twimg.com/media/Ce7EjAZVAAEmq0K.jpg',
                'http://www.heart-machine.com/wp-content/uploads/2015/01/HLD_Screenshot_01_rise_1080.png',
                'http://designbent.com/wp-content/uploads/2013/05/The_Connection.jpg',
                'http://cache.spreadshirt.net/Public/submissions/lafraise/785/106785.jpg',
                'http://images.wookmark.com/156306_tumblr_mcebl1vava1r46py4o1_1280.jpg',
                'https://s-media-cache-ak0.pinimg.com/736x/03/37/0c/03370c885c0ef23326cb667a3637b0af.jpg',
                'http://media-cache-ak0.pinimg.com/736x/2a/4c/4b/2a4c4b85a760a54dbd68f253199cbbe4.jpg',
                'http://fraghero.com/wp-content/uploads/2016/02/7-6.jpg',
                'https://fat.gfycat.com/SaltyLavishIndianrhinoceros.gif','',
                'https://seesouthernstars.files.wordpress.com/2015/06/porkey.jpg'];

// Loop for placing the images into the divs on the page
for(var i=0;i<imgArray.length;i++) {

    // Changing height to width ratio of div based on the ratio of the image - SIZING NOT WORKING 100%
    var img = new Image();
    img.src = imgArray[i];
    if((img.width / img.height) > 1.2) {$('.image').eq(i).addClass('wide')}
    else if((img.width / img.height) < 0.8333) {$('.image').eq(i).addClass('long')}
    else {$('.image').eq(i).addClass('square')}; // Fallback to normal square

    // Setting the Background image
    $('.image').eq(i).css('background-image', 'url("'+imgArray[i]+'")');
};

// Load More images function - NOT WORKING PROPERLY WITH THE SIZING
$('.load-button').click(function(){
    for(var j = 1; j < 4; j++){
        var imageNum = $('.image').length; // Getting total number of images on the page.

        for(var i = 1; i < 4; i++){
            var thisImageNum = imageNum + i;
            $('.image-column.'+i).append('<div class="rela-block image '+thisImageNum+'"></div>'); 

            var img = new Image();
            img.src = imgArray[thisImageNum - 1];
            if((img.width / img.height) > 1.2) {$('.image.'+thisImageNum).addClass('wide')}
            else if((img.width / img.height) < 0.8333) {$('.image.'+thisImageNum).addClass('long')}
            else {$('.image.'+thisImageNum).addClass('square')};

            // Setting the Background image
            $('.image.'+thisImageNum).css('background-image', 'url("'+imgArray[thisImageNum - 1]+'")');
        };
    };
    return false;
});

// Image Layout Switching Function
$('.layout-option').click(function(){
    $('.layout-option').removeClass('active');
    $(this).addClass('active');
    $(this).hasClass('rows')?$('.image-column').addClass('rows'):$('.image-column').removeClass('rows');
    return false;
});

// Display Image function
// Click function written this way due to dynamically added images
$('.image-grid-container').on('click', '.image', function() {
    
    // get the url image clicked
    var thisBG = $(this).css('background-image');
    
    //assign background to the pop-up and display
    $('.photo-tab').css('background',thisBG+' center no-repeat');
    $('.photo-container').addClass('displayed');
    return false;
});

// closing the menu-overlay
$('.close, .photo-container').click(function(){ 
    $('.photo-tab').css('background','none');
    $('.photo-container').removeClass('displayed'); return false;
});
// preventing clicks on the menu closing it for now because there is nothing inside yet.
$('.photo-tab').click(function(){ return false; }); 