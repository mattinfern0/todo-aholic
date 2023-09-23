package com.github.mattinfern0.todoaholic.server.auth;

import com.github.mattinfern0.todoaholic.server.auth.dtos.LoginRequestDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    @PostMapping("/login")
    public void login(
        @RequestBody @Valid LoginRequestDto loginRequestDto,
        HttpServletRequest httpServletRequest
    ) throws ServletException {
        httpServletRequest.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
    }
}
