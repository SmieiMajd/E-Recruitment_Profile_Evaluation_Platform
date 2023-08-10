package com.recrtement.back.services.implement;

import com.recrtement.back.model.User;
import com.recrtement.back.model.userRole;
import com.recrtement.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class userServiceImpl implements UserService {

    @Autowired
    private com.recrtement.back.repo.userRepository userRepository;

    @Autowired
    private com.recrtement.back.repo.roleRepository roleRepository;
    @Override
    public User createUser(User user, Set<userRole> userRoles) throws Exception {

        User local =this.userRepository.findByuserName(user.getUserName());

        if(local !=null)
        {
            System.out.println("User already present");
            throw  new Exception("User already present");
        }
        else
        {
            for(userRole ur:userRoles)
            {
                roleRepository.save(ur.getRole());
            }
            user.getUserRoles().addAll(userRoles);
            local=this.userRepository.save(user);
        }
        return local;
    }

    @Override
    public User getUser(String uname) {
        return this.userRepository.findByuserName(uname);
    }

    @Override
    public void deleteUser(Long userId) {
        this.userRepository.deleteById(userId);
    }
    @Override
    public List<User> getAllUsers() {
        return this.userRepository.findAll();
    }
    @Override
    public List<User> getAllCandidates() {
        return this.userRepository.findAll()
                .stream()
                .filter(user -> user.getUserRoles()
                        .stream()
                        .anyMatch(userRole -> userRole.getRole().getRoleName().equals("CONDIDAT")))
                .collect(Collectors.toList());
    }
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElse(null);
    }

}
