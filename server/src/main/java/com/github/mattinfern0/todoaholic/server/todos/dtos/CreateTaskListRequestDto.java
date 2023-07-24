package com.github.mattinfern0.todoaholic.server.todos.dtos;

import jakarta.validation.constraints.NotEmpty;

public class CreateTaskListRequestDto {
    @NotEmpty
    String displayName;
}
