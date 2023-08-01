package com.github.mattinfern0.todoaholic.server.todos.repositories;

import com.github.mattinfern0.todoaholic.server.common.entities.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByOwnerId(Long ownerId);
    List<Task> findByOwnerIdAndTaskListId(Long ownerId, Long taskListId);
}
