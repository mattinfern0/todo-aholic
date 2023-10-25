package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.todos.dtos.CreateTaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListDto;
import com.github.mattinfern0.todoaholic.server.todos.mappers.TaskListDtoMapper;
import com.github.mattinfern0.todoaholic.server.todos.repositories.TaskListRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mapstruct.factory.Mappers;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;

@ExtendWith(MockitoExtension.class)
class TaskListServiceTest {

    @InjectMocks
    private TaskListService taskListService;

    @Mock
    private TaskListRepository taskListRepository;

    @Spy
    private TaskListDtoMapper taskListDtoMapper = Mappers.getMapper(TaskListDtoMapper.class);

    @Test
    void createTaskListWorksWithValidArgs() {
        CreateTaskListDto createTaskListDto = new CreateTaskListDto();
        createTaskListDto.setDisplayName("Hello There");

        User testUser = new User();
        testUser.setId(12L);

        Mockito.when(taskListRepository.save(any())).thenAnswer(i -> i.getArguments()[0]);

        TaskListDto newList = taskListService.createTaskList(createTaskListDto, testUser);

        assertNotNull(newList.getId());
        assertNotNull(newList.getCreatedAt());
        assertEquals(createTaskListDto.getDisplayName(), newList.getDisplayName());
        assertEquals(testUser.getId(), newList.getOwnerId());
    }
}