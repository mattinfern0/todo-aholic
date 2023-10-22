package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskStatusDto;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.context.ActiveProfiles;

import java.time.ZonedDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
class TaskServiceTest {


    @InjectMocks
    private TaskService taskService;

    @Mock
    private TaskRepository taskRepository;

    @Test
    void updateTaskStatusShouldMarkTaskAsCompleted() {
        Long testTaskId = 1L;
        Task testTaskEntity = new Task();
        testTaskEntity.setId(testTaskId);

        TaskStatusDto testNewStatus = new TaskStatusDto();
        testNewStatus.setIsComplete(true);

        Mockito.when(taskRepository.findById(testTaskId)).thenReturn(Optional.of(testTaskEntity));
        Mockito.when(taskRepository.save(testTaskEntity)).thenReturn(testTaskEntity);

        taskService.updateTaskStatus(testTaskId, testNewStatus);
        assertNotNull(testTaskEntity.getCompletedAt());
    }

    @Test
    void getTaskStatusResultCompleteShouldBeTrueIfTaskIsCompleted() {
        Long testTaskId = 1L;
        Task testTaskEntity = new Task();
        testTaskEntity.setId(testTaskId);
        testTaskEntity.setCompletedAt(ZonedDateTime.now());
        Mockito.when(taskRepository.findById(testTaskId)).thenReturn(Optional.of(testTaskEntity));


        TaskStatusDto result = taskService.getTaskStatus(testTaskId);
        assertEquals(true, result.getIsComplete());
    }

    @Test
    void getTaskStatusResultCompleteShouldBeFalseIfTaskIsNotComplete() {
        Long testTaskId = 1L;
        Task testTaskEntity = new Task();
        testTaskEntity.setId(testTaskId);
        testTaskEntity.setCompletedAt(null);
        Mockito.when(taskRepository.findById(testTaskId)).thenReturn(Optional.of(testTaskEntity));

        TaskStatusDto result = taskService.getTaskStatus(testTaskId);
        assertEquals(false, result.getIsComplete());
    }
}