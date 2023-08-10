package com.recrtement.back.controller;

import com.recrtement.back.model.Role;
import com.recrtement.back.model.User;
import com.recrtement.back.model.userRole;
import com.recrtement.back.repo.roleRepository;

import com.recrtement.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class userController {

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    private UserService userService;

    @Autowired
    private roleRepository RoleRepository;

    private com.recrtement.back.repo.userRepository userRepository;
    @PostMapping("/")
    public User createUser(@RequestBody User user) throws Exception {

       user.setProfile("default.png");
       //encoding password with bcryptpasswordencoder
        user.setPassword(this.bCryptPasswordEncoder.encode(user.getPassword()));


       Set<userRole> userRoleSet=new HashSet<>();



        Role role = new Role();
        role.setRoleName("NORMAL");

        userRole userRole=new userRole();
        userRole.setRole(role);
        userRole.setUser(user);


        userRoleSet.add(userRole);


        return  this.userService.createUser(user,userRoleSet);


    }
    @GetMapping("/getUsersList")
    public List<User> getAllUsers() {
        return this.userService.getAllUsers();
    }


    @GetMapping("/{userName}")
    public User getUser(@PathVariable("userName") String uname)
    {
        System.out.println(uname);

        return this.userService.getUser(uname);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long uid)
    {
        System.out.println(uid);
         this.userService.deleteUser(uid);
    }

}
