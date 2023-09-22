package com.github.mattinfern0.todoaholic.server.common.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.List;

@Entity
@Table(name = "authority")
public class Authority {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    Long id;

    @NotBlank
    @Column(name = "internal_name", unique = true)
    String internalName;

    @ManyToMany(mappedBy = "authorities")
    List<User> users;
}
