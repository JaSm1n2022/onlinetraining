import React, { useState } from "react";

const HipaaQuiz = (props) => {
  const questions = [
    {
      question:
        "Among other things, the Health Insurance Portability and Accountability Act (HIPAA) contained provisions to expand the availability of health care insurance coverage.",
      options: ["True", "False"],
    },

    {
      question:
        "HIPAA privacy rules are always followed even if the state's law is more stringent.",
      options: ["True", "False"],
    },
    {
      question:
        "The ability to store patient health information electronically has dramatically increased the need for privacy rules.",
      options: ["True", "False"],
    },
    {
      question:
        "Health care providers, health plans, health care clearing houses and business associates are all considered covered entities under HIPAA and subject to all its rules and regulations.",
      options: ["True", "False"],
    },
    {
      question:
        "Information that is created by an entity, including paper, electronic, videotapes, photos, is referred to as protected health information (PHI).",
      options: ["True", "False"],
    },

    {
      question:
        "The minimum necessary rule means that only necessary information should be shared even if the patient has given authorization.",
      options: ["True", "False"],
    },

    {
      question:
        "Patients have the right to know what disclosures have been made and are entitled to receive a free accounting every 12 months.",
      options: ["True", "False"],
    },
    {
      question:
        "According to HIPAA, employees are responsible for getting training about privacy rules on their own; the employing agency is not mandated to provide training.",
      options: ["True", "False"],
    },
    {
      question:
        "Certain information is exempt from HIPAA, e.g., cause of death, communicable disease, abuse.",
      options: ["True", "False"],
    },
    {
      question:
        "CMS has promulgated rules regarding how information must be coded for billing submission to Medicare and Medicaid.",
      options: ["True", "False"],
    },
    {
      question: "Discarded PHI Papers and forms will be protected by:",
      options: [
        "A. Placing them in the dumpster",
        "B. Putting them in a paper bag and then in the garbage",
        "C. Using a shredder",
        "D. Burning them",
      ],
    },
    {
      question: "Faxed copies of information will be protected by:",
      options: [
        "A. Placing them in the dumpster",
        "B. Putting them in a paper bag and then in the garbage",
        "C. Using a shredder",
        "D. Burning them",
      ],
    },
    {
      question: "Previously scanned documents will be protected by:",
      options: [
        "A. Placing them in the dumpster",
        "B. Putting them in a paper bag and then in the garbage",
        "C. Using a shredder",
        "D. Burning them",
      ],
    },
    {
      question: "Inactive Patient Charts will be protected by:",
      options: [
        "A. Discarding them in the trash",
        "B. Storage/Computer Back-up",
        "C. Burning them",
        "D. Storing them in the Administrator’s home",
      ],
    },
    {
      question: "Obsolete Patient Routing Slips will be protected by:",
      options: [
        "A. Placing them in the dumpster",
        "B. Putting them in a paper bag and then in the garbage",
        "C. Using a shredder",
        "D. Burning them",
      ],
    },
    {
      question: "Employee Workstations will be protected by:",
      options: [
        "A. Closing your computer at night",
        "B. Password",
        "C. Giving your supervisor access to your computer",
        "D. None of the above",
      ],
    },
    {
      question: "Electronic Claim Submission will be protected by:",
      options: [
        "A. Router and Firewall",
        "B. Closing the program when not in use",
        "C. Storing the program in the Administrator’s home",
        "D. Not Applicable",
      ],
    },
    {
      question: "Our Internet Server will be protected by:",
      options: [
        "A. Router and Firewall",
        "B. Closing the program when not in use",
        "C. Storing the program in the Administrator’s home",
        "D. Not Applicable",
      ],
    },
    {
      question: "Our Telephone Answering System will be protected by:",
      options: [
        "A. Internal Phone System",
        "B. Each individual staff member",
        "C. Office Manager",
        "D. Not Applicable",
      ],
    },
    {
      question:
        "Emailing Patient and Receiving Emailed Patient Informations will be protected by",
      options: [
        "A. Internet Provider",
        "B. Administrator",
        "C. Encryption",
        "D. Not Applicable",
      ],
    },
  ];
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));

  const handleSelect = (index, option) => {
    const newAnswers = [...answers];
    newAnswers[index] = option;
    setAnswers(newAnswers);
    props.collectAnswerHandler(newAnswers);
  };

  return (
    <div>
      <h2>HIPAA Quiz</h2>
      {questions.map((q, index) => (
        <div key={index}>
          <p>
            {index + 1}. {q.question}
          </p>
          {q.options.map((option) => (
            <label key={option} style={{ display: "inline-flex", gap: 5 }}>
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                checked={answers[index] === option}
                onChange={() => handleSelect(index, option)}
              />
              {option}
            </label>
          ))}
        </div>
      ))}
    </div>
  );
};

export default HipaaQuiz;
