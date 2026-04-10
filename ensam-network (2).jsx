import { useState, useEffect, useContext, createContext, useRef } from "react";

const AuthContext = createContext(null);

const COLORS = {
  kente: "#D4A017",
  earth: "#8B4513",
  savanna: "#C8A96E",
  midnight: "#0A1628",
  deep: "#112240",
  forest: "#1A3A2A",
  ember: "#E8622A",
  clay: "#C1440E",
  gold: "#F0C040",
  cream: "#FDF6E3",
  muted: "#94A3B8",
  surface: "#0F1E35",
  card: "#162236",
  border: "#1E3050",
  accent: "#2DD4BF",
};

const DEMO_USERS = [
  { id: "1", name: "Amara Diallo", email: "amara@ensam.ma", country: "Sénégal", school: "ENSAM Casablanca", year: "3ème année", bio: "Passionné par l'aéronautique et la mécanique des fluides.", avatar: "AD", role: "student" },
  { id: "2", name: "Kofi Mensah", email: "kofi@ensam.ma", country: "Ghana", school: "ENSAM Meknès", year: "2ème année", bio: "Ingénieur en herbe, fan de robotique.", avatar: "KM", role: "student" },
  { id: "3", name: "Fatou Ndiaye", email: "fatou@ensam.ma", country: "Côte d'Ivoire", school: "ENSAM Casablanca", year: "4ème année", bio: "Spécialité génie industriel, stagiaire chez Airbus.", avatar: "FN", role: "student" },
  { id: "4", name: "Moussa Traoré", email: "moussa@ensam.ma", country: "Mali", school: "ENSAM Rabat", year: "1ère année", bio: "Nouveau à Rabat, cherche des conseils.", avatar: "MT", role: "student" },
];

const DEMO_POSTS = [
  { id: "1", title: "Mon expérience de stage chez Renault Maroc", content: "Après 6 mois chez Renault, voici ce que j'ai appris sur la chaîne de production automobile. Les processus lean sont fascinants et l'équipe était très accueillante. Je recommande vivement les stages dans l'industrie automobile!", category: "Expérience", authorId: "1", author: DEMO_USERS[0], createdAt: "2024-01-15", likes: 24, comments: 8 },
  { id: "2", title: "Conseils pour réussir la licence à Casablanca", content: "Voici mes conseils après 3 ans: formez des groupes d'étude dès le premier semestre, utilisez la bibliothèque centrale le soir, et n'hésitez pas à contacter les professeurs par email.", category: "Conseil", authorId: "2", author: DEMO_USERS[1], createdAt: "2024-01-12", likes: 45, comments: 12 },
  { id: "3", title: "Recherche colocataire pour appartement Hay Hassani", content: "Je cherche un(e) coloc sérieux(se) pour partager un appartement de 2 chambres à Hay Hassani, Casablanca. Loyer 2500 DH/mois par personne, charges comprises.", category: "Logement", authorId: "3", author: DEMO_USERS[2], createdAt: "2024-01-10", likes: 5, comments: 15 },
  { id: "4", title: "Comment gérer l'adaptation culturelle au Maroc?", content: "Arrivé du Mali il y a 2 mois, j'ai quelques difficultés à m'adapter. Le ramadan approche, des conseils pour les étudiants africains non-musulmans? Comment vous avez vécu ça?", category: "Question", authorId: "4", author: DEMO_USERS[3], createdAt: "2024-01-08", likes: 31, comments: 22 },
  { id: "5", title: "Offre de cours de mathématiques", content: "Étudiant en 4ème année, je propose des cours particuliers en analyse, algèbre et équations différentielles. 80 DH/heure, possibilité online.", category: "Conseil", authorId: "3", author: DEMO_USERS[2], createdAt: "2024-01-06", likes: 18, comments: 6 },
];

const DEMO_HOUSING = [
  { id: "1", title: "Chambre meublée quartier Maarif", description: "Belle chambre dans appartement partagé, WiFi inclus, proche ENSAM Casablanca (15 min à pied).", location: "Maarif, Casablanca", price: "1800 DH/mois", type: "offer", userId: "1", createdAt: "2024-01-14" },
  { id: "2", title: "Recherche studio pour 2 étudiants", description: "Deux étudiants ENSAM cherchent studio ou petit appartement. Budget max 4000 DH/mois. Sérieux garantis.", location: "Hay Hassani, Casablanca", price: "4000 DH/mois max", type: "request", userId: "2", createdAt: "2024-01-11" },
  { id: "3", title: "Appartement 3 chambres à partager", description: "Grand appartement moderne, 3 chambres, 2 salles de bain. Cherche 2 colocataires. Cuisine équipée.", location: "Agdal, Rabat", price: "2200 DH/mois/pers", type: "offer", userId: "3", createdAt: "2024-01-09" },
];

const DEMO_GROUPS = [
  { id: "1", name: "🇸🇳 Étudiants Sénégalais", description: "Communauté des étudiants sénégalais dans les ENSAM du Maroc", members: 47, category: "Pays" },
  { id: "2", name: "🇬🇭 Ghana@ENSAM", description: "Réseau des étudiants ghanéens", members: 23, category: "Pays" },
  { id: "3", name: "Aéronautique & Spatial", description: "Passionnés d'aéronautique et des technologies spatiales", members: 89, category: "Thème" },
  { id: "4", name: "Génie Industriel", description: "Échanges sur le génie industriel, lean management et qualité", members: 134, category: "Thème" },
  { id: "5", name: "🇨🇮 Ivoiriens ENSAM", description: "Étudiants de Côte d'Ivoire", members: 38, category: "Pays" },
  { id: "6", name: "Robotique & IA", description: "Club robotique et intelligence artificielle", members: 67, category: "Thème" },
];

