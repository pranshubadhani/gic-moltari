import React from "react";
import EnrollmentTable from "../components/EnrollmentTable";

const About = () => {
  return (
    <div className="p-10 bg-gray-50 rounded-lg shadow-lg text-center">
      <h2 className="text-3xl font-extrabold mb-6 text-gray-800">
        About G.I.C. Moltari
      </h2>
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        G.I.C. Moltari, located in the scenic Uttarkashi district of Uttarakhand,
        is a government-aided school that serves students from classes 6 to 12.
        The school is affiliated with the Uttarakhand Board of School Education
        and follows the curriculum set by the board. Known for its commitment to
        providing quality education, G.I.C Moltari aims to nurture students in
        academics, sports, and extracurricular activities.
      </p>
      <p className="mb-6 text-lg text-gray-700 leading-relaxed">
        The school is equipped with essential facilities, including a library,
        science labs, and a playground. With a dedicated team of teachers, the
        school strives to create an environment conducive to learning and
        personal growth.
      </p>
      <div className="mb-6 text-lg text-gray-700 leading-relaxed">
        <p>
          <strong>Location:</strong> Moltari, Uttarkashi, Uttarakhand, India
        </p>
        <p>
          <strong>Medium of Instruction:</strong> Hindi
        </p>
        <p>
          <strong>Classes:</strong> 6th to 12th
        </p>
        <p>
          <strong>Type:</strong> Co-Educational
        </p>
        <p>
          <strong>Management:</strong> Government
        </p>
      </div>
      <EnrollmentTable />
    </div>
  );
};

export default About;
