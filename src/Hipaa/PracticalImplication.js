import React from "react";

const HIPAAPracticalImplications = () => {
  return (
    <div>
      <h1>Practical Implications of HIPAA</h1>

      <Section
        title="General Implications"
        content="Questions about the implications HIPAA rules have been numerous. Can an office or laboratory have a patient sign in sheet? Can you use a patient’s name to call him into a treatment room? Can the patient’s name be posted outside the hospital door? At this point, there is some agreement about some of these. As long as personal information regarding the patient’s care or procedures to be done remain confidential, names can be outside hospital room doors, patients can be verbally called to treatment rooms, etc. New questions will undoubtedly arise in the future. Staying informed about the rules and regulations concerning HIPAA will be every health care worker’s obligation."
      />

      <Section
        title="Sign-in Sheets and Bedside Charts"
        content="Sign-in sheets, once disallowed, can now be used along with bedside charts as long as reasonable precautions are taken to safeguard patient information. Sign in sheets can only have the name and time; no information about the nature of the appointment can be included. The patient can give consent or may decline to have information given to family members; facility staff is not obligated to verify the identity of relatives."
      />

      <Section
        title="Parental Rights and Exceptions"
        content="HIPAA retains the rights of parents as the personal representative for minor children. There are exceptions, however. Parents may decide that the child and provider have a confidential relationship that excludes the parent from receiving information. A provider may choose to exclude the parent when abuse is suspected or when including the parent would endanger the child."
      />

      <Section
        title="Clergy Visits and Religious Information"
        content="Patients have the right to restrict clergy visits and religious information. If they do allow clergy visits, only their name and location should be provided, not their medical condition."
      />

      <Section
        title="Patient Privacy in Hospitals"
        content="Patients have the right to restrict clergy visits and religious information. If the patient does want the clergy to visit, health care individuals should provide only the name and location of the patient. They should not provide any information about the patient’s medical condition. Further, patients have the right to restrict informing callers or visitors that they are in the hospital. Most patients are asked on admission to the facility if they want such restrictions and, if they do, hospital workers may not acknowledge that a patient is in the hospital even including visitors, florists delivering flowers, etc."
      />

      <Section
        title="Law Enforcement Exceptions"
        content="Some information can be provided to law enforcement without patient consent. Emergency technicians can contact the police at a crime scene and convey nature and location of the crime. Information about a suspicious death may also be reported to the police. HIPAA has a one call rule that permits contacting an organ procurement agency following a death."
      />

      <Section
        title="Human Tissue Repositories and Research"
        content="Repositories that store human tissue and fluids for future scientific analysis, i.e., genotyping, cell lines, other biotechnologies, express concern that HIPAA will fundamentally change how these commercial repositories function. At question is whether property rights continue to apply to human tissue after removal from the body. Prior to HIPAA, the Supreme Court in California ruled on the side of future research and determined that property rights end when tissue is removed from the body (Allen 2004). However, depending on how HIPAA rules are interpreted, informed consent may be required in order for research to be conducted on removed tissue."
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
export default HIPAAPracticalImplications;
