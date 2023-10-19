package com.github.mattinfern0.todoaholic.server.users;

import com.github.mattinfern0.todoaholic.server.common.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);

    Optional<User> findByFirebaseUid(String uid);
}
