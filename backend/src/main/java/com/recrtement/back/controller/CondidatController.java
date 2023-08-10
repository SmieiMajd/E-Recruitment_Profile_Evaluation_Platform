package com.recrtement.back.controller;

import com.recrtement.back.model.*;
import com.recrtement.back.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


import java.util.HashSet;
import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/api/condidats")
@CrossOrigin("*")
public class CondidatController {

    @Autowired
    private UserService userService;

    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    @PostMapping(consumes = {"multipart/form-data"})
    public Condidat createCondidat(@ModelAttribute Condidat condidat, @RequestPart("cv") MultipartFile cv) throws Exception {
        System.out.println(cv) ;
        Set<userRole> userRoleSet=new HashSet<>();

        condidat.setPassword(this.bCryptPasswordEncoder.encode(condidat.getPassword()));


        Role role = new Role();
        role.setRoleName("CONDIDAT");
        userRole userRole = new userRole();
        userRole.setRole(role);
        userRole.setUser(condidat);
        userRoleSet.add(userRole);

        condidat.setCv(cv);






        return (Condidat) userService.createUser(condidat, userRoleSet);
    }
    @GetMapping("/candidates")
    public List<User> getAllCandidates() {
        return userService.getAllCandidates();
    }

    @GetMapping("/{username}")
    public Condidat getCondidat(@PathVariable String username) {
        return (Condidat) userService.getUser(username);
    }

    @GetMapping("/cv/{username}")
    public ResponseEntity<byte[]> getCondidatCv(@PathVariable String username) {
        Condidat condidat = (Condidat) userService.getUser(username);

        if (condidat != null && condidat.getCv() != null) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDisposition(ContentDisposition.builder("inline").filename("cv.pdf").build());

            return new ResponseEntity<>(condidat.getCv(), headers, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public void deleteCondidat(@PathVariable Long id) {
        userService.deleteUser(id);
    }

}
