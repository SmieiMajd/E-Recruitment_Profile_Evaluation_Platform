package com.recrtement.back.controller;

import com.recrtement.back.model.Recruter;
import com.recrtement.back.model.Role;
import com.recrtement.back.model.userRole;
import com.recrtement.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashSet;
import java.util.Set;

@RestController
@RequestMapping("/api/recruters")
@CrossOrigin("*")
public class RecruterController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping
    public Recruter createRecruter(@RequestBody Recruter recruter) throws Exception {
        Set<userRole> userRoleSet=new HashSet<>();

        recruter.setPassword(this.bCryptPasswordEncoder.encode(recruter.getPassword()));

        Role role = new Role();
        role.setRoleName("RECRUTER");

        userRole userRole=new userRole();
        userRole.setRole(role);
        userRole.setUser(recruter);


        userRoleSet.add(userRole);
        return (Recruter) userService.createUser(recruter,userRoleSet);
    }

    @GetMapping("/{username}")
    public Recruter getRecruter(@PathVariable String username) {
        return (Recruter) userService.getUser(username);
    }

    @DeleteMapping("/{id}")
    public void deleteRecruter(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
