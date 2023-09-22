package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListSummaryDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-lists")
public class TaskListController {
    private final TaskListService taskListService;

    @Autowired
    public TaskListController(TaskListService taskListService) {
        this.taskListService = taskListService;
    }

    @GetMapping("")
    public List<TaskListSummaryDto> getList(@AuthenticationPrincipal User currentUser) {
        return this.taskListService.getAllOwnedByUser(currentUser.getId());
    }

    @PostMapping("")
    public TaskListSummaryDto createTaskList(
        @Valid @RequestBody CreateTaskListDto createTaskListDto,
        @AuthenticationPrincipal User currentUser
    ) {
        return taskListService.createTaskList(createTaskListDto, currentUser);
    }
}
