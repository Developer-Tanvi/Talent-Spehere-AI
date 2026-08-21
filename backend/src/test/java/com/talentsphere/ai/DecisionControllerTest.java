package com.talentsphere.ai;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Map;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class DecisionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void testGetDecisionIntelligence() throws Exception {
        mockMvc.perform(get("/api/v1/decisions/candidate/cand-001")
                        .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.candidateId").value("cand-001"))
                .andExpect(jsonPath("$.data.aiRecommendation").value("PROCEED"));
    }

    @Test
    void testRecordRecruiterOverride() throws Exception {
        Map<String, String> payload = Map.of(
                "candidateId", "cand-001",
                "action", "Fast-track to Executive Loop",
                "reason", "Stellar OA score and GitHub project portfolio.",
                "recruiterName", "Sarah Jenkins"
        );

        mockMvc.perform(post("/api/v1/decisions/override")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(payload)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.isOverridden").value(true));
    }
}
