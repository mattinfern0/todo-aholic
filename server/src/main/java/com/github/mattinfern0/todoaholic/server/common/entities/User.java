package com.github.mattinfern0.todoaholic.server.common.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "firebase_uid")
    @NotBlank
    @Size(max = 50)
    private String firebaseUid;

    @OneToMany(mappedBy = "owner")
    private List<Task> tasks;

    @OneToMany(mappedBy = "owner")
    private List<TaskList> taskLists;

    @ManyToMany(cascade = CascadeType.ALL)
    @JoinTable(
        name = "user_authorities",
        joinColumns = @JoinColumn(name = "user_id"),
        inverseJoinColumns = @JoinColumn(name = "authority_id")
    )
    private List<Authority> authorities;

    public User() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFirebaseUid() {
        return firebaseUid;
    }

    public void setFirebaseUid(String firebaseUid) {
        this.firebaseUid = firebaseUid;
    }

    @Override
    public String toString() {
        return this.getFirebaseUid();
    }
}
