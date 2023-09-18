import InesaImage from "@assets/images/about-us/inesa.jpg";
import RomanImage from "@assets/images/about-us/roman.jpg";

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
        name: "Course JavaScript/Front-end",
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
    name: "Roman Iermoliuk",
    jobTitle: "Junior Frontend Developer",
    skills: ["HTML5, CSS3", "JavaScript", "Git, GitHub", "React", "TypeScript"],
    education: "Donetsk National University of Economics and Trade",
    courses: [
      {
        name: "CodeBasics HTML, CSS, JS courses",
        link: "https://code-basics.com/",
      },
      {
        name: "freeCodeCamp Responsive Web Design",
        link: "https://www.freecodecamp.org/certification/Roman_Iermoliuk/responsive-web-design",
      },
      {
        name: "Course JavaScript/Front-end",
        link: "https://rs.school/index.html",
      },
    ],
    englishLevel: "C1 according to EF SET",
    githubProfile: "https://github.com/roiers",
    imageSrc: RomanImage,
    implemented: [
      "Project Setup and Configuration",
      "Create Login Page",
      "Develop Catalog Page",
      "Render Product List",
      "Implement Product Filtering, Sorting, and Search",
      "Integrate Shopping Cart with Catalog Page",
      "Add Pagination Functionality",
      "Apply Promo Codes and Update Prices",
    ],
  },
];
export default cardsData;
