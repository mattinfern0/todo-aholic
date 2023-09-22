package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.CreateUserRequestDto;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UsersService usersService;

    @Autowired
    public UserController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("")
    public UserDto createUser(
        @Valid @RequestBody CreateUserRequestDto createUserRequestDto
    ) {

        return usersService.createUser(createUserRequestDto);
    }

    @GetMapping("/me")
    public UserDto getCurrentUserInfo(@AuthenticationPrincipal User principal) {
        long currentUserId = principal.getId();
        return this.usersService.getById(currentUserId);
    }
}
