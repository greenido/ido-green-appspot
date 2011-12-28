/* 
 * Author: Ido Green
 * Date: 1/1/2012 (just because it looks like a great date to start projects
 * About: some simple functionalty to the new page of projects
*/

$(document).ready(function() {
 // hides the slickbox as soon as the DOM is ready
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
 
});





