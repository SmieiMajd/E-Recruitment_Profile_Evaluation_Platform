package com.recrtement.back;

import com.recrtement.back.model.Role;
import com.recrtement.back.model.User;
import com.recrtement.back.model.userRole;
import com.recrtement.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.HashSet;
import java.util.Set;

@SpringBootApplication
public class RecrutementApplication implements CommandLineRunner {

    public static void main(String[] args) {
        SpringApplication.run(RecrutementApplication.class, args);
    }

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Override
    public void run(String... args) throws Exception {

        System.out.println("Project Running");
/*        User user=new User();
        user.setfName("SMIEI");
        user.setLname("Majd");
        user.setEmail("smiei.majd@gmail.com");
        user.setPassword(this.bCryptPasswordEncoder.encode("020820bochra"));
        user.setUserName("Majd SMIEI");
        user.setPhone("+21629611556");
        user.setProfile("default.png");

        Role role = new Role();
        role.setRoleId(1);
        role.setRoleName("ADMIN");
        Set<userRole> userRoleSet=new HashSet<>();
        userRole userRole=new userRole();
        userRole.setRole(role);
        userRole.setUser(user);
        userRoleSet.add(userRole);
        User user1 = this.userService.createUser(user,userRoleSet);
        System.out.println(user1);*/
    }
}
