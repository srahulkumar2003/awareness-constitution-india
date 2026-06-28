package com.constitution.awareness.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "survey_responses")
public class SurveyResponse {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long questionId;
    private String response;
    private String userType;
    private LocalDateTime createdAt = LocalDateTime.now();

    public SurveyResponse() {}
    public SurveyResponse(Long questionId, String response, String userType) { this.questionId = questionId; this.response = response; this.userType = userType; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getQuestionId() { return questionId; }
    public void setQuestionId(Long questionId) { this.questionId = questionId; }
    public String getResponse() { return response; }
    public void setResponse(String response) { this.response = response; }
    public String getUserType() { return userType; }
    public void setUserType(String userType) { this.userType = userType; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
