(function (window) {
	'use strict';
	// html페이지가 화면에 뿌려지고 나서 ready 안에 이벤트들이 동작준비
	$(document).ready(function() {
		all();
	});

	// 이벤트들 모음
	function all() {
		// todo 리스트 Ajax로 불러와서 화면에 뿌려주기
		$.ajax({
			url: './api/todos',
			// 조회를 위한 요청이기 때문에 REST API에서 권장하는 GET 방식으로 요청
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				var items = [];
				var itemLeftCount = 0;
				for(var i = 0; i < data.length; i++) {
					var className = '';
					var inputChecked = '';
					// http://localhost:8080//api/todos 을 통해 서버와의 통신내용을 확인가능, 배열 내용에서 completed가 1이면 완료된 항목이고 0이면 itemLeftCount를 1 증가시켜 남아있는 할일 숫자 상승시킴
					if(data[i].completed == 1) {
						className = ' class="completed"';
						inputChecked = ' checked';
					} else {
						itemLeftCount++;
					}
					// items 배열에 li태그에 완료된 것과 완료되지 않은 일들을 출력
					items.push("<li" + className + " data-id=" + data[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + inputChecked + ">\
								<label>" + data[i].todo + "</label><button class='destroy'></button></div></li>");
				}
				
				// .html 셀렉터태그내에 존재하는 자식태그을 통째로 읽어올때 사용되는 함수
				$('.todo-list').html(items);
				// .text 셀렉터태그내에 존재하는 자식태그들 중에 html태그는 모두 제외 한 채 문자열만 출력하고자 할때 사용되는 함수 , 남아있는 할일 숫자만 출력
				$('.todo-count > strong').text(itemLeftCount);
			},
			error: function() {
				$('.new-todo').attr('disabled', 'disabled');
				alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
				$('.main').html('<ul class="todo-list"><li><div class="view"><label>Loading Failed</label></div></li></ul>');
			}
		})
	}

    // active, completed 버튼 클릭했을때 발생하는 이벤트
    function filter(id) {
            var urlParam = '';
            if(id == 0) {
                urlParam = '/active';
            } else if(id == 1) {
                urlParam = '/completed';
            }
            
            $.ajax({
                url: './api/todos' + urlParam,
                method: 'GET',
                dataType: 'json',
                success: function(data) {
                    var items = [];
                    for(var i = 0; i < data.length; i++) {
                        var className = '';
                        var inputChecked = '';
                        if(data[i].completed == 1) {
                            className = ' class="completed"';
                            inputChecked = ' checked';
                        }
                        items.push("<li" + className + " data-id=" + data[i].id + ">" + "<div class='view'><input class='toggle' type='checkbox'" + inputChecked + ">\
                                    <label>" + data[i].todo + "</label><button class='destroy'></button></div></li>");
                    }
                    $('.todo-list').html(items);
                },
                error: function() {
                    $('.new-todo').attr('disabled', 'disabled');
                    alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
                    $('.main').html('<ul class="todo-list"><li><div class="view"><label>Loading Failed</label></div></li></ul>');
                }
            })
        }
	}  
    
    // 버튼 이벤트 모음
    $('#btnActive').click(function() {
		event.preventDefault();
		$('.filters > li > a.selected').removeClass();
		$('#btnActive').attr('class', 'selected');
		filter(0);
	});

	$('#btnCompleted').click(function() {
		event.preventDefault();
		$('.filters > li > a.selected').removeClass();
		$('#btnCompleted').attr('class', 'selected');
		filter(1);
	});
 
})(window);
