package com.github.mattinfern0.todoaholic.server.users.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class LoginRequestDto {
    @NotBlank
    @Email
    String email;

    @NotBlank
    String password;
}
