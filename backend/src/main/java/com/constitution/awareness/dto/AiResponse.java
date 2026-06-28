package com.constitution.awareness.dto;

public class AiResponse {
    private String answer;
    private boolean aiApiUsed;

    public AiResponse(String answer) {
        this.answer = answer;
        this.aiApiUsed = false;
    }

    public AiResponse(String answer, boolean aiApiUsed) {
        this.answer = answer;
        this.aiApiUsed = aiApiUsed;
    }

    public String getAnswer() { return answer; }
    public void setAnswer(String answer) { this.answer = answer; }
    public boolean isAiApiUsed() { return aiApiUsed; }
    public void setAiApiUsed(boolean aiApiUsed) { this.aiApiUsed = aiApiUsed; }
}
