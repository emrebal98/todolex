package com.todolex.todo.exception;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;
import java.time.format.DateTimeFormatter;

import com.fasterxml.jackson.annotation.JsonInclude;

import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.media.Schema.RequiredMode;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ErrorResponse {

    @Schema(description = "HTTP status code", example = "404")
    private int status;

    @Schema(description = "Error message", requiredMode = RequiredMode.NOT_REQUIRED, nullable = true)
    private String message;

    @Schema(description = "Timestamp of the error", example = "2021-07-01T12:34:56.789Z")
    private String timestamp;

    public ErrorResponse(int status, String message) {
        OffsetDateTime now = OffsetDateTime.now(ZoneOffset.UTC);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSXXX");
        String formattedTimestamp = now.format(formatter);

        this.status = status;
        this.message = message;
        this.timestamp = formattedTimestamp;
    }

    public int getStatus() {
        return status;
    }

    public String getMessage() {
        return message;
    }

    public String getTimestamp() {
        return timestamp;
    }
}
