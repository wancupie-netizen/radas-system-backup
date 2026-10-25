import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Check,
  CircleCheck,
  Crown,
  FileSearch,
  Lightbulb,
  LockKeyhole,
  Menu,
  MessageCircle,
  PlayCircle,
  SearchCheck,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'

const APP_URL = 'https://app.radas.my'
const WHATSAPP_URL = 'https://wa.me/601126717116?text=Salam%2C%20saya%20berminat%20dengan%20RADAS%20PRO%20dan%20ingin%20mengetahui%20bagaimana%20ia%20boleh%20membantu%20proses%20research%20dan%20content%20affiliate%20saya.'

const problems = [
  ['Tidak pasti produk mana patut dipilih', 'Harga dan komisen nampak menarik, tetapi anda tidak tahu sama ada produk itu mempunyai masalah pelanggan dan peluang content yang jelas.'],
  ['Buntu mencari idea content', 'Produk sudah ada, tetapi anda masih tidak tahu angle, hook atau demonstrasi yang sesuai untuk video.'],
  ['Takut membuang masa', 'Anda mungkin menghasilkan banyak video untuk produk yang tidak sesuai dengan audience, kemampuan atau gaya content anda.'],
  ['Research disimpan tanpa tindakan', 'Anda membaca banyak maklumat produk, tetapi tidak mempunyai langkah jelas untuk memulakan ujian.'],
]

const solutions = [
  { icon: SearchCheck, title: 'Verdict dan sebab keputusan', text: 'Fahami mengapa produk layak diuji, perlu dipantau atau belum disyorkan.' },
  { icon: Users, title: 'Creator Competition dan GMV Max', text: 'Lihat persaingan creator dan signal sokongan seller sebagai konteks tambahan.' },
  { icon: Lightbulb, title: 'Content angles dan hook', text: 'Mulakan dengan sudut content yang lahir daripada masalah, kegunaan dan ciri produk.' },
  { icon: PlayCircle, title: 'Execution Playbook', text: 'Bawa research kepada eksperimen melalui langkah pelaksanaan yang lebih praktikal.' },
]

const proFeatures = [
  'Semua Research Free dan PRO',
  'Verdict dan sebab keputusan',
  'Creator Competition dan GMV Max',
  'Research Insight penuh',
  'Content angles dan hook',
  'Video rujukan',
  'Execution Playbook',
]

const freeFeatures = ['Research berstatus Free', 'Fakta asas produk', 'Harga dan anggaran komisen', 'Simpan research untuk rujukan']

