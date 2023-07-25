package com.github.mattinfern0.todoaholic.server.todos.dtos;

import jakarta.validation.constraints.NotEmpty;

import java.time.ZonedDateTime;

public class CreateTaskRequestDto {
    @NotEmpty
    String displayName;

    Long taskListId;

    @NotEmpty
    String description;

    ZonedDateTime dueAt;
}
