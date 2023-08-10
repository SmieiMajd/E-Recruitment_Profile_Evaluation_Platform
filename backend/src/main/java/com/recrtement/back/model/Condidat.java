package com.recrtement.back.model;

import org.springframework.web.multipart.MultipartFile;

import javax.persistence.*;
import java.io.IOException;
import java.util.Set;

@Entity
@DiscriminatorValue("CONDIDAT")
public class Condidat extends User {

    private String gender;
    private int age;
    private String diplome;
    private String yearsOfExperience;
    @Column(length=100000) // définit la longueur maximale de la lettre de motivation
    private String coverLetter;
    @Column(length=100000) // définit la longueur maximale de la lettre de motivation
    private String aboutMe;
    @Lob
    @Column(length=1000000000) // define maximum length of the CV file
    private byte[] cv;
    @Column(length=100000) // définit la longueur maximale de la lettre de motivation
    private String linkedInLink;
    @Column(length=100000) //
    private String githubLink;



    public Condidat() {
    }

    public Condidat(Long id, String userName, String password, String fName, String lname, String email, String phone,String sentiment ,String adress, boolean enabled, String gender, int age, String diplome ,String yearsOfExperience, String coverLetter,String aboutMe ,byte[] cv,String linkedInLink, String githubLink, String githubRepos ) {
        super(id, userName, password, fName, lname, email, phone, enabled,adress,sentiment,githubRepos );
        this.gender = gender;
        this.age = age;
        this.diplome = diplome;
        this.yearsOfExperience= yearsOfExperience ;
        this.coverLetter= coverLetter;
        this.aboutMe = aboutMe ;
        this.cv = cv;
        this.linkedInLink = linkedInLink;
        this.githubLink = Condidat.this.githubLink;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getDiplome() {
        return diplome;
    }

    public void setDiplome(String diplome) {
        this.diplome = diplome;
    }
    public String getYearsOfExperience() {
        return yearsOfExperience;
    }

    public void setYearsOfExperience(String yearsOfExperience) {
        this.yearsOfExperience = yearsOfExperience;
    }

    public String getCoverLetter() {
        return coverLetter;
    }

    public void setCoverLetter(String coverLetter) {
        this.coverLetter = coverLetter;
    }

    public byte[] getCv() {
        return cv;
    }

    public void setCv(MultipartFile cv)
        throws IOException {
            if (cv != null && !cv.isEmpty()) {
                this.cv= cv.getBytes();
            }
        }




    public String getAboutMe() {
        return aboutMe;
    }

    public void setAboutMe(String aboutMe) {
        this.aboutMe = aboutMe;
    }

    public String getLinkedInLink() {
        return linkedInLink;
    }

    public void setLinkedInLink(String linkedInLink) {
        this.linkedInLink = linkedInLink;
    }

    public String getGithubLink() {
        return githubLink;
    }

    public void setGithubLink(String githubLink) {
        this.githubLink = githubLink;
    }
}
