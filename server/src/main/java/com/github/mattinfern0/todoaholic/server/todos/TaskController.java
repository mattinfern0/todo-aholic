package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.UpdateTaskRequestDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;

    @Autowired
    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @GetMapping("")
    public List<TaskDto> listTasks(
        @RequestParam(required = false) Long taskListId,
        @AuthenticationPrincipal User currentUser
    ) {
        if (taskListId != null) {
            return taskService.getTasksByTaskListId(taskListId);
        }

        long currentUserId = currentUser.getId();
        return taskService.getAllTasksOwnedByUser(currentUserId);
    }
    
    @PostMapping("")
    public TaskDto createTask(
        @Valid @RequestBody CreateTaskRequestDto createTaskRequestDto,
        @AuthenticationPrincipal User currentUser
    ) {
        return taskService.createTask(createTaskRequestDto, currentUser);
    }

    @PatchMapping("/{taskId}")
    public TaskDto updateTask(
        @PathVariable Long taskId,
        @Valid @RequestBody UpdateTaskRequestDto updateTaskRequestDto
    ) {
        User currentUser = new User();
        return taskService.updateTask(taskId, updateTaskRequestDto);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
        taskService.deleteTaskWithId(taskId);
    }
}
