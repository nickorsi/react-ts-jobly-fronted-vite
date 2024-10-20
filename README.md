<!-- Improved compatibility of back to top link: See: https://github.com/othneildrew/Best-README-Template/pull/73 -->
<a name="readme-top"></a>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

<!-- PROJECT LOGO -->
<h3 align="center">💼 Jobly 💼</h3>
<br />
<div align="center">
  <a href="https://github.com/nickorsi/react-ts-jobly-fronted-vite">
    <img src="static/react-ts-jobly-fronted-vite_demo.gif" alt="App Demo Gif">
  </a>
  <p align="center">
    A Job Board app for all your job needs!
    <br />
    <a href="https://react-ts-jobly-fronted-vite.onrender.com/">View Demo</a>
    ·
    <a href="https://github.com/nickorsi/react-ts-jobly-fronted-vite/issues">Report Bug</a>
    ·
    <a href="https://github.com/nickorsi/react-ts-jobly-fronted-vite/issues">Request Feature</a>
  </p>
</div>

<div align="center">

  ![GitHub top language](https://img.shields.io/github/languages/top/nickorsi/react-ts-jobly-fronted-vite)
  ![GitHub repo size](https://img.shields.io/github/repo-size/nickorsi/react-ts-jobly-fronted-vite)
  ![GitHub repo file or directory count](https://img.shields.io/github/directory-file-count/nickorsi/react-ts-jobly-fronted-vite)
  ![GitHub last commit](https://img.shields.io/github/last-commit/nickorsi/react-ts-jobly-fronted-vite)

</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
       <ul>
        <li><a href="#running-tests">Built With</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Jobly is an app where users can search for companies, jobs, and view specific company details and the jobs offered by that company. There is no authentication/authorization handling in the app currently, so all users can see all jobs and companies.

This repo holds the frontend code of this full-stack app and is written in TypeScript using React as the frontend and Vite as the build tool. This code interacts with the [Jobly Backend](https://github.com/nickorsi/jobly-backend), a RESTful API built using node/express that connects to a Postgres DB.

Below is a diagram showing the basic component hierarchy currently used for the frontend.

<img src="/static/Jobly React Component Hierarchy.png" alt="Component hierarchy diagram">

The demo site has been deployed using Render to host both the frontend and backend code and ElephantSQL to host the database.

Some tools and concepts covered during this project:

* Using Vite as a drop in build tool replacement for CRA
* Using Vite's built in template to start a React-TS project
* First time using TS for the entirety of a project
* Built and organized the component hierarchy to separate concerns
* Utilized Vitest, testing-library, and jest to build tests
* Focused on building extensive unit/integration testing and achieving near 100% coverage
* Styling with Bootstrap and traditional CSS



<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With
* [![Vite][Vite.com]][Vite-url]
* [![React][React.com]][React-url]
* [![TypeScript][TypeScript.com]][TypeScript-url]
* [![HTML5][HTML5.com]][HTML5-url]
* [![CSS3][CSS3.com]][CSS3-url]
* [![PostgreSQL][PostgreSQL.com]][PostgreSQL-url]
* [![Bootstrap][Bootstrap.com]][Bootstrap-url]
* [![Vitest][Vitest.com]][Vitest-url]
* [![Jest][Jest.com]][Jest-url]
* [![Testing][Testing.com]][Testing-url]
* [![Render][Render.com]][Render-url]
* [![ElephantSQL][ElephantSQL.com]][ElephantSQL-url]



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started
To get a local copy up and running follow these steps.

1. Go to the ![Jobly Backend](https://github.com/nickorsi/jobly-backend) repo to run the backend for this app locally.

2. Using the terminal, clone this repo at your desired directory.

  ```sh
  $ git clone https://github.com/nickorsi/react-ts-jobly-fronted-vite.git
  ```
2. Within this new directory, install the dependencies.

  ```sh
  $ npm install
  ```
3. Start up the frontend code.

  ```sh
  $ npm run dev
  ```
4. Use the link provided in the terminal to interact with the site in your browser.

### Running Tests
To run the provided automated tests, navigate to the project directory and run this script in the terminal.

  ```sh
  $ npm run test
  ```

To see the test coverage provided by the automated tests, run this script in the terminal.

  ```sh
  $ npm run coverage
  ```



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Roadmap
In progress
- [ ] Add either offset based pagination or cursor based pagination to companies and jobs pages
- [ ] Add ability to sign up and create a profile for verification of users
- [ ] Add ability for authorized users to add jobs and companies
- [ ] Add ability for users to apply to jobs
- [ ] Make the site responsive



<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Nick Orsi
* [<img src="https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white" alt="Linkedin Logo">](https://www.linkedin.com/in/nicholas-orsi/)
* [www.nickorsi.com](https://www.nickorsi.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ACKNOWLEDGMENTS -->
## Acknowledgments
This was built with inspiration from the [Rithm School](https://www.rithmschool.com/) curriculum.

* [Best README Template](https://github.com/othneildrew/Best-README-Template)
* [Markdown Badges](https://github.com/Ileriayo/markdown-badges)

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[Vite.com]:https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white
[Vite-url]: https://vite.dev/
[React.com]: https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB
[React-url]: https://react.dev/
[TypeScript.com]: https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white
[TypeScript-url]: https://www.typescriptlang.org/
[HTML5.com]: https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white
[HTML5-url]: https://developer.mozilla.org/en-US/docs/Web/HTML
[CSS3.com]: https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white
[CSS3-url]: https://developer.mozilla.org/en-US/docs/Web/CSS
[PostgreSQL.com]: https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white
[PostgreSQL-url]: https://www.postgresql.org/
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[Vitest.com]: https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B
[Vitest-url]: https://vitest.dev/
[Jest.com]: https://img.shields.io/badge/-jest-%23C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Testing.com]: https://img.shields.io/badge/-TestingLibrary-%23E33332?style=for-the-badge&logo=testing-library&logoColor=white
[Testing-url]: https://testing-library.com/
[Render.com]: https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white
[Render-url]: https://render.com/
[ElephantSQL.com]: https://img.shields.io/badge/ElephantSQL-%233F9BBF?style=for-the-badge
[ElephantSQL-url]: https://www.elephantsql.com/
