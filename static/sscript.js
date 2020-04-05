$(document).ready(function () {
            $('#order_ta').html('');
            listing();
        });

        function make_order() {
              var patt = new RegExp("[0-9]{2,3}-[0-9]{3,4}-[0-9]{3,4}")
              var res = patt.test($("#inputPassword4").val())

            // 1. 제목, 저자, 리뷰 내용을 가져옵니다.
              let name = $('#inputEmail3').val()
              let cnt = $('#inputState').val()
              let address = $('#inputPassword3').val()
              let phone = $('#inputPassword4').val()
            // 2. 제목, 저자, 리뷰 중 하나라도 입력하지 않았을 경우 alert를 띄웁니다.
              if (name == '') {
                alert('이름을 입력해주세요!')
                $('#inputEmail3').focus()
                return

                }
                else if (cnt == '-- 수량을 입력해주세요 --') {
                    alert('수량을 선택해주세요!')
                    $('#inputState').focus()
                    return
                }
                else if (address == '') {
                    alert('주소를 입력해주세요!')
                    $('#inputPassword3').focus()
                    return
                }
                else if (phone == '') {
                    alert('전화번호를 입력해주세요!')
                    $('#inputPassword4').focus()
                    return
                }

                else if (!patt.test($('#inputPassword4').val())) {
                    alert('휴대폰번호 입력 형식이 틀립니다. \n 010-0000-0000으로 입력해주세요')
                    $('#inputPassword4').val('')
                    $('#inputPassword4').focus()
                    return false


                    }
            // 3. POST /receipt 에 저장을 요청합니다.
            $.ajax({
                type: 'POST', // 타입을 작성합니다.
                url: '/receipt', // url을 작성합니다.
                data: {'name_give': name, 'cnt_give': cnt, 'address_give': address, 'phone_give': phone}, // data를 작성합니다. },
                success: function (response) {
                    if (response['result'] == 'success') {
                         alert(response['msg']);
//                        $('#inputEmail3').val('')
//                        $('#inputState').val('')
//                        $('#inputPassword3').val('')
//                        $('#inputPassword4').val('')
                        window.location.reload();
                    }
                }
            });
        }

        function listing() {
            // 1. 리뷰 목록을 서버에 요청하기
            // 2. 요청 성공 여부 확인하기
            // 3. 요청 성공했을 때 리뷰를 올바르게 화면에 나타내기
            $.ajax({
                type: "GET",
                url: "/receipt",
                data: {},
                success: function (response) {
                    if (response['result'] == 'success') {
//                        alert(response['msg']);
                        let orders = response['orders']
                        // 2. 성공했을 때 리뷰를 올바르게 화면에 나타내기
                       for (let i=0; i<orders.length; i++){
                            make_card(orders[i]['name'],orders[i]['cnt'],orders[i]['address'],orders[i]['phone'])
                       }
                    } else {
                        alert('주문이 되지 않았습니다');
                    }
                }
            });
        }

        function make_card(name, cnt, address, phone) {
            let temp_html = '<tr>\
                                <td>'+ name + '</td>\
                                <td>'+ cnt + '</td>\
                                <td>'+ address + '</td>\
                                <td>'+ phone + '</td>\
                            </tr>';
            $('#order_ta').append(temp_html);
        }






