package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import com.github.mattinfern0.todoaholic.server.users.mappers.UserDtoMapper;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;

    @Autowired
    public UsersService(UserRepository userRepository, UserDtoMapper userDtoMapper) {
        this.userRepository = userRepository;
        this.userDtoMapper = userDtoMapper;
    }

    @Transactional
    public UserDto getOrCreateByFirebaseUid(String firebaseUid) {
        User userEntity = userRepository.findByFirebaseUid(firebaseUid).orElseGet(() -> {
            User newUser = new User();
            newUser.setFirebaseUid(firebaseUid);
            newUser = userRepository.save(newUser);
            return newUser;
        });

        return userDtoMapper.userToUserDto(userEntity);
    }

    @Transactional
    public UserDto getFromAuthentication(Authentication authentication) {
        if (!(authentication instanceof JwtAuthenticationToken)) {
            throw new UnsupportedOperationException(String.format("Unsupported authentication class %s", authentication.getClass().getName()));
        }

        return getOrCreateByFirebaseUid(authentication.getName());
    }

}
