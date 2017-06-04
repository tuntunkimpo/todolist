package kr.or.connect.todo.domain;

import java.util.Date;

public class Todo {
	private Integer id;
	private String todo;
	private Integer completed;
	private Date date;
	
	public Todo() {
	}
	
	public Todo(Integer id, String todo, Integer completed, Date date) {
		this(todo, completed, date);
		this.id = id;
		this.date = date;
	}
	
	public Todo(String todo, Integer completed, Date date) {
		this.todo = todo;
		this.completed = completed;
		this.date = date;
	}

	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTodo() {
		return todo;
	}
	public void setTodo(String todo) {
		this.todo = todo;
	}
	public Integer getCompleted() {
		return completed;
	}
	public void setCompleted(Integer completed) {
		this.completed = completed;
	}
	public Date getDate() {
		return date;
	}
	public void setDate(Date date) {
		this.date = date;
	}
}
