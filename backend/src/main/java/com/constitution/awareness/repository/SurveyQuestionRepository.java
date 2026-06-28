package com.constitution.awareness.repository;

import com.constitution.awareness.entity.SurveyQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SurveyQuestionRepository extends JpaRepository<SurveyQuestion, Long> {
    List<SurveyQuestion> findByActiveTrue();
}
