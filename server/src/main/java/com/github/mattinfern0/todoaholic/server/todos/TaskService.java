package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskStatusDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.UpdateTaskDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskListRepository;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TaskService {
    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;
    private final TaskDtoMapper taskDtoMapper;

    @Autowired
    public TaskService(TaskRepository taskRepository, TaskListRepository taskListRepository, TaskDtoMapper taskDtoMapper) {
        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
        this.taskDtoMapper = taskDtoMapper;
    }

    public List<TaskDto> getAllTasksOwnedByUser(Long userId) {
        List<Task> taskEntities = taskRepository.findByOwnerId(userId);
        return taskDtoMapper.tasksToTaskDtos(taskEntities);
    }

    public List<TaskDto> getTasksByTaskListId(Long taskListId) {
        List<Task> taskEntities = taskRepository.findByTaskListId(taskListId);
        return taskDtoMapper.tasksToTaskDtos(taskEntities);
    }

    @Transactional
    public TaskDto createTask(CreateTaskRequestDto createTaskRequestDto, User creator) {
        Task newTask = new Task();

        UUID taskListId = createTaskRequestDto.getTaskListId();

        if (taskListId != null) {
            TaskList targetTaskList = taskListRepository
                    .findByUuid(taskListId)
                    .orElseThrow(() -> new EntityNotFoundException(
                            String.format("TaskList with id %s not found", taskListId)
                    ));

            newTask.setTaskList(targetTaskList);
        }

        newTask.setDisplayName(createTaskRequestDto.getDisplayName());
        newTask.setDescription(createTaskRequestDto.getDescription());
        newTask.setDueAt(createTaskRequestDto.getDueAt());
        newTask.setOwner(creator);
        newTask.setCompletedAt(createTaskRequestDto.getCompletedAt());

        newTask = taskRepository.save(newTask);

        return taskDtoMapper.taskToTaskDto(newTask);
    }

    @Transactional
    public TaskDto updateTask(UUID taskId, UpdateTaskDto updateTaskDto) {
        // This will be used for a full update / PUT. Partial update is currently not supported.
        Task targetTask = taskRepository
                .findByUuid(taskId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Task with id %s not found", taskId)));

        TaskList newTaskList = null;
        UUID newTaskListId = updateTaskDto.getTaskListId();
        if (newTaskListId != null) {
            newTaskList = taskListRepository
                    .findByUuid(newTaskListId)
                    .orElseThrow(() -> new EntityNotFoundException(String.format("TaskList with id %s not found", newTaskListId)));
        }


        targetTask.setDisplayName(updateTaskDto.getDisplayName());
        targetTask.setDescription(updateTaskDto.getDescription());
        targetTask.setDueAt(updateTaskDto.getDueAt());
        targetTask.setCompletedAt(updateTaskDto.getCompletedAt());
        targetTask.setTaskList(newTaskList);

        taskRepository.save(targetTask);
        return taskDtoMapper.taskToTaskDto(targetTask);
    }

    public TaskStatusDto getTaskStatus(UUID taskId) {
        Task targetTask = taskRepository
                .findByUuid(taskId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Task with id %s not found", taskId)));

        TaskStatusDto result = new TaskStatusDto();
        result.setIsComplete(targetTask.getCompletedAt() != null);
        return result;
    }

    @Transactional
    public TaskStatusDto updateTaskStatus(UUID taskId, TaskStatusDto taskStatusDto) {
        Task targetTask = taskRepository
                .findByUuid(taskId)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Task with id %s not found", taskId)));

        if (taskStatusDto.getIsComplete()) {
            targetTask.setCompletedAt(ZonedDateTime.now());
        } else {
            targetTask.setCompletedAt(null);
        }

        taskRepository.save(targetTask);
        return taskStatusDto;
    }

    @Transactional
    public void deleteTaskWithId(Long taskId) {
        taskRepository.deleteById(taskId);
    }
}
