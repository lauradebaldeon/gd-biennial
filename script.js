var ll = new LazyLoad();

function loadEverything(){

$.getJSON('everything.json', function(data) {
  $.ajaxSetup({async:false});
  let html = "";

  $.each(data, function(i, work){
      html += `
      <div class="grid_element">
          <div class="work_container">
              <div class="hero">
                  <img src="everything/${work.hero}"/>
              </div>
              <div class="supporting">
                  <div class="description">
                    <h1>${work.title}</h1>
                    <h3>${work.name}</h3>
                    <h3>Class of ${work.class}</h3>
                    <p>${work.descrip}</p>`;
      if(work.link !== undefined) {
        html+=`<p><a href="${work.link}" target="_blank">View Online</a></p>`;
      }

      html+=`</div><div class="work_images">`;

      var images = Object.values(work);
      for(i=5;i<9;i++) {
        let image = (images[i]);
        if(image == undefined || image.match(/^http/)) {
          break;
        }
        if(!image.match(/^</)) {
          html += `<div class="work_image">
          <img class="lazy" data-src="everything/${image}"/>
          </div>`
        } else {
          html+= `<div class="work_image video">
          ${image}
          </div>`;
        }
      }
      html+= "</div></div></div></div>";

  });

  html+= `<div class="grid_element blank"></div><div class="grid_element blank desk"></div><div class="grid_element blank desk"></div>`;

  // if(!data.length%4 === 0) {
  //   for(j=0; j<4-(data.length%4); j++) {
  //     html+= `<div class="grid_element blank"></div>`;
  //   }
  // }

  $(".grid").append(html);
  ll.update();

  let scrollTrack = [];

  //listener to open grid to fullview
  $('.grid_element').click(function() {
    if($(".drawer").hasClass("opened")) {
      $(".drawer").removeClass("opened");
    } 
    
    if(!$(".grid").hasClass("opened")) {
        scrollTrack.push($(".content-inner").scrollTop());
        openElement($(this));
        setTimeout(function() {
          $(".content-inner").animate({scrollTop: 0}, 100);
        }, 400);
    }


  });

  //listener to close fullview
  $(document).on('click', '.close', function(){ 
    closeElements();
    $(".content-inner").animate({scrollTop: scrollTrack[0]}, 500);
    scrollTrack.splice(-1,1);
  });

isReady=0;

});

}

//end JSON-everything import and interactions
let isReady=0;
let counter=0;
let dragCounter=0;
let angleTrack = [];
let insertHere = document.createDocumentFragment();

function loadNothing(){
$.getJSON('nothing.json', function(data) {
  $.ajaxSetup({async:false});

    // let html = "";
    $.each(data, function(j, post){
      let calcWidth=95;
      let thisWidth=Math.floor(Math.random()*calcWidth);
      let calcHeight=800;
      let thisHeight=Math.floor(Math.random()*calcHeight);
      let randomAngle = Math.random() * 10;
      let randomControl = Math.random();
 
      let picContainer = document.createElement("div");
      picContainer.id=j;
      picContainer.className = "nothing-images";
      let pic = document.createElement("div");
      pic.className = "nothing-front";
      pic.innerHTML = `<img class="img" src="nothing/${post.image}"/>`;

      picContainer.appendChild(pic);

      let cap = document.createElement("div");
      cap.className = "nothing-back";
      cap.innerHTML = `<p>${post.caption}</p>`;

      picContainer.appendChild(cap);

      $(picContainer).css({
        "left":"" + thisWidth + "%","top":"" + thisHeight + "vh"
      });
      if (randomControl >0.5) {
        $(picContainer).css("transform", `rotate(${randomAngle}deg) rotateY(0deg)`);
        angleTrack.push(randomAngle);
      } else {
        $(picContainer).css("transform", `rotate(-${randomAngle}deg) rotateY(0deg)`);
        angleTrack.push(randomAngle);
      }

      insertHere.appendChild(picContainer);
    });

  $("#nothing-container").append(insertHere);
  
  $(".nothing-images").draggable({
    start: function() {
      dragCounter++;
      $(this).addClass("dragged").css({"z-index":""+dragCounter+""});
    }
  }).on("click", function() {
    dragCounter++;
    $(this).addClass("dragged").css({"z-index":""+dragCounter+""});

    if($(this).is(".ui-draggable-dragging")) {
      return;
    } else {
      if(!$(this).find(".nothing-back").is(":visible") == true) {
        $(this).find(".nothing-back").slideDown(300);
      } else {
        $(this).find(".nothing-back").slideUp(300);
      }
 
    }

    isReady=1;

  })
  

}); //end JSON—nothing import and interactions
}

var dragnavHeight, contentHeight, contentOffset;
const mq = window.matchMedia("(max-width: 768px)");

