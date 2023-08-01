package com.github.mattinfern0.todoaholic.server.users.mappers;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import com.github.mattinfern0.todoaholic.server.users.dtos.UserDto;
import org.mapstruct.Mapper;

@Mapper()
public interface UserDtoMapper {
    UserDto userToUserDto(User user);
}
