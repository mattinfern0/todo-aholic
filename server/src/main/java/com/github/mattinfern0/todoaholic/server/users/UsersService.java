package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import com.github.mattinfern0.todoaholic.server.users.mappers.UserDtoMapper;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;

    @Autowired
    public UsersService(UserRepository userRepository, UserDtoMapper userDtoMapper) {
        this.userRepository = userRepository;
        this.userDtoMapper = userDtoMapper;
    }

    public UserDto getById(Long userId) {
        Optional<User> userEntity = userRepository.findById(userId);

        if (!userEntity.isPresent()) {
            throw new EntityNotFoundException("User with id not found");
        }

        return userDtoMapper.userToUserDto(userEntity.get());
    }
}
