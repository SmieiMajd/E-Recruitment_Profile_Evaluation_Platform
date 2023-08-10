package com.recrtement.back.model;

import javax.persistence.Entity;

@Entity
public class Recruter extends User {

    private String companyName;
    private String companyWebSite;

    public Recruter() {}

    public Recruter(Long id, String userName, String password, String fName, String lname, String email, String phone, String sentiment ,String adress, boolean enabled, String companyName,String companyWebSite, String githubRepos ) {
        super(id, userName, password, fName, lname, email, phone, enabled,adress,sentiment,githubRepos );
        this.companyName = companyName;
        this.companyWebSite = companyWebSite ;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }
}