const DEMO_ANNOUNCEMENTS = [
  { id: "1", title: "Journée d'intégration des étudiants africains", content: "Une journée spéciale pour accueillir les nouveaux étudiants africains est organisée le 20 janvier à l'ENSAM Casablanca. Présence obligatoire pour les primo-arrivants.", createdAt: "2024-01-15", type: "event" },
  { id: "2", title: "Bourse d'excellence pour étudiants africains", content: "La fondation ENSAM-Afrique lance un appel à candidatures pour des bourses d'excellence. Dossiers à déposer avant le 31 janvier.", createdAt: "2024-01-13", type: "opportunity" },
  { id: "3", title: "Workshop : Réussir son stage en France", content: "Conférence animée par des alumni sur les stages en France et en Europe. Inscription obligatoire, places limitées à 50.", createdAt: "2024-01-10", type: "workshop" },
];

const DEMO_CONNECTIONS = [
  { id: "1", user: DEMO_USERS[1], status: "connected" },
  { id: "2", user: DEMO_USERS[2], status: "pending" },
  { id: "3", user: DEMO_USERS[3], status: "none" },
];

function hashPassword(p) { return btoa(p + "_ensam_salt"); }

function Toast({ toasts, remove }) {
  return (
    <div style={{ position: "fixed", top: 20, right: 20, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} onClick={() => remove(t.id)} style={{
          background: t.type === "error" ? "#7f1d1d" : t.type === "success" ? "#14532d" : "#1e3a5f",
          border: `1px solid ${t.type === "error" ? "#ef4444" : t.type === "success" ? "#22c55e" : "#3b82f6"}`,
          color: "#fff", padding: "12px 18px", borderRadius: 10, fontSize: 14,
          cursor: "pointer", maxWidth: 320, animation: "slideIn 0.3s ease",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
        }}>
          {t.type === "success" ? "✓ " : t.type === "error" ? "✗ " : "ℹ "}{t.message}
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const add = (message, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  };
  const remove = id => setToasts(p => p.filter(t => t.id !== id));
  return { toasts, add, remove };
}

function Avatar({ name, size = 36, color = COLORS.ember }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%", background: color,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: "#fff", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0,
      fontFamily: "Georgia, serif"
    }}>{initials}</div>
  );
}

function Badge({ children, color = COLORS.ember }) {
  return (
    <span style={{
      background: color + "22", color: color, border: `1px solid ${color}44`,
      borderRadius: 6, padding: "2px 8px", fontSize: 11, fontWeight: 600, letterSpacing: 0.5
    }}>{children}</span>
  );
}

function Skeleton({ w = "100%", h = 16, r = 6 }) {
  return <div style={{ width: w, height: h, borderRadius: r, background: `${COLORS.border}`, animation: "pulse 1.5s infinite" }} />;
}

const categoryColors = {
  "Expérience": COLORS.ember,
  "Conseil": COLORS.accent,
  "Logement": COLORS.gold,
  "Question": "#a855f7",
};

function PostCard({ post, onClick }) {
  const [liked, setLiked] = useState(false);
  return (
    <div onClick={onClick} style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 14, padding: "20px 22px", cursor: "pointer",
      transition: "all 0.2s", marginBottom: 14,
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.ember + "88"}
      onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
        <Avatar name={post.author.name} size={36} color={categoryColors[post.category] || COLORS.ember} />
        <div>
          <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{post.author.name}</div>
          <div style={{ color: COLORS.muted, fontSize: 12 }}>{post.author.country} · {post.author.school}</div>
        </div>
        <Badge color={categoryColors[post.category] || COLORS.ember}>{post.category}</Badge>
        <div style={{ marginLeft: "auto", color: COLORS.muted, fontSize: 12 }}>{post.createdAt}</div>
      </div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, marginBottom: 8 }}>{post.title}</div>
      <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>
        {post.content.slice(0, 180)}{post.content.length > 180 ? "..." : ""}
      </div>
      <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
        <button onClick={e => { e.stopPropagation(); setLiked(!liked); }} style={{
          background: "none", border: "none", color: liked ? COLORS.ember : COLORS.muted,
          cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13,
          padding: "4px 8px", borderRadius: 6, transition: "all 0.15s"
        }}>
          {liked ? "♥" : "♡"} {post.likes + (liked ? 1 : 0)}
        </button>
        <span style={{ color: COLORS.muted, fontSize: 13 }}>💬 {post.comments}</span>
        <span style={{ color: COLORS.muted, fontSize: 13, marginLeft: "auto" }}>Lire la suite →</span>
      </div>
    </div>
  );
}

function HousingCard({ h }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 14, padding: "18px 20px", transition: "all 0.2s"
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = COLORS.gold + "88"}
      onMouseLeave={e => e.currentTarget.style.borderColor = COLORS.border}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <Badge color={h.type === "offer" ? COLORS.accent : COLORS.gold}>{h.type === "offer" ? "Offre" : "Demande"}</Badge>
        <span style={{ color: COLORS.gold, fontWeight: 700, fontSize: 15 }}>{h.price}</span>
      </div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{h.title}</div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{h.description}</div>
      <div style={{ color: COLORS.accent, fontSize: 13 }}>📍 {h.location}</div>
      <div style={{ marginTop: 12 }}>
        <button style={{
          background: COLORS.ember + "22", border: `1px solid ${COLORS.ember}44`,
          color: COLORS.ember, borderRadius: 8, padding: "7px 16px",
          cursor: "pointer", fontSize: 13, width: "100%"
        }}>Contacter</button>
      </div>
    </div>
  );
}

function GroupCard({ g, joined, onToggle }) {
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderRadius: 14, padding: "18px 20px", transition: "all 0.2s"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
        <Badge color={g.category === "Pays" ? COLORS.ember : COLORS.accent}>{g.category}</Badge>
        <span style={{ color: COLORS.muted, fontSize: 12 }}>{g.members} membres</span>
      </div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{g.name}</div>
      <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{g.description}</div>
      <button onClick={onToggle} style={{
        background: joined ? COLORS.surface : COLORS.ember,
        border: `1px solid ${joined ? COLORS.border : COLORS.ember}`,
        color: joined ? COLORS.muted : "#fff",
        borderRadius: 8, padding: "7px 16px", cursor: "pointer",
        fontSize: 13, width: "100%", transition: "all 0.2s"
      }}>
        {joined ? "✓ Membre" : "Rejoindre"}
      </button>
    </div>
  );
}

