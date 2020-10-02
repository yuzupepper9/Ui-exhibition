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
              insert += '<p>' + this + '</p>';
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
$(document).ready( function(){
  var language;  
  $('.cp_arrows').css('visibility','hidden');
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
  $('head').append(
    '<style type="text/css">#container { display: none; } #fade, #loader { display: block; }</style>'
);
jQuery.event.add(window,"load",function() { // 全ての読み込み完了後に呼ばれる関数
    var pageH = $("#container").height();
    $("#fade").css("height", pageH).delay(900).fadeOut(800);
    $("#loader").delay(600).fadeOut(300);
    $("#container").css("display", "block");
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
      sleep(1.2, function () { 
        $('.cp_arrows').css('visibility','visible');     
    });
  });
});
function sleep(waitSec, callbackFunc) {
 
    // 経過時間（秒）
    var spanedSec = 0;
 
    // 1秒間隔で無名関数を実行
    var id = setInterval(function () {
 
        spanedSec++;
 
        // 経過時間 >= 待機時間の場合、待機終了。
        if (spanedSec >= waitSec) {
 
            // タイマー停止
            clearInterval(id);
 
            // 完了時、コールバック関数を実行
            if (callbackFunc) callbackFunc();
        }
    }, 1000);
 
}