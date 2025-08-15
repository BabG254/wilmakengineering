import { 
  type Project, 
  type Testimonial, 
  type BlogPost, 
  type ContactMessage,
  insertContactMessageSchema,
  insertProjectSchema,
  insertTestimonialSchema,
  insertBlogPostSchema
} from "@shared/schema";

// Define storage interface with CRUD methods
export interface IStorage {
  getAllProjects(): Promise<Project[]>;
  getProjectById(id: number): Promise<Project | undefined>;
  createProject(project: Omit<Project, 'id'>): Promise<Project>;
  
  getAllTestimonials(): Promise<Testimonial[]>;
  getTestimonialById(id: number): Promise<Testimonial | undefined>;
  createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial>;
  
  getAllBlogPosts(): Promise<BlogPost[]>;
  getBlogPostById(id: number): Promise<BlogPost | undefined>;
  createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost>;
  
  createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage>;
}

export class MemStorage implements IStorage {
  private projects: Map<number, Project>;
  private testimonials: Map<number, Testimonial>;
  private blogPosts: Map<number, BlogPost>;
  private contactMessages: Map<number, ContactMessage>;
  
  private projectId: number;
  private testimonialId: number;
  private blogPostId: number;
  private contactMessageId: number;

  constructor() {
    this.projects = new Map();
    this.testimonials = new Map();
    this.blogPosts = new Map();
    this.contactMessages = new Map();
    
    this.projectId = 1;
    this.testimonialId = 1;
    this.blogPostId = 1;
    this.contactMessageId = 1;
    
    // Add some sample data
    this.initSampleData();
  }
  
