package com.constitution.awareness.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "constitution_topics")
public class ConstitutionTopic {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String slug;
    private String title;
    @Column(columnDefinition = "TEXT")
    private String shortDescription;
    @Column(columnDefinition = "TEXT")
    private String fullDescription;
    @Column(columnDefinition = "TEXT")
    private String articles;
    @Column(columnDefinition = "TEXT")
    private String realExample;
    @Column(columnDefinition = "TEXT")
    private String caseReference;
    private String icon;

    public ConstitutionTopic() {}

    public ConstitutionTopic(String slug, String title, String shortDescription, String fullDescription, String articles, String realExample, String caseReference, String icon) {
        this.slug = slug;
        this.title = title;
        this.shortDescription = shortDescription;
        this.fullDescription = fullDescription;
        this.articles = articles;
        this.realExample = realExample;
        this.caseReference = caseReference;
        this.icon = icon;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSlug() { return slug; }
    public void setSlug(String slug) { this.slug = slug; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getShortDescription() { return shortDescription; }
    public void setShortDescription(String shortDescription) { this.shortDescription = shortDescription; }
    public String getFullDescription() { return fullDescription; }
    public void setFullDescription(String fullDescription) { this.fullDescription = fullDescription; }
    public String getArticles() { return articles; }
    public void setArticles(String articles) { this.articles = articles; }
    public String getRealExample() { return realExample; }
    public void setRealExample(String realExample) { this.realExample = realExample; }
    public String getCaseReference() { return caseReference; }
    public void setCaseReference(String caseReference) { this.caseReference = caseReference; }
    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
