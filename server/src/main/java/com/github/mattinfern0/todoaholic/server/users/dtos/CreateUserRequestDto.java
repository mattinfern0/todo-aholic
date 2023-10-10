package com.github.mattinfern0.todoaholic.server.users.dtos;

import com.github.mattinfern0.todoaholic.server.common.validation.UniqueUserEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class CreateUserRequestDto {
    @Email
    @NotEmpty
    @UniqueUserEmail
    private String email;

    @NotEmpty
    @Size(min = 8, max = 50, message = "Must be between 8 and 50 characters")
    private String password;

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
