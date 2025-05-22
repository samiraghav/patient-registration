import { FaLinkedin, FaGithub, FaYoutube } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-white border-t border-[#BAD6EB]/20 mt-12 pt-10 pb-6">
    <div className="container mx-auto pl-8 pr-0">
      <div className="flex flex-wrap justify-center md:justify-between gap-y-10 text-md text-[#081F5C]">
        <div className="w-1/2 md:w-1/4 flex flex-col md:items-start">
          <h4 className="text-[#334EAC] font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1">
            <li>About us</li>
            <li>Blog</li>
            <li>Training</li>
            <li>Docs</li>
          </ul>
        </div>

        <div className="w-1/2 md:w-1/4 flex flex-col md:items-start">
          <h4 className="text-[#334EAC] font-semibold mb-2">Courses</h4>
          <ul className="space-y-1">
            <li>openEHR Bootcamp</li>
            <li>FHIR Bootcamp</li>
          </ul>
        </div>

        <div className="w-1/2 md:w-1/4 flex flex-col md:items-start">
          <h4 className="text-[#334EAC] font-semibold mb-2">Legal</h4>
          <ul className="space-y-1">
            <li>Terms & Conditions</li>
            <li>Privacy policy</li>
            <li>Refund policy</li>
            <li>Cancellation policy</li>
          </ul>
        </div>

        <div className="w-1/2 md:w-1/4 flex flex-col md:items-start">
          <h4 className="text-[#334EAC] font-semibold mb-2">Social</h4>
          <ul className="space-y-1">
            <li className="flex items-center gap-2">
              <FaLinkedin /> Linkedin
            </li>
            <li className="flex items-center gap-2">
              <FaGithub /> GitHub
            </li>
            <li className="flex items-center gap-2">
              <FaYoutube /> YouTube
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-4 border-t border-[#BAD6EB]/20 text-center text-xs text-[#7096D1]">
        © 2025 Medblocks. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
