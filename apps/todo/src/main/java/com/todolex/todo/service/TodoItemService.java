package com.todolex.todo.service;

import java.sql.Timestamp;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todolex.todo.dto.TodoItemDto;
import com.todolex.todo.entity.TodoItem;
import com.todolex.todo.exception.HttpNotFoundException;
import com.todolex.todo.repository.TodoItemRepository;

@Service
public class TodoItemService {

    @Autowired
    private TodoItemRepository todoItemRepository;

    public List<TodoItem> getAllTodoItems() {
        return todoItemRepository.findAll();
    }

    public TodoItem getTodoItemById(Long id) throws HttpNotFoundException {
        return todoItemRepository.findById(id).orElseThrow(HttpNotFoundException::new);
    }

    public TodoItem createTodoItem(TodoItemDto todoItemDto) {
        TodoItem todoItem = new TodoItem();
        todoItem.setTitle(todoItemDto.getTitle());
        todoItem.setDescription(todoItemDto.getDescription());
        todoItem.setCompleted(todoItemDto.isCompleted());
        todoItem.setCreatedAt(new Timestamp(System.currentTimeMillis()));
        return todoItemRepository.save(todoItem);
    }

    public TodoItem updateTodoItem(Long id, TodoItemDto todoItemDto) {
        TodoItem todoItem = todoItemRepository.findById(id).orElseThrow(HttpNotFoundException::new);
        todoItem.setTitle(todoItemDto.getTitle());
        todoItem.setDescription(todoItemDto.getDescription());
        todoItem.setCompleted(todoItemDto.isCompleted());
        return todoItemRepository.save(todoItem);
    }

    public void deleteTodoItem(Long id) {
        todoItemRepository.deleteById(id);
    }

}