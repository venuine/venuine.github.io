// Add real image paths here to make the photo and screenshots part of the site.
window.PortfolioContent = {
  person: {name:'Vien', role:'Front-end developer', email:'vmulaurente@proton.me', portrait:'assets/images/vien.png'},
  profile: [
    {name:'The developer', subtitle:'A little introduction', title:'Building things that work beautifully.', rows:[
      ['My focus','Front-end and web application development, with hands-on experience in back-end functionality, databases, API integration, and cloud services.'],
      ['My approach','Finding the balance between functional engineering and thoughtful interface design. I like understanding how systems connect and making practical work easier.'],
      ['My perspective','Game development and interactive media influence how I approach digital interfaces.']
    ]},
    {name:'What drives me', subtitle:'Purpose & perspective', title:'Products, not just projects.', rows:[
      ['Practical value','I want to create applications that can grow beyond prototypes and serve real users.'],
      ['Thoughtful experiences','Useful functionality and clear interfaces belong together. The details should help people understand what to do next.'],
      ['Connected thinking','I enjoy the relationships between interfaces, information, and the services behind them.']
    ]},
    {name:'Looking ahead', subtitle:'The next chapter', title:'Keep building, keep refining.', rows:[
      ['Opportunities','Contribute to real products and keep growing through hands-on development.'],
      ['Collaboration','Work with teams, learn from different perspectives, and build useful things together.'],
      ['Ambition','Take on more ambitious systems end to end while sharpening my design judgment.']
    ]}
  ],
  projects:[
    {id:'manson',source:'https://github.com/venuine/manson-trading',demo:'',name:'Manson Trading',short:'MT',category:'Commerce & operations',status:'Selected work',description:'An e-commerce and inventory-management system with AI-integrated modules supporting business workflows.',focus:'Commerce, inventory, and business workflows.',tags:['E-commerce','Inventory','AI integration'],images:['assets/images/manson-trading.png']},
    {id:'trusthome',source:'https://github.com/carilloandrei9264/team-idle',demo:'https://trusthome-ph.web.app/',name:'TrustHomePH',short:'TH',category:'Property marketplace',status:'Selected work',description:'A catalogue and marketplace experience for discovering and browsing bank-acquired properties.',focus:'Property discovery and a clearer browsing experience.',tags:['Marketplace','Property catalogue'],images:['assets/images/trusthome.png']},
    {id:'edi',source:'https://github.com/venuine/edi-retailer-demo',demo:'https://venuine.github.io/edi-retailer-demo/',name:'Hotel EDI System',short:'EDI',category:'Automation & integration',status:'Selected work',description:'A collaborative hotel supply-chain platform connecting retailer, manufacturer, logistics, and customer workflows through REST APIs and automated purchase orders.',focus:'Connected workflows and electronic data interchange.',tags:['Node.js','Firebase','REST APIs'],images:['assets/images/edi-dashboard.png']},
    {id:'royal',name:'Royal Guard',short:'RG',category:'Discord bot & dashboard',status:'In development',description:'Discord verification and server management with a web dashboard and Firebase integration.',focus:'Community tools and connected workflows.',tags:['Discord','Dashboard','Firebase'],images:[]},
  ],
  learning:[{name:'Cybersecurity',icon:'shield'},{name:'AI / ML',icon:'code'}],
  skills:[
    {id:'frontend',name:'Interface',subtitle:'Front-end development',theme:'orbits',description:'Structure, styling, interaction, and the tools that bring web interfaces to life.',items:[['HTML5','Structure'],['CSS3','Presentation'],['JavaScript','Interaction'],['React','Components'],['Tailwind CSS','Styling'],['Vite','Build tooling']]},
    {id:'backend',name:'Systems',subtitle:'Back-end & integration',theme:'network',description:'Application logic, services, and the APIs that connect the pieces.',items:[['Node.js','Application runtime'],['PHP','Server-side development'],['Laravel','Application framework'],['REST APIs','System communication']]},
    {id:'cloud',name:'Foundation',subtitle:'Data & deployment',theme:'spire',description:'Databases, cloud services, and the platforms where applications are delivered.',items:[['MySQL','Relational data'],['SQLite','Embedded data'],['Firebase','Application services'],['AWS','Cloud platform'],['Google Cloud','Cloud platform'],['Vercel','Web deployment']]},
    {id:'tools',name:'Practice',subtitle:'Tools & languages',theme:'signal',description:'Version control, additional languages, testing, and data modeling.',items:[['Git','Version control'],['GitHub','Collaboration'],['C#','Programming language'],['Java','Programming language'],['API Testing','Verification'],['Database Design','Data modeling']]}
  ]
};