function AnnouncementCard({ a }) {
  const typeColors = { event: COLORS.gold, opportunity: COLORS.accent, workshop: "#a855f7" };
  const typeLabels = { event: "Événement", opportunity: "Opportunité", workshop: "Workshop" };
  return (
    <div style={{
      background: COLORS.card, border: `1px solid ${COLORS.border}`,
      borderLeft: `3px solid ${typeColors[a.type] || COLORS.ember}`,
      borderRadius: 14, padding: "18px 20px", marginBottom: 12
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
        <Badge color={typeColors[a.type] || COLORS.ember}>{typeLabels[a.type] || a.type}</Badge>
        <span style={{ color: COLORS.muted, fontSize: 12 }}>{a.createdAt}</span>
      </div>
      <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{a.title}</div>
      <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6 }}>{a.content}</div>
    </div>
  );
}

function Modal({ open, onClose, title, children }) {
  if (!open) return null;
  return (
    <div style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 1000,
      display: "flex", alignItems: "center", justifyContent: "center", padding: 16
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{
        background: COLORS.deep, border: `1px solid ${COLORS.border}`,
        borderRadius: 18, padding: 28, width: "100%", maxWidth: 520,
        maxHeight: "85vh", overflowY: "auto"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <h3 style={{ color: "#f1f5f9", margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <button onClick={onClose} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 20 }}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ color: COLORS.muted, fontSize: 13, display: "block", marginBottom: 6 }}>{label}</label>}
      <input {...props} style={{
        width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14,
        outline: "none", boxSizing: "border-box",
        ...props.style
      }} />
    </div>
  );
}

function Textarea({ label, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ color: COLORS.muted, fontSize: 13, display: "block", marginBottom: 6 }}>{label}</label>}
      <textarea {...props} style={{
        width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14,
        outline: "none", resize: "vertical", minHeight: 100, fontFamily: "inherit",
        boxSizing: "border-box", ...props.style
      }} />
    </div>
  );
}

function Select({ label, children, ...props }) {
  return (
    <div style={{ marginBottom: 16 }}>
      {label && <label style={{ color: COLORS.muted, fontSize: 13, display: "block", marginBottom: 6 }}>{label}</label>}
      <select {...props} style={{
        width: "100%", background: COLORS.surface, border: `1px solid ${COLORS.border}`,
        borderRadius: 8, padding: "10px 14px", color: "#f1f5f9", fontSize: 14,
        outline: "none", boxSizing: "border-box"
      }}>{children}</select>
    </div>
  );
}

function Btn({ children, onClick, variant = "primary", style: s = {}, disabled }) {
  const styles = {
    primary: { background: COLORS.ember, color: "#fff", border: "none" },
    secondary: { background: "transparent", color: COLORS.ember, border: `1px solid ${COLORS.ember}` },
    ghost: { background: "transparent", color: COLORS.muted, border: `1px solid ${COLORS.border}` },
  };
  return (
    <button onClick={onClick} disabled={disabled} style={{
      borderRadius: 8, padding: "10px 20px", cursor: disabled ? "not-allowed" : "pointer",
      fontSize: 14, fontWeight: 600, transition: "all 0.2s", opacity: disabled ? 0.5 : 1,
      ...styles[variant], ...s
    }}>{children}</button>
  );
}

