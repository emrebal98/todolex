package com.todolex.todo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todolex.todo.annotation.ApiRequestBody;
import com.todolex.todo.dto.TodoItemDto;
import com.todolex.todo.entity.TodoItem;
import com.todolex.todo.exception.ErrorResponse;
import com.todolex.todo.service.TodoItemService;

import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

@Tag(name = "Todo Item")
@RestController
@RequestMapping("${BASE_PATH:''}/item")
public class TodoItemController {

        @Autowired
        private TodoItemService todoItemService;

        @GetMapping
        @ApiResponses({ @ApiResponse(responseCode = "200", content = {
                        @Content(array = @ArraySchema(schema = @Schema(implementation = TodoItem.class)), mediaType = "application/json")
        }) })

        public List<TodoItem> getAllTodoItems() {
                return todoItemService.getAllTodoItems();
        }

        @GetMapping("/{id}")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", content = {
                                        @Content(schema = @Schema(implementation = TodoItem.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "404", content = {
                                        @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json") }), })
        public TodoItem getTodoItemById(@PathVariable Long id) {
                return todoItemService.getTodoItemById(id);
        }

        @PostMapping
        @ApiResponses({
                        @ApiResponse(responseCode = "201", content = {
                                        @Content(schema = @Schema(implementation = TodoItem.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "400", content = {
                                        @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json") }), })

        public TodoItem createTodoItem(
                        @ApiRequestBody(required = true, content = @Content(schema = @Schema(implementation = TodoItemDto.class)), useParameterTypeSchema = true) @RequestBody TodoItemDto todoItemDto,
                        @RequestHeader("X-User-Id") String userId) {
                return todoItemService.createTodoItem(todoItemDto, userId);
        }

        @PutMapping("/{id}")
        @ApiResponses({
                        @ApiResponse(responseCode = "200", content = {
                                        @Content(schema = @Schema(implementation = TodoItem.class), mediaType = "application/json") }),
                        @ApiResponse(responseCode = "400", content = {
                                        @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json") }), })
        public TodoItem updateTodoItem(@PathVariable Long id,
                        @ApiRequestBody(required = true, content = @Content(schema = @Schema(implementation = TodoItemDto.class))) TodoItemDto todoItemDto,
                        @RequestHeader("X-User-Id") String userId) {
                return todoItemService.updateTodoItem(id, todoItemDto, userId);
        }

        @DeleteMapping("/{id}")
        @ApiResponses({
                        @ApiResponse(responseCode = "204", description = "No Content"),
                        @ApiResponse(responseCode = "404", content = {
                                        @Content(schema = @Schema(implementation = ErrorResponse.class), mediaType = "application/json") })
        })
        public void deleteTodoItem(@PathVariable Long id) {
                todoItemService.deleteTodoItem(id);
        }

}