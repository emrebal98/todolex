package com.todolex.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todolex.todo.entity.TodoItem;

@Repository
public interface TodoItemRepository extends JpaRepository<TodoItem, Long> {
}