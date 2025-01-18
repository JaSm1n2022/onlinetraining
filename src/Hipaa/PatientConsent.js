import React from "react";

const HIPAAPatientConsent = () => {
  return (
    <div>
      <h1>Patient Consent and Authorization</h1>

      <Section
        title="Informed Consent vs. Patient Authorization"
        content="HIPAA makes a distinction between informed consent and patient authorization. Patients are entitled to know exactly how an entity plans to use the information."
      />

      <Section
        title="Informed Consent"
        content="Informed consent is signed at the first encounter the patient has with the provider/health care facility; the consent covers treatment, payment, and other health care information. The meaning and use of the patient’s consent must be carefully explained to the patient. Facilities must explicate their disclosure process in a document called Information Practices. The American Hospital Association published a sample consent and explanation document that was 10 pages long. The document explains patient rights, as well as a description of how patient information is collected and used. Facilities must decide how and when the information concerning consent is presented to patients and how patients can use their right to revoke consent. Patients must also be advised about the agency’s policy that covers conditions for admission that are related to consent."
      />

      <Section
        title="Patient Authorization"
        content="Patients may also sign authorizations. These are required when information is used by the agency for purposes outside of treatment. Agencies must assess their policies and procedures to assure that they are always using an authorization when it is needed; some agencies may not realize that information sharing policies violate the patient’s right to restrict release of data (Cichon, 2002). Patients must be fully informed about the way agencies use a signed authorization and are entitled to receive a free accounting every twelve months describing how their health information has been used."
      />

      <Section
        title="HIPAA Privacy Regulations: Patient Rights"
        content="HIPAA privacy regulations also mandate specific patient rights that include the following:"
      />
      <ol>
        <li>
          Agencies must appoint a privacy officer who will monitor and audit
          compliance.
        </li>
        <li>
          Agencies must develop an internal compliance process that will assure
          no patient rights are violated, complaints are addressed and
          investigated, and that a process for remediation is in place.
        </li>
        <li>
          Training must be provided to employees to assure that they are
          informed about patient rights and disclosure of information.
        </li>
        <li>
          HIPAA requires that agencies document any and all violations and that
          sanctions parallel other disciplinary policies.
        </li>
        <li>
          Agencies must have a process for mitigating any harmful effect of
          disclosure.
        </li>
        <li>
          All forms of communication must be addressed in administrative
          safeguards.
        </li>
        <li>
          Agencies must agree and have policies that specify no retaliation for
          an employee or consumer who files a complaint.
        </li>
      </ol>
      <Section
        title="Required Agency Procedures"
        content="Agencies must appoint a privacy officer, develop an internal compliance process, provide training to employees, document violations, and ensure no retaliation for those filing complaints. These procedures help ensure patient rights are not violated."
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
export default HIPAAPatientConsent;
