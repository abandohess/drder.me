$('document').ready(function($) {
  let houses;
  let house = null;

  let answered = [false, false, false];

  let request = new XMLHttpRequest();
  request.open('GET', 'http://drder.me/houses.json');
  request.responseType = 'json';
  request.send();
  request.onload = function () {
    houses = request.response;
    console.log(houses);
  }

  $(function(){
  	$("#test").click(function(){
      determineHouse();
      if (house != null) {
        setModalFeatures();
      }
      if (answered[0] && answered[1] && answered[2]) {
        $(".test").modal('show');
      }
  	});
  	$(".test").modal({
  		closable: true
  	});

  });

  $("label").click(function(event) {
    let id = $(this).attr("id");
    let row = id.charAt(4);
    let col = id.charAt(5);
    selectHouse(row, col);
  });

  function selectHouse(row, column) {
    let checkId = '#check' + row + column;
    let itemId = '#item' + row + column;

    let otherCols;
    if (column == 'a') {
      otherCols = ['b', 'c'];
    } else if (column == 'b') {
      otherCols = ['a', 'c'];
    } else {
      otherCols = ['a', 'b'];
    }
    if ($(checkId).hasClass('fade-out')) {
      $(checkId).removeClass('fade-out');
    }
    $(checkId).addClass('fade-in');
    $(itemId).css("opacity", 1);
    $('#item' + row + otherCols[0]).css("opacity", .5);
    $('#item' + row + otherCols[1]).css("opacity", .5);
    answered[row - 1] = true;

    if ($('#check' + row + otherCols[0]).hasClass('fade-in')) {
      $('#check' + row + otherCols[0]).addClass('fade-out');
      $('#check' + row + otherCols[0]).removeClass('fade-in');
    }
    if ($('#check' + row + otherCols[1]).hasClass('fade-in')) {
      $('#check' + row + otherCols[1]).addClass('fade-out');
      $('#check' + row + otherCols[1]).removeClass('fade-in');
    }
  }

  function determineHouse() {
    if (!(answered[0] && answered[1] && answered[2])) {
      alert("You have not answered all the questions");
      return;
    }
    if ($('#check1c').hasClass('fade-in')) {
      house = houses['psiu'];
    } else if ($('#check2c').hasClass('fade-in')) {
      house = houses['heorot'];
    } else if ($('#check2a').hasClass('fade-in')) {
      house = houses['psiu'];
    } else if ($('#check3a').hasClass('fade-in')){
      house = houses['beta'];
    } else if ($('#check3b').hasClass('fade-in')){
      house = houses['axa'];
    } else if ($('#check3c').hasClass('fade-in')){
      house = houses['gdx'];
    }
  }

  function setModalFeatures() {
    $('#modal-image').attr('src', house.img);
    $('#modal-text').empty();
    $('#modal-text').append("You are a member of " + house.name);
  }

});
