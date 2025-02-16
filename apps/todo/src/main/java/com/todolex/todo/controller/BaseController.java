package com.todolex.todo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.tags.Tag;

@Hidden
@Tag(name = "Todo")
@RestController
@RequestMapping("${BASE_PATH:''}")
public class BaseController {

        @GetMapping("/health")
        public String getHealthStatus() {
                return "OK";
        }

}