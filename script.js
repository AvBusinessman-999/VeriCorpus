const sampleViewer = {
  // 1. Data organized inside the object
  activePod: 'rx',
  datasets: {
    rx: {
      iaa: '99.4%',
      json: `{
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
}`
    },
    bds: {
      iaa: '99.1%',
      json: `{
  "task_id": "VC-BDS-0189",
  "domain": "Dental & Maxillofacial Clinical OCR",
  "raw_chart_input": "c/o severe throbbing pain #46, +ve percussion, IOPA shows radiolucency at furcation -> Adv RCT + Crown",
  "verified_clinical_rubric": {
    "fdi_tooth_notation": "Mandibular Right First Molar (Tooth 46)",
    "diagnostic_findings": "Symptomatic irreversible pulpitis with acute apical periodontitis; furcation involvement on periapical radiograph.",
    "treatment_protocol": "Multi-visit Root Canal Treatment (RCT) followed by full-coverage prosthodontic crown.",
    "auditor": "Dental Surgeon (B.D.S., M.I.D.A.) | Dual-QA Approved"
  }
}`
    },
    ca: {
      iaa: '99.6%',
      json: `{
  "task_id": "VC-CA-0731",
  "domain": "Indian Tax & GST Compliance Reasoning",
  "prompt": "Can a SaaS company claim Input Tax Credit (ITC) on motor vehicles purchased for executive transport?",
  "model_hallucination_caught": "Claimed 100% ITC is allowed as a general business expense.",
  "verified_clinical_rubric": {
    "statutory_provision": "Section 17(5)(a) of CGST Act, 2017 (Blocked Credits)",
    "ruling": "ITC is strictly BLOCKED for motor vehicles with seating capacity <= 13 persons unless used for further supply, passenger transport, or driving training.",
    "auditor": "CA Intermediate Qualified | Dual-QA Approved"
  }
}`
    },
    da: {
      iaa: '99.8%',
      json: `{
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
    }
  },

  // 2. DOM references & Event listeners grouped as methods
  init() {
    this.tabButtons = document.querySelectorAll('.tab-btn');
    this.sampleCode = document.getElementById('sample-code');
    this.qaBadge = document.getElementById('qa-badge');
    this.sampleLinks = document.querySelectorAll('.sample-link');

    this.tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => this.switchPod(btn.getAttribute('data-pod')));
    });

    this.sampleLinks.forEach((link) => {
      link.addEventListener('click', () => this.switchPod(link.getAttribute('data-pod')));
    });
  },

  switchPod(pod) {
    const selected = this.datasets[pod];
    if (!selected) return;

    this.activePod = pod;
    this.tabButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.getAttribute('data-pod') === pod);
    });
    this.sampleCode.textContent = selected.json;
    if (this.qaBadge) {
      this.qaBadge.textContent = `IAA Score: ${selected.iaa} • JSONL`;
    }
  }
};

// Start the object machine
sampleViewer.init();


function Book(title, author, pages, read) {
  if(!new.target) {
    throw Error("You must use 'new'");
  }
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

Book.prototype.info = function() {
  const status = this.read ? "already read" : "not read yet";
  return `${this.title} by ${this.author}, ${this.pages} pages, ${status}`;
}

function createPodQuote(domain, ratePerRow) {
  let internalMargin = 0.60; // Completely private via closure!

  const calculateClientPrice = (rows) => rows * ratePerRow;
  const calculateNetProfit = (rows) => calculateClientPrice(rows) * internalMargin;

  // Only expose what you want public:
  return { domain, calculateClientPrice, calculateNetProfit };
}

const rxQuote = createPodQuote('Clinical Pharmacy', 3.5);

const qaController = (() => {
  const minThreshold = 99.0; // Private constant
  const checkBatch = (score) => score >= minThreshold;
  return { checkBatch };
})();

qaController.checkBatch(99.4); // true
