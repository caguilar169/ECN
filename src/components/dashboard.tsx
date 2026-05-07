import Link from 'next/link';

type Card = { title: string; desc: string };

const cards: Card[] = [
  { title: 'Usuarios', desc: 'Gestión de usuarios, foto, bio y reset de password.' },
  { title: 'Retiros', desc: 'Agenda, asistencia, permanencia, fotos y asignaciones.' },
  { title: 'Comunidades', desc: 'Miembros, temas vistos y proceso puente.' },
  { title: 'Temas y documentos', desc: 'Repositorio de temas, oraciones y valores ECN.' }
];

export function Dashboard() {
  return (
    <main style={{ maxWidth: 1000, margin: '32px auto', padding: 24 }}>
      <h1>ECN Web App (MVP)</h1>
      <p>Base inicial lista para crecer con autenticación, roles, i18n y campos personalizados.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginTop: 20 }}>
        {cards.map((card) => (
          <section key={card.title} style={{ background: 'white', borderRadius: 8, padding: 16, border: '1px solid #e8e8e8' }}>
            <h3>{card.title}</h3>
            <p>{card.desc}</p>
          </section>
        ))}
      </div>
      <p style={{ marginTop: 24 }}>API prueba: <Link href="/api/health">/api/health</Link></p>
    </main>
  );
}
