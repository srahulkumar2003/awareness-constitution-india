package com.constitution.awareness.config;

import com.constitution.awareness.entity.ConstitutionTopic;
import com.constitution.awareness.entity.SurveyQuestion;
import com.constitution.awareness.repository.ConstitutionTopicRepository;
import com.constitution.awareness.repository.SurveyQuestionRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class DataSeeder {
    @Bean
    CommandLineRunner seedData(ConstitutionTopicRepository topicRepository, SurveyQuestionRepository questionRepository) {
        return args -> {
            if (topicRepository.count() == 0) {
                topicRepository.saveAll(List.of(
                        new ConstitutionTopic("preamble", "Preamble", "The soul and guiding vision of the Constitution.", "The Preamble declares India as a Sovereign, Socialist, Secular, Democratic Republic and promises Justice, Liberty, Equality and Fraternity.", "Introductory statement", "It helps citizens understand the values behind laws and governance.", "Kesavananda Bharati v. State of Kerala, 1973", "ScrollText"),
                        new ConstitutionTopic("fundamental-rights", "Fundamental Rights", "Basic rights guaranteed to citizens and people by the Constitution.", "Fundamental Rights protect equality, freedom, life, liberty, religious freedom, cultural rights and constitutional remedies.", "Articles 12 to 35, including Article 14, 19, 21 and 32", "A citizen can approach courts if state action violates basic rights.", "Maneka Gandhi v. Union of India, 1978", "ShieldCheck"),
                        new ConstitutionTopic("fundamental-duties", "Fundamental Duties", "Moral responsibilities of citizens towards the nation.", "Fundamental Duties remind citizens to respect the Constitution, national symbols, public property, harmony and scientific temper.", "Article 51A", "Respecting the national flag and protecting public property are civic responsibilities.", "AIIMS Students Union v. AIIMS, 2001", "BadgeCheck"),
                        new ConstitutionTopic("dpsp", "Directive Principles of State Policy", "Guidelines for building social and economic justice.", "DPSPs guide the State to create policies for welfare, equal opportunity, health, education and fair distribution of resources.", "Articles 36 to 51", "Policies related to education, public health and panchayats are influenced by DPSP.", "Minerva Mills v. Union of India, 1980", "Landmark"),
                        new ConstitutionTopic("separation-of-powers", "Separation of Powers", "Power is divided among Legislature, Executive and Judiciary.", "The Constitution creates checks and balances so no single branch of government becomes too powerful.", "Linked to constitutional structure", "Parliament makes laws, government implements them and courts interpret them.", "Indira Nehru Gandhi v. Raj Narain, 1975", "Scale"),
                        new ConstitutionTopic("judiciary", "Judiciary", "Independent courts uphold the Constitution and protect rights.", "The judiciary interprets the Constitution, reviews government action and protects citizens through writs and judgments.", "Articles 124 to 147, Articles 214 to 231, Article 32 and 226", "A citizen can file a writ petition when a fundamental right is violated.", "Kesavananda Bharati v. State of Kerala, 1973", "Gavel"),
                        new ConstitutionTopic("reservations", "Reservations", "Constitutional support for representation and social justice.", "Reservation provisions aim to support historically disadvantaged groups through representation in education, jobs and politics.", "Articles 15, 16, 330 and 332", "Reserved seats and opportunities are used to improve representation.", "Indra Sawhney v. Union of India, 1992", "UsersRound"),
                        new ConstitutionTopic("amendments", "Amendments", "The Constitution can be updated through a legal process.", "Amendments help the Constitution respond to social, political and economic changes while preserving basic structure.", "Article 368", "The 42nd, 44th and 73rd Amendments changed important governance areas.", "Kesavananda Bharati v. State of Kerala, 1973", "FilePenLine"),
                        new ConstitutionTopic("emergency-provisions", "Emergency Provisions", "Special powers during national, state or financial crisis.", "Emergency provisions allow extraordinary action during serious threats, but they must be used carefully to protect democracy.", "Articles 352, 356 and 360", "President's Rule can be imposed in a state under specific conditions.", "S. R. Bommai v. Union of India, 1994", "Siren"),
                        new ConstitutionTopic("federal-structure", "Federal Structure", "Power is shared between Union and State governments.", "India has a federal system with unitary features, distributing powers through Union, State and Concurrent Lists.", "Seventh Schedule and related provisions", "Defence is mainly Union subject, police is State subject, education is in Concurrent List.", "S. R. Bommai v. Union of India, 1994", "Network")
                ));
            }
            if (questionRepository.count() == 0) {
                questionRepository.saveAll(List.of(
                        new SurveyQuestion("Do you think the Indian Constitution adequately protects the rights of all citizens?", "Rights"),
                        new SurveyQuestion("How well do you think the Directive Principles of State Policy are implemented in India?", "DPSP"),
                        new SurveyQuestion("Should the Indian Constitution be amended more frequently to reflect modern values and challenges?", "Amendments"),
                        new SurveyQuestion("Should the Fundamental Duties be made legally enforceable like Fundamental Rights?", "Duties"),
                        new SurveyQuestion("How familiar are you with your Fundamental Rights as per the Indian Constitution?", "Rights"),
                        new SurveyQuestion("Do you believe that the separation of powers between the executive, legislative, and judiciary works effectively?", "Governance"),
                        new SurveyQuestion("How confident are you in the role of the judiciary in upholding the Constitution?", "Judiciary"),
                        new SurveyQuestion("Do you think that the Constitutional provision for reservations is still relevant in today’s society?", "Reservations"),
                        new SurveyQuestion("Should India move towards a Presidential system of governance, away from the current Parliamentary system?", "Governance"),
                        new SurveyQuestion("How important do you think it is for citizens to understand the Constitution?", "Awareness")
                ));
            }
        };
    }
}
