package com.constitution.awareness.service;

import com.constitution.awareness.entity.ChatHistory;
import com.constitution.awareness.repository.ChatHistoryRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.List;
import java.util.Map;

/**
 * Ask Constitution AI service.
 *
 * Pattern follows the SmartApply Agent project's AiService: try the live
 * Gemini API first when a key is configured, and otherwise fall back to a
 * curated, offline, rule-based reply so the chat agent is always useful,
 * never just an error message. The response always reports whether the
 * live API was actually used (aiApiUsed) so the frontend can show a
 * "Live AI" vs "Offline Tutor" badge.
 */
@Service
public class GeminiService {
    private final String apiKey;
    private final String model;
    private final WebClient webClient;
    private final ChatHistoryRepository chatHistoryRepository;

    public GeminiService(@Value("${gemini.api.key}") String apiKey,
                         @Value("${gemini.model}") String model,
                         ChatHistoryRepository chatHistoryRepository) {
        this.apiKey = apiKey;
        this.model = model;
        this.chatHistoryRepository = chatHistoryRepository;
        this.webClient = WebClient.builder()
                .baseUrl("https://generativelanguage.googleapis.com/v1beta")
                .build();
    }

    /** Simple holder for the answer plus whether the live API produced it. */
    public record Reply(String answer, boolean aiApiUsed) {}

    public Reply ask(String question, String context) {
        if (apiKey == null || apiKey.isBlank()) {
            String answer = curatedReply(question);
            chatHistoryRepository.save(new ChatHistory(question, answer));
            return new Reply(answer, false);
        }

        String prompt = "You are an educational assistant for the project Awareness on Constitution of India. " +
                "Explain Indian Constitution topics in simple language. Structure every answer as: " +
                "Simple Meaning, Why it matters, Real-life example, Related Articles, Related Topics, and Note. " +
                "Do not provide official legal advice. " +
                (context != null && !context.isBlank() ? "The user is currently viewing the '" + context + "' section. " : "") +
                "Question: " + question;

        Map<String, Object> requestBody = Map.of(
                "contents", List.of(
                        Map.of("parts", List.of(Map.of("text", prompt)))
                )
        );

        try {
            Map response = webClient.post()
                    .uri("/models/{model}:generateContent?key={key}", model, apiKey)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(Map.class)
                    .block();

            String answer = extractText(response);
            if (answer == null || answer.isBlank() || answer.startsWith("Could not parse") || answer.startsWith("No text returned")) {
                String fallback = curatedReply(question);
                chatHistoryRepository.save(new ChatHistory(question, fallback));
                return new Reply(fallback, false);
            }
            chatHistoryRepository.save(new ChatHistory(question, answer));
            return new Reply(answer, true);
        } catch (Exception exception) {
            String fallback = curatedReply(question);
            chatHistoryRepository.save(new ChatHistory(question, fallback));
            return new Reply(fallback, false);
        }
    }

    private String extractText(Map response) {
        try {
            List candidates = (List) response.get("candidates");
            Map first = (Map) candidates.get(0);
            Map content = (Map) first.get("content");
            List parts = (List) content.get("parts");
            Map part = (Map) parts.get(0);
            Object text = part.get("text");
            return text == null ? "No text returned from Gemini." : text.toString();
        } catch (Exception exception) {
            return "Could not parse Gemini response.";
        }
    }

    /**
     * Curated, offline Constitutional Tutor reply. Used whenever no Gemini
     * API key is configured, or the live call fails for any reason, so the
     * agent always gives a useful, on-topic answer.
     */
    private String curatedReply(String question) {
        String q = question == null ? "" : question.toLowerCase();

        if (containsAny(q, "duty", "duties", "51a", "responsibility")) {
            return "Fundamental Duties (Article 51A) ask every citizen to respect the Constitution, " +
                    "national symbols and public property, protect the environment, and promote harmony. " +
                    "Related Articles: Article 51A. Note: duties are moral guides, not directly enforced by courts.";
        }
        if (containsAny(q, "dpsp", "directive", "welfare", "state policy")) {
            return "Directive Principles of State Policy (Articles 36 to 51) guide the government towards " +
                    "social and economic justice, covering education, health and equal pay. " +
                    "Related case: Minerva Mills v. Union of India. Note: DPSPs are not directly enforceable in court.";
        }
        if (containsAny(q, "court", "judiciary", "writ", "supreme court", "article 32", "article 226")) {
            return "The Judiciary interprets the Constitution and protects rights through writs under " +
                    "Article 32 and Article 226. Related case: Kesavananda Bharati v. State of Kerala. " +
                    "Note: judicial review keeps the basic structure of the Constitution intact.";
        }
        if (containsAny(q, "preamble", "sovereign", "secular", "fraternity")) {
            return "The Preamble presents India's vision as a Sovereign, Socialist, Secular, Democratic " +
                    "Republic, built on Justice, Liberty, Equality and Fraternity. Related case: " +
                    "Kesavananda Bharati v. State of Kerala recognised the Preamble's importance.";
        }
        if (containsAny(q, "reservation", "backward class", "creamy layer")) {
            return "Reservation policy provides representation for socially and educationally backward " +
                    "classes. Related case: Indra Sawhney v. Union of India set a 50% ceiling and " +
                    "introduced the 'creamy layer' exclusion.";
        }
        if (containsAny(q, "right", "article 14", "article 19", "article 21", "freedom", "equality")) {
            return "Fundamental Rights (Articles 12 to 35) protect citizens from unfair state action, " +
                    "covering equality (Article 14), freedoms (Article 19), life and liberty (Article 21), " +
                    "and constitutional remedies (Article 32). Related case: Maneka Gandhi v. Union of India.";
        }
        return "I can explain Fundamental Rights, Fundamental Duties, DPSP, the Judiciary, the Preamble or " +
                "Reservation policy in simple language with Article references and case law. " +
                "Try asking about one of these topics, or set GEMINI_API_KEY on the backend for open-ended live answers.";
    }

    private boolean containsAny(String text, String... keywords) {
        for (String k : keywords) {
            if (text.contains(k)) return true;
        }
        return false;
    }
}
