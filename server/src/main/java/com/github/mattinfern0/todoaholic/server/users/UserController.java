package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import org.springframework.beans.factory.annotation.Autowired;
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

    @RequestMapping("/me")
    public UserDto getCurrentUserInfo() {
        long currentUserId = 1;
        return this.usersService.getById(currentUserId);
    }
}
