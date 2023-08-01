package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListSummaryDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public List<TaskListSummaryDto> getList() {
        boolean isAdmin = false;

        if (isAdmin) {
            return this.taskListService.findAll();
        }

        long currentUserId = 1;
        return this.taskListService.getAllOwnedByUser(currentUserId);
    }
}
