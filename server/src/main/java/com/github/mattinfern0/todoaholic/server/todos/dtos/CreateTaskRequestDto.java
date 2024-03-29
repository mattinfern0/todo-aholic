package com.github.mattinfern0.todoaholic.server.todos.dtos;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;

import java.time.ZonedDateTime;
import java.util.UUID;

public class CreateTaskRequestDto {
    @NotEmpty
    String displayName;

    UUID taskListId;

    @NotNull
    String description;

    ZonedDateTime dueAt;
    ZonedDateTime completedAt;

    public CreateTaskRequestDto() {
        this.description = "";
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public UUID getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(UUID taskListId) {
        this.taskListId = taskListId;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public ZonedDateTime getDueAt() {
        return dueAt;
    }

    public void setDueAt(ZonedDateTime dueAt) {
        this.dueAt = dueAt;
    }

    public ZonedDateTime getCompletedAt() {
        return completedAt;
    }

    public void setCompletedAt(ZonedDateTime completedAt) {
        this.completedAt = completedAt;
    }
}
