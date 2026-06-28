package com.constitution.awareness.controller;

import com.constitution.awareness.dto.AiRequest;
import com.constitution.awareness.dto.AiResponse;
import com.constitution.awareness.service.GeminiService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiController {
    private final GeminiService geminiService;

    public AiController(GeminiService geminiService) {
        this.geminiService = geminiService;
    }

    @PostMapping("/ask")
    public AiResponse ask(@RequestBody AiRequest request) {
        String question = request.getQuestion() == null || request.getQuestion().isBlank()
                ? "Explain the Indian Constitution"
                : request.getQuestion();
        GeminiService.Reply reply = geminiService.ask(question, request.getContext());
        return new AiResponse(reply.answer(), reply.aiApiUsed());
    }
}
