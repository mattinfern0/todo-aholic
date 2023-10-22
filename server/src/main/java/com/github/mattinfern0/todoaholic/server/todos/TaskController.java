package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskStatusDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.UpdateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.users.UsersService;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
        List<TaskDto> taskDtos = taskService.getAllTasksOwnedByUser(currentUserId);
        return taskDtos;
    }

    @PostMapping("")
    public TaskDto createTask(
            @Valid @RequestBody CreateTaskRequestDto createTaskRequestDto,
            Authentication authentication
    ) {
        User currentUser = usersService.getUserFromAuthentication(authentication);
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

    @GetMapping("/{taskId}/status")
    public TaskStatusDto getTaskStatus(@PathVariable Long taskId) {
        return taskService.getTaskStatus(taskId);
    }

    @PutMapping("/{taskId}/status")
    public TaskStatusDto updateTaskStatus(
            @PathVariable Long taskId,
            @Valid @RequestBody TaskStatusDto taskStatusDto
    ) {
        return taskService.updateTaskStatus(taskId, taskStatusDto);
    }


}
