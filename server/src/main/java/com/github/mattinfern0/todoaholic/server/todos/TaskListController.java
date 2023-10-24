package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListDto;
import com.github.mattinfern0.todoaholic.server.users.UsersService;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-lists")
public class TaskListController {
    private final TaskListService taskListService;
    private final UsersService usersService;

    @Autowired
    public TaskListController(TaskListService taskListService, UsersService usersService) {
        this.taskListService = taskListService;
        this.usersService = usersService;
    }

    @GetMapping("")
    public List<TaskListDto> getList(Authentication authentication) {
        UserDto currentUserDto = usersService.getUserDtoFromAuthentication(authentication);
        return this.taskListService.getAllOwnedByUser(currentUserDto.getId());
    }

    @PostMapping("")
    public TaskListDto createTaskList(
            @Valid @RequestBody CreateTaskListDto createTaskListDto,
            Authentication authentication
    ) {
        User currentUser = usersService.getUserFromAuthentication(authentication);
        return taskListService.createTaskList(createTaskListDto, currentUser);
    }
}
