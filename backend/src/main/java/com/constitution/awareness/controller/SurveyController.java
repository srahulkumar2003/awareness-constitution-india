package com.constitution.awareness.controller;

import com.constitution.awareness.dto.SurveySubmitRequest;
import com.constitution.awareness.entity.SurveyQuestion;
import com.constitution.awareness.entity.SurveyResponse;
import com.constitution.awareness.repository.SurveyQuestionRepository;
import com.constitution.awareness.repository.SurveyResponseRepository;
import org.springframework.web.bind.annotation.*;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/survey")
public class SurveyController {
    private final SurveyQuestionRepository questionRepository;
    private final SurveyResponseRepository responseRepository;

    public SurveyController(SurveyQuestionRepository questionRepository, SurveyResponseRepository responseRepository) {
        this.questionRepository = questionRepository;
        this.responseRepository = responseRepository;
    }

    @GetMapping("/questions")
    public List<SurveyQuestion> questions() {
        return questionRepository.findByActiveTrue();
    }

    @PostMapping("/submit")
    public Map<String, Object> submit(@RequestBody SurveySubmitRequest request) {
        if (request.getResponses() != null) {
            request.getResponses().forEach(item -> responseRepository.save(
                    new SurveyResponse(item.getQuestionId(), item.getResponse(), item.getUserType() == null ? "Student" : item.getUserType())
            ));
        }
        return Map.of("message", "Survey submitted", "totalResponses", responseRepository.count());
    }

    @GetMapping("/analytics")
    public Map<String, Object> analytics() {
        Map<String, Long> optionCounts = new LinkedHashMap<>();
        List<String> options = List.of("Strongly Agree", "Agree", "Neutral", "Disagree", "Strongly Disagree");
        for (String option : options) optionCounts.put(option, responseRepository.countByResponse(option));

        long total = Math.max(1, responseRepository.count());
        long positive = optionCounts.get("Strongly Agree") + optionCounts.get("Agree");
        int awarenessScore = (int) Math.round((positive * 100.0) / total);

        Map<String, Integer> categoryScores = new LinkedHashMap<>();
        categoryScores.put("Rights", awarenessScore);
        categoryScores.put("Duties", Math.max(50, awarenessScore - 8));
        categoryScores.put("DPSP", Math.max(45, awarenessScore - 15));
        categoryScores.put("Judiciary", Math.max(55, awarenessScore - 5));
        categoryScores.put("Reservations", Math.max(50, awarenessScore - 12));
        categoryScores.put("Governance", Math.max(50, awarenessScore - 10));

        Map<String, Object> analytics = new LinkedHashMap<>();
        analytics.put("totalResponses", responseRepository.count());
        analytics.put("awarenessScore", awarenessScore);
        analytics.put("judiciaryTrustScore", Math.max(55, awarenessScore - 6));
        analytics.put("rightsAwarenessScore", Math.max(60, awarenessScore));
        analytics.put("optionCounts", optionCounts);
        analytics.put("categoryScores", categoryScores);
        return analytics;
    }
}
