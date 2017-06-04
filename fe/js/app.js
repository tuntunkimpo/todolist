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
				$('.todo-list').html(items);
				$('.todo-count > strong').text(itemLeftCount);
			},
			error: function() {
				$('.new-todo').attr('disabled', 'disabled');
				alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
				$('.main').html('<ul class="todo-list"><li><div class="view"><label>Loading Failed</label></div></li></ul>');
			}
		})
	}
        // active, completed 버튼 클릭했을때 일정 목록 
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
   	
	// 마우스 이벤트 & 키보드 이벤트 모음
    	// active 버튼 눌렀을 때
	$('#btnAll').click(function() {
		event.preventDefault();
		$('.filters > li > a.selected').removeClass();
		$('#btnAll').attr('class', 'selected');
		all();
		
	});
	
	// active 버튼 눌렀을 때
	$('#btnActive').click(function() {
		event.preventDefault();
		$('.filters > li > a.selected').removeClass();
		$('#btnActive').attr('class', 'selected');
		filter(0);
	});

	// complete 버튼 눌렀을 때
	$('#btnCompleted').click(function() {
		event.preventDefault();
		$('.filters > li > a.selected').removeClass();
		$('#btnCompleted').attr('class', 'selected');
		filter(1);
	});

	// 새로운 일정 입력후 엔터 눌렀을 때
	$('.new-todo').keypress(function(e) {
		if(e.keyCode == 13) {
			$(this).trigger('enterKey');
		}
	});

	// input(.new-todo) 박스에 일정 등록하고 일정이 등록되면 이벤트 카운트 숫자를 +1 더함
	$('.new-todo').bind('enterKey', function(e) {
		var text = $.trim($(this).val());
		if(text == "") {
			alert("내용을 입력해 주세요.");
		} else {
			$.ajax({
				url: './api/todos/',
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				data: JSON.stringify({
					todo: text,
					completed: 0
				}),
				dataType: 'json',
				success: function(data) {
					var item = '';
					var count = parseInt($('.todo-count > strong').text());
					$('.todo-count > strong').text(count + 1);
					if($('#btnCompleted').attr('class') != 'selected') {	
						item = "<li data-id=" + data.id + ">" + "<div class='view'><input class='toggle' type='checkbox'>\
									<label>" + data.todo + "</label><button class='destroy'></button></div></li>";
						if($('.todo-list').children().length == 0) {
							$('.todo-list').append(item);
						} else {
							$(item).insertBefore($('.todo-list').children().first());
						}
					}
					$('.new-todo').val("");
				},
				error: function() {
					alert('등록을 실패했습니다. 잠시 후 다시 시도해 주세요.');
				}
			})
		}
	});

	// active, complet 버튼 눌렀을 때 일정 목록을 toggle( 보여주거나 없에주는 역할)
	$('.todo-list').on('click', '.toggle', function() {
		var updateId = $(this).parent().parent().data('id');
		var parent = $(this).parent().parent();
		
		if(this.checked) {
			var flag = 1;
		} else {
			var flag = 0;
		}

		$.ajax({
			url: './api/todos/' + updateId,
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({completed: flag}),
			dataType: 'json',
			success: function(data) {
				var count = parseInt($('.todo-count > strong').text());
				if(flag == 1) {
					if($('#btnActive').attr('class') == 'selected') {
						$(parent).remove();
					} else {
						$(parent).addClass("completed");
					}
					$('.todo-count > strong').text(count - 1);
				} else {
					if($('#btnCompleted').attr('class') == 'selected') {
						$(parent).remove();
					} else {
						$(parent).removeClass("completed");
					}
					$('.todo-count > strong').text(count + 1);
				}
			},
			error: function() {
				alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
			}
		})
	});

	// x 버튼 눌르면 일정 delete
	$('.todo-list').on('click', '.destroy', function() {
		var deleteId = $(this).parent().parent().data('id');
		var parent = $(this).parent().parent();

		$.ajax({
			url: './api/todos/' + deleteId,
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			dataType: 'json',
			success: function(data) {
				if($(parent).attr('class') != 'completed') {
					var count = parseInt($('.todo-count > strong').text());
					$('.todo-count > strong').text(count - 1);
				}
				$(parent).remove();
			},
			error: function() {
				alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
			}
		})
	});

	// 완료한 일 한번에 삭제 하기 버튼
	$('.clear-completed').click(function() {
		$.ajax({
			url: './api/todos/',
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			dataType: 'json',
			success: function(data) {
				$('.todo-list > li.completed').remove();
			},
			error: function() {
				alert('오류가 발생하였습니다. 잠시 후 다시 시도해 주세요.');
			}
		})
	});
})(window);
