import React from "react";

const HIPAAInfo = () => {
  return (
    <div>
      <h1>Understanding HIPAA - What is Included in the Law</h1>
      <p>
        HIPAA describes those affected by the law as “covered entities”.
        Included under this umbrella are health care providers, health plans,
        health care clearinghouses, and business associates.
      </p>

      <Entity
        title="Health Care Providers"
        description="Health care providers are defined as anyone who is paid for health care services or bills for services provided. The list is all inclusive: physicians, licensed health care providers, hospitals, outpatient physical therapists, social workers, certified nurse midwives, technicians administering X-rays done at home, home health agencies, pharmacists, providers of home dialysis supplies and equipment, nursing homes, nurses, and nurse administrators. This list means that any hospital or health facility worker who may see confidential patient information is included."
      />

      <Entity
        title="Health Plans"
        description="A health plan is any individual or group that pays for health care services. Included are health maintenance organizations (HMOs), insurance companies, Medicare/Medicaid, self-insured plans, employee group plans, federal plans such as CHAMPUS, military, veteran’s administration, and Indian health services."
      />

      <Entity
        title="Clearinghouses"
        description="Clearinghouses are those entities that receive health information from providers and health plans. They typically are responsible for standardizing the information to improve claims processing. Included in this group are third-party administrators, billing services, and re-pricing agencies."
      />

      <Entity
        title="Business Associates"
        description="The business associates category covers a broad range of professionals and services. Included are attorneys, consultants, auditors, accountants, billing firms, data processing companies, and practice management firms. Nurses working as independent contractors, i.e., case managers, legal nurse consultants, and educators are included and subject to compliance with HIPAA law. A contract between the business associate and hiring agent must be in place before the associate can see any patient information."
      />
    </div>
  );
};

const Entity = ({ title, description }) => (
  <div style={{ marginBottom: "20px" }}>
    <h2>{title}</h2>
    <p>{description}</p>
  </div>
);

export default HIPAAInfo;
