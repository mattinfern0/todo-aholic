package com.github.mattinfern0.todoaholic.server.todos.dtos;

import java.util.UUID;

public class TaskListDto {

    UUID id;


    Long ownerId;
    String displayName;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
}
