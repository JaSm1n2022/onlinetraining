import React from "react";

const HIPAAResearch = () => {
  return (
    <div>
      <h1>HIPAA and Research</h1>

      <Section
        title="Patient Authorization"
        content="Patients must sign an authorization to allow their information to be included in research projects. Information can only be disclosed in accordance with a research protocol approved by an institutional review board. All identifying individual information must be removed."
      />

      <Section
        title="Challenges for Researchers"
        content="One difficulty researchers may experience is the lack of specific guidance from HIPAA regarding construction of compliant, de-identified data sets, at this point researchers are developing strategies that they believe comply with the intent of privacy under HIPAA."
      />

      <Section
        title="Importance of Medical Data Analysis"
        content="Ongoing analysis of medical information is critical for developing strategies to improve patient outcomes and reduce medical errors."
      />

      <Section
        title="HIPAA-Compliant Data Usage"
        content="Information that can be used in compliance with HIPAA includes:
        - Gender, race, ethnicity, marital status
        - Dates of treatment if reported in years
        - Age (for individuals older than 60, one must use 60+)
        - Zip code if more than 20,000 people reside in that zip code."
      />
    </div>
  );
};

const Section = ({ title, content }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

export default HIPAAResearch;