  private initSampleData() {
    // Sample Projects
    const sampleProjects = [
      {
        title: "Commercial Refrigeration System",
        description: "Installation of industrial refrigeration system for a major supermarket chain in Nairobi. This project involved designing and implementing a custom cooling solution that reduced energy consumption by 30% while maintaining optimal temperature conditions for food preservation.",
        imageUrl: "https://images.unsplash.com/photo-1607582544956-a793312325c2",
        category: "Refrigeration",
        completionDate: new Date("2023-08-15")
      },
      {
        title: "Hotel HVAC Upgrade",
        description: "Complete overhaul of heating, ventilation, and air conditioning systems for a 5-star hotel. The new system features smart temperature control, improved air filtration, and energy-efficient components that resulted in a 25% reduction in operational costs.",
        imageUrl: "https://images.unsplash.com/photo-1586813551819-52de34c2548b",
        category: "Air Conditioning",
        completionDate: new Date("2023-05-22")
      },
      {
        title: "Hospital Ventilation System",
        description: "Design and installation of specialized ventilation system for a major hospital in Mombasa. The system includes HEPA filtration, negative pressure rooms for isolation areas, and precise humidity control to maintain sterile environments in operating theaters.",
        imageUrl: "https://images.unsplash.com/photo-1603728981511-eea7c2e14cdf",
        category: "Ventilation",
        completionDate: new Date("2023-11-30")
      },
      {
        title: "Restaurant Kitchen Equipment Installation",
        description: "Comprehensive kitchen equipment setup for a high-end restaurant in Nairobi. The project included commercial-grade refrigeration, ventilation systems, and cooking equipment installation, all optimized for energy efficiency and workflow optimization.",
        imageUrl: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f",
        category: "Kitchen Equipment",
        completionDate: new Date("2024-01-18")
      },
      {
        title: "Industrial LP Gas System",
        description: "Design and installation of an LP gas system for a manufacturing facility. This included storage tanks, distribution pipelines, safety systems, and monitoring equipment to ensure reliable and safe gas supply for industrial processes.",
        imageUrl: "https://images.unsplash.com/photo-1626446525425-d15c4ca62d27",
        category: "LP Gas",
        completionDate: new Date("2024-03-05")
      },
      {
        title: "Corporate Office HVAC Renovation",
        description: "Complete renovation of the air conditioning and ventilation system for a 10-floor corporate headquarters in Nairobi CBD. The project focused on energy efficiency, improved air quality, and zoned climate control for different office areas.",
        imageUrl: "https://images.unsplash.com/photo-1581094794329-c8112a89af12",
        category: "Air Conditioning",
        completionDate: new Date("2023-09-12")
      },
      {
        title: "Cold Storage Facility",
        description: "Construction of a large-scale cold storage facility for a food distribution company. The project included multiple temperature zones, advanced insulation, energy-efficient refrigeration systems, and digital monitoring solutions.",
        imageUrl: "https://images.unsplash.com/photo-1542013936693-884638332954",
        category: "Refrigeration",
        completionDate: new Date("2024-02-20")
      },
      {
        title: "School Ventilation Upgrade",
        description: "Modernization of ventilation systems for a large educational institution. The project improved air circulation, reduced CO2 levels in classrooms, and implemented energy recovery ventilators to maintain air quality while minimizing energy costs.",
        imageUrl: "https://images.unsplash.com/photo-1623743932725-8d99c82e90f7",
        category: "Ventilation",
        completionDate: new Date("2024-04-10")
      },
      {
        title: "Shopping Mall HVAC System",
        description: "Installation of a comprehensive HVAC solution for a new shopping mall in Kisumu. The system features variable refrigerant flow technology, digital controls, and integration with the building management system for optimal energy efficiency.",
        imageUrl: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
        category: "Air Conditioning",
        completionDate: new Date("2023-10-25")
      },
      {
        title: "Luxury Hotel Kitchen Equipment",
        description: "Complete kitchen solution for a 5-star hotel in Nairobi. This comprehensive project included the design and installation of custom stainless-steel cooking islands, walk-in refrigeration units, specialized ventilation hoods, and energy-efficient appliances. The kitchen was designed to support multiple dining venues within the hotel, with optimized workflow to maximize efficiency during peak service times.",
        imageUrl: "https://images.unsplash.com/photo-1551183053-bf91a1d81141",
        category: "Kitchen Equipment",
        completionDate: new Date("2024-05-10")
      },
      {
        title: "Pharmaceutical Manufacturing Ventilation",
        description: "Specialized ventilation system for a pharmaceutical manufacturing facility in Nakuru. The system was designed to maintain stringent clean room conditions with precise control of air pressure, filtration, temperature, and humidity. The installation included HEPA filtration systems, airlocks, and monitoring systems to ensure compliance with international pharmaceutical manufacturing standards.",
        imageUrl: "https://images.unsplash.com/photo-1598965402089-897ce52e8355",
        category: "Ventilation",
        completionDate: new Date("2024-06-15")
      },
      {
        title: "Multi-Zone LP Gas System for Resort",
        description: "Design and installation of a comprehensive LP gas distribution system for a large lakeside resort. The project included centralized storage facilities with multiple distribution zones serving restaurants, water heating systems, and backup generators. Safety features included automated shut-off valves, leak detection systems, and remote monitoring capabilities.",
        imageUrl: "https://images.unsplash.com/photo-1508344928928-7165b67de128",
        category: "LP Gas",
        completionDate: new Date("2024-07-22")
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
    
    // Sample Testimonials
    const sampleTestimonials = [
      {
        name: "John Kamau",
        role: "Operations Manager, Kenya Supermarkets Ltd",
        content: "WILMAK Engineering delivered an exceptional refrigeration system that has significantly reduced our energy costs and improved product shelf life.",
        rating: 5
      },
      {
        name: "Sarah Odhiambo",
        role: "General Manager, Royal Blue Hotel",
        content: "The HVAC upgrade by WILMAK has transformed our guest experience. The team was professional and completed the project ahead of schedule.",
        rating: 5
      },
      {
        name: "Dr. Michael Wambua",
        role: "Director, Coastal General Hospital",
        content: "WILMAK's ventilation system has improved air quality in our critical care units. Their attention to healthcare-specific requirements was impressive.",
        rating: 4
      },
      {
        name: "Robert Maina",
        role: "Facilities Director, Sunset Plaza Mall",
        content: "We've worked with several engineering firms, but WILMAK stands out for their technical expertise and customer service. The air conditioning system they installed has operated flawlessly for over a year.",
        rating: 5
      },
      {
        name: "Elizabeth Njeri",
        role: "CEO, Fresh Foods Distribution",
        content: "Our cold storage facility designed by WILMAK has been a game-changer for our business. The attention to detail and quality of installation exceeded our expectations.",
        rating: 5
      }
    ];
    
    sampleTestimonials.forEach(testimonial => {
      this.createTestimonial(testimonial);
    });
    
    // Sample Blog Posts
    const sampleBlogPosts = [
      {
        title: "Energy Efficiency in Commercial Refrigeration",
        content: "In today's world, energy efficiency isn't just good for the environment—it's good for business too. Commercial refrigeration systems can account for a significant portion of a business's energy consumption. At WILMAK Engineering, we specialize in designing and installing energy-efficient refrigeration systems that can significantly reduce operational costs without compromising performance.\n\nModern refrigeration technology offers numerous ways to enhance efficiency. Variable speed compressors adjust their operation based on cooling demand, smart defrost systems only run when needed, and advanced insulation materials minimize heat transfer. Additionally, using environmentally friendly refrigerants not only reduces your carbon footprint but can also improve system efficiency.\n\nOne of our recent projects for a supermarket chain in Nairobi demonstrated these principles in action. By implementing a state-of-the-art refrigeration system with heat recovery capabilities, we helped the client reduce their energy consumption by 32% compared to their previous system. The recovered heat is now used for water heating, further enhancing overall building efficiency.\n\nWhen considering an upgrade to your commercial refrigeration system, it's important to evaluate the entire lifecycle cost rather than just the initial investment. More efficient systems typically cost more upfront but deliver substantial savings over time through reduced energy bills and maintenance costs.\n\nContact our team today to learn how we can help optimize your refrigeration systems for maximum efficiency and performance.",
        imageUrl: "https://images.unsplash.com/photo-1606857521015-7f9fcf423740",
        publishedAt: new Date("2023-09-01"),
        author: "David Njoroge, Chief Engineer"
      },
      {
        title: "The Importance of Regular HVAC Maintenance",
        content: "Regular maintenance of your HVAC systems is crucial for ensuring optimal performance and longevity. In this post, we discuss the key benefits of scheduled maintenance and what it should include.\n\nPreventive maintenance is far more cost-effective than emergency repairs. When HVAC systems break down unexpectedly, businesses face not only repair costs but also potential losses due to downtime and uncomfortable conditions for employees and customers. Regular maintenance helps identify potential issues before they become major problems.\n\nA well-maintained HVAC system operates more efficiently, consuming less energy while providing better climate control. Studies show that proper maintenance can reduce energy consumption by 15-20% compared to neglected systems. This translates directly to lower utility bills and a reduced environmental impact.\n\nAt WILMAK Engineering, our comprehensive maintenance program includes:\n\n1. Inspection and cleaning of all components\n2. Lubrication of moving parts\n3. Checking and calibrating thermostats\n4. Testing system controls\n5. Inspecting ductwork for leaks\n6. Checking refrigerant levels\n7. Cleaning or replacing filters\n8. Examining electrical connections\n\nWe recommend scheduling maintenance at least twice a year—ideally before the hottest and coolest seasons—to ensure your system is ready for peak demand periods. For facilities with critical climate control needs, such as hospitals or data centers, more frequent maintenance may be advisable.\n\nInvesting in a maintenance agreement with a reputable provider like WILMAK Engineering ensures that your HVAC systems receive regular professional attention without you having to remember scheduling. This proactive approach extends equipment life, maintains warranty coverage, and provides peace of mind.",
        imageUrl: "https://images.unsplash.com/photo-1617104678798-08925113358b",
        publishedAt: new Date("2023-10-15"),
        author: "Jane Mwangi, Technical Director"
      },
      {
        title: "Innovations in Ventilation Technology",
        content: "Ventilation technology has seen remarkable advancements in recent years, with new systems offering improved air quality, energy efficiency, and smart controls. As specialists in ventilation systems, WILMAK Engineering stays at the forefront of these innovations to provide our clients with cutting-edge solutions.\n\nEnergy Recovery Ventilation (ERV) and Heat Recovery Ventilation (HRV) systems have revolutionized how we approach air exchange in buildings. These systems recover heat or coolness from exhaust air before it leaves the building, transferring it to incoming fresh air. This significantly reduces the energy required to condition incoming air, resulting in substantial energy savings while maintaining excellent indoor air quality.\n\nDemand-controlled ventilation uses sensors to monitor occupancy levels and air quality metrics such as CO2, humidity, and VOCs. The system automatically adjusts ventilation rates based on real-time data, providing appropriate air exchange without wasting energy on over-ventilation when spaces are unoccupied or under-utilized.\n\nUltraviolet Germicidal Irradiation (UVGI) technology incorporated into ventilation systems helps eliminate airborne pathogens, including bacteria, viruses, and mold spores. This is particularly valuable in healthcare facilities, schools, and other high-occupancy buildings where preventing the spread of infectious diseases is critical.\n\nAdvanced filtration technologies, including HEPA filters and electrostatic precipitators, remove smaller particles from the air than conventional filters, creating healthier indoor environments. These systems are increasingly important as awareness of indoor air quality's impact on health and productivity continues to grow.\n\nAt WILMAK Engineering, we evaluate each client's specific needs before recommending ventilation solutions. Factors including building use, occupancy patterns, local climate, and energy efficiency goals all influence the optimal system design. Contact us to learn how innovative ventilation technology can improve your facility's air quality and energy performance.",
        imageUrl: "https://images.unsplash.com/photo-1585503418537-88331351ad99",
        publishedAt: new Date("2023-12-05"),
        author: "Peter Kinyua, Innovation Lead"
      },
      {
        title: "Selecting the Right Commercial Kitchen Equipment",
        content: "Selecting appropriate commercial kitchen equipment is a critical decision that impacts operational efficiency, food quality, and energy consumption. As specialists in kitchen equipment installation, WILMAK Engineering offers expert guidance on making these important choices.\n\nCommercial kitchens have unique ventilation requirements due to heat, moisture, and cooking byproducts. A properly designed kitchen ventilation system not only removes contaminants and excess heat but also contributes to a comfortable working environment and ensures compliance with health and safety regulations.\n\nModern commercial refrigeration offers various options including reach-in units, walk-in coolers and freezers, under-counter refrigeration, and specialized units like blast chillers. The right combination depends on your menu, production volume, and kitchen workflow. Energy-efficient models may cost more initially but deliver significant savings over their operational lifetime.\n\nWhen selecting cooking equipment, consider not only current needs but future menu flexibility. Combination cooking systems that offer multiple functions in a single unit can maximize space efficiency in smaller kitchens. Additionally, equipment with programmable controls helps ensure consistent food quality regardless of which staff member is operating it.\n\nEnsuring proper utility connections for all equipment is essential. Gas, electrical, water, and drainage requirements must be carefully planned during the design phase. WILMAK's technical team evaluates your facility's infrastructure to confirm it can support your equipment selections or recommends necessary upgrades.\n\nSustainability considerations are increasingly important in commercial kitchens. Energy Star-rated equipment, water-saving technologies, and heat recovery systems can substantially reduce utility costs and environmental impact. Many businesses find that these investments pay for themselves through operational savings while also supporting environmental commitments.\n\nWILMAK Engineering provides comprehensive kitchen equipment services from initial consultation and design through installation and maintenance. Our experience across numerous restaurant and institutional kitchen projects ensures we can help you create a functional, efficient kitchen that supports your culinary operations.",
        imageUrl: "https://images.unsplash.com/photo-1588542997599-d74953c59498",
        publishedAt: new Date("2024-01-20"),
        author: "Stephen Kimani, Project Manager"
      },
      {
        title: "Safety Considerations for LP Gas Installations",
        content: "LP (Liquefied Petroleum) gas installations require careful planning and adherence to strict safety standards to prevent hazardous situations. As specialists in LP gas systems, WILMAK Engineering prioritizes safety in every installation and maintenance service we provide.\n\nProper storage tank placement is the foundation of a safe LP gas system. Tanks must be positioned at safe distances from buildings, property lines, sources of ignition, and areas of high traffic. They should be placed on stable, non-combustible surfaces and protected from vehicle impact where necessary.\n\nGas detection systems provide an essential early warning of potential leaks. Modern detectors can automatically trigger alarms, shut off gas supply, and even notify monitoring services when gas is detected. These systems are particularly important for indoor installations and facilities with intermittent occupancy.\n\nRegular professional inspection of LP gas systems is not just a good practice—it's often required by regulations. These inspections check for proper functioning of pressure regulators, leak detection in piping and connections, condition of storage tanks, and testing of safety devices. WILMAK's certified technicians conduct thorough evaluations to identify and address potential issues before they become safety hazards.\n\nStaff training is a critical component of LP gas safety. Employees should understand basic gas safety principles, know how to respond to gas odors or alarms, and be familiar with emergency shutdown procedures. We provide comprehensive training sessions for facility personnel as part of our installation service.\n\nDocumentation and record-keeping may seem mundane, but they're essential aspects of gas safety management. Maintaining accurate records of installations, modifications, inspections, and incidents helps ensure continuous safe operation and demonstrates compliance with regulatory requirements.\n\nWILMAK Engineering's LP gas services include system design, installation, inspection, maintenance, and staff training. Our team stays current with industry standards and regulations to deliver gas systems that operate safely and efficiently. Contact us to learn how we can help ensure your LP gas installation meets the highest safety standards.",
        imageUrl: "https://images.unsplash.com/photo-1623911329432-e2cbd7760e5b",
        publishedAt: new Date("2024-02-10"),
        author: "George Omondi, Safety Compliance Manager"
      },
      {
        title: "Designing HVAC Systems for Healthcare Facilities",
        content: "Healthcare facilities present unique challenges for HVAC design due to their critical requirements for infection control, patient comfort, and consistent environmental conditions. WILMAK Engineering specializes in creating HVAC solutions that address these specialized needs.\n\nInfection control is paramount in healthcare environments. Properly designed HVAC systems help prevent the spread of airborne pathogens through strategies such as negative pressure isolation rooms, appropriate air exchange rates, directional airflow, and high-efficiency filtration. These features are particularly crucial in surgical suites, isolation rooms, and other critical care areas.\n\nDifferent areas within healthcare facilities require specific environmental conditions. Operating rooms need precise temperature and humidity control, pharmacies may require positive pressure to prevent contamination, and patient rooms must prioritize comfort while maintaining appropriate ventilation. A well-designed HVAC system addresses these varied requirements through careful zoning and controls.\n\nReliability is non-negotiable in healthcare HVAC systems. Backup systems, redundant components, and emergency power connections ensure continuous operation even during power outages or equipment failures. Regular maintenance and monitoring help prevent unexpected downtime in these critical systems.\n\nEnergy efficiency remains important despite the demanding requirements of healthcare facilities. Strategies such as heat recovery, variable air volume systems, and intelligent controls help minimize energy consumption without compromising performance. Many hospitals find that investments in efficiency measures yield significant operational savings over time.\n\nCompliance with healthcare-specific standards and regulations is essential. WILMAK's design team stays current with requirements from organizations such as ASHRAE, AIA, and local health departments to ensure that all systems meet or exceed applicable standards.\n\nWILMAK Engineering has extensive experience designing and installing HVAC systems for hospitals, clinics, and specialized healthcare facilities throughout Kenya. Our comprehensive approach considers not only technical requirements but also operational needs, future flexibility, and lifecycle costs. Contact us to discuss how we can support your healthcare facility's environmental control needs.",
        imageUrl: "https://images.unsplash.com/photo-1516549655169-df83a0774514",
        publishedAt: new Date("2024-03-15"),
        author: "Dr. Christine Wangari, Healthcare Solutions Specialist"
      },
      {
        title: "Sustainable Cooling Solutions for the African Climate",
        content: "Africa's hot climate presents unique cooling challenges that require innovative, sustainable solutions. At WILMAK Engineering, we specialize in developing cooling systems that balance performance, energy efficiency, and environmental responsibility for the specific conditions of the African continent.\n\nPassive cooling strategies can significantly reduce the energy demands of mechanical cooling systems. Techniques such as strategic building orientation, appropriate insulation, shading devices, natural ventilation, and thermal mass can work with the local climate rather than against it. Incorporating these passive approaches into building design provides a solid foundation for efficient cooling.\n\nEvaporative cooling offers an energy-efficient option for dry climates, using the natural cooling effect of water evaporation to reduce air temperature. Direct and indirect evaporative cooling systems can reduce energy consumption by up to 80% compared to conventional air conditioning in appropriate conditions. This approach is particularly valuable in the drier regions of Kenya and East Africa.\n\nSolar cooling technologies are increasingly viable in Africa given the abundant sunshine available. Absorption and adsorption cooling systems can use solar thermal energy to drive the cooling process, while photovoltaic panels can power efficient electric cooling systems. These solar-driven solutions help address both energy access and sustainability concerns.\n\nDistrict cooling systems, where centralized plants serve multiple buildings through a network of insulated pipes, offer economies of scale and operational efficiencies for dense urban developments. Though requiring significant initial investment, these systems can substantially reduce energy consumption and peak electricity demand across communities.\n\nAdaptive comfort standards recognize that people living in hot climates typically have different thermal comfort expectations than those in temperate regions. Designing systems with these adaptive standards in mind can avoid overcooling spaces, saving energy while maintaining appropriate comfort levels for local populations.\n\nWILMAK Engineering integrates these sustainable approaches with conventional cooling technologies to create holistic solutions tailored to each project's specific context. Our experience across diverse African environments informs practical, effective cooling strategies that minimize environmental impact while delivering reliable performance.",
        imageUrl: "https://images.unsplash.com/photo-1595356700395-6f14b5c1f33f",
        publishedAt: new Date("2024-04-22"),
        author: "Samuel Muthoni, Sustainability Director"
      },
      {
        title: "Smart Building Automation for Commercial Spaces",
        content: "Smart building automation systems are revolutionizing how commercial facilities manage their HVAC, lighting, security, and other building systems. WILMAK Engineering specializes in designing and implementing intelligent building solutions that enhance comfort, reduce energy consumption, and lower operational costs.\n\nAt the heart of a smart building is the Building Management System (BMS), which integrates various building systems into a centralized control platform. Modern BMS platforms feature intuitive user interfaces, allowing facility managers to monitor and adjust building operations from anywhere via desktop or mobile applications. This centralized control enables more efficient management of complex facilities.\n\nOccupancy-based control is a key feature of smart buildings, using sensors to detect the presence of people in different zones. These systems can automatically adjust HVAC settings, lighting levels, and fresh air ventilation based on real-time occupancy data. Spaces that are unoccupied can be set to energy-saving modes, significantly reducing unnecessary energy consumption.\n\nPredictive analytics and machine learning capabilities are increasingly common in advanced building automation systems. These technologies analyze patterns in building usage, weather data, and system performance to anticipate needs and optimize operations accordingly. For example, the system might begin cooling a space in advance of expected occupancy or predict when equipment might require maintenance.\n\nEnergy optimization is a primary benefit of smart building technology. By continuously monitoring energy consumption across all systems and identifying inefficiencies, these platforms can help businesses reduce energy costs by 15-30%. The system can generate detailed reports on energy usage patterns, helping facility managers make informed decisions about further efficiency improvements.\n\nRemote monitoring and management capabilities have become especially valuable in recent years. Building operators can receive alerts about system malfunctions, energy anomalies, or maintenance requirements in real-time, even when off-site. This enables faster response to issues and helps prevent minor problems from developing into major failures.\n\nAt WILMAK Engineering, we work closely with clients to design customized automation solutions that address their specific operational needs and budget considerations. From basic systems focusing on core HVAC controls to comprehensive platforms integrating all building functions, we help businesses harness the power of smart technology to create more efficient, comfortable, and sustainable commercial environments.",
        imageUrl: "https://images.unsplash.com/photo-1558002038-1055907df827",
        publishedAt: new Date("2024-05-18"),
        author: "James Kariuki, Technology Integration Specialist"
      },
      {
        title: "Cold Chain Solutions for Kenya's Agricultural Sector",
        content: "Kenya's agricultural sector plays a vital role in the national economy, but post-harvest losses remain a significant challenge. WILMAK Engineering provides specialized cold chain solutions designed to help farmers, cooperatives, and distributors preserve the quality of their produce and reduce waste throughout the supply chain.\n\nPost-harvest losses in Kenya can reach up to 40% for some perishable crops, representing not only economic waste but also a missed opportunity to improve food security. Effective cold chain systems—from farm cooling to transportation refrigeration to cold storage facilities—can dramatically reduce these losses while extending market reach for agricultural producers.\n\nOn-farm pre-cooling is often the critical first step in the cold chain. Removing field heat from harvested produce as quickly as possible is essential for maintaining quality and extending shelf life. WILMAK offers scalable pre-cooling solutions including forced-air cooling systems and hydro-coolers suitable for various crops and farm sizes. Even small-scale farmers can benefit from affordable cooling technologies such as evaporative cool rooms that don't require conventional refrigeration equipment.\n\nMobile cold storage units provide flexibility for smallholder farmers who may not have access to permanent cooling facilities. These portable solutions can be shared among farmer groups or deployed by aggregators who collect produce from multiple small farms. Solar-powered options make these systems viable even in areas with unreliable grid electricity.\n\nFor processing facilities and distribution centers, we design comprehensive refrigeration systems that can accommodate multiple temperature zones for different types of produce. These facilities often incorporate energy-efficient features such as thermal energy storage, variable speed drives, and advanced insulation to minimize operational costs while maintaining optimal conditions.\n\nCold transport links the various stages of the supply chain. Our refrigerated transport solutions range from small insulated boxes with phase-change materials for short distances to fully refrigerated trucks for longer journeys. We focus on robust systems that can reliably maintain temperature despite challenging road conditions and high ambient temperatures.\n\nWILMAK Engineering's approach to agricultural cold chain development emphasizes appropriate technology, energy efficiency, and financial sustainability. We work with clients to develop solutions that match their specific crops, volumes, and market requirements, helping Kenya's agricultural sector reduce waste and increase value through improved product quality and market access.",
        imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28",
        publishedAt: new Date("2024-06-05"),
        author: "Grace Mwende, Agricultural Solutions Manager"
      },
      {
        title: "Improving Indoor Air Quality in Commercial Buildings",
        content: "Indoor air quality (IAQ) has become a critical concern for businesses as awareness grows about its impact on occupant health, cognitive function, and overall productivity. WILMAK Engineering specializes in comprehensive IAQ solutions that help commercial buildings create healthier indoor environments.\n\nThe quality of indoor air is influenced by numerous factors, including ventilation effectiveness, filtration efficiency, humidity control, and the presence of pollutant sources. Poor IAQ can lead to various symptoms collectively known as 'sick building syndrome,' including headaches, fatigue, respiratory issues, and reduced concentration—all of which can significantly impact workplace productivity and employee well-being.\n\nVentilation optimization is fundamental to good IAQ. Many commercial buildings in Kenya operate with insufficient outdoor air exchange rates or poorly balanced ventilation systems. Our engineering team conducts detailed assessments of existing systems and can implement solutions ranging from basic adjustments to complete system redesigns to ensure adequate fresh air distribution throughout occupied spaces.\n\nAdvanced filtration goes beyond the standard filters found in most commercial HVAC systems. MERV 13+ rated filters, electronic air cleaners, and HEPA filtration systems can remove a much higher percentage of airborne particulates, including those in the respirable size range most concerning for lung health. For specific concerns such as odors or gaseous contaminants, activated carbon filters or photocatalytic oxidation systems may be appropriate additions.\n\nControllable humidity is essential for both comfort and health. Excessive humidity promotes mold growth and dust mite proliferation, while overly dry air can irritate mucous membranes and increase susceptibility to respiratory infections. We implement precise humidity control systems that maintain optimal levels (typically 40-60% relative humidity) year-round.\n\nContinuous monitoring represents the most advanced approach to IAQ management. Real-time sensor networks measuring parameters such as CO2, particulates, VOCs, temperature, and humidity provide immediate feedback on air quality conditions. These systems can be integrated with building automation to trigger corrective actions when parameters exceed acceptable ranges and provide valuable data for ongoing system optimization.\n\nWILMAK Engineering's approach to IAQ improvement begins with a comprehensive assessment of current conditions and specific challenges. We then develop tailored solutions that address identified issues while considering energy efficiency and operational constraints. Whether you're addressing specific air quality concerns or pursuing certification under programs like WELL or LEED, our team can help you create a healthier, more productive indoor environment for your building occupants.",
        imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
        publishedAt: new Date("2024-07-12"),
        author: "Dr. Benjamin Mutua, Indoor Environmental Quality Specialist"
      },
      {
        title: "Refrigeration Solutions for Kenya's Growing Pharmaceutical Industry",
        content: "Kenya's pharmaceutical industry is experiencing significant growth, creating demand for specialized refrigeration and temperature control systems that meet strict regulatory requirements. WILMAK Engineering provides customized solutions for pharmaceutical manufacturers, distributors, and healthcare facilities that ensure product integrity throughout the supply chain.\n\nPharmaceutical products often require precise temperature control within narrow ranges. Different categories of medications have specific requirements: vaccines typically require storage between 2-8°C, many biologics need -20°C or colder, while other medications may require controlled room temperature conditions of 20-25°C. Our systems are designed to maintain these specific ranges with high reliability and minimal fluctuation.\n\nRedundancy is critical in pharmaceutical refrigeration because temperature excursions can compromise product efficacy or safety. WILMAK designs include backup power systems, redundant refrigeration components, and fail-safe alarm systems to ensure continuous operation even during equipment failures or power outages. This approach provides the reliability required for valuable and sensitive pharmaceutical products.\n\nTemperature monitoring and documentation capabilities are essential for regulatory compliance. Our systems incorporate calibrated temperature sensors, continuous data logging, automated reporting, and alert systems that notify responsible personnel immediately if temperatures approach critical limits. This comprehensive documentation supports GDP (Good Distribution Practice) and GMP (Good Manufacturing Practice) compliance requirements.\n\nEnergy efficiency remains important despite the critical nature of pharmaceutical refrigeration. We implement technologies such as variable speed compressors, high-efficiency heat exchangers, advanced insulation materials, and smart defrost cycles to minimize energy consumption without compromising system performance. These features help pharmaceutical companies reduce operational costs while maintaining strict temperature control.\n\nFor transportation and last-mile delivery, we provide validated cold chain packaging solutions and portable refrigeration units. These systems are designed to maintain required temperatures during distribution, with features such as phase-change materials, vacuum insulation panels, and temperature monitoring devices to ensure product integrity throughout the journey from manufacturer to patient.\n\nWILMAK Engineering works closely with pharmaceutical clients to understand their specific requirements, risk profiles, and operational constraints. Our team's expertise in both refrigeration technology and pharmaceutical regulations enables us to design and implement systems that protect valuable medical products while supporting the growth of Kenya's pharmaceutical sector. Whether you're establishing a new manufacturing facility, upgrading a warehouse, or enhancing a hospital pharmacy's storage capabilities, we provide solutions that ensure pharmaceutical efficacy and patient safety.",
        imageUrl: "https://images.unsplash.com/photo-1576086213369-97a306d36557",
        publishedAt: new Date("2024-08-03"),
        author: "Esther Kamau, Pharmaceutical Systems Engineer"
      }
    ];
    
    sampleBlogPosts.forEach(blogPost => {
      this.createBlogPost(blogPost);
    });
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProjectById(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(project: Omit<Project, 'id'>): Promise<Project> {
    const id = this.projectId++;
    const newProject = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }

  async getTestimonialById(id: number): Promise<Testimonial | undefined> {
    return this.testimonials.get(id);
  }

  async createTestimonial(testimonial: Omit<Testimonial, 'id'>): Promise<Testimonial> {
    const id = this.testimonialId++;
    const newTestimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Blog post methods
  async getAllBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values());
  }

  async getBlogPostById(id: number): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(blogPost: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    const id = this.blogPostId++;
    const newBlogPost = { ...blogPost, id };
    this.blogPosts.set(id, newBlogPost);
    return newBlogPost;
  }
  
  // Contact message methods
  async createContactMessage(message: Omit<ContactMessage, 'id' | 'createdAt'>): Promise<ContactMessage> {
    const id = this.contactMessageId++;
    const newMessage = { 
      ...message, 
      id, 
      createdAt: new Date() 
    };
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }
}

export const storage = new MemStorage();
