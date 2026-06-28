package com.constitution.awareness.repository;

import com.constitution.awareness.entity.QuizQuestion;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizQuestionRepository extends JpaRepository<QuizQuestion, Long> {
    List<QuizQuestion> findByTopicId(Long topicId);
}
