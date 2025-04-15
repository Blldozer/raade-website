/**
 * Academic Speakers Data
 * 
 * Contains profiles for speakers focused on academic research, medicine, and technology
 */
import { Speaker } from "../types/Speaker";

export const academicSpeakers: Speaker[] = [
  {
    id: "june-madete",
    name: "Dr. June K. Madete",
    role: "Senior Lecturer, Biomedical Engineering",
    organization: "Kenyatta University",
    imagePlaceholder: "Dr. June Madete",
    bio: "Distinguished biomedical engineer specializing in biomechanics and motion analysis at Kenyatta University.",
    fullBio: "Dr. June K. Madete is a distinguished biomedical engineer and senior lecturer at Kenyatta University in Nairobi, Kenya, specializing in biomechanics and motion analysis. She earned her BSc, MSc, and PhD in Medical Engineering from Cardiff University in Wales, UK, with a focus on biomechanics, motion capture, imaging studies, and patient data collection.\n\nDr. Madete's research centers on the collection, analysis, and interpretation of gait data using various motion analysis software and hardware. Her work has included combining these techniques with animal research in neuroscience, as well as utilizing video fluoroscopy, X-ray, and CT data. Notably, she conducted a study in 2011–2012 examining the relationship between surgical accuracy and joint function in patients who underwent total knee replacement.\n\nBeyond her academic pursuits, Dr. Madete has contributed to the development of healthcare infrastructure and policy. She has served on sub-committees for the establishment of policies and standards at the Kenyatta University Teaching, Referral, and Research Hospital. Additionally, she has been involved in initiatives such as developing a dialysis center and a state-of-the-art 3D printing innovation center for research and training at Kenyatta University.\n\nDr. Madete is also dedicated to education and mentorship, having trained students, teachers, and lecturers at institutions including Cardiff University, Egerton University (Kenya), Kenyatta University, and Addis Ababa Institute of Technology. Her expertise in motion capture has been a focal point in these training efforts.\n\nIn addition to her academic and research roles, Dr. Madete actively participates in international collaborations and conferences. She has been a speaker at events such as the Rice360 Design Competition, sharing her insights on biomedical engineering and innovation.",
    expertise: ["Biomedical Engineering", "Healthcare Policy", "Medical Education"],
    speaking: {
      title: "Workshop Session 1: Defining the Opportunity",
      description: "Interactive workshop focusing on opportunities in medicine and technology for African development, featuring the case study 'Mobility & Medicine: Creating Sustainable Healthcare Delivery Models in Chad'.",
      time: "11:25 AM - 12:20 PM",
      date: "April 12"
    },
    additionalSessions: [
      {
        title: "Panel: From Prototype to Phenomenon",
        role: "Panelist",
        description: "Scaling What Works — From Prototype to Phenomenon",
        time: "2:30 PM - 3:10 PM",
        date: "April 12"
      }
    ]
  }
];
