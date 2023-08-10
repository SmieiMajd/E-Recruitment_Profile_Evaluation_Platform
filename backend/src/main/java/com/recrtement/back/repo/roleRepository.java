package com.recrtement.back.repo;

import com.recrtement.back.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface roleRepository extends JpaRepository<Role,Long> {
    }
