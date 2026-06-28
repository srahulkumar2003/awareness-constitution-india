package com.constitution.awareness.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "survey_questions")
public class SurveyQuestion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String question;
    private String category;
    private Boolean active = true;

    public SurveyQuestion() {}
    public SurveyQuestion(String question, String category) { this.question = question; this.category = category; this.active = true; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getQuestion() { return question; }
    public void setQuestion(String question) { this.question = question; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }
}
