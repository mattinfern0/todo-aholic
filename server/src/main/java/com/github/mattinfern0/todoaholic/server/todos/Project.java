package com.github.mattinfern0.todoaholic.server.todos;

import com.github.mattinfern0.todoaholic.server.users.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name="projects")
public class Project {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String name;


    @ManyToOne
    @OnDelete(action = OnDeleteAction.CASCADE)
    @JoinColumn(name = "owner_id")
    private User owner;

    @OneToMany
    private List<Task> tasks = new ArrayList<>();

    public User getOwner() {
        return owner;
    }

    public void setOwner(User owner) {
        this.owner = owner;
    }
}
