package com.constitution.awareness.controller;

import com.constitution.awareness.entity.ConstitutionTopic;
import com.constitution.awareness.repository.ConstitutionTopicRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/topics")
public class TopicController {
    private final ConstitutionTopicRepository repository;

    public TopicController(ConstitutionTopicRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    public List<ConstitutionTopic> allTopics() {
        return repository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConstitutionTopic> getTopic(@PathVariable Long id) {
        return repository.findById(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ConstitutionTopic create(@RequestBody ConstitutionTopic topic) {
        return repository.save(topic);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ConstitutionTopic> update(@PathVariable Long id, @RequestBody ConstitutionTopic updated) {
        return repository.findById(id).map(topic -> {
            topic.setTitle(updated.getTitle());
            topic.setSlug(updated.getSlug());
            topic.setShortDescription(updated.getShortDescription());
            topic.setFullDescription(updated.getFullDescription());
            topic.setArticles(updated.getArticles());
            topic.setRealExample(updated.getRealExample());
            topic.setCaseReference(updated.getCaseReference());
            topic.setIcon(updated.getIcon());
            return ResponseEntity.ok(repository.save(topic));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (!repository.existsById(id)) return ResponseEntity.notFound().build();
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
