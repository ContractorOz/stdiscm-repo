const articles = [
  {
    title: "Supporting Novice Programmer DevOps Integration",
    abstract:
      "DevOps is usually an industry approach that is practiced by seasoned and experienced programmers and developers. In most university settings especially in the Philippine context, DevOps is not usually part of the curriculum and in some cases are only introduced to learner programmers as an elective or as bonus material. We refer to these students in computing degree programs starting out in learning programming, as novice programmers. Upon graduation, these developers transition into industry roles where they are expected to be familiar with DevOps practices. In most cases, they are not prepared, and fortunately, a great number of them are given training before fully transitioning into their hired roles. In this research, we aim to investigate, understand and support Filipino Novice Programmers in enabling them to integrate DevOps in their practices as early as possible.",
    authors: [
      "Tyrone Justin R. Sta. Maria",
      "Gavin Raine Dizon",
      "Vince Anthony Esquivel",
      "Jordan Aiko Deja",
      "Unisse Chua",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/GRIT.pdf",
    publicationDate: new Date("2020"),
    keywords: ["Programming", "Novice"],
    featured: true,
    status: "approved",
    citationInfo: "https://doi.org/10.1145/3391203.3391214",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "On Building Design Guidelines For An Interactive Machine Learning Sandbox Application",
    abstract:
      "There are several machine learning suites, applications and platforms that are readily-available right now. However, these applications require a basic foundation in machine learning making them appear difficult to configure. We introduce the use of the Sandbox approach with the goal of designing alternative programming interfaces and interactions for machine learning tasks. A set of guidelines have been drafted supported with initial user tests to validate the proposed design framework. Ten (10) undergraduate and graduate students with novice experience in machine learning participated in structured interviews to formulate programming patterns and styles that were used to draft the guidelines based on the literary review. These insights were analyzed using UX Research techniques to form a general problem statement. Initial analysis of the user insights suggested that a visual sandbox approach similar to Scratch helps reduce the steepness of the learning curve. The preliminary design guidelines we drafted focused on the three design factors namely System Intent, Interaction, and Algorithm Visualization. From these guidelines we produced an initial version of the prototype that will be subject to further testing and validation.",
    authors: [
      "Giselle Nodalo",
      "Jolene Valenzuela",
      "Jose Ma. Santiago III",
      "Jordan Aiko Deja",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/On%20Building%20Design%20Guidelines%20For%20An%20Interactive%20Machine%20Learning%20Sandbox%20Application.pdf",
    publicationDate: new Date("2019"),
    keywords: [
      "Interactive Machine Learning",
      "Grounded Approach",
      "Design Guidelines",
    ],
    featured: true,
    status: "approved",
    citationInfo: "https://doi.org/10.1145/3328243.3328253",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "Mixed Reality Guidance System for Motherboard Assembly Using Tangible Augmented Reality",
    abstract:
      "We developed a mixed reality guidance system (MRGS) for motherboard assembly with purpose of exploring the usability and viability of using mixed reality and tangible augmented reality (TAR) for simulating hands-on manual assembly tasks. TAR was used to remove the need for real-world parts as well as to provide a natural interaction medium for our system. To evaluate our system, we conducted two usability studies involving 25 (10 experienced and 15 naive) participants. For the first study, participants were tasked to rate only the proposed interaction technique. Both experienced and naive participants gave acceptable scores, with experienced users giving significantly higher ratings. In the second study, participants were tasked to partially assemble the motherboard using the MRGS. Participants who utilized the MRGS were able to properly determine the correct orientation and location of the motherboard parts, in contrast to the control group. Observations of users while performing the tasks as well as user feedback through survey questionnaires and interviews are presented and discussed in this paper.",
    authors: [
      "Arvin Christopher C. Reyes",
      "Neil Patrick A. Del Gallego",
      "Jordan Aiko Deja",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/mixed-reality-motherboard.pdf",
    publicationDate: new Date("2020"),
    keywords: [
      "Mixed Reality",
      "Tangible Augmented Reality",
      "Assembly Task",
      "Procedural Skills",
      "Manual Assembly",
    ],
    featured: true,
    status: "approved",
    citationInfo: "https://doi.org/10.1145/3385378.3385379",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "Applying User-Centered Techniques in the Design of a Usable Mobile Musical Composition Tool",
    abstract:
      "In this study, we present the music composition tool Flow and how an interaction was designed that led towards introducing balance in the work of musicians across all stages in musical composition. Observation and user research led to having a deeper understanding of the various needs, gains and pain points musicians encounter when composing. Musicians and composers who participated in the study, came from varying levels of expertise from beginner (those with less than 7 years) and veteran (those with beyond 10 years experience). An iterative process of design and development was continuously employed which led to improving the interaction design within the prototype. The processes described in this study show how insights were uncovered from a comprehensive set of usability tests and inspections done. These insights led to the development of a more usable and acceptable musical composition tool as seen from the results in the user tests. It can be observed that varying levels of expertise in music composition leads to different expectations and needs with regards to a music composition prototype. Results of the user tests show that Flow achieved a level of satisfaction and usability at par with the industry-standard tools.",
    authors: [
      "Kevin Gray Chan",
      "Jordan Aiko Deja",
      "John Patrick Tobias",
      "Allen Vincent Gonzales",
      "Migo Andres Dancel",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/usable-centered-techniques.pdf",
    keywords: [
      "Human Centric Computing",
      "Human Computer Interaction",
      "Interaction Design",
      "User Interface Design",
      "Interaction Techniques",
      "Gestural Input",
    ],
    featured: false,
    status: "approved",
    publicationDate: new Date("2019"),
    citationInfo: "https://doi.org/10.1145/3328243.3328263",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "Adaptive Visualisations Using Spatiotemporal and Heuristic Models to Support Piano Learning",
    abstract:
      "Learning the piano is hard and many approaches including pianoroll visualisations have been explored in order to support novices in this process. However, existing piano roll prototypes have not considered the spatiotemporal component (user’s ability to press on a moving target) when generating these visualisations and user modelling. In this PhD, we are going to look into two different approaches: (i) exploring whether existing techniques in singletarget spatiotemporal modelling can be adapted to a multi-target scenario such as when learners use several fingers to press multiple moving targets when playing the piano, and (ii) exploring heuristics by experts marking various difficult parts of songs, and deciding on specific interventions needed for marked parts. Using models and input from the experts we will design and build an adaptive piano roll training system to better support piano learners. We will evaluate and compare these models in various user studies involving novices trying to play piano pieces and develop their improvisation skills. We intend to uncover whether these adaptive visualisations will be helpful in the overall training of piano learners. Additionally, these models and adaptive visualisations will allow us to discover affordances that can potentially improve piano learning in general.",
    authors: ["Jordan Aiko Deja"],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/adaptive-visualisations.pdf",
    keywords: [
      "extended reality",
      "spatiotemporal moving target selection",
      "heuristics",
      "piano roll",
      "visualisation",
      "piano learning",
    ],
    featured: false,
    status: "approved",
    publicationDate: new Date("2021"),
    citationInfo: "https://doi.org/10.1145/3450613.3459656",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "From Access to Effective Use: Open Data Portals for Everyday Citizens",
    abstract:
      "Open government data allows for transparency from governments and access to data collected about its citizens. However, we are still far from achieving universal citizen participation because data literacy and experience are necessary to extract insights from data. There is also no guarantee if available data can address people’s information needs. We explored the potential of open government data portals in addressing the information needs of citizens through an online survey and found that these can only be partially answered by the available data. To understand their information seeking behavior, we conducted usability tests of open data portals with 21 citizens, and used semi-structured interviews to identify gaps in the portals’ design. We found that citizens would benefit from: localized and advanced search engines; and visualized, contextualized, and processed content for better sensemaking. We conclude with design guidelines for open data portals catered to citizens.",
    authors: [
      "Unisse C. Chua",
      "Kyle L. Santiago",
      "Ian Benedict M. Ona",
      "Romeo Manuel N. Peña",
      "Geremiah Zachary S. Marasigan",
      "Paolo Gabriel A. Delos Reyes",
      "Briane Paul V. Samson",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/open-data.pdf",
    keywords: ["Open data", "information seeking", "user study"],
    featured: false,
    status: "pending",
    publicationDate: new Date("2020"),
    citationInfo: "https://doi.org/10.1145/3391203.3391219",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "ViTune: A Visualizer Tool to Allow the Deaf and Hard of Hearing to “Hear” Music With Their Eyes",
    abstract:
      "Visualizers are usually added into music players to augment the listening experiences of regular users. However, for the case of most members of the Deaf and Hard of Hearing (DHH) community, they have partial deafness that give them a “limited” listening experience as compared to their counterparts. In this paper, we present ViTune, a visualizer tool that enhances the musical experiences of the DHH through the use of an on-screen visualizer generating effects alongside music. We observed how members of the DHH community typically experienced music thru an initial user study. We then iterated on developing an visualizer prototype where we did multiple usability tests involving at least 15 participants from the DHH community. We observed how they experienced music with the help of our prototype and noticed that certain music features and elements augmented these experiences. Visualization attributes, their matching qualitative descriptions and equivalent subjective attributes were identified with the help of music experts. Also, affect induced and dissuaded were identified in improving these listening experiences.",
    authors: [
      "Jordan Aiko Deja",
      "Alexczar Dela Torre",
      "Hans Joshua Lee",
      "Jose Florencio Ciriaco IV",
      "Carlo Miguel Eroles",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/vitune.pdf",
    keywords: [
      "Visualizations",
      "Deaf and Hard of Hearing",
      "Musical Experience",
      "Inclusive Design",
      "Sound and Music Computing",
      "Human-Computer Interaction",
      "Usability testing",
    ],
    featured: false,
    status: "pending",
    publicationDate: new Date("2020"),
    citationInfo: "https://doi.org/10.1145/3334480.3383046",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
  {
    title:
      "Development of a Web-based Application for Optimal Allocation of COVID-19 Vaccine",
    abstract:
      "The COVID-19 pandemic posed a huge impact to the global economy and on the environment. Recent developments in battling the pandemic include the availability of vaccines for public use. The distribution of vaccines requires systematic planning as supplies to a given region can be limited. Process integration techniques such as mathematical programming can be applied to develop solutions for systematic planning of COVID-19 vaccine distribution. To enable the use of mathematical programs for policymakers, a graphical user interface is needed. In this study, a web-based application (app) for allocating vaccines is presented, utilizing non-linear programs to optimally distribute vaccines to different population groups. Two models are incorporated in the app:(1) a model that minimizes the number of vaccines required to slow down the spread of the disease, ie, reduce the reproductive number to less than one and (2) a model that determines the optimal allocation at the minimum reproductive number. The optimization models for the app were written in Python using the Pyomo package while the graphical user interface is written in JavaScript with the use of the React library. The optimization models are accessed through an API served using a Python web server utilizing the web framework Flask. A case study is used to illustrate how the models work in the web application.",
    authors: [
      "John Frederick D Tapia",
      "Joshua Manzano",
      "Ian Benedict Ona",
      "Unisse Chua",
    ],
    articleFile:
      "https://stsweng-bucket.s3.ap-southeast-1.amazonaws.com/092.pdf",
    keywords: ["Artificial Intelligence", "Robotics"],
    featured: false,
    status: "pending",
    publicationDate: new Date("2020"),
    citationInfo: "https://doi.org/10.3303/CET2188092",
    upvotes: 0,
    downvotes: 0,
    comments: [],
  },
];

module.exports = articles;
