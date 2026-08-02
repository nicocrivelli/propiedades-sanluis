import React, { useState, useEffect, useRef } from 'react';
import { 
  Home, Building, CheckCircle2, Calculator, ArrowRight, 
  MapPin, Phone, Instagram, Facebook, Key, Hammer, 
  ShieldCheck, TrendingUp, Map, BadgeDollarSign, ChevronDown,
  Search, X, Filter
} from 'lucide-react';

// ============================================================================
// 1. CONFIGURACIÓN GLOBAL (EDITAR AQUÍ TODA LA INFORMACIÓN)
// ============================================================================
const SITE_DATA = {
  // --- IDENTIDAD ---
  brand: {
    name: "PROPIEDADES SAN LUIS",
    slogan: "Inmobiliaria & Constructora",
    logoUrl: "", // Deja vacío para usar el ícono por defecto, o pega la URL de tu logo (ej: "https://misitio.com/logo.png")
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
      badge: "Desarrollo Llave en Mano",
      titleLine1: "Construimos tu hogar,",
      titleLine2: "sin preocupaciones.",
      description: "Nos encargamos de TODO. Desde la nivelación del terreno hasta el último detalle de diseño. Su única tarea es disfrutar el proceso.",
      buttonText: "Iniciar Proyecto"
    },
    inversor: {
      image: "https://images.unsplash.com/photo-1613490908574-dbf861536f90?q=80&w=2000&auto=format&fit=crop",
      badge: "Gestión de Alto Nivel",
      titleLine1: "Inversiones sólidas,",
      titleLine2: "respaldo profesional.",
      description: "Tasaciones precisas, administración transparente y oportunidades estratégicas en la provincia de San Luis.",
      buttonText: "Ver Oportunidades"
    }
  },

  // --- SECCIÓN DISEÑO / VIDEO ---
  designSection: {
    videoUrl: "img/video.mp4", // REEMPLAZAR CON TU VIDEO MP4
    badge: "Visualización",
    title: "Diseño Transparente.",
    description: "Analizamos cada aspecto volumétrico antes de colocar el primer ladrillo. Entienda el espacio, la iluminación y la materialidad de su futura casa."
  },

  // --- CALCULADORA DE PROYECTOS ---
  calculator: {
    basePricePerM2: 650, // Precio base por metro cuadrado en USD
    roofMultipliers: {
      chapa: 0,          // Incremento por techo de chapa (0 = sin incremento)
      madera: 0.15       // Incremento por techo de madera (0.15 = 15% más)
    },
    qualityMultipliers: {
      estandar: 0,       // Incremento por terminaciones estándar
      premium: 0.30      // Incremento por terminaciones premium (0.30 = 30% más)
    }
  },

  // --- SCROLLYTELLING (CAPAS ISOMÉTRICAS) ---
  // Reemplaza estas URLs con las de tus imágenes PNG transparentes (todas de la misma resolución)
  scrollytelling: {
    layers: [
      "img/etapa1.png", // Capa 1: Platea (Placeholder transparente temporal)
      "img/etapa2.png", // Capa 2: Mampostería / Paredes
      "img/etapa3.png", // Capa 3: Techos e Instalaciones
      "img/etapa4.png", // Capa 4: Detalles Finales (Llave en mano)
    ]
  },

  // --- CATÁLOGO DE PROPIEDADES (INMOBILIARIA) ---
  catalog: [
    { id: 1, title: "Complejo Turístico", loc: "Potrero de los Funes", price: "USD 490.000", tag: "Venta", type: "Complejo", img: "https://images.unsplash.com/photo-1582610116397-edb318620f90?q=80&w=800&auto=format&fit=crop" },
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

      .font-serif {
        font-family: 'Playfair Display', serif;
      }
      
      .bg-petroleum { background-color: var(--color-petroleum); }
      .text-petroleum { color: var(--color-petroleum); }
      .bg-copper { background-color: var(--color-copper); }
      .text-copper { color: var(--color-copper); }

      /* Smooth Scroll Behavior */
      html { scroll-behavior: smooth; }

      /* Custom Range Slider (Deslizador del Cotizador) */
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
      input[type=range]::-webkit-slider-thumb:hover {
        transform: scale(1.1);
      }
      input[type=range]::-webkit-slider-runnable-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #e5e7eb;
        border-radius: 4px;
      }
      /* Firefox support */
      input[type=range]::-moz-range-thumb {
        height: 24px;
        width: 24px;
        border-radius: 50%;
        background: var(--color-copper);
        cursor: pointer;
        border: none;
      }
      input[type=range]::-moz-range-track {
        width: 100%;
        height: 6px;
        cursor: pointer;
        background: #e5e7eb;
        border-radius: 4px;
      }

      /* Reveal Animations */
      .reveal {
        opacity: 0;
        transform: translateY(40px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal.active {
        opacity: 1;
        transform: translateY(0);
      }

      .reveal-stagger > * {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .reveal-stagger.active > *:nth-child(1) { transition-delay: 0.1s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(2) { transition-delay: 0.2s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(3) { transition-delay: 0.3s; opacity: 1; transform: translateY(0); }
      .reveal-stagger.active > *:nth-child(4) { transition-delay: 0.4s; opacity: 1; transform: translateY(0); }

      /* Parallax & Scale effects */
      .bg-scale-anim {
        animation: subtleScale 20s infinite alternate linear;
      }
      @keyframes subtleScale {
        0% { transform: scale(1); }
        100% { transform: scale(1.1); }
      }

      /* Bento Grid hover effects */
      .bento-card {
        transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
      }
      .bento-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 20px 40px -15px rgba(17, 63, 61, 0.15);
      }
    `}
  </style>
);

// Botón estándar sin movimiento magnético (para evitar problemas de clic)
const ActionButton = ({ children, className = '', onClick, variant = 'primary' }) => {
  const baseStyle = "relative px-8 py-4 rounded-full font-sans font-medium flex items-center justify-center gap-2 overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]";
  const variants = {
    primary: "bg-copper text-white hover:bg-copper-hover shadow-[0_0_20px_rgba(199,109,56,0.3)]",
    secondary: "bg-white text-petroleum border border-transparent shadow-md hover:shadow-lg",
    outline: "bg-transparent border border-white/50 text-white hover:bg-petroleum hover:text-white hover:border-petroleum" // Corregido para que el texto se vea al hacer hover
  };

  return (
    <button onClick={onClick} className={`${baseStyle} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

// Componente Logo (Soporta imagen personalizada o SVG por defecto)
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

const DesignVideoSection = () => {
  return (
    <div className="relative w-full h-[400px] md:h-[600px] rounded-3xl overflow-hidden">
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={SITE_DATA.designSection.videoUrl} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>
    </div>
  );
};

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
      <div className="sticky top-0 h-screen w-full flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Text Content (Left) */}
          <div className="space-y-12 z-10 relative">
             <span className="font-sans text-sm tracking-widest uppercase text-copper font-semibold block mb-4">El Proceso</span>
             <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-petroleum leading-[1.1]">
               Construimos su casa <br/> <span className="italic font-light text-copper">capa por capa.</span>
             </h2>
             
             <div className="space-y-8 mt-12 relative">
                <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200 z-0"></div>
                {steps.map((step, idx) => (
                  <div key={idx} className={`relative z-10 flex gap-6 transition-all duration-500 ${activeStep >= idx ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-4'}`}>
                    <div className={`w-6 h-6 rounded-full flex-shrink-0 border-4 transition-colors duration-500 mt-1 ${activeStep >= idx ? 'bg-copper border-[#f5f2eb] shadow-[0_0_0_2px_#c76d38]' : 'bg-gray-200 border-[#f5f2eb]'}`}></div>
                    <div>
                      <h4 className="font-serif text-2xl text-petroleum mb-2">{step.title}</h4>
                      <p className="font-sans text-gray-500 leading-relaxed max-w-sm">{step.desc}</p>
                    </div>
                  </div>
                ))}
             </div>
          </div>

          {/* Isometric Images (Right) */}
          <div className="relative h-[400px] lg:h-[600px] flex items-center justify-center">
             {/* Base/Platea */}
             <img 
               src={SITE_DATA.scrollytelling.layers[0]} 
               alt="Platea" 
               className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-out transform ${progress >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} 
             />
             
             {/* Paredes */}
             <img 
               src={SITE_DATA.scrollytelling.layers[1]} 
               alt="Paredes" 
               className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-out transform ${progress > 0.25 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} 
             />

             {/* Techo */}
             <img 
               src={SITE_DATA.scrollytelling.layers[2]} 
               alt="Techo" 
               className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-out transform ${progress > 0.5 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} 
             />

             {/* Detalles Finales */}
             <img 
               src={SITE_DATA.scrollytelling.layers[3]} 
               alt="Detalles" 
               className={`absolute inset-0 w-full h-full object-contain transition-all duration-1000 ease-out transform ${progress > 0.75 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`} 
             />
             
             {/* Fallback if images are missing or empty to show where they go */}
             <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                <span className="font-sans text-xs uppercase tracking-widest">[]</span>
             </div>
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
  
  let multiplier = 1;
  multiplier += roofMultipliers[roofType] || 0;
  multiplier += qualityMultipliers[quality] || 0;
  
  const estimatedTotal = Math.round(m2 * basePricePerM2 * multiplier);

  const handleWhatsapp = () => {
    const text = `Hola Propiedades San Luis. Solicito presupuesto referencial: ${m2}m2, techo de ${roofType}, terminaciones ${quality}.`;
    window.open(`https://wa.me/${SITE_DATA.contact.whatsapp}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-14 max-w-5xl mx-auto border border-gray-100/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-copper/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="text-center mb-12 relative z-10">
        <h3 className="text-3xl md:text-4xl font-serif text-petroleum mb-4">Cotizador Interactivo</h3>
        <p className="font-sans text-gray-500 max-w-lg mx-auto">Diseñe su proyecto ajustando los parámetros para obtener un valor referencial instantáneo.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        <div className="lg:col-span-7 space-y-10">
          <div>
            <div className="flex justify-between items-end mb-4">
              <span className="text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest">Dimensiones</span>
              <span className="text-3xl font-serif text-petroleum">{m2} <span className="text-lg text-copper">m²</span></span>
            </div>
            {/* The input range thumb color is handled globally in FontStyles */}
            <input 
              type="range" min="40" max="300" step="5"
              value={m2} onChange={(e) => setM2(e.target.value)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-2">
              <span>40 m²</span>
              <span>300 m²</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <span className="block text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest mb-4">Tipo de Techo</span>
              <div className="space-y-3">
                <button onClick={() => setRoofType('chapa')} className={`w-full py-4 px-4 rounded-2xl text-sm transition-all duration-300 flex items-center justify-between border ${roofType === 'chapa' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Chapa Oculta {roofType === 'chapa' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
                <button onClick={() => setRoofType('madera')} className={`w-full py-4 px-4 rounded-2xl text-sm transition-all duration-300 flex items-center justify-between border ${roofType === 'madera' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Madera Vista {roofType === 'madera' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
              </div>
            </div>

            <div>
              <span className="block text-sm font-sans font-semibold text-gray-400 uppercase tracking-widest mb-4">Terminaciones</span>
              <div className="space-y-3">
                <button onClick={() => setQuality('estandar')} className={`w-full py-4 px-4 rounded-2xl text-sm transition-all duration-300 flex items-center justify-between border ${quality === 'estandar' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Estándar {quality === 'estandar' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
                <button onClick={() => setQuality('premium')} className={`w-full py-4 px-4 rounded-2xl text-sm transition-all duration-300 flex items-center justify-between border ${quality === 'premium' ? 'bg-petroleum text-white border-petroleum shadow-lg' : 'bg-transparent text-gray-600 border-gray-200 hover:border-petroleum/30'}`}>
                  Premium {quality === 'premium' && <CheckCircle2 size={16} className="text-copper"/>}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 bg-petroleum rounded-3xl p-8 text-white flex flex-col justify-center items-center text-center relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent" style={{ backgroundSize: '20px 20px', backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)' }}></div>
          
          <div className="relative z-10 w-full">
            <p className="font-sans text-xs text-copper uppercase tracking-widest mb-4 font-semibold">Inversión Estimada</p>
            <div className="text-5xl md:text-6xl font-serif mb-6 flex flex-col items-center">
              <span className="text-2xl text-gray-400 mb-2 font-sans font-light">USD</span>
              {estimatedTotal.toLocaleString('en-US')}
            </div>
            
            <div className="w-full h-px bg-white/20 my-6"></div>
            
            <p className="font-sans text-xs text-gray-400 mb-8 max-w-[250px] mx-auto">
              *Valor referencial para obra finalizada llave en mano.
            </p>
            
            <ActionButton onClick={handleWhatsapp} variant="outline" className="w-full py-4 text-sm font-semibold">
              <Phone size={16} /> Contactar Asesor
            </ActionButton>
          </div>
        </div>
      </div>
    </div>
  );
};

const PropertyCatalogModal = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperation, setFilterOperation] = useState('Todos');
  const [filterType, setFilterType] = useState('Todos');

  if (!isOpen) return null;

  const filteredProperties = SITE_DATA.catalog.filter(prop => {
    const matchesSearch = prop.title.toLowerCase().includes(searchTerm.toLowerCase()) || prop.loc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOp = filterOperation === 'Todos' || prop.tag === filterOperation;
    const matchesType = filterType === 'Todos' || prop.type === filterType;
    return matchesSearch && matchesOp && matchesType;
  });

  return (
    <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-7xl h-full max-h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden relative">
        
        {/* Header Modal */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-serif text-3xl text-petroleum">Catálogo de Propiedades</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors">
            <X size={24} className="text-gray-600" />
          </button>
        </div>

        {/* Filtros */}
        <div className="p-6 bg-gray-50 flex flex-col md:flex-row gap-4 border-b border-gray-200">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Buscar por zona o título..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-petroleum focus:ring-1 focus:ring-petroleum transition-all"
            />
          </div>
          <div className="flex gap-4">
            <select 
              value={filterOperation} 
              onChange={(e) => setFilterOperation(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none text-gray-600"
            >
              <option value="Todos">Operación</option>
              <option value="Venta">Venta</option>
              <option value="Alquiler">Alquiler</option>
            </select>
            <select 
              value={filterType} 
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 bg-white focus:outline-none text-gray-600"
            >
              <option value="Todos">Tipo</option>
              <option value="Casa">Casa</option>
              <option value="Departamento">Departamento</option>
              <option value="Terreno">Terreno</option>
              <option value="Local">Local Comercial</option>
              <option value="Complejo">Complejo</option>
            </select>
          </div>
        </div>

        {/* Resultados */}
        <div className="flex-1 overflow-y-auto p-6 bg-[#f5f2eb]">
          {filteredProperties.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
              <Filter size={48} className="mb-4 opacity-20" />
              <p>No se encontraron propiedades con esos filtros.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProperties.map(prop => (
                <div key={prop.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-gray-100">
                  <div className="h-48 relative overflow-hidden">
                    <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-semibold text-petroleum shadow-sm">
                      {prop.tag}
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-serif text-xl text-petroleum mb-1 truncate">{prop.title}</h4>
                    <p className="text-gray-500 text-sm font-light mb-4 flex items-center gap-1"><MapPin size={12}/> {prop.loc}</p>
                    <div className="flex justify-between items-center pt-3 border-t border-gray-100">
                      <span className="font-semibold text-petroleum">{prop.price}</span>
                      <button className="text-copper hover:text-copper-hover transition-colors">
                        <ArrowRight size={18} />
                      </button>
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const heroData = SITE_DATA.hero[mode];

  // Scroll & Intersection Observers para animaciones reveal
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
  }, [mode]);

  // Parallax del Hero
  useEffect(() => {
    const handleGlobalMouse = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener('mousemove', handleGlobalMouse);
    return () => window.removeEventListener('mousemove', handleGlobalMouse);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  // Secciones reusables para cambiar el orden
  const ServicesSection = (
    <section className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 reveal">
        <h2 className="text-4xl md:text-5xl font-serif text-petroleum mb-6">
          {mode === 'familia' ? 'El verdadero significado de Integral' : 'Servicios Exclusivos'}
        </h2>
        <p className="font-sans text-gray-500 max-w-2xl mx-auto text-lg">
          {mode === 'familia' 
            ? 'Unificamos gremios, materiales y dirección técnica en un solo contrato claro y seguro.'
            : 'Maximizamos el valor de su patrimonio con estrategias actualizadas y gestión matriculada.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[300px] reveal-stagger">
        {mode === 'familia' ? (
          <>
            <div className="md:col-span-2 md:row-span-2 bg-petroleum rounded-[2rem] p-10 text-white relative overflow-hidden bento-card">
              <div className="absolute -bottom-10 -right-10 opacity-10"><Key size={250} /></div>
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <span className="font-sans text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-4 block">Garantía</span>
                  <h3 className="font-serif text-5xl mb-6 leading-tight">Nos encargamos<br/>de <span className="italic text-copper">absolutamente todo</span>.</h3>
                  <p className="font-sans text-gray-300 max-w-md text-lg font-light leading-relaxed">
                    Olvídese de coordinar albañiles o lidiar con permisos. Usted elige el diseño, nosotros entregamos las llaves.
                  </p>
                </div>
                <ul className="space-y-4 font-sans text-gray-200 mt-8 border-t border-white/10 pt-8">
                  <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-copper"/> Platea y Paredes de ladrillo</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-copper"/> Techo, Aberturas y Cerámicos</li>
                  <li className="flex items-center gap-3"><CheckCircle2 size={20} className="text-copper"/> Instalaciones completas (luz, agua, cloaca)</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center bento-card">
              <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center mb-6">
                <Hammer className="text-copper w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl text-petroleum mb-3">Materiales Premium</h4>
              <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">Alianzas con corralones líderes para asegurar insumos de máxima durabilidad.</p>
            </div>

            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center bento-card">
              <div className="w-14 h-14 rounded-full bg-petroleum/10 flex items-center justify-center mb-6">
                <ShieldCheck className="text-petroleum w-6 h-6" />
              </div>
              <h4 className="font-serif text-2xl text-petroleum mb-3">Dirección Técnica</h4>
              <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">Supervisión constante por profesionales matriculados.</p>
            </div>

            <div className="md:col-span-2 lg:col-span-2 bg-copper rounded-[2rem] p-10 text-white flex flex-col justify-center relative overflow-hidden bento-card">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="relative z-10 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-3xl mb-3">¿Ya tiene terreno?</h4>
                    <p className="font-sans text-white/90 font-light">Adaptamos nuestros proyectos a la topografía de su lote.</p>
                  </div>
                  <div className="hidden md:flex w-20 h-20 rounded-full bg-white/20 items-center justify-center backdrop-blur-sm">
                    <MapPin size={32} />
                  </div>
                </div>
            </div>
          </>
        ) : (
           <>
             <div className="md:col-span-2 md:row-span-2 bg-petroleum rounded-[2rem] p-10 text-white relative overflow-hidden bento-card">
               <div className="absolute -bottom-10 -right-10 opacity-10"><TrendingUp size={250} /></div>
               <div className="relative z-10 flex flex-col h-full justify-between">
                 <div>
                   <span className="font-sans text-xs tracking-[0.2em] uppercase text-copper font-semibold mb-4 block">Rentabilidad</span>
                   <h3 className="font-serif text-5xl mb-6 leading-tight">Ventas, Alquileres<br/>y <span className="italic text-copper">Loteos</span>.</h3>
                   <p className="font-sans text-gray-300 max-w-md text-lg font-light leading-relaxed">
                     Cartera exclusiva de propiedades, incluyendo desarrollos turísticos de alta demanda en Potrero de los Funes y zonas aledañas.
                   </p>
                 </div>
               </div>
             </div>
             <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center bento-card">
               <div className="w-14 h-14 rounded-full bg-copper/10 flex items-center justify-center mb-6">
                 <BadgeDollarSign className="text-copper w-6 h-6" />
               </div>
               <h4 className="font-serif text-2xl text-petroleum mb-3">Tasaciones Exactas</h4>
               <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">Valoraciones precisas respaldadas por el mercado actual.</p>
             </div>
             <div className="bg-white rounded-[2rem] p-8 border border-gray-100 flex flex-col justify-center bento-card">
               <div className="w-14 h-14 rounded-full bg-petroleum/10 flex items-center justify-center mb-6">
                 <Map className="text-petroleum w-6 h-6" />
               </div>
               <h4 className="font-serif text-2xl text-petroleum mb-3">Terrenos Clave</h4>
               <p className="font-sans text-gray-500 font-light text-sm leading-relaxed">Lotes aptos para desarrollo en puntos estratégicos.</p>
             </div>
             <div className="md:col-span-2 lg:col-span-2 bg-copper rounded-[2rem] p-10 text-white flex flex-col justify-center bento-card">
                <h4 className="font-serif text-3xl mb-3">Administración Confiable</h4>
                <p className="font-sans text-white/90 font-light">Gestión integral de alquileres: contratos, cobros y mantenimiento.</p>
             </div>
           </>
        )}
      </div>
    </section>
  );

  const PortfolioSection = (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 reveal">
         <div className="text-center mb-12 flex flex-col items-center">
           <span className="font-sans text-xs tracking-[0.2em] uppercase text-copper font-semibold block mb-4">Portafolio</span>
           <h2 className="text-4xl md:text-5xl font-serif text-petroleum mb-8">Oportunidades Destacadas</h2>
           <ActionButton onClick={() => setIsCatalogOpen(true)} variant="secondary" className="mb-8">
             <Search size={18} /> Ver Catálogo Completo
           </ActionButton>
         </div>
         
         {/* Masonry Gallery */}
         <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
            {SITE_DATA.catalog.slice(0, 5).map((prop, i) => {
              // Simular diferentes alturas para el efecto Masonry
              const heights = ["h-96", "h-64", "h-80", "h-72", "h-96"];
              return (
              <div key={prop.id} className="break-inside-avoid bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 group cursor-pointer relative">
                <div className={`${heights[i]} w-full overflow-hidden relative`}>
                  <img src={prop.img} alt={prop.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1.5 rounded-full font-sans text-xs font-semibold text-petroleum tracking-wider uppercase shadow-sm">
                    {prop.tag}
                  </div>
                </div>
                <div className="p-8">
                  <h4 className="font-serif text-2xl text-petroleum mb-2">{prop.title}</h4>
                  <div className="flex items-center gap-2 text-gray-500 font-sans text-sm font-light mb-6">
                    <MapPin size={14} className="text-copper" /> {prop.loc}
                  </div>
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <span className="font-serif font-semibold text-petroleum text-xl">{prop.price}</span>
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-copper group-hover:text-white transition-colors duration-300">
                      <ArrowRight size={18} />
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
      <PropertyCatalogModal isOpen={isCatalogOpen} onClose={() => setIsCatalogOpen(false)} />

      {/* Navegación */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-4 cursor-pointer" onClick={scrollToTop}>
            <div className={`p-2 rounded-xl transition-colors ${scrolled ? 'bg-petroleum/5' : 'bg-white/10 backdrop-blur-md'}`}>
              <BrandLogo className={`w-10 h-10 ${scrolled && !SITE_DATA.brand.logoUrl ? 'text-petroleum' : 'text-white'}`} />
            </div>
            <div className="hidden sm:block">
              <h1 className={`font-serif text-lg font-bold tracking-wider leading-tight transition-colors ${scrolled ? 'text-petroleum' : 'text-white drop-shadow-md'}`}>
                {SITE_DATA.brand.name}
              </h1>
              <p className={`font-sans text-[9px] tracking-[0.2em] uppercase font-medium transition-colors ${scrolled ? 'text-copper' : 'text-white/80'}`}>
                {SITE_DATA.brand.slogan}
              </p>
            </div>
          </div>

          <div className={`flex p-1 rounded-full border backdrop-blur-md transition-all ${scrolled ? 'bg-gray-100 border-gray-200' : 'bg-white/10 border-white/20'}`}>
            <button 
              onClick={() => { setMode('familia'); scrollToTop(); }}
              className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                ${mode === 'familia' ? 'bg-white shadow-sm text-petroleum' : (scrolled ? 'text-gray-500 hover:text-petroleum' : 'text-white/80 hover:text-white')}`}
            >
              Construcción
            </button>
            <button 
              onClick={() => { setMode('inversor'); scrollToTop(); }}
              className={`px-5 py-2 rounded-full font-sans text-xs font-semibold uppercase tracking-wider transition-all duration-300 flex items-center gap-2
                ${mode === 'inversor' ? 'bg-white shadow-sm text-petroleum' : (scrolled ? 'text-gray-500 hover:text-petroleum' : 'text-white/80 hover:text-white')}`}
            >
              Inmobiliaria
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Full Screen */}
      <header className="relative h-screen w-full overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-scale-anim z-0"
          style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px) scale(1.05)` }}
        >
          <img src={heroData.image} alt="Hero" className="w-full h-full object-cover transition-opacity duration-1000" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10"></div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto flex flex-col items-center mt-20">
          <div className="reveal">
            <span className="inline-block py-1.5 px-4 rounded-full border border-white/30 bg-white/10 backdrop-blur-md text-white font-sans text-xs tracking-[0.2em] uppercase mb-8">
              {heroData.badge}
            </span>
          </div>
          
          <h1 className="reveal text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[1.1] mb-8 font-medium">
            {heroData.titleLine1}<br/><span className="italic text-copper font-light">{heroData.titleLine2}</span>
          </h1>
          
          <p className="reveal text-lg md:text-xl text-white/90 font-sans max-w-2xl font-light leading-relaxed mb-12">
            {heroData.description}
          </p>
          
          <div className="reveal">
            <ActionButton 
              variant="primary" 
              onClick={() => mode === 'familia' ? document.getElementById('cotizador').scrollIntoView() : setIsCatalogOpen(true)}
            >
              {heroData.buttonText} <ArrowRight size={18} />
            </ActionButton>
          </div>
        </div>

        {}
        <div className="absolute bottom-10 w-full flex justify-center z-20 pointer-events-none">
          <div className="flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity animate-bounce cursor-pointer pointer-events-auto" onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}>
            <span className="text-white text-xs font-sans tracking-widest uppercase">Descubrir</span>
            <ChevronDown className="text-white" size={20} />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      {mode === 'familia' ? (
        <>
          {ServicesSection}
          
          <section className="py-20 bg-white overflow-hidden">
             <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="reveal order-2 lg:order-1">
                  <DesignVideoSection />
                </div>
                <div className="space-y-6 reveal order-1 lg:order-2">
                   <span className="font-sans text-xs tracking-[0.2em] uppercase text-copper font-semibold">{SITE_DATA.designSection.badge}</span>
                   <h2 className="text-4xl md:text-5xl font-serif text-petroleum">{SITE_DATA.designSection.title}</h2>
                   <p className="font-sans text-gray-500 text-lg font-light leading-relaxed">
                     {SITE_DATA.designSection.description}
                   </p>
                </div>
             </div>
          </section>

          <ScrollytellingSection />

          <section id="cotizador" className="py-32 bg-white relative">
            <div className="max-w-7xl mx-auto px-6 reveal">
              <ProjectCalculator />
            </div>
          </section>
        </>
      ) : (
        // INVERSOR MODE (Swapped Order)
        <>
          {PortfolioSection}
          {ServicesSection}
        </>
      )}

      {/* Footer */}
      <footer className="bg-petroleum text-white pt-24 pb-12 border-t-8 border-copper relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor" preserveAspectRatio="none" className="w-full h-full transform translate-x-1/4 scale-150">
             <path d="M50 0 L0 100 L100 100 Z" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
            <div className="lg:col-span-2 pr-8">
              <div className="flex items-center gap-4 mb-8">
                 <BrandLogo className="w-12 h-12 text-white" />
                 <div>
                    <h4 className="font-serif text-2xl tracking-widest text-white">{SITE_DATA.brand.name}</h4>
                 </div>
              </div>
              <p className="font-sans text-gray-400 text-sm leading-relaxed max-w-md font-light">
                Redefiniendo el desarrollo inmobiliario y la construcción llave en mano en San Luis. Entregamos excelencia, transparencia y resultados comprobables.
              </p>
            </div>
            
            <div>
              <h5 className="font-sans font-semibold tracking-[0.2em] uppercase text-xs mb-8 text-copper">Contacto Directo</h5>
              <ul className="space-y-6 font-sans text-sm text-gray-300 font-light">
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group" onClick={() => window.open(`https://wa.me/${SITE_DATA.contact.whatsapp}`)}>
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><Phone size={16} /></div>
                  {SITE_DATA.contact.phone1}
                </li>
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><Phone size={16} /></div>
                  {SITE_DATA.contact.phone2}
                </li>
                <li className="flex items-center gap-4 hover:text-white transition-colors cursor-pointer group">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-copper transition-colors"><MapPin size={16} /></div>
                  {SITE_DATA.contact.address}
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-sans font-semibold tracking-[0.2em] uppercase text-xs mb-8 text-copper">Conectemos</h5>
              <div className="flex gap-4 mb-10">
                <a href={SITE_DATA.contact.instagram} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-copper hover:border-copper transition-all duration-300"><Instagram size={20} /></a>
                <a href={SITE_DATA.contact.facebook} target="_blank" rel="noreferrer" className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-copper hover:border-copper transition-all duration-300"><Facebook size={20} /></a>
              </div>
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm inline-block">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="text-copper" size={24} />
                  <div>
                    <p className="font-sans text-[10px] text-gray-400 uppercase tracking-widest">Garantía Profesional</p>
                    <p className="font-serif text-sm text-white">{SITE_DATA.brand.matricula}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-sans text-xs text-gray-500 font-light">{SITE_DATA.brand.copyright}</p>
            <p className="font-sans text-xs text-gray-600 tracking-widest uppercase">Desarrollo Boutique</p>
          </div>
        </div>
      </footer>
    </div>
  );
}