$(document).ready(function(){
    $(".SlickCarousel-modal").slick({
      infinite: true,
	dots: true,
	arrows: true,
	autoplay: true,
  autoplaySpeed:3000,
      speed:1000, 
      slidesToShow:3, 
      slidesToScroll:1, 
      pauseOnHover:false,
      appendArrows:$(".featured-product1 .featured-Head1  .featured-Arrows1 "), // Class For Arrows Buttons
      prevArrow:'<span class="Slick-Prev"></span>',
      nextArrow:'<span class="Slick-Next"></span>',
      easing:"linear",
      responsive:[
        {breakpoint:801,settings:{
          slidesToShow:3,
        }},
        {breakpoint:641,settings:{
          slidesToShow:3,
        }},
        {breakpoint:481,settings:{
          slidesToShow:1,
        }},
      ],
    })
  })