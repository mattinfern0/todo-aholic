package com.github.mattinfern0.todoaholic.server.todos.mappers;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper()
public interface TaskDtoMapper {
    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "taskListId", source = "taskList.uuid")
    @Mapping(target = "id", source = "uuid")
    TaskDto taskToTaskDto(Task task);

    List<TaskDto> tasksToTaskDtos(List<Task> tasks);
}
