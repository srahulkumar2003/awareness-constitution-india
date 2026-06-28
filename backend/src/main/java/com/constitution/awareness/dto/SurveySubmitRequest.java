package com.constitution.awareness.dto;

import java.util.List;

public class SurveySubmitRequest {
    private List<ResponseItem> responses;

    public List<ResponseItem> getResponses() { return responses; }
    public void setResponses(List<ResponseItem> responses) { this.responses = responses; }

    public static class ResponseItem {
        private Long questionId;
        private String response;
        private String userType;

        public Long getQuestionId() { return questionId; }
        public void setQuestionId(Long questionId) { this.questionId = questionId; }
        public String getResponse() { return response; }
        public void setResponse(String response) { this.response = response; }
        public String getUserType() { return userType; }
        public void setUserType(String userType) { this.userType = userType; }
    }
}
