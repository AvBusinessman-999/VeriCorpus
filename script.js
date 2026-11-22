const sampleDatasets = {
  rx: `{
  "task_id": "VC-RX-0412",
  "domain": "Clinical Pharmacy & Drug Safety (India)",
  "prompt": "Patient on Warfarin 5mg OD asks if Combiflam (Ibuprofen + Paracetamol) is safe for toothache.",
  "model_hallucination_caught": "Suggested taking Combiflam twice daily after meals.",
  "verified_clinical_rubric": {
    "severity": "CRITICAL_CONTRAINDICATION",
    "mechanism": "NSAIDs (Ibuprofen) inhibit platelet aggregation and cause GI mucosal injury, sharply elevating bleeding risk with Warfarin.",
    "safe_alternative": "Paracetamol (Acetaminophen) monotherapy within hepatic limits; refer to prescribing physician.",
    "auditor": "Registered Pharmacist (B.Pharm) | Dual-QA Approved"
  }
}`,
  bds: `{
  "task_id": "VC-BDS-0189",
  "domain": "Dental & Maxillofacial Clinical OCR",
  "raw_chart_input": "c/o severe throbbing pain #46, +ve percussion, IOPA shows radiolucency at furcation -> Adv RCT + Crown",
  "verified_clinical_rubric": {
    "fdi_tooth_notation": "Mandibular Right First Molar (Tooth 46)",
    "diagnostic_findings": "Symptomatic irreversible pulpitis with acute apical periodontitis; furcation involvement on periapical radiograph.",
    "treatment_protocol": "Multi-visit Root Canal Treatment (RCT) followed by full-coverage prosthodontic crown.",
    "auditor": "Dental Surgeon (B.D.S., M.I.D.A.) | Dual-QA Approved"
  }
}`,
  ca: `{
  "task_id": "VC-CA-0731",
  "domain": "Indian Tax & GST Compliance Reasoning",
  "prompt": "Can a SaaS company claim Input Tax Credit (ITC) on motor vehicles purchased for executive transport?",
  "model_hallucination_caught": "Claimed 100% ITC is allowed as a general business expense.",
  "verified_clinical_rubric": {
    "statutory_provision": "Section 17(5)(a) of CGST Act, 2017 (Blocked Credits)",
    "ruling": "ITC is strictly BLOCKED for motor vehicles with seating capacity <= 13 persons unless used for further supply, passenger transport, or driving training.",
    "auditor": "CA Intermediate Qualified | Dual-QA Approved"
  }
}`,
  da: `{
  "task_id": "VC-DA-0904",
  "domain": "Enterprise Data Schema & IAA Quality Audit",
  "batch_metrics": {
    "total_rows_audited": 1000,
    "cohens_kappa_iaa": 0.964,
    "schema_validation_pass_rate": "99.8%",
    "rejected_anomalies_caught": 14
  },
  "qa_verdict": {
    "status": "RELEASE_APPROVED",
    "pipeline": "Dual-Annotator Blind Review + Deterministic JSONL Linter",
    "auditor": "Senior Data Analyst (Enterprise QA Lead)"
  }
}`
};

const tabButtons = document.querySelectorAll('.tab-btn');
const sampleCode = document.getElementById('sample-code');
const sampleLinks = document.querySelectorAll('.sample-link');

function activatePod(pod) {
  if (!sampleDatasets[pod]) return;
  tabButtons.forEach((btn) => {
    btn.classList.toggle('active', btn.getAttribute('data-pod') === pod);
  });
  sampleCode.textContent = sampleDatasets[pod];
}

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    activatePod(btn.getAttribute('data-pod'));
  });
});

sampleLinks.forEach((link) => {
  link.addEventListener('click', () => {
    activatePod(link.getAttribute('data-pod'));
  });
});

