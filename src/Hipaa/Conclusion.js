import React from "react";

const HIPAAConclusion = () => {
  return (
    <div>
      <h1>Conclusion</h1>

      <Section
        title="New Responsibilities Under HIPAA"
        content="HIPAA regulations require new behavior from health care professional and health care facilities. Close coordination with other partners in health care delivery and reimbursement is mandatory to assure a continuous process of patient privacy."
      />

      <Section
        title="Patient Control Over Health Information"
        content="Restrictions and the ability to amend IIHI give patients new control over their health information. Health care professionals may be challenged. Involving patients as active participants in their care will dispel and avoid potential problems."
      />

      <Section
        title="Administrator Responsibilities"
        content="Administrators are advised to be sure staff is well-trained and knowledgeable about the requirements of HIPAA. Similarly, they many want to scrutinize day- to-day practices to evaluate whether violations of patient rights are occurring."
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

export default HIPAAConclusion;