function LandingPage({ onLogin, onRegister }) {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const features = [
    { icon: "✦", title: "Expériences & Conseils", desc: "Partagez vos expériences de stage, de vie à l'étranger et vos conseils pour réussir." },
    { icon: "⌂", title: "Logement Étudiant", desc: "Trouvez un logement ou un colocataire parmi la communauté africaine ENSAM." },
    { icon: "◈", title: "Réseau Professionnel", desc: "Connectez-vous avec des étudiants et alumni africains dans toutes les ENSAM." },
    { icon: "⬡", title: "Communautés", desc: "Rejoignez des groupes par pays ou par thème pour partager avec vos compatriotes." },
  ];

  const countries = ["🇸🇳 Sénégal", "🇨🇮 Côte d'Ivoire", "🇬🇭 Ghana", "🇲🇱 Mali", "🇨🇲 Cameroun", "🇬🇳 Guinée", "🇧🇫 Burkina", "🇧🇯 Bénin", "🇹🇬 Togo", "🇳🇪 Niger"];

  return (
    <div style={{ background: COLORS.midnight, minHeight: "100vh", fontFamily: "'Georgia', serif", overflowX: "hidden" }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .hover-lift { transition: transform 0.2s, box-shadow 0.2s !important; }
        .hover-lift:hover { transform: translateY(-3px) !important; box-shadow: 0 8px 30px rgba(232,98,42,0.25) !important; }
      `}</style>

      {/* Decorative background */}
      <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
        <div style={{ position: "absolute", top: -200, right: -200, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.ember}15, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: -100, left: -100, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.gold}10, transparent 70%)` }} />
        {/* Kente pattern */}
        <svg style={{ position: "absolute", top: 0, right: 0, opacity: 0.04, width: 400, height: 400 }} viewBox="0 0 100 100">
          {Array.from({ length: 10 }, (_, i) => Array.from({ length: 10 }, (_, j) => (
            <rect key={`${i}-${j}`} x={i * 10} y={j * 10} width={5} height={5} fill={i % 2 === j % 2 ? COLORS.ember : COLORS.gold} />
          )))}
        </svg>
      </div>

      {/* Nav */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrollY > 50 ? `${COLORS.midnight}ee` : "transparent",
        backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
        borderBottom: scrollY > 50 ? `1px solid ${COLORS.border}` : "none",
        padding: "16px 32px", display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.3s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: COLORS.ember, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 18 }}>E</span>
          </div>
          <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 18, letterSpacing: -0.5 }}>ENSAM Africa</span>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <Btn variant="ghost" onClick={onLogin} style={{ padding: "8px 18px" }}>Connexion</Btn>
          <Btn variant="primary" onClick={onRegister} style={{ padding: "8px 18px" }}>S'inscrire</Btn>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", zIndex: 1, padding: "160px 32px 100px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <div style={{ display: "inline-block", background: `${COLORS.ember}22`, border: `1px solid ${COLORS.ember}44`, borderRadius: 20, padding: "6px 16px", fontSize: 13, color: COLORS.ember, marginBottom: 24, fontFamily: "system-ui" }}>
            🌍 La communauté africaine des ENSAM
          </div>
          <h1 style={{ color: "#f8fafc", fontSize: "clamp(36px,7vw,72px)", fontWeight: 900, lineHeight: 1.1, margin: "0 0 20px", letterSpacing: -2 }}>
            Ton réseau,{" "}
            <span style={{ color: COLORS.ember }}>ta tribu</span>
            {" "}ENSAM
          </h1>
          <p style={{ color: "#94a3b8", fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: "0 auto 40px", fontFamily: "system-ui" }}>
            La plateforme exclusive pour les étudiants africains des écoles ENSAM du Maroc. Connectez-vous, partagez, grandissez ensemble.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={onRegister} style={{ padding: "14px 32px", fontSize: 16, borderRadius: 12 }}>
              Rejoindre la communauté →
            </Btn>
            <Btn variant="ghost" onClick={onLogin} style={{ padding: "14px 32px", fontSize: 16, borderRadius: 12 }}>
              Se connecter
            </Btn>
          </div>
        </div>

        {/* Floating stats */}
        <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 60, flexWrap: "wrap", animation: "fadeUp 1s 0.3s ease both" }}>
          {[["500+", "Étudiants"], ["10+", "Pays représentés"], ["3", "Villes ENSAM"], ["50+", "Groupes actifs"]].map(([n, l]) => (
            <div key={l} style={{ background: `${COLORS.card}`, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: "16px 24px", textAlign: "center" }}>
              <div style={{ color: COLORS.ember, fontSize: 24, fontWeight: 900 }}>{n}</div>
              <div style={{ color: COLORS.muted, fontSize: 13, fontFamily: "system-ui" }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Countries */}
      <section style={{ position: "relative", zIndex: 1, padding: "0 32px 80px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", maxWidth: 700, margin: "0 auto" }}>
          {countries.map(c => (
            <div key={c} style={{ background: `${COLORS.card}`, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: "6px 14px", color: "#94a3b8", fontSize: 13, fontFamily: "system-ui" }}>{c}</div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 32px 100px", maxWidth: 1100, margin: "0 auto" }}>
        <h2 style={{ color: "#f1f5f9", textAlign: "center", fontSize: 36, fontWeight: 900, marginBottom: 12, letterSpacing: -1 }}>Tout pour ta réussite</h2>
        <p style={{ color: COLORS.muted, textAlign: "center", fontFamily: "system-ui", marginBottom: 48, fontSize: 16 }}>Une plateforme pensée pour les défis uniques des étudiants africains</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="hover-lift" style={{
              background: COLORS.card, border: `1px solid ${COLORS.border}`,
              borderRadius: 16, padding: 28
            }}>
              <div style={{ color: COLORS.ember, fontSize: 28, marginBottom: 14 }}>{f.icon}</div>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{f.title}</div>
              <div style={{ color: "#94a3b8", fontSize: 14, lineHeight: 1.6, fontFamily: "system-ui" }}>{f.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ position: "relative", zIndex: 1, padding: "60px 32px 120px", textAlign: "center" }}>
        <div style={{ background: `linear-gradient(135deg, ${COLORS.ember}22, ${COLORS.gold}11)`, border: `1px solid ${COLORS.border}`, borderRadius: 24, padding: "56px 40px", maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ color: "#f1f5f9", fontSize: 32, fontWeight: 900, marginBottom: 12, letterSpacing: -1 }}>Prêt à rejoindre la tribu?</h2>
          <p style={{ color: COLORS.muted, fontFamily: "system-ui", marginBottom: 28, fontSize: 16 }}>Gratuit pour tous les étudiants ENSAM africains.</p>
          <Btn onClick={onRegister} style={{ padding: "14px 36px", fontSize: 16, borderRadius: 12 }}>Créer mon compte gratuitement</Btn>
        </div>
      </section>
    </div>
  );
}

function AuthPage({ mode, onSuccess, onSwitch, toast }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", country: "", school: "", year: "" });
  const [loading, setLoading] = useState(false);
  const isLogin = mode === "login";

  const countries = ["Sénégal", "Ghana", "Côte d'Ivoire", "Mali", "Cameroun", "Guinée", "Burkina Faso", "Bénin", "Togo", "Niger", "Autre"];
  const schools = ["ENSAM Casablanca", "ENSAM Meknès", "ENSAM Rabat"];
  const years = ["1ère année", "2ème année", "3ème année", "4ème année", "5ème année", "Master 1", "Master 2", "Doctorat"];

  const handle = async () => {
    if (!form.email || !form.password) { toast.add("Remplissez tous les champs", "error"); return; }
    if (!isLogin && !form.name) { toast.add("Entrez votre nom", "error"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    if (isLogin) {
      const found = DEMO_USERS.find(u => u.email === form.email);
      if (found) { onSuccess(found); toast.add(`Bienvenue ${found.name.split(" ")[0]} !`, "success"); }
      else { toast.add("Email ou mot de passe incorrect", "error"); }
    } else {
      const newUser = { id: Date.now().toString(), name: form.name, email: form.email, country: form.country || "Non renseigné", school: form.school || "ENSAM", year: form.year || "1ère année", bio: "", avatar: form.name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase(), role: "student" };
      onSuccess(newUser);
      toast.add(`Compte créé ! Bienvenue ${form.name.split(" ")[0]} !`, "success");
    }
    setLoading(false);
  };

  return (
    <div style={{ background: COLORS.midnight, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "system-ui" }}>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 36, width: "100%", maxWidth: 440 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: COLORS.ember, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 22, fontFamily: "Georgia" }}>E</span>
          </div>
          <h2 style={{ color: "#f1f5f9", margin: "0 0 4px", fontSize: 22, fontWeight: 700 }}>{isLogin ? "Bon retour !" : "Rejoindre ENSAM Africa"}</h2>
          <p style={{ color: COLORS.muted, margin: 0, fontSize: 14 }}>{isLogin ? "Connecte-toi à ta communauté" : "Crée ton compte étudiant"}</p>
        </div>
        {!isLogin && <Input label="Nom complet *" placeholder="Amara Diallo" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />}
        <Input label="Email *" type="email" placeholder="ton@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} />
        <Input label="Mot de passe *" type="password" placeholder="••••••••" value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} />
        {!isLogin && <>
          <Select label="Pays d'origine" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}>
            <option value="">Sélectionner...</option>
            {countries.map(c => <option key={c}>{c}</option>)}
          </Select>
          <Select label="École" value={form.school} onChange={e => setForm(p => ({ ...p, school: e.target.value }))}>
            <option value="">Sélectionner...</option>
            {schools.map(s => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Année" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}>
            <option value="">Sélectionner...</option>
            {years.map(y => <option key={y}>{y}</option>)}
          </Select>
        </>}
        {isLogin && (
          <div style={{ background: `${COLORS.surface}`, borderRadius: 8, padding: "10px 14px", marginBottom: 16, fontSize: 12, color: COLORS.muted }}>
            💡 Demo: utilisez <strong style={{ color: COLORS.accent }}>amara@ensam.ma</strong> pour vous connecter
          </div>
        )}
        <Btn onClick={handle} disabled={loading} style={{ width: "100%", padding: "12px", fontSize: 15, borderRadius: 10 }}>
          {loading ? "⏳ Chargement..." : isLogin ? "Se connecter" : "Créer mon compte"}
        </Btn>
        <p style={{ textAlign: "center", marginTop: 20, fontSize: 14, color: COLORS.muted }}>
          {isLogin ? "Pas encore de compte? " : "Déjà un compte? "}
          <span onClick={onSwitch} style={{ color: COLORS.ember, cursor: "pointer", fontWeight: 600 }}>
            {isLogin ? "S'inscrire" : "Se connecter"}
          </span>
        </p>
      </div>
    </div>
  );
}

function Sidebar({ active, setActive, user, onLogout }) {
  const nav = [
    { id: "feed", icon: "⊞", label: "Fil d'actualité" },
    { id: "housing", icon: "⌂", label: "Logement" },
    { id: "network", icon: "◎", label: "Réseau" },
    { id: "groups", icon: "⬡", label: "Communautés" },
    { id: "announcements", icon: "⚑", label: "Annonces" },
    { id: "profile", icon: "◉", label: "Mon Profil" },
  ];
  return (
    <div style={{
      width: 240, background: COLORS.deep, borderRight: `1px solid ${COLORS.border}`,
      display: "flex", flexDirection: "column", padding: "0 0 20px", flexShrink: 0,
      height: "100vh", position: "sticky", top: 0, overflowY: "auto"
    }}>
      <div style={{ padding: "20px 20px 16px", borderBottom: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 32, height: 32, borderRadius: 8, background: COLORS.ember, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 900, fontSize: 16, fontFamily: "Georgia" }}>E</span>
          </div>
          <span style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 16, fontFamily: "Georgia" }}>ENSAM Africa</span>
        </div>
      </div>
      <div style={{ padding: "12px 12px 0", flex: 1 }}>
        {nav.map(n => (
          <button key={n.id} onClick={() => setActive(n.id)} style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: "10px 12px", borderRadius: 10, border: "none", cursor: "pointer",
            background: active === n.id ? `${COLORS.ember}22` : "transparent",
            color: active === n.id ? COLORS.ember : "#94a3b8",
            fontWeight: active === n.id ? 600 : 400,
            fontSize: 14, textAlign: "left", marginBottom: 2, transition: "all 0.15s"
          }}>
            <span style={{ fontSize: 16 }}>{n.icon}</span> {n.label}
          </button>
        ))}
      </div>
      <div style={{ padding: "12px 16px", borderTop: `1px solid ${COLORS.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
          <Avatar name={user.name} size={32} />
          <div>
            <div style={{ color: "#e2e8f0", fontSize: 13, fontWeight: 600 }}>{user.name.split(" ")[0]}</div>
            <div style={{ color: COLORS.muted, fontSize: 11 }}>{user.country}</div>
          </div>
        </div>
        <button onClick={onLogout} style={{ width: "100%", background: "none", border: `1px solid ${COLORS.border}`, color: COLORS.muted, borderRadius: 8, padding: "7px", cursor: "pointer", fontSize: 12 }}>
          Déconnexion
        </button>
      </div>
    </div>
  );
}

function FeedSection({ user, toast }) {
  const [posts, setPosts] = useState(DEMO_POSTS);
  const [showModal, setShowModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState("Tous");
  const [form, setForm] = useState({ title: "", content: "", category: "Expérience" });
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState("");
  const categories = ["Tous", "Expérience", "Conseil", "Logement", "Question"];

  useEffect(() => { setTimeout(() => setLoading(false), 800); }, []);

  const filtered = filter === "Tous" ? posts : posts.filter(p => p.category === filter);

  const submit = async () => {
    if (!form.title || !form.content) { toast.add("Remplissez titre et contenu", "error"); return; }
    const newPost = { id: Date.now().toString(), ...form, authorId: user.id, author: user, createdAt: new Date().toISOString().slice(0, 10), likes: 0, comments: 0 };
    setPosts(p => [newPost, ...p]);
    setForm({ title: "", content: "", category: "Expérience" });
    setShowModal(false);
    toast.add("Publication créée !", "success");
  };

  const addComment = () => {
    if (!comment.trim()) return;
    setPosts(p => p.map(post => post.id === selectedPost.id ? { ...post, comments: post.comments + 1 } : post));
    setSelectedPost(p => ({ ...p, comments: p.comments + 1 }));
    setComment("");
    toast.add("Commentaire ajouté !", "success");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Fil d'actualité</h2>
        <Btn onClick={() => setShowModal(true)} style={{ padding: "8px 18px" }}>+ Publier</Btn>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
        {categories.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{
            padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === c ? COLORS.ember : COLORS.border}`,
            background: filter === c ? `${COLORS.ember}22` : "transparent",
            color: filter === c ? COLORS.ember : COLORS.muted, cursor: "pointer", fontSize: 13
          }}>{c}</button>
        ))}
      </div>
      {loading ? Array(3).fill(0).map((_, i) => (
        <div key={i} style={{ background: COLORS.card, borderRadius: 14, padding: 20, marginBottom: 14 }}>
          <Skeleton w={200} h={14} /><Skeleton w="100%" h={60} r={6} /><Skeleton w={150} h={12} />
        </div>
      )) : filtered.map(p => <PostCard key={p.id} post={p} onClick={() => setSelectedPost(p)} />)}

      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle publication">
        <Select label="Catégorie" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
          {["Expérience", "Conseil", "Logement", "Question"].map(c => <option key={c}>{c}</option>)}
        </Select>
        <Input label="Titre *" placeholder="Donnez un titre accrocheur..." value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
        <Textarea label="Contenu *" placeholder="Partagez votre expérience, conseil, question..." value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} style={{ minHeight: 150 }} />
        <Btn onClick={submit} style={{ width: "100%" }}>Publier</Btn>
      </Modal>

      <Modal open={!!selectedPost} onClose={() => setSelectedPost(null)} title={selectedPost?.title || ""}>
        {selectedPost && <>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
            <Avatar name={selectedPost.author.name} size={36} color={categoryColors[selectedPost.category]} />
            <div>
              <div style={{ color: "#e2e8f0", fontWeight: 600, fontSize: 14 }}>{selectedPost.author.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>{selectedPost.author.country} · {selectedPost.createdAt}</div>
            </div>
            <Badge color={categoryColors[selectedPost.category]}>{selectedPost.category}</Badge>
          </div>
          <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>{selectedPost.content}</div>
          <div style={{ borderTop: `1px solid ${COLORS.border}`, paddingTop: 16 }}>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 12 }}>Commentaires ({selectedPost.comments})</div>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={comment} onChange={e => setComment(e.target.value)} onKeyDown={e => e.key === "Enter" && addComment()} placeholder="Ajouter un commentaire..." style={{ flex: 1, background: COLORS.surface, border: `1px solid ${COLORS.border}`, borderRadius: 8, padding: "8px 12px", color: "#f1f5f9", fontSize: 14, outline: "none" }} />
              <Btn onClick={addComment} style={{ padding: "8px 14px" }}>↑</Btn>
            </div>
          </div>
        </>}
      </Modal>
    </div>
  );
}

