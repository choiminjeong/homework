














function or() {
  let push1 = $('#inputEmail3').val()
  let push2 = $('#inputState').val()
  let push3 = $('#inputPassword3').val()
  let push4 = $('#inputPassword4').val()

  var patt = new RegExp("[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}")
  var res = patt.test($("#inputPassword4").val())


  if (push1 == '') {
    alert('이름을 입력해주세요!')
    $('#inputEmail3').focus()

  }
  else if (push2 == '-- 수량을 입력해주세요 --') {
    alert('수량을 선택해주세요!')
    $('#inputState').focus()

  }
  else if (push3 == '') {
    alert('주소를 입력해주세요!')
    $('#inputPassword3').focus()

  }
  else if (push4 == '') {
    alert('전화번호를 입력해주세요!')
    $('#inputPassword4').focus()

  }

  else if (!patt.test($('#inputPassword4').val())) {
      alert('휴대폰번호 입력 형식이 틀립니다. \n 010-0000-0000으로 입력해주세요')
      $('#inputPassword4').val('')
      $('#inputPassword4').focus()
      return false 


    }
   
    else {
      // let A_order = {'push1':push1,'push2':push2, 'push3':push3, 'push4':push4}
      // let A_order = [push1, push2, push3, push4]


      let temp_html = '<tr> ' + '<td>' + push1 + '</td>' + '<td>' + push2 + '</td>' + '<td>' + push3 + '</td>' + '<td>' + push4 + '</td>' + '</tr>'
      $('#order_ta').append(temp_html)
      $('#inputEmail3').val('')
      $('#inputState').val('')
      $('#inputPassword3').val('')
      $('#inputPassword4').val('')
      //   $('input').val('')


    }

    // }
    // function select() {
    //   $('#show_select').empty()
    // }
  }




