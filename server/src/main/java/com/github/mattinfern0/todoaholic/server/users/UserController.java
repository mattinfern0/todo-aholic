package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
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
        System.out.println(authentication.getName());
        return new UserDto();
    }

    @DeleteMapping("/me")
    public void deleteCurrentUser(@AuthenticationPrincipal User principal, HttpServletRequest request) throws ServletException {
        this.usersService.deleteUser(principal.getId());
        request.logout();
    }
}
