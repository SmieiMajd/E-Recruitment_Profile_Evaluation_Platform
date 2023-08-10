package com.recrtement.back.repo;

import com.recrtement.back.model.exams.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category,Long> {

}
