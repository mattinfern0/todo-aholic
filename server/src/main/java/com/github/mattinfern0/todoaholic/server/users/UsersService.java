package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import com.github.mattinfern0.todoaholic.server.users.mappers.UserDtoMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
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

    public UserDto getByUid(Long userId) {
        Optional<User> userEntity = userRepository.findById(userId);

        if (!userEntity.isPresent()) {
            throw new EntityNotFoundException("User with id not found");
        }

        return userDtoMapper.userToUserDto(userEntity.get());
    }

    public UserDto getByUid(String userUid) {
        Optional<User> userEntity = userRepository.findByFirebaseUid(userUid);

        if (!userEntity.isPresent()) {
            throw new EntityNotFoundException("User with id not found");
        }

        return userDtoMapper.userToUserDto(userEntity.get());
    }

    public UserDto getFromAuthentication(Authentication authentication) {
        if (!(authentication instanceof JwtAuthenticationToken)) {
            throw new UnsupportedOperationException(String.format("Unsupported authentication class %s", authentication.getClass().getName()));
        }

        return getByUid(authentication.getName());
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
