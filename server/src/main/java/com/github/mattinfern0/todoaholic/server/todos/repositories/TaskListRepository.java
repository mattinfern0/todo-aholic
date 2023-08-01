package com.github.mattinfern0.todoaholic.server.todos.repositories;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    List<TaskList> findByOwnerId(Long ownerId);
}
