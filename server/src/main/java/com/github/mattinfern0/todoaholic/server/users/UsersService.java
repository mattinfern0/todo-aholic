package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.CreateUserRequestDto;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import com.github.mattinfern0.todoaholic.server.users.mappers.UserDtoMapper;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UsersService {
    private final UserRepository userRepository;
    private final UserDtoMapper userDtoMapper;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UsersService(UserRepository userRepository, UserDtoMapper userDtoMapper, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.userDtoMapper = userDtoMapper;
        this.passwordEncoder = passwordEncoder;
    }

    public UserDto getById(Long userId) {
        Optional<User> userEntity = userRepository.findById(userId);

        if (!userEntity.isPresent()) {
            throw new EntityNotFoundException("User with id not found");
        }

        return userDtoMapper.userToUserDto(userEntity.get());
    }

    @Transactional
    public UserDto createUser(CreateUserRequestDto createUserRequestDto) {
        User newUser = new User();
        newUser.setEmail(createUserRequestDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(createUserRequestDto.getPassword()));
        userRepository.save(newUser);
        return userDtoMapper.userToUserDto(newUser);
    }

    @Transactional
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }
}
