package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.common.errors.PermissionDeniedException;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskStatusDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.UpdateTaskDto;
import com.github.mattinfern0.todoaholic.server.users.UsersService;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService taskService;
    private final UsersService usersService;

    @Autowired
    public TaskController(TaskService taskService, UsersService usersService) {
        this.taskService = taskService;
        this.usersService = usersService;
    }

    @GetMapping("")
    public List<TaskDto> listTasks(
        @RequestParam(required = false) Long taskListId,
        Authentication authentication
    ) {
        if (taskListId != null) {
            return taskService.getTasksByTaskListId(taskListId);
        }

        UserDto currentUser = usersService.getUserDtoFromAuthentication(authentication);

        long currentUserId = currentUser.getId();
        return taskService.getAllTasksOwnedByUser(currentUserId);
    }

    @PostMapping("")
    public TaskDto createTask(
        @Valid @RequestBody CreateTaskRequestDto createTaskRequestDto,
        Authentication authentication
    ) {
        User currentUser = usersService.getUserFromAuthentication(authentication);
        return taskService.createTask(createTaskRequestDto, currentUser);
    }

    @PutMapping("/{taskId}")
    public TaskDto updateTask(
        @PathVariable UUID taskId,
        @Valid @RequestBody UpdateTaskDto updateTaskDto,
        Authentication authentication
    ) {
        User currentUser = usersService.getUserFromAuthentication(authentication);

        if (!taskService.doesUserHaveUpdatePermission(taskId, currentUser)) {
            throw new PermissionDeniedException();
        }

        return taskService.updateTask(taskId, updateTaskDto);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable UUID taskId) {
        taskService.deleteTaskWithId(taskId);
    }

    @GetMapping("/{taskId}/status")
    public TaskStatusDto getTaskStatus(@PathVariable UUID taskId) {
        return taskService.getTaskStatus(taskId);
    }

    @PutMapping("/{taskId}/status")
    public TaskStatusDto updateTaskStatus(
        @PathVariable UUID taskId,
        @Valid @RequestBody TaskStatusDto taskStatusDto
    ) {
        return taskService.updateTaskStatus(taskId, taskStatusDto);
    }


}
