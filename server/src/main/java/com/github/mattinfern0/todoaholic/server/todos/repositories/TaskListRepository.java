package com.github.mattinfern0.todoaholic.server.todos.repositories;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
}
