package com.recrtement.back.repo;
import com.recrtement.back.model.Recruter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RecruterRepository extends JpaRepository<Recruter, Long> {
}
