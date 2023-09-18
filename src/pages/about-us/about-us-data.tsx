import InesaImage from "@assets/images/about-us/inesa.jpg";
import ElenImage from "@assets/images/about-us/lena.jpg";

interface Course {
  name: string;
  link: string;
}

export interface CardData {
  name: string;
  jobTitle: string;
  skills: string[];
  education: string;
  courses: Course[];
  englishLevel: string;
  githubProfile: string;
  imageSrc: string;
  implemented: string[];
}
const cardsData: CardData[] = [
  {
    name: "Inesa Smarhunova",
    jobTitle: "Junior Frontend Developer",
    skills: [
      "HTML5, CSS3",
      "JavaScript Basics",
      "Git, GitHub",
      "React",
      "TypeScript",
    ],
    education: "Vitebsk State Order of Peoples' Friendship Medical University",
    courses: [
      {
        name: "Полный курс по JavaScript + React",
        link: "https://www.udemy.com/course/javascript_full/",
      },
      {
        name: "Build Responsive Real-World Websites with HTML and CSS",
        link: "https://www.udemy.com/course/design-and-develop-a-killer-website-with-html5-and-css3/",
      },
      {
        name: "RS School (In process): Course JavaScript/Front-end",
        link: "https://rs.school/index.html",
      },
    ],
    englishLevel: "EPAM English test result - B2",
    githubProfile: "https://github.com/papryca",
    imageSrc: InesaImage,
    implemented: [
      "Create the project in CommerceTools",
      "Implement routing for navigation",
      "Implement a 404 (Not Found) page",
      "Display Product Information",
      "Image Modal with Slider",
      "Header",
      "Add or remove product from cart",
      "Introduction to the Development team",
    ],
  },
  {
    name: "Elena Leusik",
    jobTitle: "Junior Frontend Developer",
    skills: [
      "React",
      "JavaScript, TypeScript",
      "Git",
      "Material UI",
      "HTML5, CSS3, SASS",
      "Adobe Photoshop, Adobe Lightroom, Adobe Illustrator",
      "SPSS Statistics",
    ],
    education:
      "Belarusian State Medical University, Belarusian Medical Academy of Postgraduate Studies - Candidate of Sciences (PhD) in Medicine",
    courses: [
      {
        name: "W3Schools courses",
        link: "https://www.w3schools.com/js/",
      },
      {
        name: "Self-education - learn.javascript guide",
        link: "https://learn.javascript.ru/",
      },
      {
        name: "RSSchool Course JavaScript/Front-end stage 0, 1, 2",
        link: "https://rs.school/js/",
      },
    ],
    englishLevel: "EF SET test Certificate - С2",
    githubProfile: "https://github.com/elen-jagger",
    imageSrc: ElenImage,
    implemented: [
      "Create a project task board using Github projects",
      "Registration page: render, forms validation, integration with commercetools for User Profiles and Addresses",
      "User Profile page: render, profile edit-mode implementation, integration with commercetools",
      "Basket page: display items, actions for modifying product quantity, remove product from cart and clearing whole cart with price recalculating",
    ],
  },
];
export default cardsData;
