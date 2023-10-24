package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskListDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskListService {
    private final TaskListRepository taskListRepository;
    private final TaskListDtoMapper taskListDtoMapper;

    @Autowired
    public TaskListService(TaskListRepository taskListRepository, TaskListDtoMapper taskListDtoMapper) {
        this.taskListRepository = taskListRepository;
        this.taskListDtoMapper = taskListDtoMapper;
    }

    public List<TaskListDto> findAll() {
        List<TaskList> taskListEntities = taskListRepository.findAll();
        return taskListDtoMapper.taskListsToTaskSummaryListDtos(taskListEntities);
    }

    public List<TaskListDto> getAllOwnedByUser(Long userId) {
        List<TaskList> taskListEntities = taskListRepository.findByOwnerId(userId);
        return taskListDtoMapper.taskListsToTaskSummaryListDtos(taskListEntities);
    }

    public TaskListDto createTaskList(CreateTaskListDto createTaskListDto, User creator) {
        TaskList newTaskList = new TaskList();
        newTaskList.setDisplayName(createTaskListDto.getDisplayName());
        newTaskList.setOwner(creator);
        newTaskList = taskListRepository.save(newTaskList);
        return taskListDtoMapper.taskListToTaskSummaryListDto(newTaskList);
    }
}
