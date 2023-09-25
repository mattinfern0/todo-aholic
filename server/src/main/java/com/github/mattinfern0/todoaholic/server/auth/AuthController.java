package com.github.mattinfern0.todoaholic.server.auth;

import com.github.mattinfern0.todoaholic.server.auth.dtos.LoginRequestDto;
import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import com.github.mattinfern0.todoaholic.server.users.mappers.UserDtoMapper;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final UserDtoMapper userDtoMapper;

    @Autowired
    public AuthController(UserDtoMapper userDtoMapper) {
        this.userDtoMapper = userDtoMapper;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
        @RequestBody @Valid LoginRequestDto loginRequestDto,
        HttpServletRequest httpServletRequest
    ) throws ServletException {
        httpServletRequest.login(loginRequestDto.getEmail(), loginRequestDto.getPassword());
        User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return new ResponseEntity<>(userDtoMapper.userToUserDto(currentUser), HttpStatus.OK);
    }
}
