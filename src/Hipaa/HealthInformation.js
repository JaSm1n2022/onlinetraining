import React from "react";

const HIPAAHealthInfoProtected = () => {
  return (
    <div>
      <h1>What Health Information is Protected?</h1>

      <Section
        title="Protected Health Information (PHI)"
        content="HIPAA created two new phrases to describe information protected by the legislation. The medical record is now referred to as protected health information (PHI). This includes all information that is created by any covered entity. All forms of the information are part of protected health information, i.e., paper, electronic, video tapes, photos, audiotapes, and any information that has been duplicated, discussed, read from a computer screen, or shared over the internet"
      />

      <Section
        title="Individually Identifiable Health Information (IIHI)"
        content="The other new HIPAA phrase is individually identifiable health information (IIHI). Included in this category is any information that could reasonably be linked to a specific patient, such as a photo, name, address, date of birth, next of kin or responsible relative, medical record identifier, social security number, driver’s license number, health beneficiary, account number, employer, finger, or voice prints."
      />

      <Section
        title="Non-Identifiable Information"
        content="All facilities must limit access to information only to those who have a need to know. A nurse who seeks information about a patient not under her care is violating the HIPAA rules. Similarly, health information can only be used for health purposes. Employers cannot use the information to screen candidates for hire or promotion. Financial institutions may not use it to determine lending practice. Only the patient can explicitly authorize employers, banks, and individuals to have access to his/her medical information."
      />

      <Section
        title="Limitations on Access and Use of Information"
        content="All facilities must limit access to information only to those who have a need to know. A nurse who seeks information about a patient not under her care is violating the HIPAA rules. Similarly, health information can only be used for health purposes. Employers cannot use the information to screen candidates for hire or promotion. Financial institutions may not use it to determine lending practice. Only the patient can explicitly authorize employers, banks, and individuals to have access to his/her medical information."
      />

      <Section
        title="Minimum Necessary Rule"
        content="HIPAA also established the “minimum necessary rule” which stipulates that only the minimum necessary information may be shared, even with the patient authorization. A classic example would involve treatment for a case of child or domestic abuse; the provider would, rather than providing an entire medical record, furnish the pertinent data furnished in the form of an abstract outlining the information that is necessary to provide treatment and protect the victim(s). The abstracted information could be provided to legal and law enforcement entities. Health providers involved in the treatment of patients are not subject to the minimum necessary rule and can have full access to all information that is needed to provide patient care."
      />

      <Section
        title="Public Health and Safety Exceptions"
        content="Health information that has implications for the public health and safety can be shared without consent. There are several situations where medical information can be shared:  In Emergency 911 situations, when communicable diseases are involved, when law enforcement agencies participate, or if national defense or security is a factor."
      />

      <Section
        title="Public Health Reporting"
        content="The public health department is deemed a legitimate recipient of certain personal health information and providers may, in fact in some instances, must report some findings to the proper public health agency. Included are: "
      />
      <ol>
        <li>cause of death even when the patient dies at home</li>
        <li>reportable communicable diseases</li>
        <li>child abuse</li>
        <li>
          reporting an adverse drug reaction to the Federal Drug Administration
        </li>
        <li>occurrence of cancer in a state with a cancer registry</li>
        <li>meningitis, and</li>
        <li>immunizations for children. </li>
      </ol>
      <p>
        These examples are thought to be important to the health of the public
        (Campos-Outcalt 2004).
      </p>
    </div>
  );
};

const Section = ({ title, content }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

export default HIPAAHealthInfoProtected;
