package com.recrtement.back.repo;

import com.recrtement.back.model.Condidat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CondidatRepository extends JpaRepository<Condidat, Long> {
}
