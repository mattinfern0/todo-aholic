package com.github.mattinfern0.todoaholic.server.todos;

import jakarta.annotation.Nullable;
import jakarta.persistence.*;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.time.ZonedDateTime;

@Entity
@Table(name="tasks")
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String title;
    private String description;
    private Boolean completed;
    private ZonedDateTime dueDateTime;


    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Task() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }

    public ZonedDateTime getDueDateTime() {
        return dueDateTime;
    }

    public void setDueDateTime(ZonedDateTime dueDateTime) {
        this.dueDateTime = dueDateTime;
    }
}
