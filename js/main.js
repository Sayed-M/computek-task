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