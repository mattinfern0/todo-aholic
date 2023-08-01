package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
        @RequestParam(required = false) Long taskListId
    ) {
        boolean isAdmin = false;

        if (isAdmin) {
            return taskService.getAllTasks();
        }

        long currentUserId = 2;
        return taskService.getAllTasksOwnedByUser(currentUserId);
    }
}
