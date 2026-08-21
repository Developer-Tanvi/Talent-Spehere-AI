package com.talentsphere.ai.repository;

import com.talentsphere.ai.entity.AssessmentQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssessmentQuestionRepository extends JpaRepository<AssessmentQuestion, Long> {
    List<AssessmentQuestion> findByCategoryIgnoreCase(String category);
    List<AssessmentQuestion> findByDifficultyIgnoreCase(String difficulty);
}
