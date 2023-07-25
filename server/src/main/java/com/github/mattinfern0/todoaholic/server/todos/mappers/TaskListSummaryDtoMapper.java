package com.github.mattinfern0.todoaholic.server.todos.mappers;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import com.github.mattinfern0.todoaholic.server.todos.dtos.TaskListSummaryDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper
public interface TaskListSummaryDtoMapper {
    @Mapping(target = "ownerId", source = "owner.id")
    TaskListSummaryDto taskListToTaskSummaryListDto(TaskList task);

    List<TaskListSummaryDto> taskListsToTaskSummaryListDtos(List<TaskList> taskLists);
}
