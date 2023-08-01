package com.github.mattinfern0.todoaholic.server.common.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

@Entity
@Table(name = "app_user")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @NotNull
    @Email
    @NotBlank
    @Column(name = "email", unique = true)
    private String email;

    @NotNull
    @Column(name = "password")
    @NotBlank
    @Size(max = 100)
    private String password;

    @OneToMany(mappedBy = "owner")
    private List<Task> tasks;

    @OneToMany(mappedBy = "owner")
    private List<TaskList> taskLists;

    @ManyToMany(cascade = CascadeType.ALL )
    @JoinTable(
            name="user_authorities",
            joinColumns = @JoinColumn(name="user_id"),
            inverseJoinColumns = @JoinColumn(name="authority_id")
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

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return this.email;
    }
}
