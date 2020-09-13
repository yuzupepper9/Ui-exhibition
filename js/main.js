function readCsv(data) {
  var target = '#output_csv';
  var csv = $.csv.toArrays(data);
  var insert = '';
  $(csv).each(function() {
      if (this.length > 0) {
          var i = 0;
          var text = ''
          insert += '<div id="list">';
          insert += '<div class="container">';
          $(this).each(function() {
            if (i == 0 || i == 2) {
              text = this
            }else if (i == 1){
              insert += '<div class="col-sm-2">';
              insert += '<div id="text1">';
              insert += '<p>' + text + '</p>';
              insert += '<p>' + '(' + this + ')' + '</p>';
              insert += '</div>';
              insert += '</div>';
            }else{
              insert += '<div class="col-sm-10">';
              insert += '<div id="text1">';             
              insert += '<p>' + text + '</p>';
              insert += '<p>' + this + '</p>';
              insert += '</div>';
              insert += '</div>';
            }         
            i += 1
        });
        insert += '</div>';
        insert += '</div>';
          /*
          $(this).each(function() {
              if (i == 0 || i == 1) {
                insert += '<div class="col-sm-1">';
              }else{
                insert += '<div class="col-sm-5">';
              }         
              insert += '<div id="text1">';
              insert += '<i>' + this + '</i>';
              insert += '</div>';
              insert += '</div>';
              i += 1
          });
          if (i == 3) {
            insert += '<div class="col-sm-5">';
              insert += '<div id="text1">';
              insert += '<i></i>';
              insert += '</div>';
              insert += '</div>';
          }
          insert += '</div>';
          insert += '</div>';
          */
      }
  });
  $(target).append(insert);
}
var csvfile = 'img/data.csv';

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

$(function() {
  $('a[href^="#"]').click(function() {
    var speed = 500;
    var href = $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $('html, body').animate({scrollTop:position}, speed, 'swing');
    return false;
  });
});

$(document).ready( function(){
  $.get(csvfile, readCsv, 'text');
  const div = document.querySelector('#TopImage');
  div.animate([{opacity: '0'}, {opacity: '1'}], 3000);
});