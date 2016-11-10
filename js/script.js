var $ = require('jquery');

var currentSlide;
var paused = false;
var counter = 0;
var animationend = 'webkitAnimationEnd oanimationend msAnimationEnd animationend';

var Slideshow = {

    init: function() {
        this.initImages();
        this.clickArrow();
        this.keyArrow();
        // this.checkLeftSlide();
    },
    imgs: [{
        name: "Ed Templeton",
        src: "/images/products/24-Gentry-NYC-Stone-Island-Nylon-Windbreaker-6-398_1024x1024.png",
        id: 0,
    }, {
        name: "Lance Mountain",
        src: "/images/products/24-Gentry-NYC-Stone-Island-Nylon-Windbreaker-1-384_1024x1024.png",
        id: 1,
    }, {
        name: "Guy Mariano",
        src: "/images/products/24-Gentry-NYC-Stone-Island-Nylon-Windbreaker-4-399_1024x1024.png",
        id: 2,
    }, {
        name: "Guy Mariano",
        src: "/images/products/24-Gentry-NYC-Stone-Island-Nylon-Windbreaker-5-400_1024x1024.png",
        id: 3,
    }],
    initImages: function() {
        $('#left-slider-img').attr({
            'src': this.imgs[0].src,
            'alt': this.imgs[0].id
        });
        $('#right-slider-img').attr({
            'src': this.imgs[1].src,
            'alt': this.imgs[1].id
        });
    },
    clickArrow: function() {
        var self = this;
        $('.next-arrow').click(self.nextSlide);
        $('.prev-arrow').click(self.prevSlide);
    },
    keyArrow: function() {
        var self = this;
        $("body").keydown(function(e) {
            if (e.keyCode == 39) {
                self.nextSlide();
                // self.checkLeftSlide();
            }
            if (e.keyCode == 37) {
                self.prevSlide();
            }
        });
    },
    currentSlide: function() {
        var currentSlide = parseInt($('#right-slider-img').attr('alt'));
        return currentSlide;
    },
    checkLeftSlide: function() {
        var $lefty = parseInt($('#left-slider-img').attr('alt'));
        if ($lefty !== 0) {
            $('#left-slider-img').addClass('full-size');
        } else {
            $('#left-slider-img').removeClass('full-size');
        }
    },
    cycleImgHeight: function() {
      var $rightSlideIndex = parseInt($('#right-slider-img').attr('alt'));
      counter = counter + 1;
      if(counter >= this.imgs.length - 1){
        counter = 0;
      }
      counter = counter + 1;
      var sizeClass = ['full-size','medium','small'];
      $('#right-slider-img').removeClass('full-size medium small');
      if($rightSlideIndex !== 1){
        $('#right-slider-img').addClass(sizeClass[counter])
      }
    },
    nextSlide: function() {
        var self = this;
        var $leftImage = $('#left-slider-img');
        var $rightImage = $('#right-slider-img');

        if (paused === true) { return; }
        paused = true;

        currentSlide = parseInt($rightImage.attr('alt'));
        var currentSlideSrc = $rightImage.attr('src');

        $leftImage.addClass('slide-left').one(animationend, function(){
          self.checkLeftSlide();
          $(this).attr( {'src': currentSlideSrc,'alt': currentSlide} );
          $(this).addClass('fade-in-do')
          $(this).removeClass('slide-left');
          $(this).one(animationend, function(e){
            $(this).removeClass('fade-in-do');
          })
        })

        currentSlide++;

        if (currentSlide >= Slideshow.imgs.length) {
            currentSlide = 0;
        }

        var nextSrc = Slideshow.imgs[currentSlide].src;
        $rightImage.addClass('slide-left').one(animationend, function(){
          $(this).attr( {'src': nextSrc,'alt': currentSlide} );
          $(this).addClass('fade-in-do')
          $(this).removeClass('slide-left');
          self.cycleImgHeight();
          $(this).one(animationend, function(e){
            $(this).removeClass('fade-in-do');
            paused = false;
          })
        })

        // this.cycleImgHeight();
    },
    prevSlide: function() {

        currentSlide = parseInt($('#right-slider-img').attr('alt'));
        var $leftSlide = $('#left-slider-img');
        var $rightSlide = $('#right-slider-img');
        if (currentSlide === 0) {
            currentSlide = Slideshow.imgs.length - 1;
        } else {
            currentSlide--;
        }
        var newSrc = Slideshow.imgs[currentSlide].src;
        $rightSlide.attr({
            'src': newSrc,
            'alt': currentSlide
        });
        if (currentSlide === 0) {
            currentSlide = Slideshow.imgs.length - 1;
        } else {
            currentSlide--;
        }
        $leftSlide.attr({
            'src': Slideshow.imgs[currentSlide].src,
            'alt': currentSlide
        })
        this.cycleImgHeight();
    },
    changeSize: function() {

    }

}

Slideshow.init();

// $leftImage.attr( {'src': currentSlideSrc,'alt': currentSlide} );
// $leftImage.addClass('fade-in');
// $leftImage.one(animationend, function(e) {
//         $leftImage.removeClass('fade-in-do');
//     });
// $rightImage.attr( {'src': nextSrc,'alt': currentSlide} );
// $rightImage.addClass('fade-in');
// $rightImage.one(animationend, function(e) {
//         $rightImage.removeClass('fade-in');
//         paused = false;
//     });
