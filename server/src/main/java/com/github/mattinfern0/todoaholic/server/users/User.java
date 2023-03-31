package com.github.mattinfern0.todoaholic.server.users;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(
    name="users",
    uniqueConstraints = @UniqueConstraint(name = "user__unique_email", columnNames = {"email"})
)
public class User {
    @Id
    @GeneratedValue
    private Long id;

    @NotNull
    private String email;

    @NotNull
    private String password;

    public User() {}

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
}
