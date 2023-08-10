package com.recrtement.back.repo;

import com.recrtement.back.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface userRepository extends JpaRepository<User,Long> {


    User findByuserName(String userName);
}
