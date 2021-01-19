$.getJSON('everything.json', function(data) {
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
          <img class="img" src="everything/${image}"/>
          </div>`
        } else {
          html+= `<div class="work_image video">
          ${image}
          </div>`;
        }
      }
      html+= "</div></div></div></div>";
  });


  if(!data.length%4 == 0) {
    for(j=0; j<4-(data.length%4); j++) {
      html+= `<div class="grid_element blank"></div>`;
    }
  }

  $(".grid").append(html);

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

});  //end JSON-everything import and interactions

let counter=0;
let dragCounter=0;
let angleTrack = [];
let insertHere = document.createDocumentFragment();

// $.getJSON('test-n.json', function(data) {
//     // let html = "";
//     $.each(data, function(j, post){
//       let calcWidth=95;
//       let thisWidth=Math.floor(Math.random()*calcWidth);
//       let calcHeight=100;
//       let thisHeight=Math.floor(Math.random()*calcHeight);
//       let randomAngle = Math.random() * 10;
//       let randomControl = Math.random();
 
//       let picContainer = document.createElement("div");
//       picContainer.id=j;
//       picContainer.className = "nothing-images";
//       let pic = document.createElement("div");
//       pic.className = "nothing-front";
//       pic.innerHTML = `<img src=nothing/${post.image}/>`;

//       picContainer.appendChild(pic);

//       let cap = document.createElement("div");
//       cap.className = "nothing-back";
//       cap.innerHTML = `<p>${post.caption}</p>`;

//       picContainer.appendChild(cap);

//       $(picContainer).css({
//         "left":"" + thisWidth + "%","top":"" + thisHeight + "vh"
//       });
//       if (randomControl >0.5) {
//         $(picContainer).css("transform", `rotate(${randomAngle}deg) rotateY(0deg)`);
//         angleTrack.push(randomAngle);
//       } else {
//         $(picContainer).css("transform", `rotate(-${randomAngle}deg) rotateY(0deg)`);
//         angleTrack.push(randomAngle);
//       }

//       insertHere.appendChild(picContainer);
//     });

//   $("#nothing-container").append(insertHere);
  
//   $(".nothing-images").draggable({
//     start: function() {
//       dragCounter++;
//       $(this).addClass("dragged").css({"z-index":""+dragCounter+""});
//     }
//   }).on("click", function() {
//     if ( $(this).is('.ui-draggable-dragging') ) {
//       return;
//     }
//     console.log("clicked");
//     let thisIndex = $(this).attr("id");

//     if(!$(this).hasClass("p") && !$(this).hasClass("c")) {
//       $(this).addClass("p");
//     }

//     if($(this).hasClass("p")) {
//       $(this).css("transform", `rotate(-${angleTrack[thisIndex]}deg) rotateY(180deg)`);
//       $(this).removeClass("p");
//       $(this).addClass("c");
//     } else {
//       console.log("clicking");
//       $(this).css("transform", `rotate(${angleTrack[thisIndex]}deg) rotateY(0deg)`);
//       $(this).removeClass("c");
//       $(this).addClass("p");
//     }
//   });


  //click-flip interaction: won't work without container div bc these already have a transform applied
  // $(".nothing-front, .nothing-back").click(function() {
    // let thisIndex = $(this).closest(".nothing-images").attr("id");
    // console.log(thisIndex);

    // if($(this).hasClass("nothing-front")) {
    //   console.log("front");
    //   $(this).closest(".nothing-images").css("transform", `rotate(${angleTrack[thisIndex]}deg) rotateY(180deg)`);
    // } else {
    //   console.log("back");
    //   $(this).closest(".nothing-images").css("transform", `rotate(${angleTrack[thisIndex]}deg) rotateY(0deg)`);
    // }

  // });

// }); 
//end JSON—nothing import and interactions

$(document).ready(function() {

  //dynamic sizing of nav and footer areas
  var dragnavHeight = $(".nav-svg").height();
  $(".dragbox, .footer").height(dragnavHeight);

  //dynamic sizing of content area to match nav, currently with 15px margin on either side
  var contentHeight = $(window).height()-(dragnavHeight*2)-35;
  $(".content").height(contentHeight);
  var contentOffset = $(".dragbox").height() + 15;
  $(".content").css("top", contentOffset);

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
  if(!$(".flip-card").hasClass("n")) {
    $(".dragbox").addClass("n");
    $(".flip-card").removeClass("e");
    $(".flip-card").addClass("n");
    $(".nav-svg").removeClass("hovering");
  } 
});

$(".nav-everything").click(function() {
  if(!$(".flip-card").hasClass("e")) {
    $(".dragbox").removeClass("n");
    $(".flip-card").addClass("e");
    $(".flip-card").removeClass("n");
    $(".nav-svg").removeClass("hovering");

    closeElements();
    $(".content-inner").animate({scrollTop: 0}, 100);
  }

});


//drawer pullout interaction
$(".spine").click(function() {
  let thisPullout = $(this).closest(".drawer");
  if($(thisPullout).hasClass("opened")) {
    $(thisPullout).removeClass("opened");
  } else {
    $('.drawer').removeClass("opened");
    $(thisPullout).addClass("opened");
  }
});



}); //end document ready

$(window).resize(function() {
  dragnavHeight = $(".nav-everything").height();
  $(".dragbox").height(dragnavHeight - dragnavHeight * 0.1);
  contentHeight = $(window).height()-(dragnavHeight*2);
  $(".content").height(contentHeight);
  contentOffset = $(".dragbox").height() + 30;
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