# TalentSphere AI — Business Rules & Decision Logic

## 1. Candidate Ranking Algorithm
The overall **AI Fit Score** is calculated through a calibrated multi-factor model:
$$\text{Fit Score} = (W_{\text{skills}} \times S_{\text{skills}}) + (W_{\text{exp}} \times S_{\text{exp}}) + (W_{\text{proj}} \times S_{\text{proj}}) + (W_{\text{oa}} \times S_{\text{oa}}) + (W_{\text{cons}} \times S_{\text{cons}})$$
Where default weights are:
- Skills: 30%
- Experience Relevance: 25%
- Project Evidence: 20%
- Online Assessment (OA): 15%
- Resume / Evidence Consistency: 10%

Recruiters can adjust these weights per requisition (e.g. prioritizing OA for early-career roles or experience for staff roles).

## 2. Recommendation Classes
- `PROCEED`: Candidate achieves $\ge 85\%$ fit score with verified evidence and solid OA results.
- `HIGH_POTENTIAL`: Candidate demonstrates strong core capabilities ($\ge 80\%$) with moderate external proof.
- `NEEDS_REVIEW`: Candidate possesses strong resume claims but shows discrepancy with practical evidence (`NEEDS_VERIFICATION`).
- `DO_NOT_PROCEED`: Candidate fails to meet non-negotiable job requirements or achieves $< 60\%$ in assessment.

## 3. Resume vs Evidence Discrepancy Principle
When a resume claims advanced competency in a skill (e.g., Kubernetes) but external project artifacts or OA metrics show minimal supporting data:
- The system labels the skill as `NEEDS_VERIFICATION`.
- The system **never** accuses the candidate of fraud or lying.
- The system automatically generates a targeted interview question in the **AI Interview Brief** so the panel can objectively evaluate the candidate during technical screening.
