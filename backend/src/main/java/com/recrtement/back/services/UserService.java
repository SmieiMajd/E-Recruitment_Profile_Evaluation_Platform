package com.recrtement.back.services;

import com.recrtement.back.model.User;
import com.recrtement.back.model.userRole;

import java.util.List;
import java.util.Set;

public interface UserService {
    public User createUser(User user, Set<userRole> userRoles) throws Exception;
    public User getUser(String uname);
    public List<User> getAllUsers();
    public List<User> getAllCandidates();



    public void deleteUser(Long userId);

    User getUserById(Long userId);
}
