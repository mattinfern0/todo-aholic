package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskDtoMapper taskDtoMapper;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskDtoMapper taskDtoMapper) {
        this.taskRepository = taskRepository;
        this.taskDtoMapper = taskDtoMapper;
    }

    public List<TaskDto> getAllTasks() {
        List<Task> taskEntities = taskRepository.findAll();
        List<TaskDto> result = taskDtoMapper.tasksToTaskDtos(taskEntities);
        return result;
    }
}
