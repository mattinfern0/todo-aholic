package com.github.mattinfern0.todoaholic.server.todos.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;

public class TaskDto {
    @NotNull
    Long id;

    @NotNull
    Long ownerId;

    Long taskListId;

    @NotEmpty
    String displayName;

    String description;

    ZonedDateTime completedAt;
    ZonedDateTime dueAt;

}
