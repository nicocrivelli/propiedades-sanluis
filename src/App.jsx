import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Building, CheckCircle2, Calculator, ArrowRight, 
  MapPin, Phone, Instagram, Facebook, Key, Hammer, 
  ShieldCheck, TrendingUp, Map, BadgeDollarSign, ChevronDown,
  Search, X, Filter, ChevronLeft, ChevronRight
} from 'lucide-react';

// ============================================================================
// 1. CONFIGURACIÓN GLOBAL (EDITAR AQUÍ TODA LA INFORMACIÓN)
// ============================================================================
const SITE_DATA = {
  // --- IDENTIDAD ---
  brand: {
    name: "PROPIEDADES SAN LUIS",
    slogan: "Inmobiliaria & Constructora",
    logoUrl: "img/logo.png", // Deja vacío para usar el ícono por defecto
    matricula: "Gustavo Javier Robello - Matrícula: 1051",
    copyright: "© 2026 Propiedades San Luis. Todos los derechos reservados."
  },
  
  // --- PALETA DE COLORES ---
  colors: {
    petroleum: "#113f3d",        // Verde Petróleo principal
    petroleumLight: "#1a5c59",   // Verde Petróleo claro
    copper: "#c76d38",           // Naranja/Cobre de acento
    copperHover: "#a6582a",      // Cobre oscuro para hover
    sand: "#f5f2eb",             // Fondo claro
  },

  // --- CONTACTO ---
  contact: {
    whatsapp: "5492665022821",   // Número para cotizador y botones
    phone1: "266 502 2821",
    phone2: "266 458 3447",
    address: "Ayacucho 1419, San Luis",
    instagram: "https://instagram.com/propiedades_sanluis",
    facebook: "https://facebook.com/propiedades.sanluis"
  },

  // --- SECCIÓN HERO ---
  hero: {
    familia: {
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2000&auto=format&fit=crop",
      video: "img/hero-constructora.mp4", 
      badge: "Desarrollo Llave en Mano",
      titleLine1: "Construimos tu hogar,",
      titleLine2: "sin preocupaciones.",
      description: "Nos encargamos de TODO. Desde la nivelación del terreno hasta el último detalle de diseño. Su única tarea es disfrutar el proceso.",
      buttonText: "Iniciar Proyecto"
    },
    inversor: {
      image: "https://images.unsplash.com/photo-1613490908574-dbf861536f90?q=80&w=2000&auto=format&fit=crop",
      video: "img/hero-inmobiliaria.mp4", 
      badge: "Gestión de Alto Nivel",
      titleLine1: "Inversiones sólidas,",
      titleLine2: "respaldo profesional.",
      description: "Tasaciones precisas, administración transparente y oportunidades estratégicas en la provincia de San Luis.",
      buttonText: "Ver Oportunidades"
    }
  },

  // --- SECCIÓN DISEÑO / VIDEO ---
  designSection: {
    videoUrl: "img/video.mp4", 
    badge: "Visualización",
    title: "Diseño Transparente.",
    description: "Analizamos cada aspecto volumétrico antes de colocar el primer ladrillo. Entienda el espacio, la iluminación y la materialidad de su futura casa."
  },

  // --- CALCULADORA DE PROYECTOS ---
  calculator: {
    basePricePerM2: 650, 
    roofMultipliers: { chapa: 0, madera: 0.15 },
    qualityMultipliers: { estandar: 0, premium: 0.30 }
  },

  // --- SCROLLYTELLING (CAPAS ISOMÉTRICAS) ---
  scrollytelling: {
    layers: [
      "img/etapa1.png", // Capa 1: Platea
      "img/etapa2.png", // Capa 2: Mampostería
      "img/etapa3.png", // Capa 3: Techos
      "img/etapa4.png", // Capa 4: Detalles
    ]
  },

  // --- CATÁLOGO DE PROPIEDADES (INMOBILIARIA) ---
  catalog: [
    { 
      id: 1, 
      title: "Complejo Turístico", 
      loc: "Potrero de los Funes", 
      price: "USD 490.000", 
      tag: "Venta", 
      type: "Complejo", 
      img: "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=800&auto=format&fit=crop",
      description: "Excepcional complejo turístico en funcionamiento. Cuenta con cabañas totalmente equipadas, piscina climatizada, solarium y amplio parque. Excelente rentabilidad comprobable en una de las zonas de mayor demanda turística de la provincia.",
      features: ["1500m² Lote", "400m² Cubiertos", "Piscina y Solarium", "Cocheras Techadas", "Totalmente equipado"],
      gallery: [
        "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?q=80&w=800&auto=format&fit=crop"
      ],
      mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13340.590505193641!2d-66.2338!3d-33.2263!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95d43a5023fa8c95%3A0xc4eb9d3cf305e582!2sPotrero%20de%20los%20Funes%2C%20San%20Luis!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
    },
    { id: 2, title: "Terreno Donovan", loc: "1260 m² - Luz y Agua", price: "USD 15.500", tag: "Venta", type: "Terreno", img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=800&auto=format&fit=crop" },
    { id: 3, title: "Vivienda Familiar", loc: "Ciudad de San Luis", price: "USD 110.000", tag: "Venta", type: "Casa", img: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=800&auto=format&fit=crop" },
    { id: 4, title: "Local Comercial", loc: "Centro Capital", price: "Consultar", tag: "Alquiler", type: "Local", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=800&auto=format&fit=crop" },
    { id: 5, title: "Loteo Río Cito", loc: "Trapiche - 2000 m²", price: "USD 15.000", tag: "Venta", type: "Terreno", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?q=80&w=800&auto=format&fit=crop" },
    { id: 6, title: "Departamento Céntrico", loc: "Ciudad de San Luis", price: "USD 65.000", tag: "Venta", type: "Departamento", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=800&auto=format&fit=crop" },
    { id: 7, title: "Casa Quinta", loc: "Estancia Grande", price: "USD 85.000", tag: "Venta", type: "Casa", img: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800&auto=format&fit=crop" }
  ]
};

const FontStyles = () => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');

      :root {
        --color-petroleum: ${SITE_DATA.colors.petroleum};
        --color-petroleum-light: ${SITE_DATA.colors.petroleumLight};
        --color-copper: ${SITE_DATA.colors.copper};
        --color-copper-hover: ${SITE_DATA.colors.copperHover};
        --color-sand: ${SITE_DATA.colors.sand};
      }

      body {
        background-color: var(--color-sand);
        font-family: 'Inter', sans-serif;
        color: #333;
        overflow-x: hidden;
      }

      .font-serif { font-family: 'Playfair Display', serif; }
      .bg-petroleum { background-color: var(--color-petroleum); }
      .text-petroleum { color: var(--color-petroleum); }
      .bg-copper { background-color: var(--color-copper); }
      .text-copper { color: var(--color-copper); }

      html { scroll-behavior: smooth; }

      /* Custom Range Slider */
      input[type=range] {
        -webkit-appearance: none;
        width: 100%;
        background: transparent;
      }
      input[type=range]::-webkit-slider-thumb {
        -webkit-appearance: none;
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: var(--color-copper);
        cursor: pointer;
        margin-top: -10px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.2);
        transition: transform 0.1s;
      }
      input[type=range]::-webkit-slider-thumb:hover { transform: scale(1.1); }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%; height: 6px; cursor: pointer; background: #e5e7eb; border-radius: 4px;
      }
      input[type=range]::-moz-range-thumb {
        height: 24px; width: 24px; border-radius: 50%; background: var(--color-copper); cursor: pointer; border: none;
      }
      input[type=range]::-moz-range-track {
        width: 100%; height: 6px; cursor: pointer; background: #e5e7eb; border-radius: 4px;
      }

      /* Animations */
      .reveal { opacity: 0; transform: translateY(40px); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
      .reveal.active { opacity: 1; transform: translateY(0); }
      
      .reveal-stagger > * { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
      .reveal-stagger.active > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }

      .bg-scale-anim { animation: subtleScale 20s infinite alternate linear; }
      @keyframes subtleScale { 0% { transform: scale(1); } 100% { transform: scale(1.1); } }

      .bento-card { transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease; }
      .bento-card:hover { transform: translateY(-5px); box-shadow: 0 20px 40px -15px rgba(17, 63, 61, 0.15); }
    `}
  </style>
);

const ActionButton = ({ children, className = '', onClick, variant = 'primary' }) => {
  const baseStyle = "relative px-6 md:px-8 py-3 md:py-4 rounded-full font-sans font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";
  const variants = {
    primary: "bg-copper text-white hover:bg-copper-hover shadow-[0_0_20px_rgba(199,109,56,0.3)]",
    secondary: "bg-white text-petroleum border border-transparent shadow-md hover:shadow-lg",
    outline: "bg-transparent border border-white/50 text-white hover:bg-petroleum hover:text-white hover:border-petroleum" 
  };
  return <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>{children}</button>;
};

const BrandLogo = ({ className = "w-12 h-12" }) => {
  if (SITE_DATA.brand.logoUrl) {
    return <img src={SITE_DATA.brand.logoUrl} alt={SITE_DATA.brand.name} className={`${className} object-contain`} />;
  }
  return (
    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M50 15 L15 50 L25 50 L50 25 L75 50 L85 50 Z" fill="currentColor" className="text-current" />
      <path d="M50 35 L30 55 L40 55 L50 45 L60 55 L70 55 Z" fill="currentColor" className="text-current" />
      <path d="M50 55 L40 65 L45 65 L50 60 L55 65 L60 65 Z" fill="currentColor" className="text-current" />
      <rect x="25" y="75" width="50" height="6" fill={SITE_DATA.colors.copper} />
    </svg>
  );
};

const DesignVideoSection = () => (
  <div className="relative w-full h-[300px] sm:h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
    <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
      <source src={SITE_DATA.designSection.videoUrl} type="video/mp4" />
    </video>
  </div>
);

const ScrollytellingSection = () => {
  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const scrollY = -top;
      const totalScrollable = height - windowHeight;
      let p = scrollY / totalScrollable;
      p = Math.max(0, Math.min(1, p));
      setProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  let activeStep = 0;
  if (progress > 0.25) activeStep = 1;
  if (progress > 0.5) activeStep = 2;
  if (progress > 0.75) activeStep = 3;

  const steps = [
    { title: "El Terreno y Platea", desc: "Comenzamos preparando el suelo y construyendo bases sólidas para garantizar la estabilidad." },
    { title: "Estructura y Mampostería", desc: "Levantamos paredes de ladrillo rasado, estructurando los espacios con materiales de calidad." },
    { title: "Techo e Instalaciones", desc: "Colocación de techos (madera o chapa) y tendido de red eléctrica, agua y cloacas." },
    { title: "Llave en Mano", desc: "Terminaciones, aberturas y sanitarios. Su casa lista para disfrutar sin preocupaciones." }
  ];

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#f5f2eb]">
      <div className="sticky top-0 h-[100dvh] w-full flex items-center overflow-hidden py-10 md:py-0">
        <div className="max-w-7xl mx-auto px-6 w-full flex flex-col lg:grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          
          <div className="space-y-6 md:space-y-12 z-10 relative order-2 lg:order-1 mt-6 lg:mt-0">
             <span className="font-sans text-xs md:text-sm tracking-widest uppercase text-copper font-semibold block md:mb-4">El Proceso</span>
             <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-petroleum leading-[1.1]">
               Construimos su casa <br/> <span className="italic font-light text-copper">capa por capa.</span>
             </h2>
             
             <div className="space-y-4 md:space-y-8 mt-6 md:mt-12 relative">
                <div className="absolute left-[11px] md:left-3 top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>
                {steps.map((step, idx) => (
                  <div key={idx} className={`relative z-10 flex gap-4 md:gap-6 transition-all duration-500 ${activeStep >= idx ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full flex-shrink-0 border-4 transition-colors duration-500 mt-1 md:mt-1.5 ${activeStep >= idx ? 'bg-copper border-[#f5f2eb] shadow-[0_0_0_2px_#c76d38]' : 'bg-gray-200 border-[#f5f2eb]'}`}></div>
                    <div>
                      <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-1 md:mb-2">{step.title}</h4>
                      <p className="font-sans text-sm md:text-base text-gray-500 leading-relaxed max-w-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="relative h-[250px] sm:h-[350px] lg:h-[600px] w-full flex items-center justify-center order-1 lg:order-2">
             <img src={SITE_DATA.scrollytelling.layers[0]} alt="Platea" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${progress >= 0 ? 'opacity-100' : 'opacity-0'}`} />
             <img src={SITE_DATA.scrollytelling.layers[1]} alt="Paredes" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${progress > 0.25 ? 'opacity-100' : 'opacity-0'}`} />
             <img src={SITE_DATA.scrollytelling.layers[2]} alt="Techo" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${progress > 0.5 ? 'opacity-100' : 'opacity-0'}`} />
             <img src={SITE_DATA.scrollytelling.layers[3]} alt="Detalles" className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-1000 ease-in-out ${progress > 0.75 ? 'opacity-100' : 'opacity-0'}`} />
          </div>

        </div>
      </div>
    </div>
  );
};

const ProjectCalculator = () => {
  const [m2, setM2] = useState(100);
  const [roofType, setRoofType] = useState('chapa');
  const [quality, setQuality] = useState('estandar');

  const { basePricePerM2, roofMultipliers, qualityMultipliers } = SITE_DATA.calculator;
  let multiplier = 1 + (roofMultipliers[roofType] || 0) + (qualityMultipliers[quality] || 0);
  const estimatedTotal = Math.round(m2 * basePricePerM2 * multiplier);

  const handleWhatsapp = () => {
    const text = `Hola Propiedades San Luis. Solicito presupuesto referencial: ${m2}m2, techo de ${roofType}, terminaciones ${quality}.`;
    window.open(`https://wa.me/${SITE_DATA.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] shadow-2xl p-6 md:p-14 max-w-5xl mx-auto border border-gray-100/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-copper/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-8 md:mb-12 relative z-10">
        <h3 className="text-2xl md:text-4xl font-serif text-petroleum mb-2 md:mb-4">Cotizador Interactivo</h3>
        <p className="font-sans text-sm md:text-base text-gray-500 max-w-lg mx-auto">Diseñe su proyecto ajustando los parámetros para obtener un valor referencial instantáneo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 relative z-10">
        <div className="lg:col-span-7 space-y-8 md:space-y-10">
          <div>
            <div className="flex justify-between items-end mb-4">
              <span className="text-xs md:text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest">Dimensiones</span>
              <span className="text-2xl md:text-3xl font-serif text-petroleum">{m2} <span className="text-base md:text-lg text-copper">m²</span></span>
            </div>
            <input type="range" min="40" max="300" step="5" value={m2} onChange={(e) => setM2(e.target.value)} className="w-full" />
            <div className="flex justify-between text-[10px] md:text-xs text-gray-400 mt-2">
              <span>40 m²</span>
              <span>300 m²</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            <div>
              <span className="block text-xs md:text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Tipo de Techo</span>
              <div className="space-y-3">
                <button onClick={() => setRoofType('chapa')} className={`w-full py-3 md:py-4 px-4 rounded-xl md:rounded-2xl text-xs md:text-sm transition-all duration-300 flex items-center justify-between border ${roofType === 'chapa' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Chapa Oculta {roofType === 'chapa' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
                <button onClick={() => setRoofType('madera')} className={`w-full py-3 md:py-4 px-4 rounded-xl md:rounded-2xl text-xs md:text-sm transition-all duration-300 flex items-center justify-between border ${roofType === 'madera' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Madera Vista {roofType === 'madera' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
              </div>
            </div>

            <div>
              <span className="block text-xs md:text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest mb-3 md:mb-4">Terminaciones</span>
              <div className="space-y-3">
                <button onClick={() => setQuality('estandar')} className={`w-full py-3 md:py-4 px-4 rounded-xl md:rounded-2xl text-xs md:text-sm transition-all duration-300 flex items-center justify-between border ${quality === 'estandar' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Estándar {quality === 'estandar' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
                <button onClick={() => setQuality('premium')} className={`w-full py-3 md:py-4 px-4 rounded-xl md:rounded-2xl text-xs md:text-sm transition-all duration-300 flex items-center justify-between border ${quality === 'premium' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Premium {quality === 'premium' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-petroleum rounded-2xl md:rounded-3xl p-6 md:p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)' }}></div>
          
          <div className="relative z-10 w-full">
            <p className="font-sans text-[10px] md:text-xs text-copper uppercase tracking-widest mb-3 md:mb-4 font-semibold">Inversión Estimada</p>
            <div className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 md:mb-6 flex flex-col items-center">
              <span className="text-xl md:text-2xl text-gray-400 mb-1 md:mb-2 font-sans font-light">USD</span>
              {estimatedTotal.toLocaleString('en-US')}
            </div>
            
            <div className="w-full h-px bg-white/20 my-4 md:my-6"></div>
            
            <p className="font-sans text-[10px] md:text-xs text-gray-400 mb-6 md:mb-8 max-w-[250px] mx-auto">
              *Valor referencial para obra finalizada llave en mano.
            </p>
            
            <ActionButton onClick={handleWhatsapp} variant="outline" className="w-full py-3 md:py-4 text-xs md:text-sm font-semibold">
              <Phone size={16} /> Contactar Asesor
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyDetailsModal = ({ property, onClose }) => {
  const [currentImgIdx, setCurrentImgIdx] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  useEffect(() => {
    setCurrentImgIdx(0); // Reset index on new property
  }, [property]);

  if (!property) return null;
  const images = property.gallery && property.gallery.length > 0 ? property.gallery : [property.img];

  const nextImg = () => setCurrentImgIdx((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  const prevImg = () => setCurrentImgIdx((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleTouchStart = (e) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e) => {
    if (!touchStart) return;
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) nextImg();
    if (touchStart - touchEnd < -50) prevImg();
    setTouchStart(null);
  };

  return (
    <div className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl h-[90vh] md:h-[85vh] rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden relative">
        <button onClick={onClose} className="absolute top-4 right-4 z-30 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white transition-colors shadow-sm text-petroleum">
          <X size={24} />
        </button>

        {/* Izquierda: Slider/Carrusel (Soporta Gestos Mobile) */}
        <div 
          className="w-full md:w-1/2 h-64 sm:h-72 md:h-full bg-gray-100 relative group flex-shrink-0"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <img src={images[currentImgIdx]} alt={`${property.title} - ${currentImgIdx+1}`} className="w-full h-full object-cover transition-opacity duration-300" />
          
          {images.length > 1 && (
            <>
              {/* Botones de navegación (visibles en hover en desktop, siempre accesibles por swipe en mobile) */}
              <button onClick={prevImg} className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full text-petroleum backdrop-blur shadow-sm transition-all md:opacity-0 group-hover:opacity-100">
                <ChevronLeft size={20} />
              </button>
              <button onClick={nextImg} className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 bg-white/70 hover:bg-white rounded-full text-petroleum backdrop-blur shadow-sm transition-all md:opacity-0 group-hover:opacity-100">
                <ChevronRight size={20} />
              </button>
              
              {/* Dots */}
              <div className="absolute bottom-4 left-0 w-full flex justify-center gap-1.5 z-10">
                {images.map((_, i) => (
                  <div key={i} className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${i === currentImgIdx ? 'bg-white w-4 md:w-6' : 'bg-white/50 w-1.5 md:w-2'}`} />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Derecha: Info y Mapa */}
        <div className="w-full md:w-1/2 flex-1 overflow-y-auto p-6 md:p-12 flex flex-col">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 bg-petroleum/10 text-petroleum text-xs font-semibold rounded-full uppercase tracking-wider mb-3 md:mb-4">
              {property.tag} - {property.type}
            </span>
            <h2 className="font-serif text-2xl md:text-4xl text-petroleum mb-2">{property.title}</h2>
            <p className="flex items-center gap-2 text-sm md:text-base text-gray-500 mb-4 md:mb-6"><MapPin size={16}/> {property.loc}</p>
            <div className="text-2xl md:text-3xl font-serif text-copper font-semibold mb-6 md:mb-8">{property.price}</div>
          </div>

          <div className="mb-6 md:mb-8">
            <h4 className="font-sans font-semibold tracking-widest uppercase text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4">Descripción</h4>
            <p className="font-sans text-sm md:text-base text-gray-600 font-light leading-relaxed">
              {property.description || "Excelente oportunidad de inversión. Contáctenos para más detalles, coordinar una visita y conocer todas las características de esta propiedad."}
            </p>
          </div>

          <div className="mb-6 md:mb-8">
             <h4 className="font-sans font-semibold tracking-widest uppercase text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4">Características Clave</h4>
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-3">
               {(property.features || ["Ubicación estratégica", "Documentación al día", "Lista para escriturar", "Gran potencial"]).map((feat, idx) => (
                 <li key={idx} className="flex items-center gap-2 text-xs md:text-sm text-gray-600 font-light">
                   <CheckCircle2 size={14} className="text-copper flex-shrink-0" /> {feat}
                 </li>
               ))}
             </ul>
          </div>

          <div className="mb-6 md:mb-8 flex-1">
             <h4 className="font-sans font-semibold tracking-widest uppercase text-[10px] md:text-xs text-gray-400 mb-3 md:mb-4">Ubicación</h4>
             <div className="w-full h-40 md:h-48 bg-gray-200 rounded-xl overflow-hidden relative">
               {property.mapUrl ? (
                 <iframe src={property.mapUrl} width="100%" height="100%" style={{border: 0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Ubicación"></iframe>
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 text-sm bg-gray-100">
                   <Map size={24} className="mb-2 opacity-50"/>
                   <span>Ubicación aproximada</span>
                 </div>
               )}
             </div>
          </div>

          <ActionButton onClick={() => window.open(`https://wa.me/${SITE_DATA.contact.whatsapp}?text=Hola, quiero más información sobre: ${property.title}`, '_blank')} className="w-full flex-shrink-0 py-3 md:py-4 font-semibold text-xs md:text-sm">
            <Phone size={16} /> Consultar por WhatsApp
          </ActionButton>
        </div>
      </div>
    </div>
  );
};

const PropertyCatalogView = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperation, setFilterOperation] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');
  const [selectedProperty, setSelectedProperty] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredProperties = SITE_DATA.catalog.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || prop.loc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOp = filterOperation === 'Todos' || prop.tag === filterOperation;
    const matchesType = filterType === 'Todos' || prop.type === filterType;
    return matchesSearch && matchesOp && matchesType;
  });

  return (
    <div className="min-h-screen bg-[#f5f2eb] pt-24 md:pt-32 pb-12 px-4 md:px-8">
      <PropertyDetailsModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between mb-6 md:mb-8 gap-4">
          <div>
            <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-petroleum transition-colors mb-2 md:mb-4 font-semibold text-xs md:text-sm uppercase tracking-widest">
              <ArrowRight size={14} className="rotate-180" /> Volver al Inicio
            </button>
            <h2 className="font-serif text-3xl md:text-5xl text-petroleum">Catálogo de Propiedades</h2>
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-sm flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Buscar por zona o título..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 md:pl-12 pr-4 py-2.5 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-petroleum focus:ring-1 focus:ring-petroleum transition-all text-sm"/>
          </div>
          <div className="flex gap-2 md:gap-4 w-full md:w-auto">
            <select value={filterOperation} onChange={(e) => setFilterOperation(e.target.value)} className="flex-1 md:w-auto px-2 md:px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none text-gray-600 text-sm">
              <option value="Todos">Operación</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="flex-1 md:w-auto px-2 md:px-4 py-2.5 md:py-3 rounded-xl border border-gray-200 bg-white focus:outline-none text-gray-600 text-sm">
              <option value="Todos">Tipo</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Terreno">Terreno</option>
              <option value="Local">Local</option>
              <option value="Complejo">Complejo</option>
            </select>
          </div>
        </div>

        <div>
          {filteredProperties.length === 0 ? (
            <div className="py-16 md:py-20 flex flex-col items-center justify-center text-gray-500 bg-white rounded-2xl border border-gray-100 px-4 text-center">
              <Filter size={40} className="mb-4 opacity-20" />
              <p className="text-sm md:text-lg mb-4">No se encontraron propiedades con esos filtros.</p>
              <button onClick={() => {setSearchTerm(''); setFilterOperation('Todos'); setFilterType('Todos');}} className="text-copper underline text-xs md:text-sm">Limpiar filtros</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
              {filteredProperties.map(prop => (
                <div key={prop.id} onClick={() => setSelectedProperty(prop)} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100 flex flex-col h-full">
                  <div className="h-48 md:h-56 relative overflow-hidden">
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-[10px] md:text-xs font-semibold text-petroleum shadow-sm">
                      {prop.tag}
                    </div>
                  </div>
                  <div className="p-4 md:p-5 flex flex-col flex-1">
                    <h4 className="font-serif text-lg md:text-xl text-petroleum mb-1 truncate">{prop.title}</h4>
                    <p className="text-gray-500 text-xs md:text-sm font-light mb-4 flex items-center gap-1"><MapPin size={12}/> {prop.loc}</p>
                    <div className="mt-auto pt-3 md:pt-4 border-t border-gray-100 flex justify-between items-center">
                      <span className="font-semibold text-petroleum text-base md:text-lg">{prop.price}</span>
                      <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-copper/10 text-copper flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors">
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState('familia'); // 'familia' | 'inversor'
  const [scrolled, setScrolled] = useState(false);
  const [currentView, setCurrentView] = useState('home'); 

  const heroData = SITE_DATA.hero[mode];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal, .reveal-stagger').forEach((el) => observer.observe(el));
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [mode, currentView]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (currentView === 'catalog') {
    return (
      <div className="min-h-screen bg-[var(--color-sand)] font-sans text-gray-800 selection:bg-copper selection:text-white">
        <FontStyles />
        <PropertyCatalogView onBack={() => { setCurrentView('home'); scrollToTop(); }} />
      </div>
    );
  }

  const ServicesSection = (
    <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
      <div className="text-center mb-12 md:mb-20 reveal">
        <h2 className="text-3xl md:text-5xl font-serif text-petroleum mb-4 md:mb-6">
          {mode === 'familia' ? 'El verdadero significado de Integral' : 'Servicios Exclusivos'}
        </h2>
        <p className="font-sans text-gray-500 max-w-2xl mx-auto text-sm md:text-lg px-4">
          {mode === 'familia' 
            ? 'Unificamos gremios, materiales y dirección técnica en un solo contrato claro y seguro.'
            : 'Maximizamos el valor de su patrimonio con estrategias actualizadas y gestión matriculada.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 auto-rows-auto md:auto-rows-[300px] reveal-stagger">
        {mode === 'familia' ? (
          <>
            <div className="md:col-span-2 md:row-span-2 bg-petroleum rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-white relative overflow-hidden bento-card flex flex-col justify-between">
              <div className="absolute -bottom-10 -right-10 opacity-10"><Key size={200} className="md:w-[250px] md:h-[250px]" /></div>
              <div className="relative z-10 flex flex-col h-full">
                <div>
                  <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-3 md:mb-4 block">Garantía</span>
                  <h3 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">Nos encargamos<br/>de <span className="italic text-copper">absolutamente todo</span>.</h3>
                  <p className="font-sans text-gray-300 max-w-md text-sm md:text-lg font-light leading-relaxed">
                    Olvídese de coordinar albañiles o lidiar con permisos. Usted elige el diseño, nosotros entregamos las llaves.
                  </p>
                </div>
                <ul className="space-y-3 md:space-y-4 font-sans text-gray-200 mt-6 md:mt-8 border-t border-white/10 pt-6 md:pt-8 text-sm md:text-base">
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-copper flex-shrink-0"/> Platea y Paredes de ladrillo</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-copper flex-shrink-0"/> Techo, Aberturas y Cerámicos</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={18} className="text-copper flex-shrink-0"/> Instalaciones completas (luz, agua, cloaca)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col justify-center bento-card">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-copper/10 flex items-center justify-center mb-4 md:mb-6">
                <Hammer className="text-copper w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-2 md:mb-3">Materiales Premium</h4>
              <p className="font-sans text-gray-500 font-light text-xs md:text-sm leading-relaxed">Alianzas con corralones líderes para asegurar insumos de máxima durabilidad.</p>
            </div>

            <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col justify-center bento-card">
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-petroleum/10 flex items-center justify-center mb-4 md:mb-6">
                <ShieldCheck className="text-petroleum w-5 h-5 md:w-6 md:h-6" />
              </div>
              <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-2 md:mb-3">Dirección Técnica</h4>
              <p className="font-sans text-gray-500 font-light text-xs md:text-sm leading-relaxed">Supervisión constante por profesionales matriculados.</p>
            </div>

            <div className="md:col-span-2 lg:col-span-2 bg-copper rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-white flex flex-col justify-center relative overflow-hidden bento-card">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-2xl md:text-3xl mb-2 md:mb-3">¿Ya tiene terreno?</h4>
                    <p className="font-sans text-white/90 font-light text-sm md:text-base">Adaptamos nuestros proyectos a la topografía de su lote.</p>
                  </div>
                  <div className="hidden md:flex w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm">
                    <MapPin size={24} className="md:w-8 md:h-8" />
                  </div>
                </div>
            </div>
          </>
        ) : (
           <>
             <div className="md:col-span-2 md:row-span-2 bg-petroleum rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-white relative overflow-hidden bento-card flex flex-col justify-between">
               <div className="absolute -bottom-10 -right-10 opacity-10"><TrendingUp size={200} className="md:w-[250px] md:h-[250px]" /></div>
               <div className="relative z-10 flex flex-col h-full">
                 <div>
                   <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-3 md:mb-4 block">Rentabilidad</span>
                   <h3 className="font-serif text-3xl md:text-5xl mb-4 md:mb-6 leading-tight">Ventas, Alquileres<br/>y <span className="italic text-copper">Loteos</span>.</h3>
                   <p className="font-sans text-gray-300 max-w-md text-sm md:text-lg font-light leading-relaxed">
                     Cartera exclusiva de propiedades, incluyendo desarrollos turísticos de alta demanda en Potrero de los Funes y zonas aledañas.
                   </p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col justify-center bento-card">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-copper/10 flex items-center justify-center mb-4 md:mb-6">
                 <BadgeDollarSign className="text-copper w-5 h-5 md:w-6 md:h-6" />
               </div>
               <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-2 md:mb-3">Tasaciones Exactas</h4>
               <p className="font-sans text-gray-500 font-light text-xs md:text-sm leading-relaxed">Valoraciones precisas respaldadas por el mercado actual.</p>
             </div>
             <div className="bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-8 border border-gray-100 flex flex-col justify-center bento-card">
               <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-petroleum/10 flex items-center justify-center mb-4 md:mb-6">
                 <Map className="text-petroleum w-5 h-5 md:w-6 md:h-6" />
               </div>
               <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-2 md:mb-3">Terrenos Clave</h4>
               <p className="font-sans text-gray-500 font-light text-xs md:text-sm leading-relaxed">Lotes aptos para desarrollo en puntos estratégicos.</p>
             </div>
             <div className="md:col-span-2 lg:col-span-2 bg-copper rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 text-white flex flex-col justify-center bento-card">
                <h4 className="font-serif text-2xl md:text-3xl mb-2 md:mb-3">Administración Confiable</h4>
                <p className="font-sans text-white/90 font-light text-sm md:text-base">Gestión integral de alquileres: contratos, cobros y mantenimiento.</p>
             </div>
           </>
        )}
      </div>
    </section>
  );

  const PortfolioSection = (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 reveal">
         <div className="text-center mb-10 md:mb-12 flex flex-col items-center">
           <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-copper font-semibold block mb-3 md:mb-4">Portafolio</span>
           <h2 className="text-3xl md:text-5xl font-serif text-petroleum mb-6 md:mb-8">Oportunidades Destacadas</h2>
           <ActionButton onClick={() => { setCurrentView('catalog'); scrollToTop(); }} variant="secondary" className="mb-8 text-sm md:text-base">
             <Search size={16} className="md:w-[18px] md:h-[18px]" /> Ver Catálogo Completo
           </ActionButton>
         </div>
         
         {/* Masonry Gallery */}
         <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-6 space-y-4 md:space-y-6">
            {SITE_DATA.catalog.slice(0, 5).map((prop, i) => {
              const heights = ["h-72 md:h-96", "h-56 md:h-64", "h-64 md:h-80", "h-60 md:h-72", "h-72 md:h-96"];
              return (
              <div key={prop.id} className="break-inside-avoid bg-white rounded-[1.5rem] md:rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer relative" onClick={() => { setCurrentView('catalog'); setTimeout(()=>window.scrollTo({top:0}), 100); }}>
                <div className={`${heights[i]} w-full overflow-hidden relative`}>
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-3 md:top-4 right-3 md:right-4 bg-white/90 backdrop-blur px-2 md:px-3 py-1 md:py-1.5 rounded-full font-sans text-[10px] md:text-xs font-semibold text-petroleum tracking-wider uppercase shadow-sm">
                    {prop.tag}
                  </div>
                </div>
                <div className="p-5 md:p-8">
                  <h4 className="font-serif text-xl md:text-2xl text-petroleum mb-1 md:mb-2">{prop.title}</h4>
                  <div className="flex items-center gap-1.5 md:gap-2 text-gray-500 font-sans text-xs md:text-sm font-light mb-4 md:mb-6">
                    <MapPin size={12} className="text-copper md:w-3.5 md:h-3.5" /> {prop.loc}
                  </div>
                  <div className="flex justify-between items-center pt-3 md:pt-4 border-t border-gray-100">
                    <span className="font-serif font-semibold text-petroleum text-lg md:text-xl">{prop.price}</span>
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                  </div>
                </div>
              </div>
            )})}
         </div>
      </div>
    </section>
  );

  return (
    <div className="min-h-screen bg-[var(--color-sand)] font-sans text-gray-800 selection:bg-copper selection:text-white">
      <FontStyles />

      {/* Navegación - Adaptada para legibilidad sobre el fondo claro del Hero */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-3 md:py-4' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4 cursor-pointer" onClick={scrollToTop}>
            <div className={`p-1.5 md:p-2 rounded-xl transition-colors ${scrolled ? 'bg-petroleum/5' : 'bg-white/30 backdrop-blur-md shadow-sm'}`}>
              <BrandLogo className="w-8 h-8 md:w-10 md:h-10 text-petroleum" />
            </div>
            <div className="hidden sm:block">
              <h1 className="font-serif text-sm md:text-lg font-bold tracking-wider leading-tight text-petroleum drop-shadow-sm">
                {SITE_DATA.brand.name}
              </h1>
              <p className="font-sans text-[8px] md:text-[9px] tracking-[0.2em] uppercase font-bold text-copper drop-shadow-sm">
                {SITE_DATA.brand.slogan}
              </p>
            </div>
          </div>

          <div className={`flex p-1 rounded-full border backdrop-blur-md transition-all shadow-sm ${scrolled ? 'bg-gray-100 border-gray-200' : 'bg-white/60 border-white/40'}`}>
            <button 
              onClick={() => { setMode('familia'); scrollToTop(); }}
              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full font-sans text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                ${mode === 'familia' ? 'bg-petroleum shadow-md text-white' : 'text-gray-700 hover:text-petroleum'}`}
            >
              Construcción
            </button>
            <button 
              onClick={() => { setMode('inversor'); scrollToTop(); }}
              className={`px-3 md:px-5 py-1.5 md:py-2 rounded-full font-sans text-[10px] md:text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                ${mode === 'inversor' ? 'bg-petroleum shadow-md text-white' : 'text-gray-700 hover:text-petroleum'}`}
            >
              Inmobiliaria
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Full Screen */}
      <header className="relative h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          {heroData.video ? (
            <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
              <source src={heroData.video} type="video/mp4" />
            </video>
          ) : (
            <img src={heroData.image} alt="Hero" className="w-full h-full object-cover" />
          )}
        </div>
        
        {/* Overlay Blanco Translúcido para resaltar el texto oscuro */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-[2px] z-10 pointer-events-none"></div>

        <div className="relative z-20 text-center px-4 md:px-6 max-w-5xl mx-auto flex flex-col items-center mt-16 md:mt-20">
          <div className="reveal">
            <span className="inline-block py-1 md:py-1.5 px-3 md:px-4 rounded-full border border-petroleum/20 bg-white/50 backdrop-blur-md text-petroleum font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase mb-6 md:mb-8 font-bold shadow-sm">
              {heroData.badge}
            </span>
          </div>
          
          <h1 className="reveal text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif text-petroleum leading-[1.1] mb-6 md:mb-8 font-medium drop-shadow-sm">
            {heroData.titleLine1}<br/><span className="italic text-copper font-light">{heroData.titleLine2}</span>
          </h1>
          
          <p className="reveal text-sm md:text-lg lg:text-xl text-petroleum/80 font-sans max-w-2xl font-medium leading-relaxed mb-10 md:mb-12 px-4 md:px-0">
            {heroData.description}
          </p>
          
          <div className="reveal flex flex-col sm:flex-row gap-4 justify-center items-center">
            <ActionButton 
              variant="primary" 
              onClick={() => mode === 'familia' ? document.getElementById('cotizador').scrollIntoView() : setCurrentView('catalog')}
            >
              {heroData.buttonText} <ArrowRight size={18} />
            </ActionButton>
          </div>
        </div>

        <div className="absolute bottom-8 w-full flex justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-1.5 md:gap-2 opacity-70 hover:opacity-100 transition-opacity animate-bounce cursor-pointer pointer-events-auto" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span className="text-petroleum text-[10px] md:text-xs font-sans tracking-widest uppercase font-bold">Descubrir</span>
            <ChevronDown className="text-petroleum" size={18} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {mode === 'familia' ? (
        <>
          {ServicesSection}
          <section className="py-16 md:py-20 bg-white overflow-hidden">
             <div className="max-w-7xl mx-auto px-4 md:px-6 flex flex-col lg:grid lg:grid-cols-2 gap-10 md:gap-16 items-center">
                <div className="reveal order-2 lg:order-1 w-full">
                  <DesignVideoSection />
                </div>
                <div className="space-y-4 md:space-y-6 reveal order-1 lg:order-2 text-center lg:text-left">
                   <span className="font-sans text-[10px] md:text-xs tracking-[0.2em] uppercase text-copper font-semibold">{SITE_DATA.designSection.badge}</span>
                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-petroleum">{SITE_DATA.designSection.title}</h2>
                   <p className="font-sans text-gray-500 text-sm md:text-lg font-light leading-relaxed max-w-lg mx-auto lg:mx-0">
                     {SITE_DATA.designSection.description}
                   </p>
                </div>
             </div>
          </section>
          <ScrollytellingSection />
          <section id="cotizador" className="py-20 md:py-32 bg-white relative px-4 md:px-0">
            <div className="max-w-7xl mx-auto reveal"><ProjectCalculator /></div>
          </section>
        </>
      ) : (
        <>
          {PortfolioSection}
          {ServicesSection}
        </>
      )}

      {/* Footer */}
      <footer className="bg-petroleum text-white pt-20 md:pt-24 pb-8 md:pb-12 border-t-4 md:border-t-8 border-copper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none hidden md:block">
          <svg viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-full transform translate-x-1/4 scale-150">
             <path d="M50 0 L0 100 L100 100 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 mb-16 md:mb-20">
            <div className="lg:col-span-2 md:pr-8">
              <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
                 <BrandLogo className="w-10 h-10 md:w-12 md:h-12 text-white" />
                 <div><h4 className="font-serif text-xl md:text-2xl tracking-widest text-white">{SITE_DATA.brand.name}</h4></div>
              </div>
              <p className="font-sans text-gray-400 text-xs md:text-sm leading-relaxed max-w-md font-light">
                Redefiniendo el desarrollo inmobiliario y la construcción llave en mano en San Luis. Entregamos excelencia, transparencia y resultados comprobables.
              </p>
            </div>
            
            <div>
              <h5 className="font-sans font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 text-copper">Contacto Directo</h5>
              <ul className="space-y-4 md:space-y-6 font-sans text-xs md:text-sm text-gray-300 font-light">
                <li className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors cursor-pointer group" onClick={() => window.open(`https://wa.me/${SITE_DATA.contact.whatsapp}`)}>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><Phone size={14} className="md:w-4 md:h-4" /></div>
                  {SITE_DATA.contact.phone1}
                </li>
                <li className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><Phone size={14} className="md:w-4 md:h-4" /></div>
                  {SITE_DATA.contact.phone2}
                </li>
                <li className="flex items-center gap-3 md:gap-4 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><MapPin size={14} className="md:w-4 md:h-4" /></div>
                  {SITE_DATA.contact.address}
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-sans font-semibold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-6 md:mb-8 text-copper">Conectemos</h5>
              <div className="flex gap-3 md:gap-4 mb-8 md:mb-10">
                <a href={SITE_DATA.contact.instagram} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-copper hover:border-copper transition-all duration-300"><Instagram size={18} className="md:w-5 md:h-5"/></a>
                <a href={SITE_DATA.contact.facebook} target="_blank" rel="noreferrer" className="w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-copper hover:border-copper transition-all duration-300"><Facebook size={18} className="md:w-5 md:h-5" /></a>
              </div>
              <div className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm inline-block">
                <div className="flex items-center gap-2 md:gap-3">
                  <ShieldCheck className="text-copper w-5 h-5 md:w-6 md:h-6" />
                  <div>
                    <p className="font-sans text-[8px] md:text-[10px] text-gray-400 uppercase tracking-widest">Garantía Profesional</p>
                    <p className="font-serif text-xs md:text-sm text-white">{SITE_DATA.brand.matricula}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
            <p className="font-sans text-[10px] md:text-xs text-gray-500 font-light text-center md:text-left">{SITE_DATA.brand.copyright}</p>
            <p className="font-sans text-[10px] md:text-xs text-gray-600 tracking-widest uppercase">Desarrollo Boutique</p>
          </div>
        </div>
      </footer>
    </div>
  );
}