function HousingSection({ user, toast }) {
  const [listings, setListings] = useState(DEMO_HOUSING);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [form, setForm] = useState({ title: "", description: "", location: "", price: "", type: "offer" });

  const filtered = filter === "all" ? listings : listings.filter(l => l.type === filter);

  const submit = () => {
    if (!form.title || !form.location) { toast.add("Remplissez les champs obligatoires", "error"); return; }
    setListings(p => [{ id: Date.now().toString(), ...form, userId: user.id, createdAt: new Date().toISOString().slice(0, 10) }, ...p]);
    setForm({ title: "", description: "", location: "", price: "", type: "offer" });
    setShowModal(false);
    toast.add("Annonce publiée !", "success");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Logement Étudiant</h2>
        <Btn onClick={() => setShowModal(true)} style={{ padding: "8px 18px" }}>+ Annonce</Btn>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["all", "Toutes"], ["offer", "Offres"], ["request", "Demandes"]].map(([v, l]) => (
          <button key={v} onClick={() => setFilter(v)} style={{
            padding: "6px 14px", borderRadius: 20, border: `1px solid ${filter === v ? COLORS.gold : COLORS.border}`,
            background: filter === v ? `${COLORS.gold}22` : "transparent",
            color: filter === v ? COLORS.gold : COLORS.muted, cursor: "pointer", fontSize: 13
          }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {filtered.map(h => <HousingCard key={h.id} h={h} />)}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle annonce logement">
        <Select label="Type *" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
          <option value="offer">Offre de logement</option>
          <option value="request">Recherche logement</option>
        </Select>
        <Input label="Titre *" placeholder="Chambre meublée quartier Maarif" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
        <Textarea label="Description" placeholder="Décrivez le logement..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} />
        <Input label="Localisation *" placeholder="Hay Hassani, Casablanca" value={form.location} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
        <Input label="Prix / Budget" placeholder="2000 DH/mois" value={form.price} onChange={e => setForm(p => ({ ...p, price: e.target.value }))} />
        <Btn onClick={submit} style={{ width: "100%" }}>Publier l'annonce</Btn>
      </Modal>
    </div>
  );
}

function NetworkSection({ user, toast }) {
  const [connections, setConnections] = useState(DEMO_CONNECTIONS);

  const handleAction = (id, action) => {
    setConnections(p => p.map(c => c.id === id ? { ...c, status: action === "connect" ? "pending" : action === "accept" ? "connected" : "none" } : c));
    const msgs = { connect: "Demande envoyée !", accept: "Connexion acceptée !", reject: "Demande refusée" };
    toast.add(msgs[action] || "", action === "reject" ? "error" : "success");
  };

  const statusLabels = { connected: "Connecté", pending: "En attente", none: "" };

  return (
    <div>
      <h2 style={{ color: "#f1f5f9", margin: "0 0 8px", fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Réseau</h2>
      <p style={{ color: COLORS.muted, margin: "0 0 24px", fontSize: 14 }}>Connectez-vous avec d'autres étudiants africains ENSAM</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
        {connections.map(c => (
          <div key={c.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Avatar name={c.user.name} size={44} />
              <div>
                <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15 }}>{c.user.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>{c.user.country} · {c.user.year}</div>
              </div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 6 }}>{c.user.school}</div>
            <div style={{ color: "#94a3b8", fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{c.user.bio}</div>
            {c.status === "none" && <Btn onClick={() => handleAction(c.id, "connect")} style={{ width: "100%", padding: "8px" }}>+ Connecter</Btn>}
            {c.status === "pending" && (
              <div style={{ display: "flex", gap: 8 }}>
                <Btn onClick={() => handleAction(c.id, "accept")} style={{ flex: 1, padding: "8px" }}>Accepter</Btn>
                <Btn variant="ghost" onClick={() => handleAction(c.id, "reject")} style={{ flex: 1, padding: "8px" }}>Refuser</Btn>
              </div>
            )}
            {c.status === "connected" && (
              <div style={{ textAlign: "center", color: COLORS.accent, fontSize: 13, fontWeight: 600 }}>✓ Connecté</div>
            )}
          </div>
        ))}
        {DEMO_USERS.filter(u => u.id !== user.id && !connections.find(c => c.user.id === u.id)).map(u => (
          <div key={u.id} style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 14, padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <Avatar name={u.name} size={44} color={COLORS.accent} />
              <div>
                <div style={{ color: "#f1f5f9", fontWeight: 600, fontSize: 15 }}>{u.name}</div>
                <div style={{ color: COLORS.muted, fontSize: 12 }}>{u.country} · {u.year}</div>
              </div>
            </div>
            <div style={{ color: COLORS.muted, fontSize: 13, marginBottom: 14, lineHeight: 1.5 }}>{u.bio}</div>
            <Btn onClick={() => { toast.add("Demande envoyée !", "success"); }} style={{ width: "100%", padding: "8px" }}>+ Connecter</Btn>
          </div>
        ))}
      </div>
    </div>
  );
}

function GroupsSection({ user, toast }) {
  const [joined, setJoined] = useState(["1", "3"]);
  const [showModal, setShowModal] = useState(false);
  const [groups, setGroups] = useState(DEMO_GROUPS);
  const [form, setForm] = useState({ name: "", description: "", category: "Thème" });

  const toggle = id => {
    setJoined(p => p.includes(id) ? p.filter(g => g !== id) : [...p, id]);
    toast.add(joined.includes(id) ? "Groupe quitté" : "Groupe rejoint !", joined.includes(id) ? "info" : "success");
  };

  const create = () => {
    if (!form.name) { toast.add("Entrez un nom de groupe", "error"); return; }
    const ng = { id: Date.now().toString(), ...form, members: 1 };
    setGroups(p => [...p, ng]);
    setJoined(p => [...p, ng.id]);
    setForm({ name: "", description: "", category: "Thème" });
    setShowModal(false);
    toast.add("Groupe créé !", "success");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Communautés</h2>
        <Btn onClick={() => setShowModal(true)} style={{ padding: "8px 18px" }}>+ Créer</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {groups.map(g => <GroupCard key={g.id} g={g} joined={joined.includes(g.id)} onToggle={() => toggle(g.id)} />)}
      </div>
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Créer une communauté">
        <Select label="Type" value={form.category} onChange={e => setForm(p => ({ ...p, category: e.target.value }))}>
          <option value="Thème">Par thème</option>
          <option value="Pays">Par pays</option>
        </Select>
        <Input label="Nom du groupe *" placeholder="Ex: Robotique ENSAM" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
        <Textarea label="Description" placeholder="Décrivez votre communauté..." value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ minHeight: 80 }} />
        <Btn onClick={create} style={{ width: "100%" }}>Créer la communauté</Btn>
      </Modal>
    </div>
  );
}

function AnnouncementsSection({ user, toast }) {
  const [announcements, setAnnouncements] = useState(DEMO_ANNOUNCEMENTS);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", type: "event" });

  const create = () => {
    if (!form.title || !form.content) { toast.add("Remplissez tous les champs", "error"); return; }
    setAnnouncements(p => [{ id: Date.now().toString(), ...form, createdAt: new Date().toISOString().slice(0, 10) }, ...p]);
    setForm({ title: "", content: "", type: "event" });
    setShowModal(false);
    toast.add("Annonce publiée !", "success");
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ color: "#f1f5f9", margin: 0, fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Annonces</h2>
        <Btn onClick={() => setShowModal(true)} style={{ padding: "8px 18px" }}>+ Annonce</Btn>
      </div>
      {announcements.map(a => <AnnouncementCard key={a.id} a={a} />)}
      <Modal open={showModal} onClose={() => setShowModal(false)} title="Nouvelle annonce">
        <Select label="Type" value={form.type} onChange={e => setForm(p => ({ ...p, type: e.target.value }))}>
          <option value="event">Événement</option>
          <option value="opportunity">Opportunité</option>
          <option value="workshop">Workshop</option>
        </Select>
        <Input label="Titre *" placeholder="Titre de l'annonce" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} />
        <Textarea label="Contenu *" placeholder="Détails de l'annonce..." value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} style={{ minHeight: 120 }} />
        <Btn onClick={create} style={{ width: "100%" }}>Publier</Btn>
      </Modal>
    </div>
  );
}

