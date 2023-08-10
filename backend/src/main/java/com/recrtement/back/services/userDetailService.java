package com.recrtement.back.services;

import org.springframework.security.core.userdetails.UserDetails;

public interface userDetailService {
    public UserDetails loadUserByUsername(String s);
}
