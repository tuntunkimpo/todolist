(function (window) {
	'use strict';
	// html페이지가 화면에 뿌려지고 나서 ready 안에 이벤트들이 동작준비
	$(document).ready(function() {
		main();
	});

	// 이벤트들 모음
	function main() {
		// todo 리스트 Ajax로 불러와서 화면에 뿌려주기
		$.ajax({
			url: './api/todos',
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				var items = [];
				var itemLeftCount = 0;
				for(var i = 0; i < data.length; i++) {
					var className = '';
					var inputChecked = '';
					
					if(data[i].completed == 1) {
						className = ' class="completed"';
						inputChecked = ' checked';
					} else {
						itemLeftCount++;
					}
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


	}  
})(window);
