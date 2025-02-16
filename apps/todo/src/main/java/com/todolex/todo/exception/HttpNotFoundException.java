package com.todolex.todo.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class HttpNotFoundException extends RuntimeException {
    public HttpNotFoundException() {
        super();
    }

    public HttpNotFoundException(String message) {
        super(message);
    }

}
