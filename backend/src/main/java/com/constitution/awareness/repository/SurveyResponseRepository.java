package com.constitution.awareness.repository;

import com.constitution.awareness.entity.SurveyResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SurveyResponseRepository extends JpaRepository<SurveyResponse, Long> {
    long countByResponse(String response);
    List<SurveyResponse> findByQuestionId(Long questionId);
}