function ProfileSection({ user, toast }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ ...user });

  const save = () => {
    setEditing(false);
    toast.add("Profil mis à jour !", "success");
  };

  const stats = [
    { label: "Publications", value: DEMO_POSTS.filter(p => p.authorId === user.id).length || 3 },
    { label: "Connexions", value: 12 },
    { label: "Groupes", value: 4 },
  ];

  return (
    <div style={{ maxWidth: 680 }}>
      <h2 style={{ color: "#f1f5f9", margin: "0 0 20px", fontSize: 22, fontWeight: 700, fontFamily: "Georgia" }}>Mon Profil</h2>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 28, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 20, marginBottom: 20 }}>
          <Avatar name={user.name} size={72} color={COLORS.ember} />
          <div style={{ flex: 1 }}>
            {editing ? <>
              <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} />
            </> : <>
              <div style={{ color: "#f1f5f9", fontWeight: 700, fontSize: 22, fontFamily: "Georgia" }}>{user.name}</div>
              <div style={{ color: COLORS.muted, fontSize: 14, marginTop: 4 }}>{user.school} · {user.year}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <Badge color={COLORS.ember}>{user.country}</Badge>
                <Badge color={COLORS.accent}>{user.school?.split(" ")[1] || "ENSAM"}</Badge>
              </div>
            </>}
          </div>
          <Btn variant={editing ? "primary" : "ghost"} onClick={editing ? save : () => setEditing(true)} style={{ padding: "8px 18px" }}>
            {editing ? "Sauvegarder" : "Modifier"}
          </Btn>
        </div>
        <div style={{ display: "flex", gap: 24, padding: "16px 0", borderTop: `1px solid ${COLORS.border}`, borderBottom: `1px solid ${COLORS.border}`, marginBottom: 20 }}>
          {stats.map(s => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div style={{ color: COLORS.ember, fontWeight: 700, fontSize: 20 }}>{s.value}</div>
              <div style={{ color: COLORS.muted, fontSize: 12 }}>{s.label}</div>
            </div>
          ))}
        </div>
        {editing ? <>
          <Select label="Pays" value={form.country} onChange={e => setForm(p => ({ ...p, country: e.target.value }))}>
            {["Sénégal","Ghana","Côte d'Ivoire","Mali","Cameroun","Guinée","Burkina Faso","Autre"].map(c => <option key={c}>{c}</option>)}
          </Select>
          <Select label="École" value={form.school} onChange={e => setForm(p => ({ ...p, school: e.target.value }))}>
            {["ENSAM Casablanca","ENSAM Meknès","ENSAM Rabat"].map(s => <option key={s}>{s}</option>)}
          </Select>
          <Select label="Année" value={form.year} onChange={e => setForm(p => ({ ...p, year: e.target.value }))}>
            {["1ère année","2ème année","3ème année","4ème année","5ème année","Master 1","Master 2"].map(y => <option key={y}>{y}</option>)}
          </Select>
          <Textarea label="Bio" placeholder="Décrivez-vous..." value={form.bio} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))} />
        </> : <>
          <div style={{ color: "#94a3b8", fontSize: 15, lineHeight: 1.7 }}>
            {user.bio || "Étudiant passionné à l'ENSAM. Ajoutez une bio pour vous présenter à la communauté."}
          </div>
          <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>📧 {user.email}</div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>🏫 {user.school}</div>
            <div style={{ color: COLORS.muted, fontSize: 14 }}>📅 {user.year}</div>
          </div>
        </>}
      </div>
      <div style={{ background: COLORS.card, border: `1px solid ${COLORS.border}`, borderRadius: 16, padding: 24 }}>
        <div style={{ color: "#f1f5f9", fontWeight: 600, marginBottom: 14 }}>Mes publications récentes</div>
        {DEMO_POSTS.slice(0, 2).map(p => (
          <div key={p.id} style={{ borderBottom: `1px solid ${COLORS.border}`, paddingBottom: 12, marginBottom: 12 }}>
            <div style={{ color: "#e2e8f0", fontSize: 14, fontWeight: 600 }}>{p.title}</div>
            <div style={{ color: COLORS.muted, fontSize: 12, marginTop: 4 }}>{p.category} · {p.createdAt} · {p.likes} ♥</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ user, onLogout, toast }) {
  const [active, setActive] = useState("feed");
  const [mobileNav, setMobileNav] = useState(false);

  const sections = {
    feed: <FeedSection user={user} toast={toast} />,
    housing: <HousingSection user={user} toast={toast} />,
    network: <NetworkSection user={user} toast={toast} />,
    groups: <GroupsSection user={user} toast={toast} />,
    announcements: <AnnouncementsSection user={user} toast={toast} />,
    profile: <ProfileSection user={user} toast={toast} />,
  };

  return (
    <div style={{ display: "flex", background: COLORS.midnight, minHeight: "100vh", fontFamily: "system-ui" }}>
      <style>{`
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
        @keyframes slideIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @media (max-width: 768px) { .sidebar-desktop { display: none !important; } .main-content { padding: 16px !important; } }
      `}</style>
      <div className="sidebar-desktop">
        <Sidebar active={active} setActive={v => { setActive(v); setMobileNav(false); }} user={user} onLogout={onLogout} />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {/* Mobile header */}
        <div style={{ display: "none", padding: "14px 16px", background: COLORS.deep, borderBottom: `1px solid ${COLORS.border}`, alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 50 }} className="mobile-header">
          <span style={{ color: "#f1f5f9", fontWeight: 700, fontFamily: "Georgia" }}>ENSAM Africa</span>
          <button onClick={() => setMobileNav(!mobileNav)} style={{ background: "none", border: "none", color: COLORS.muted, cursor: "pointer", fontSize: 20 }}>☰</button>
        </div>
        <div className="main-content" style={{ padding: "32px 36px", maxWidth: 900, margin: "0 auto", animation: "fadeUp 0.3s ease" }}>
          {sections[active]}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("landing");
  const [user, setUser] = useState(null);
  const toast = useToast();

  const handleAuth = u => { setUser(u); setPage("dashboard"); };
  const handleLogout = () => { setUser(null); setPage("landing"); toast.add("Déconnecté. À bientôt !", "info"); };

  return (
    <div style={{ fontFamily: "system-ui", background: COLORS.midnight }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes slideIn { from{opacity:0;transform:translateX(30px)} to{opacity:1;transform:translateX(0)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        input::placeholder, textarea::placeholder { color: #475569 !important; }
        input:focus, textarea:focus, select:focus { border-color: #E8622A !important; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #0A1628; } ::-webkit-scrollbar-thumb { background: #1E3050; border-radius: 4px; }
      `}</style>
      <Toast toasts={toast.toasts} remove={toast.remove} />
      {page === "landing" && <LandingPage onLogin={() => setPage("login")} onRegister={() => setPage("register")} />}
      {page === "login" && <AuthPage mode="login" onSuccess={handleAuth} onSwitch={() => setPage("register")} toast={toast} />}
      {page === "register" && <AuthPage mode="register" onSuccess={handleAuth} onSwitch={() => setPage("login")} toast={toast} />}
      {page === "dashboard" && user && <Dashboard user={user} onLogout={handleLogout} toast={toast} />}
    </div>
  );
}
