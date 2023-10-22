package com.github.mattinfern0.todoaholic.server.todos.repositories;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface TaskRepository extends JpaRepository<Task, Long> {
    Optional<Task> findByUuid(UUID uuid);

    List<Task> findByOwnerId(Long ownerId);

    List<Task> findByTaskListId(Long taskListId);

    List<Task> findByOwnerIdAndTaskListId(Long ownerId, Long taskListId);
}
