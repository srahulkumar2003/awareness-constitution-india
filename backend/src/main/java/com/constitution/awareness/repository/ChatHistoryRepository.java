package com.constitution.awareness.repository;

import com.constitution.awareness.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {}
