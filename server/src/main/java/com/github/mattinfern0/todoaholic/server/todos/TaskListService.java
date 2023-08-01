package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListSummaryDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskListSummaryDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {
    private final TaskListRepository taskListRepository;
    private final TaskListSummaryDtoMapper taskListSummaryDtoMapper;

    @Autowired
    public TaskListService(TaskListRepository taskListRepository, TaskListSummaryDtoMapper taskListSummaryDtoMapper) {
        this.taskListRepository = taskListRepository;
        this.taskListSummaryDtoMapper = taskListSummaryDtoMapper;
    }

    public List<TaskListSummaryDto> findAll() {
        List<TaskList> taskListEntities = taskListRepository.findAll();
        return taskListSummaryDtoMapper.taskListsToTaskSummaryListDtos(taskListEntities);
    }

    public List<TaskListSummaryDto> getAllOwnedByUser(Long userId) {
        List<TaskList> taskListEntities = taskListRepository.findByOwnerId(userId);
        return taskListSummaryDtoMapper.taskListsToTaskSummaryListDtos(taskListEntities);
    }
}
