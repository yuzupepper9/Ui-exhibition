function readCsv(data) {
  var target = '#output_csv';
  var csv = $.csv.toArrays(data);
  var insert = '';
  $(csv).each(function() {
      if (this.length > 0) {
          var i = 0;
          var text = ''
          insert += '<div class="fadeinmessage">';
          insert += '<div id="list">'
          insert += '<div class="container">';
          $(this).each(function() {
            if (i == 0 || i == 2) {
              text = this
            }else if (i == 1){
              insert += '<div class="col-sm-3">';
              insert += '<div id="text1">';
              insert += '<div class="nameblock">';
              insert += '<img class="umbrella-img" src="img/umbrella.png" alt=""></img>';
              insert += '<span>' + text + '</span>';
              insert += '<img class="umbrella-img" src="img/umbrella.png" alt=""></img>';
              insert += '</div>';
              insert += '<p>' + 'HomeTown:' + this + '</p>';
              insert += '</div>';
              insert += '</div>';
            }else{
              insert += '<div class="col-sm-9">';
              insert += '<div id="text2">';             
              insert += '<p>' + text + '</p>';
              insert += '<p>' + this + '</p>';
              insert += '</div>';
              insert += '</div>';
            }         
            i += 1
        });
        insert += '</div>';
        insert += '</div>';
        insert += '</div>';
      }
  });
  $(target).append(insert);
}
var csvfile = 'img/data.csv';
/*
$(function() {
    var topBtn = $('#page-top');
    topBtn.hide();
    //スクロールが500に達したらボタン表示
    $(window).scroll(function () {
        if ($(this).scrollTop() > 500) {
            topBtn.fadeIn();
        } else {
            topBtn.fadeOut();
        }
    });
    //スクロールしてトップ
    topBtn.click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
});
*/
$(document).ready( function(){
  var language;  
  
  if (navigator.browserLanguage != null) {  
    // Internet Explorer, Opera, 他  
    language = navigator.browserLanguage.substr(0, 2);  
  } else if(navigator.userLanguage != null) {  
    // Internet Explorerの場合  
    language = navigator.userLanguage.substr(0, 2);  
  } else if(navigator.language != null) {  
    // Chrome, Firefox, Opera, 他  
    language = navigator.language.substr(0, 2);  
  } else {  
    // その他  
    language = "en";  
  }   
  if (language != "ja"){
    language = "en";  
  }
  setLanguage(language);
  const div = document.querySelector('#TopMessage');

  
});
function setLanguage(language){  
  var element = document.getElementsByClassName("languageClass");  
  for (var i = 0; i < element.length; i++) {  
    if(element[i].getAttribute("lang") == language){  
      element[i].style.display = "";  
    }  
    else{  
      element[i].style.display = "none";  
    }  
  }  
}  
window.onload = function() {
  const div = document.querySelector('#TopMessage');
  div.style.opacity = 0
  $.get(csvfile, readCsv, 'text');
  // bodyにdivを追加
  $('body').append('<div id="curtain">');

  // 追加したdivを塗りつぶしてから透明化アニメーション
  $('#curtain').css({
      position: 'absolute',
      left: 0, top: 0,
      width: '100%', height: '100%',
      backgroundColor: '#fff',
      opacity: 100
  }).animate({
      opacity: 0
  }, 1500, function () {
      // アニメーション終了後に自身を消す
      $(this).remove();
      //const div = document.querySelector('#TopMessage');
      div.animate([{opacity: '0'}, {opacity: '1'}], 1500);
      div.style.opacity = 1
  });
  let scroll_hint = document.querySelector('#scroll-arrow-hint');
  let scroll_hint_show_time = 1;
  scroll_hint.style.transition = scroll_hint.style.WebkitTransition = 'opacity 1s linear ' + scroll_hint_show_time + 's';
  scroll_hint.style.opacity = 1;
}
$(window).scroll(function (){
  $('.fadein').each(function(){
      var elemPos = $(this).offset().top,
          scroll = $(window).scrollTop(),
          windowHeight = $(window).height();
        if (scroll > elemPos - windowHeight + 100){
            $(this).addClass('scrollin');
          }
      });
      $('.fadeinmessage').each(function(){
        var elemPos = $(this).offset().top,
            scroll = $(window).scrollTop(),
            windowHeight = $(window).height();
          if (scroll > elemPos - windowHeight + 100){
              $(this).addClass('scrollin');
            }
        });
  });