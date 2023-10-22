package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {
    private final UsersService usersService;

    @Autowired
    public UserController(UsersService usersService) {
        this.usersService = usersService;
    }


    @GetMapping("/me")
    public UserDto getCurrentUserInfo(Authentication authentication) {
        return usersService.getUserDtoFromAuthentication(authentication);
    }
}
