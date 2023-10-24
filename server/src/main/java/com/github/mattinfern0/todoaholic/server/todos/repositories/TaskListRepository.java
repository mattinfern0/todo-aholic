package com.github.mattinfern0.todoaholic.server.todos.repositories;

import com.github.mattinfern0.todoaholic.server.common.entities.TaskList;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    Optional<TaskList> findByUuid(UUID uuid);

    List<TaskList> findByOwnerId(Long ownerId);
}