$(document).ready(function() {

  loadEverything();

  loadNothing();

  dynamicSizing();


 //change nav color on hover if not current section
 $(".e-svg").hover(function() {
   if(!$(".flip-card").hasClass("e")) {
     $(this).addClass("hovering");
   }
 }, function() {
   $(this).removeClass("hovering");
 })

 $(".n-svg").hover(function() {
  if(!$(".flip-card").hasClass("n")) {
    $(this).addClass("hovering");
  }
}, function() {
  $(this).removeClass("hovering");
})

//click navigation interaction——————————————————————
$(".nav-nothing").click(function() {
  $('.drawer').removeClass("opened");
  if(!$(".flip-card").hasClass("n")) {
    $(".dragbox").addClass("n");
    $(".flip-card").removeClass("e");
    $(".flip-card").addClass("n");
    $(".nav-svg").removeClass("hovering");
    $(".nothing-back").hide();
  } 
});

$(".nav-everything").click(function() {
  $('.drawer').removeClass("opened");
  if(!$(".flip-card").hasClass("e")) {
    $(".dragbox").removeClass("n");
    $(".flip-card").addClass("e");
    $(".flip-card").removeClass("n");
    $(".nav-svg").removeClass("hovering");

    closeElements();
    $(".content-inner").animate({scrollTop: 0}, 100);
  }

});

//mobi about/programming nav—————————————————
$(".hamburger").click(function() {
  $(".mobi.span").css("color", "#000");
    if(!$(".flip-nav").hasClass("a_p")) {
      $(".flip-nav").removeClass("risd_gd");
      $(".flip-nav").addClass("a_p");
    } else {
      $(".flip-nav").removeClass("a_p");
      $(".flip-nav").addClass("risd_gd");
    }
    $(".programming, .about").removeClass("opened");
});

//mobi drawer pullout——————————————
$("#about").click(function() {
  $(".mobi.span").css("color", "#000");
    $(".programming").removeClass("opened");
    if(!$(".about").hasClass("opened")) {
      $(this).css("color", "#BAAAFE");
      $(".about").addClass("opened");
    } else {
      $(this).css("color", "#000");
      $(".about").removeClass("opened");
    }
    $(".pullout-content").animate({scrollTop: 0}, 300);
});

$("#programming").click(function() {
  $(".mobi.span").css("color", "#000");
  $(".about").removeClass("opened");
  if(!$(".programming").hasClass("opened")) {
    $(this).css("color", "#BAAAFE");
    $(".programming").addClass("opened");
  } else {
    $(this).css("color", "#000");
    $(".programming").removeClass("opened");
  }
  $(".pullout-content").animate({scrollTop: 0}, 300);
})

//desktop drawer pullout————————————
$(".spine").click(function() {
  let thisPullout = $(this).closest(".drawer");
  if($(thisPullout).hasClass("opened")) {
    $(thisPullout).removeClass("opened");
  } else {
    $('.drawer').removeClass("opened");
    $(".pullout-content").animate({scrollTop: 0}, 100);
    $(thisPullout).addClass("opened");
  }
});




}); //end document ready

$(window).resize(function() {

  if(mq.matches) {
    dragnavHeight = $(".mobi-nav").height();
    $(".desk").hide();
    $(".mobi").show();
  } else {
    dragnavHeight = $(".desk-nav").height();
    $(".mobi").hide();
    $(".desk").show();
  }
  //dynamic sizing of nav and footer areas
  $(".dragbox, .footer, .nav-container").height(dragnavHeight);

  //dynamic sizing of content area to match nav, currently with 15px margin on either side
  var contentHeight = $(window).height()-(dragnavHeight*2)-35;
  $(".content").height(contentHeight);
  var contentOffset = $(".dragbox").height() + 15;
  $(".content").css("top", contentOffset);


    // counter++;
    // checkWidth(cWidth);
});

function openElement(that) {
    $(".grid_element").removeClass("active");    
    $(".grid_element").addClass("inactive");
    $(that).removeClass("inactive");
    $(that).addClass("active");
    $(".fullview").show();
    $(".fullview").fadeTo(500, 1);
    setTimeout(function() {
      $(that).find(".supporting").show();
    }, 500);
    $(".grid").addClass("opened");
}

function closeElements() {
  $(".supporting").hide(); 
  $(".fullview").hide(); 
  $(".grid_element").removeClass("active");
  $(".grid_element").removeClass("inactive");
  $(".grid").removeClass("opened");
}

function intoView(){
  $(".dragged").each(function(){
    let calcWidth=95;
    let thisWidth=Math.floor(Math.random()*calcWidth);
    let calcHeight=300;
    let thisHeight=Math.floor(Math.random()*calcHeight);
    $(this).css({"left":"" + thisWidth + "%"});
  })
}



// let cWidth = window.matchMedia("(max-width: 600px)")
// checkWidth(cWidth);

// function checkWidth(cWidth) {
//   console.log("checking");

//   if (cWidth.matches) { // If media query matches
//     $(".nothing-images").removeAttr("style");
//   } else{
//     counter++;
//     if(counter<2){
//     setPos();
//     $(".nothing-images").removeClass("dragged");
//   }
//   }
// }

// function setPos(){
//   $(".nothing-images").each(function(){
//     let calcWidth=95;
//     let thisWidth=Math.floor(Math.random()*calcWidth);
//     let calcHeight=300;
//     let thisHeight=Math.floor(Math.random()*calcHeight);
//     $(this).css({"left":"" + thisWidth + "%","top":"" + thisHeight + "vh","position":"absolute"});
//   })
// }

// let resizeTimer;

// $(window).on('resize', function(e) {

//   clearTimeout(resizeTimer);
//   resizeTimer = setTimeout(function() {
//     console.log("resizing stopped");
//     counter=0;
//   }, 300);

// });


function dynamicSizing(){

  if(isReady=1){
  if(mq.matches) {
    dragnavHeight = $(".mobi-nav").height();
    $(".desk").hide();
    $(".mobi").show();
  } else {
    dragnavHeight = $(".desk-nav").height();
    $(".mobi").hide();
    $(".desk").show();
  }

  //dynamic sizing of nav and footer areas
  $(".dragbox, .footer, .nav-container").height(dragnavHeight);

  //dynamic sizing of content area to match nav, currently with 15px margin on either side
  var contentHeight = $(window).height()-(dragnavHeight*2)-35;
  $(".content").height(contentHeight);
  var contentOffset = $(".dragbox").height() + 15;
  $(".content").css("top", contentOffset);
} else {
  $(".desk").hide();
  $(".mobi").hide();
}
  }