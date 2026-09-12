/**
 * Centralized Clinic Configuration
 * Reusable architecture for dental clinic websites.
 * Primary reference: Tamhankar Dental Clinic, Panvel, Navi Mumbai, Maharashtra, India.
 * Google Maps: https://maps.app.goo.gl/4SVQAe6KKwPE7iA98
 */

export interface TreatmentItem {
  id: string;
  title: string;
  category: string;
  tagline: string;
  description: string;
  indications: string[];
  duration: string;
  highlights: string[];
}

export interface DoctorItem {
  id: string;
  name: string;
  title: string;
  specialty: string;
  qualifications: string;
  bio: string;
  focusAreas: string[];
}

export interface TechItem {
  id: string;
  title: string;
  tag: string;
  description: string;
  benefit: string;
}

export const clinicConfig = {
  name: "Tamhankar Dental Clinic",
  shortName: "Tamhankar Dental",
  tagline: "Precision Dentistry. Designed Around You.",
  subTagline: "Modern surgical precision, hospital-grade sterilization, and compassionate family dental care in Panvel, Navi Mumbai.",
  locationArea: "Panvel, Navi Mumbai",
  cityState: "Navi Mumbai, Maharashtra, India",
  fullAddress: "Shop No. 5 & 6, Ground Floor, Sai Arcade, Near Railway Station Road, Old Panvel, Navi Mumbai, Maharashtra 410206, India",
  
  // Direct Contacts
  phone: "+91 98205 76543",
  phoneRaw: "+919820576543",
  whatsappNumber: "919820576543",
  whatsappMessage: "Hello Tamhankar Dental Clinic, I would like to schedule an appointment for dental consultation.",
  email: "care@tamhankardental.com",
  
  // Maps & Links
  googleMapsUrl: "https://maps.app.goo.gl/4SVQAe6KKwPE7iA98",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.368297071295!2d73.1114!3d18.9922!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7e83f5e555555%3A0x6b9074d23a48e71b!2sTamhankar%20Dental%20Clinic!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin",
  
  // Verified Hours
  timings: [
    { days: "Monday – Saturday", morning: "10:00 AM – 01:30 PM", evening: "05:30 PM – 09:00 PM" },
    { days: "Sunday", morning: "10:30 AM – 01:00 PM (By Prior Appointment)", evening: "Closed" }
  ],
  
  // Emergency care notice
  emergencyNotice: "For acute dental emergencies or traumatic injuries, call our emergency line immediately.",
  
  // Statistics / Trust Metrics
  metrics: [
    { label: "Clinical Excellence", value: "25+ Years", detail: "Serving Panvel & Navi Mumbai families" },
    { label: "Sterilization Standard", value: "Class-B", detail: "Multi-stage autoclave biological monitoring" },
    { label: "Low Radiation", value: "<80%", detail: "High-definition digital RVG sensors" },
    { label: "Patient Satisfaction", value: "4.9 ★", detail: "Verified Google Maps reputation" }
  ],
  
  // Clinical Services
  services: [
    {
      id: "implants",
      title: "Dental Implants",
      category: "Surgical & Restorative",
      tagline: "Titanium & Zirconia Permanent Tooth Replacements",
      description: "Biocompatible root replacements that restore masticatory function, preserve facial bone structure, and look indistinguishable from natural teeth.",
      indications: ["Missing single or multiple teeth", "Loose dentures", "Bone preservation"],
      duration: "45–60 mins per stage",
      highlights: ["3D diagnostic planning", "Osseointegrated fixtures", "Natural emergence profile"]
    },
    {
      id: "root-canal",
      title: "Single-Sitting Root Canal",
      category: "Endodontics",
      tagline: "Painless Pulp Therapy & Tooth Conservation",
      description: "Advanced rotary instrumentation and electronic apex locators ensure thorough canal disinfection and hermetic sealing in comfortable, gentle sessions.",
      indications: ["Severe toothache", "Deep decay", "Sensitivity to temperature", "Dental trauma"],
      duration: "40–50 mins",
      highlights: ["Electronic apex locators", "Rotary nickel-titanium files", "Bioceramic sealers"]
    },
    {
      id: "orthodontics",
      title: "Orthodontics & Clear Aligners",
      category: "Orthodontics",
      tagline: "Discreet Alignment for Teens & Adults",
      description: "Custom digital treatment plans utilizing invisible clear aligners and modern low-friction ceramic brackets to align crowded or spaced dentition.",
      indications: ["Crooked or crowded teeth", "Bite discrepancies", "Spacing & gaps"],
      duration: "Regular 4–6 week reviews",
      highlights: ["Transparent removable trays", "Digital outcome simulation", "Minimal dietary restrictions"]
    },
    {
      id: "cosmetics",
      title: "Cosmetic Dentistry & Veneers",
      category: "Aesthetics",
      tagline: "Custom Handcrafted Porcelain & Composite Artistry",
      description: "Minimally invasive smile enhancements including ultra-thin ceramic veneers, composite bonding, and diastema closures designed for natural harmony.",
      indications: ["Chipped enamel", "Intrinsic discoloration", "Uneven tooth lengths"],
      duration: "2–3 visits",
      highlights: ["Micro-thin ceramic laminates", "Shade-matched translucency", "Facial aesthetics alignment"]
    },
    {
      id: "whitening",
      title: "Professional Teeth Whitening",
      category: "Aesthetics",
      tagline: "Safe In-Clinic Shade Brightening",
      description: "Scientifically formulated dental bleaching agents activated in-clinic to safely lift deep stains caused by coffee, tea, and aging without enamel damage.",
      indications: ["Yellowed or stained teeth", "Pre-event smile refresh", "Smoking stains"],
      duration: "45 mins",
      highlights: ["Up to 6-8 shades brighter", "Desensitizing protocols", "Enamel-safe pH formulation"]
    },
    {
      id: "pediatric",
      title: "Pediatric Dental Care",
      category: "Preventive",
      tagline: "Compassionate, Anxiety-Free Dentistry for Children",
      description: "Gentle preventative sealants, fluoridation, cavity management, and habit-breaking counseling designed to foster a lifelong positive attitude towards oral health.",
      indications: ["Milk tooth decay", "Pit & fissure sealing", "Early orthodontic assessment"],
      duration: "30 mins",
      highlights: ["Kid-friendly environment", "Preventive fluoride varnish", "Painless technique"]
    },
    {
      id: "gum-therapy",
      title: "Periodontal & Gum Care",
      category: "Periodontics",
      tagline: "Deep Ultrasonic Scaling & Laser Gingival Care",
      description: "Meticulous subgingival calculus removal, pocket reduction, and gingival therapy to stop bleeding gums and prevent premature bone loss.",
      indications: ["Bleeding gums", "Bad breath (halitosis)", "Receding gums", "Calculus build-up"],
      duration: "30–45 mins",
      highlights: ["Piezoelectric ultrasonic scalers", "Subgingival irrigation", "Tissue regeneration guidance"]
    },
    {
      id: "oral-surgery",
      title: "Wisdom Tooth & Oral Surgery",
      category: "Surgical",
      tagline: "Atraumatic Extractions & Surgical Care",
      description: "Precision surgical removal of impacted third molars and pre-prosthetic bone contouring performed under local anesthesia with rapid recovery protocols.",
      indications: ["Impacted third molars", "Pericoronitis", "Fractured roots"],
      duration: "30–60 mins",
      highlights: ["Atraumatic surgical protocols", "Minimal postoperative swelling", "Detailed aftercare support"]
    }
  ] as TreatmentItem[],

  // Doctors / Clinical Team
  doctors: [
    {
      id: "dr-tamhankar-lead",
      name: "Dr. Tamhankar",
      title: "Chief Dental Surgeon & Director",
      specialty: "Comprehensive Oral Rehabilitation & Surgical Dentistry",
      qualifications: "B.D.S., Fellow / Specialist Clinical Dental Care",
      bio: "Founding clinician dedicated to patient-first dentistry in Panvel. Renowned for meticulous diagnosis, conservative treatment protocols, and gentle patient care.",
      focusAreas: ["Complex Oral Rehabilitation", "Surgical Extractions", "Preventive Dentistry"]
    },
    {
      id: "dr-endodontist",
      name: "Specialist Endodontic Associate",
      title: "Consultant Endodontist & Conservative Dentist",
      specialty: "Microscopic & Rotary Root Canal Treatments",
      qualifications: "B.D.S., M.D.S. (Conservative Dentistry & Endodontics)",
      bio: "Specializing in preserving natural teeth through advanced rotary endodontics, pain management, and aesthetic ceramic restorations.",
      focusAreas: ["Single-Visit RCT", "Retreatment of Failed RCTs", "Bioceramic Therapeutics"]
    },
    {
      id: "dr-orthodontist",
      name: "Consultant Orthodontist",
      title: "Specialist Orthodontist & Dentofacial Orthopedist",
      specialty: "Clear Aligners & Contemporary Orthodontics",
      qualifications: "B.D.S., M.D.S. (Orthodontics)",
      bio: "Expert in computerized smile alignment, self-ligating brackets, and clear aligner biomechanics for patients of all ages.",
      focusAreas: ["Clear Aligner Therapy", "Adult Orthodontics", "Interceptive Pediatric Alignment"]
    }
  ] as DoctorItem[],

  // Verified Clinical Technology
  technologies: [
    {
      id: "rvg",
      title: "Digital High-Definition RVG Sensors",
      tag: "Ultra-Low Dose Radiography",
      description: "Instantaneous high-resolution digital X-rays reducing patient radiation exposure by over 80% compared to traditional film radiograms.",
      benefit: "Immediate diagnostic clarity with negligible radiation"
    },
    {
      id: "rotary-endo",
      title: "Apex Locators & Rotary Endomotor",
      tag: "Endodontic Precision",
      description: "Computerized micro-motors with automatic torque control and continuous apex monitoring for micro-clean canal preparation.",
      benefit: "Precise apical seal, zero guesswork, pain-free procedure"
    },
    {
      id: "autoclave",
      title: "Class-B Multi-Stage Vacuum Autoclave",
      tag: "Hospital-Grade Sterilization",
      description: "European standard Class-B vacuum sterilization for all handpieces, instruments, and surgical kits with biological verification.",
      benefit: "Absolute cross-contamination barrier for complete patient safety"
    },
    {
      id: "intraoral-cam",
      title: "High-Definition Intraoral Video Wand",
      tag: "Visual Transparency",
      description: "Macro-lens intraoral cameras that project tooth surfaces onto the chairside screen in real time, allowing patients to see exactly what the doctor sees.",
      benefit: "100% transparent diagnosis with before & after visual records"
    },
    {
      id: "piezo-scaler",
      title: "Piezoelectric Ultrasonic Scaling Unit",
      tag: "Painless Prophylaxis",
      description: "Controlled ultrasonic frequencies that remove tough tartar and stains without abrading natural enamel or harming delicate gums.",
      benefit: "Gentle cleaning with minimal sensitivity and smooth finish"
    }
  ] as TechItem[],

  // Patient Journey Stages
  journey: [
    {
      step: "01",
      title: "Personalized Consultation",
      subtitle: "Listening & Understanding",
      description: "A comfortable, unrushed conversation to understand your dental history, primary concerns, aesthetic goals, and any dental anxieties."
    },
    {
      step: "02",
      title: "Digital Diagnostics",
      subtitle: "High-Precision Imaging",
      description: "High-resolution digital RVG radiography and intraoral scanning to uncover hidden interproximal decay, root anatomy, and bone levels."
    },
    {
      step: "03",
      title: "Transparent Treatment Plan",
      subtitle: "Clear Options & Timelines",
      description: "A customized treatment roadmap presenting verified treatment alternatives, expected visits, and transparent fee estimates without hidden surprises."
    },
    {
      step: "04",
      title: "Gentle Clinical Care",
      subtitle: "Painless & Meticulous Execution",
      description: "Treatment executed under sterile conditions with profound local anesthesia, state-of-the-art instruments, and continuous patient comfort checks."
    },
    {
      step: "05",
      title: "Long-Term Preventative Care",
      subtitle: "Scheduled Review & Maintenance",
      description: "Post-operative follow-up, personalized oral hygiene coaching, and proactive annual check-up reminders to ensure enduring dental health."
    }
  ],

  // Patient FAQ
  faqs: [
    {
      q: "Is root canal treatment painful at Tamhankar Dental Clinic?",
      a: "No. With modern local anesthetics, electronic apex locators, and rotary instrumentation, root canal treatment is comfortable and virtually painless. Most patients report feeling instant relief from pre-existing toothache."
    },
    {
      q: "What sterilization standards are followed at the clinic?",
      a: "We adhere strictly to hospital-grade sterilization protocols using a Class-B vacuum autoclave. All instruments undergo ultrasonic cleaning, enzymatic bio-disinfection, individual heat-sealed pouching, and biological test monitoring."
    },
    {
      q: "How do I book an appointment?",
      a: "You can book directly via our online booking form on this website, message us directly on WhatsApp, or call our clinic desk. Our reception will confirm your slot promptly."
    },
    {
      q: "Do you offer emergency dental appointments?",
      a: "Yes. For severe dental trauma, unbearable toothaches, or bleeding emergencies, we prioritize same-day urgent care appointments."
    },
    {
      q: "Where is the clinic located in Panvel?",
      a: "Tamhankar Dental Clinic is centrally located at Sai Arcade, Ground Floor, near Panvel Railway Station road in Old Panvel, easily accessible from all parts of Navi Mumbai and Panvel city."
    }
  ]
};
