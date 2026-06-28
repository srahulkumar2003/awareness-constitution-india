package com.constitution.awareness.controller;

import com.constitution.awareness.entity.QuizQuestion;
import com.constitution.awareness.repository.QuizQuestionRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {
    private final QuizQuestionRepository repository;

    public QuizController(QuizQuestionRepository repository) {
        this.repository = repository;
    }

    @GetMapping("/{topicId}")
    public List<QuizQuestion> getByTopic(@PathVariable Long topicId) {
        return repository.findByTopicId(topicId);
    }

    @PostMapping("/questions")
    public QuizQuestion create(@RequestBody QuizQuestion question) {
        return repository.save(question);
    }
}
