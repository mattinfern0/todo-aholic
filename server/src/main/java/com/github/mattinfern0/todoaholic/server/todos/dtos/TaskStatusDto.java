package com.github.mattinfern0.todoaholic.server.todos.dtos;

import jakarta.validation.constraints.NotNull;

public class TaskStatusDto {
    @NotNull
    private Boolean isComplete;

    public Boolean getIsComplete() {
        return isComplete;
    }

    public void setIsComplete(Boolean complete) {
        isComplete = complete;
    }
}
