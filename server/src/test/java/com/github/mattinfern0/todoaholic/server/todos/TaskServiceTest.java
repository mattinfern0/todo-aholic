package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskRequestDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskStatusDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.UpdateTaskDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskDtoMapperImpl;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskListRepository;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskRepository;
import jakarta.persistence.EntityNotFoundException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.time.ZonedDateTime;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class TaskServiceTest {


    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Mock
    private TaskListRepository taskListRepository;

    @Spy
    private TaskDtoMapper taskDtoMapper = new TaskDtoMapperImpl();

    @Test
    void updateTaskStatusShouldMarkTaskAsCompleted() {
        UUID testTaskId = UUID.randomUUID();
        Task testTaskEntity = new Task();
        testTaskEntity.setUuid(testTaskId);

        TaskStatusDto testNewStatus = new TaskStatusDto();
        testNewStatus.setIsComplete(true);

        Mockito.when(taskRepository.findByUuid(testTaskId)).thenReturn(Optional.of(testTaskEntity));
        Mockito.when(taskRepository.save(testTaskEntity)).thenReturn(testTaskEntity);

        taskService.updateTaskStatus(testTaskId, testNewStatus);
        assertNotNull(testTaskEntity.getCompletedAt());
    }

    @Test
    void getTaskStatusShouldThrowExceptionIfTaskDoesNotExist() {
        UUID testTaskId = UUID.randomUUID();
        Mockito.when(taskRepository.findByUuid(testTaskId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            taskService.getTaskStatus(testTaskId);
        });
    }

    @Test
    void getTaskStatusResultCompleteShouldBeTrueIfTaskIsCompleted() {
        UUID testTaskId = UUID.randomUUID();
        Task testTaskEntity = new Task();
        testTaskEntity.setUuid(testTaskId);
        testTaskEntity.setCompletedAt(ZonedDateTime.now());
        Mockito.when(taskRepository.findByUuid(testTaskId)).thenReturn(Optional.of(testTaskEntity));


        TaskStatusDto result = taskService.getTaskStatus(testTaskId);
        assertEquals(true, result.getIsComplete());
    }

    @Test
    void getTaskStatusResultCompleteShouldBeFalseIfTaskIsNotComplete() {
        UUID testTaskId = UUID.randomUUID();
        Task testTaskEntity = new Task();
        testTaskEntity.setUuid(testTaskId);
        testTaskEntity.setCompletedAt(null);
        Mockito.when(taskRepository.findByUuid(testTaskId)).thenReturn(Optional.of(testTaskEntity));

        TaskStatusDto result = taskService.getTaskStatus(testTaskId);
        assertEquals(false, result.getIsComplete());
    }

    @Test
    void createTasksWorksWithValidArgs() {
        TaskList testTaskList = new TaskList();
        testTaskList.setUuid(UUID.randomUUID());

        CreateTaskRequestDto testCreateTask = new CreateTaskRequestDto();
        testCreateTask.setDueAt(ZonedDateTime.now());
        testCreateTask.setDisplayName("Gold ritual");
        testCreateTask.setDescription("We're rich! We're rich! We're rich!");
        testCreateTask.setCompletedAt(ZonedDateTime.now());
        testCreateTask.setTaskListId(testTaskList.getUuid());

        User testUser = new User();
        testUser.setId(10L);

        Mockito.when(taskListRepository.findByUuid(testTaskList.getUuid())).thenReturn(Optional.of(testTaskList));
        Mockito.when(taskRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        TaskDto newTask = taskService.createTask(testCreateTask, testUser);
        assertNotNull(newTask.getId());
        assertEquals(testCreateTask.getDisplayName(), newTask.getDisplayName());
        assertEquals(testCreateTask.getDescription(), newTask.getDescription());
        assertEquals(testCreateTask.getTaskListId(), newTask.getTaskListId());
        assertEquals(testCreateTask.getDueAt(), newTask.getDueAt());
        assertEquals(testCreateTask.getCompletedAt(), newTask.getCompletedAt());
        assertEquals(testUser.getId(), newTask.getOwnerId());
    }

    @Test
    void createTaskShouldThrowExceptionIfTaskListIdDoesNotExist() {
        CreateTaskRequestDto testCreateTask = new CreateTaskRequestDto();
        UUID invalidTaskListId = UUID.randomUUID();
        testCreateTask.setTaskListId(invalidTaskListId);
        User testUser = new User();

        Mockito.when(taskListRepository.findByUuid(invalidTaskListId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            taskService.createTask(testCreateTask, testUser);
        });
    }

    @Test
    void updateTaskWorksWithValidArgs() {
        TaskList existingList = new TaskList();
        existingList.setUuid(UUID.randomUUID());

        Task existingTask = new Task();
        existingTask.setUuid(UUID.randomUUID());
        existingTask.setDisplayName("Word 45");
        existingTask.setDescription("M1");
        existingTask.setCompletedAt(null);
        existingTask.setDueAt(null);
        existingTask.setTaskList(null);

        UpdateTaskDto updateTaskDto = new UpdateTaskDto();
        updateTaskDto.setDisplayName("WOrd 2");
        updateTaskDto.setDescription("D1");
        updateTaskDto.setCompletedAt(ZonedDateTime.now());
        updateTaskDto.setDueAt(ZonedDateTime.now());
        updateTaskDto.setTaskListId(existingList.getUuid());


        Mockito.when(taskRepository.findByUuid(existingTask.getUuid())).thenReturn(Optional.of(existingTask));
        Mockito.when(taskListRepository.findByUuid(existingList.getUuid())).thenReturn(Optional.of(existingList));
        Mockito.when(taskRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        TaskDto updatedTask = taskService.updateTask(existingTask.getUuid(), updateTaskDto);
        assertEquals(updateTaskDto.getDisplayName(), updatedTask.getDisplayName());
        assertEquals(updateTaskDto.getDescription(), updatedTask.getDescription());
        assertEquals(updateTaskDto.getDueAt(), updatedTask.getDueAt());
        assertEquals(updateTaskDto.getCompletedAt(), updatedTask.getCompletedAt());
    }

    @Test
    void updateTaskDoesNotModifyUUID() {
        Task existingTask = new Task();
        existingTask.setUuid(UUID.randomUUID());
        UUID oldUUID = existingTask.getUuid();

        UpdateTaskDto updateTaskDto = new UpdateTaskDto();

        Mockito.when(taskRepository.findByUuid(existingTask.getUuid())).thenReturn(Optional.of(existingTask));
        Mockito.when(taskRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        TaskDto updatedTask = taskService.updateTask(existingTask.getUuid(), updateTaskDto);
        assertEquals(oldUUID, updatedTask.getId());
    }

    @Test
    void updateTaskDoesNotModifyCreatedAt() {
        Task existingTask = new Task();
        existingTask.setUuid(UUID.randomUUID());
        ZonedDateTime oldCreatedAt = existingTask.getCreatedAt();

        UpdateTaskDto updateTaskDto = new UpdateTaskDto();

        Mockito.when(taskRepository.findByUuid(existingTask.getUuid())).thenReturn(Optional.of(existingTask));
        Mockito.when(taskRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        TaskDto updatedTask = taskService.updateTask(existingTask.getUuid(), updateTaskDto);
        assertEquals(oldCreatedAt, updatedTask.getCreatedAt());
    }

    @Test
    void updateTaskShouldThrowExceptionIfTaskListDoesNotExist() {
        UpdateTaskDto updateTaskDto = new UpdateTaskDto();
        Task existingTask = new Task();
        existingTask.setUuid(UUID.randomUUID());
        UUID invalidTaskListId = UUID.randomUUID();
        updateTaskDto.setTaskListId(invalidTaskListId);

        Mockito.when(taskRepository.findByUuid(existingTask.getUuid())).thenReturn(Optional.of(existingTask));
        Mockito.when(taskListRepository.findByUuid(invalidTaskListId)).thenReturn(Optional.empty());

        assertThrows(EntityNotFoundException.class, () -> {
            taskService.updateTask(existingTask.getUuid(), updateTaskDto);
        });
    }
}