package com.constitution.awareness.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_history")
public class ChatHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(columnDefinition = "TEXT")
    private String userQuestion;
    @Column(columnDefinition = "TEXT")
    private String aiAnswer;
    private LocalDateTime createdAt = LocalDateTime.now();

    public ChatHistory() {}
    public ChatHistory(String userQuestion, String aiAnswer) { this.userQuestion = userQuestion; this.aiAnswer = aiAnswer; }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getUserQuestion() { return userQuestion; }
    public void setUserQuestion(String userQuestion) { this.userQuestion = userQuestion; }
    public String getAiAnswer() { return aiAnswer; }
    public void setAiAnswer(String aiAnswer) { this.aiAnswer = aiAnswer; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