function ProPage() {
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const previousTitle = document.title
    document.title = 'RADAS PRO — Daripada Research kepada Tindakan'
    return () => { document.title = previousTitle }
  }, [])

  return (
    <div className="site-shell pro-page">
      <header className="nav-wrap">
        <a className="brand" href="/" aria-label="RADAS home"><img src="/radas-logo.png" alt="RADAS" /></a>
        <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Buka menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Navigasi RADAS PRO">
          <a href="#masalah" onClick={() => setMenuOpen(false)}>Masalah</a>
          <a href="#penyelesaian" onClick={() => setMenuOpen(false)}>Cara PRO membantu</a>
          <a href="#perbandingan" onClick={() => setMenuOpen(false)}>Free vs PRO</a>
          <a className="nav-login" href={`${APP_URL}/login`}>Log masuk</a>
          <a className="button small" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mohon Akses PRO <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main>
        <section className="pro-hero section-pad">
          <div className="hero-glow glow-one" />
          <div className="pro-hero-copy">
            <a className="back-link" href="/"><ArrowLeft /> Kembali ke RADAS</a>
            <div className="eyebrow"><Crown size={16} /> RADAS PRO untuk affiliate Malaysia</div>
            <h1>Dah jumpa produk, tapi masih tak tahu <span>content apa</span> yang perlu dibuat?</h1>
            <p className="hero-lead">RADAS PRO membantu anda memahami produk, memilih angle content dan merancang tindakan seterusnya—supaya research tidak berhenti sebagai maklumat sahaja.</p>
            <div className="hero-actions">
              <a className="button" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Mohon Akses RADAS PRO</a>
              <a className="text-link" href="#penyelesaian">Lihat apa yang anda dapat <ArrowRight size={17} /></a>
            </div>
            <p className="pro-disclaimer"><ShieldCheck /> Tiada janji jualan. Hanya research dan panduan tindakan yang lebih tersusun.</p>
          </div>
          <div className="pro-hero-panel">
            <div className="pro-panel-top"><span><Crown /> RADAS PRO</span><small>RESEARCH TO ACTION</small></div>
            <div className="pro-flow">
              {['Research', 'Keputusan', 'Content', 'Tindakan'].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong></div>)}
            </div>
            <div className="pro-panel-insight"><Sparkles /><p><small>MATLAMAT UTAMA</small><strong>Kurangkan keraguan sebelum anda mula menguji.</strong></p></div>
          </div>
        </section>

        <section className="section pro-problems section-pad" id="masalah">
          <div className="section-heading centered"><span className="kicker">MASALAH SEBENAR AFFILIATE</span><h2>Banyak produk ditemui. Sedikit yang benar-benar diuji.</h2><p>Masalahnya bukan kekurangan produk—tetapi kekurangan konteks dan arah selepas produk ditemui.</p></div>
          <div className="problem-grid">
            {problems.map(([title, text], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="section pro-solutions section-pad" id="penyelesaian">
          <div className="section-heading split-heading">
            <div><span className="kicker">DARIPADA KELIRU KEPADA TINDAKAN</span><h2>Susun perkara penting sebelum membuat content.</h2></div>
            <p>RADAS PRO tidak memilih produk bagi pihak anda. Ia memberikan konteks dan panduan supaya anda boleh membuat keputusan dengan lebih yakin.</p>
          </div>
          <div className="solution-grid">
            {solutions.map(({ icon: Icon, title, text }) => <article key={title}><div className="solution-icon"><Icon /></div><h3>{title}</h3><p>{text}</p></article>)}
          </div>
        </section>

        <section className="section pro-outcomes section-pad">
          <div className="outcome-copy"><span className="kicker">LEBIH JELAS, BUKAN LEBIH RUMIT</span><h2>Selepas membaca Research PRO, anda tahu apa yang perlu dinilai.</h2><p>Tujuannya ialah mengurangkan keraguan sebelum bertindak—bukan menambah lebih banyak data yang tidak digunakan.</p></div>
          <div className="outcome-list">
            {[
              'Apakah masalah pelanggan yang diselesaikan?',
              'Mengapa produk ini layak atau tidak layak diuji?',
              'Siapakah audience yang sesuai?',
              'Apakah risiko dan pertimbangannya?',
              'Angle content apa yang boleh dimulakan?',
              'Apakah langkah pertama yang perlu dibuat?',
            ].map(item => <div key={item}><CircleCheck /><span>{item}</span></div>)}
          </div>
        </section>

        <section className="section pro-compare section-pad" id="perbandingan">
          <div className="section-heading centered"><span className="kicker">FREE BERBANDING PRO</span><h2>Mulakan dengan fakta asas. Naik taraf apabila perlukan arah tindakan.</h2></div>
          <div className="pricing-grid pro-pricing-grid">
            <article className="price-card"><span className="plan-label">RADAS FREE</span><h3>Fakta asas</h3><p>Sesuai untuk mengenali produk dan membuat penilaian awal.</p><ul>{freeFeatures.map(item => <li key={item}><Check /> {item}</li>)}</ul><a className="button secondary" href={`${APP_URL}/register`}>Buka Akaun Percuma</a></article>
            <article className="price-card featured"><span className="plan-label">RADAS PRO</span><h3>Arah tindakan</h3><p>Sesuai untuk memahami produk dan merancang eksperimen content.</p><ul>{proFeatures.map(item => <li key={item}><Check /> {item}</li>)}</ul><a className="button" href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mohon Akses PRO</a></article>
          </div>
          <p className="compare-note"><CircleCheck /> Harga dan anggaran komisen kekal tersedia kepada pengguna Free kerana ia ialah maklumat asas untuk menilai produk.</p>
        </section>

        <section className="section pro-guardrails section-pad">
          <div className="guardrail-title"><ShieldCheck /><div><span className="kicker">KEPUTUSAN BERSTRUKTUR</span><h2>RADAS membantu keputusan—bukan menjanjikan keputusan.</h2></div></div>
          <div className="guardrail-grid">
            <article><LockKeyhole /><h3>Research dilindungi</h3><p>Kandungan premium hanya tersedia kepada akaun PRO yang sah.</p></article>
            <article><BarChart3 /><h3>Analisis yang boleh digunakan</h3><p>Fahami peluang, risiko dan sudut content sebelum memulakan ujian.</p></article>
            <article><ShieldCheck /><h3>Tiada jaminan jualan</h3><p>Hasil masih bergantung pada content, audience, pelaksanaan, pasaran dan faktor platform.</p></article>
          </div>
        </section>

        <section className="final-cta section-pad">
          <div className="cta-glow" /><img src="/radas-mark.png" alt="" /><span className="kicker">BERSEDIA UNTUK BERTINDAK?</span><h2>Jangan biarkan research berhenti sebagai maklumat.</h2><p>Fahami produk, pilih eksperimen dan rancang content dengan arah yang lebih jelas.</p>
          <div className="pro-final-actions"><a className="button" href={WHATSAPP_URL} target="_blank" rel="noreferrer"><MessageCircle /> Mohon Akses RADAS PRO</a><a className="button secondary" href={`${APP_URL}/register`}>Mulakan dengan RADAS Free</a></div>
        </section>
      </main>

      <footer><div className="footer-brand"><img src="/radas-logo.png" alt="RADAS" /><p>Research Operating System untuk affiliate Malaysia.</p></div><div className="footer-links"><a href="/">Kembali ke RADAS</a><a href={`${APP_URL}/register`}>Research Free</a><a href={`${APP_URL}/login`}>Log masuk</a><a href={WHATSAPP_URL} target="_blank" rel="noreferrer">Mohon Akses PRO</a></div><p className="copyright">© {new Date().getFullYear()} RADAS Malaysia. Semua hak terpelihara.</p></footer>
    </div>
  )
}

export default ProPage
