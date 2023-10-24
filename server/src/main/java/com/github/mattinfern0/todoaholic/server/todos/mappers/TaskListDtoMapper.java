package com.github.mattinfern0.todoaholic.server.todos.mappers;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface TaskListDtoMapper {
    @Mapping(target = "ownerId", source = "owner.id")
    @Mapping(target = "id", source = "uuid")
    TaskListDto taskListToTaskSummaryListDto(TaskList task);

    List<TaskListDto> taskListsToTaskSummaryListDtos(List<TaskList> taskLists);
}
