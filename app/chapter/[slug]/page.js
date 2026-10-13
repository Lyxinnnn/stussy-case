import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PROJECTS } from '../../../components/ring/projects';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export default async function ChapterPage({ params }) {
  const { slug } = await params;
  const index = PROJECTS.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();
  const chapter = PROJECTS[index];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const part = chapter.type.split(' / ')[0];
  return (
    <main 
      className="stussy-chapter" 
      style={{ minHeight:'100vh', background:'#f5f3ee', color:'#161616', fontFamily:'Arial, Helvetica, sans-serif' }}>
      <header style={{display:'flex',justifyContent:'space-between',gap:20,padding:'26px 5vw',borderBottom:'1px solid #bdbab3',fontSize:12,letterSpacing:2}}>
        <Link href="/" style={{color:'inherit',textDecoration:'none'}}>STÜSSY® / INDEX ↗</Link>
        <span>CULTURAL STUDY — {chapter.year} / 18</span>
      </header>
      <section style={{padding:'8vh 5vw 4vh'}}>
        <p style={{fontSize:12,letterSpacing:3,marginBottom:24}}>{chapter.type}</p>
        <h1 style={{fontSize:'clamp(54px,10vw,160px)',lineHeight:0.9,letterSpacing:'-0.075em',textTransform:'uppercase',maxWidth:1100,margin:'0 0 45px'}}>{chapter.name}</h1>
        <p style={{fontSize:'clamp(18px,2.2vw,28px)',maxWidth:750,lineHeight:1.4}}>{part === 'PAST' ? 'How a local subculture became a global visual language.' : part === 'PRESENT' ? 'Understanding the forces shaping Stüssy’s contemporary cultural relevance.' : 'What the Stüssy story suggests for the next generation of fashion brands.'}</p>
      </section>
      <section style={{height:'min(52vw,620px)',minHeight:260,margin:'0 5vw',position:'relative',overflow:'hidden',background:'#dedbd5'}}>
        <img src={`/${chapter.file}`} alt={`${chapter.name} — placeholder visual`} style={{width:'100%',height:'100%',objectFit:'cover'}} />
        <span style={{position:'absolute',bottom:18,left:20,background:'#f5f3ee',padding:'8px 12px',fontSize:11}}>PLACEHOLDER IMAGE / REPLACE WITH STÜSSY ASSET</span>
      </section>
      <section style={{display:'grid',gridTemplateColumns:'minmax(120px,1fr) minmax(0,2fr)',gap:24,padding:'8vh 5vw 12vh'}}>
        <div style={{fontSize:12,letterSpacing:2}}>CHAPTER {chapter.year}<br/>RESEARCH NOTES</div>
        <div style={{maxWidth:680}}>
          <h2 style={{fontSize:'clamp(28px,4vw,54px)',letterSpacing:'-0.04em',lineHeight:1.1}}>The story behind {chapter.name.toLowerCase()}.</h2>
          <p style={{fontSize:17,lineHeight:1.7,marginTop:24}}>This is an editable chapter template. Add your research, evidence, campaign examples, images and interpretation here. Distinguish historical facts from your own brand analysis.</p>
        </div>
      </section>
      <footer style={{display:'flex',justifyContent:'space-between',gap:20,flexWrap:'wrap',padding:'32px 5vw',borderTop:'1px solid #bdbab3'}}>
        <Link href="/" style={{color:'inherit'}}>← BACK TO INDEX</Link>
        <Link href={`/chapter/${next.slug}`} style={{color:'inherit'}}>NEXT / {next.name.toUpperCase()} →</Link>
      </footer>
    </main>
  );
}
