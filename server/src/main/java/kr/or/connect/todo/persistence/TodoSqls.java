package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String COUNT_TODO = "SELECT COUNT(*) FROM todo";
	static final String SELECT_BY_COMPLETED = "SELECT id, todo, completed, date FROM todo where completed = :completed ORDER BY id DESC";
	static final String SELECT_ALL = "SELECT id, todo, completed, date FROM todo ORDER BY id DESC";
	static final String DELETE_BY_ID = "DELETE FROM todo WHERE id= :id";
	static final String DELETE_BY_COMPLETED = "DELETE FROM todo WHERE completed=1";
	static final String UPDATE = "UPDATE todo SET completed = :completed WHERE id = :id";
}
