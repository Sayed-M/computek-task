/*global $, console, alert*/
var selectedLevels = 1,
    nodeBoundary,
    ulCounted;

// On save the dropdown or pressing Enter
// Save the entered quantity
// Append the root node

$('#treeLevels').on('submit', function (e) {
    e.preventDefault();

    var rootName = $('.inputs-wrapper input#root').val();

    // Append the first root column
    $('.ul-tree').append(`
        <ul>
            <li>
            <p>${rootName} <i class="fa fa-plus"></i></p>
            </li>
        </ul>
    `);

    nodeBoundary = selectedLevels;

    closeMenu();

});

// Circle Button to Add Columns or Sub-levels
$('.ul-tree').on('click', 'i', function () {

    // Check if the user added the max columns, and prevent adding new one
    var ulCounted = $(this).parentsUntil('.ul-tree', 'ul').length;
    ulCounted = ulCounted + 1;

    if (ulCounted > selectedLevels) {
        $(this).parent().addClass('boundary');
        $(this).css('display', 'none');
        
        return alert('You reached the maximum selected amount of columns!');
    }

    // Append sub-levels
    if ($(this).parent().parent().hasClass('ulAdded')) {

        $(this).closest('.ulAdded').find('> ul').append(`
            <li>
                <p>New Item <i class="fa fa-plus"></i></p>
            </li>
        `);

    } else {

        // Append new columnns
        $('.ul-tree ul').removeClass('lastUl');

        $(this).parent().parent().addClass('ulAdded').append(`
            <ul class="lastUl">
                <li>
                    <p>New Item <i class="fa fa-plus"></i></p>
                </li>
            </ul>
        `);

    }

});

// Start Dropdown
$('.quantity').each(function() {

    var spinner = $(this),
      input = spinner.find('input[type="number"]'),
      btnUp = spinner.find('.quantity-up'),
      btnDown = spinner.find('.quantity-down'),
      min = input.attr('min'),
      max = input.attr('max');
  
      // Add Field
      btnUp.click(function() {
  
          var oldValue = parseFloat(input.val());
  
          if (oldValue >= max) {
              var newVal = oldValue;
          } else {
  
              var newVal = oldValue + 1;
  
              selectedLevels = selectedLevels + 1;
  
              $('.dropdown .inputs-container').append(`<div class="inputs-wrapper" id="subLevel${newVal}"><label for="sub-level-${newVal}">Sub.Level 0${newVal}</label><input type="text" id="sub-level-${newVal}"></div>`);
  
              $(`#subLevel${newVal}`).on('change', 'input', function () {
                  var getVal = $(this).val();
              })
          }
  
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
  
      });
  
      // Remove Field
      btnDown.click(function() {
  
          var oldValue = parseFloat(input.val());
  
          if (oldValue <= min) {
              var newVal = oldValue;
          } else {
              var newVal = oldValue - 1;
  
              selectedLevels = selectedLevels - 1;
              
              $('.dropdown .inputs-container #subLevel' + (newVal + 1)).remove();
  
          }
  
          spinner.find("input").val(newVal);
          spinner.find("input").trigger("change");
  
      });
  
  });
  
  // Toggle
  $('.gear').click(function(e){
      e.stopPropagation();
    $(".dropdown").slideToggle(0);          
  });
  
  function closeMenu(){
  $('.dropdown').slideUp(0);
  }
  
  $('body, .dropdown .buttons .cancel').click( function() {
     closeMenu();
  });
  
  $('.dropdown').click( function(e) {
    e.stopPropagation();
  });
  // End Dropdown