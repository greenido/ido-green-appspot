/* 
 * Author: Ido Green
 * Date: 1/1/2012 (just because it looks like a great date to start projects
 * About: some simple functionalty to the new page of projects
*/

$(document).ready(function() {
  $("#chromenews").hide();
  $("#more-head").hide();
  // shows the slickbox on clicking the noted link  
  $('#more-head-but').click(function() {
    $('#more-head').show('slow');
    $('#more-head-but').hide('slow');
    return false;
  });
  // hides the slickbox on clicking the noted link  
  $('#less-head-but').click(function() {
    $('#more-head').hide('fast');
    $('#more-head-but').show('fast');
    return false;
  });
 
  $('#myblog-but').click(function() {
    $('#chromenews').show('slow');
    $('#myblog-but').hide('slow');
    return false;
  });
  

  $('#myblog').rssfeed('http://greenido.wordpress.com/feed/',
  {
    limit : 4
  });
  // a bunch of RSS feeds that coming from y! pipes (+caching)
  $('#chromenews').rssfeed(
    'http://pipes.yahoo.com/pipes/pipe.run?_id=b1503e8154a95936d28a1d5175017426&_render=rss',
    {
      limit : 10
    });
    
    
    $(".tips").tipTip();
  //$("#clock").load("clock.html #wrapper");  
});





