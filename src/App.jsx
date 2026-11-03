import { useEffect, useState } from 'react'
import {
  ArrowDown, ArrowDownToLine, ArrowRight, ArrowUp, BarChart3, BriefcaseBusiness,
  Check, ChevronDown, Cog, Cpu, GraduationCap, Layers3, Linkedin, Mail, MapPin,
  Menu, Phone, ShieldCheck, Sparkles, Wrench, X,
  LayoutDashboard, CalendarClock, DraftingCompass, Ruler, Moon, Sun,
} from 'lucide-react'
import {
  assetGroups, education, experiences, highlights, methods, profile, profileText,
  projects, tools,
} from './data'

const resumeUrl = '/documentos/curriculo-executivo-joao-paulo.pdf'
const sections = [
  ['perfil', 'Perfil'], ['destaques', 'Destaques'], ['experiencia', 'Experiência'],
  ['ativos', 'Ativos'], ['engenharia', 'Engenharia'], ['formacao', 'Formação'], ['contato', 'Contato'],
]

function SectionTitle({ eyebrow, title, copy, light = false }) {
  return (
    <div className={`section-title${light ? ' section-title-light' : ''}`}>
      <span className="eyebrow"><span />{eyebrow}</span>
      <h2>{title}</h2>
      {copy && <p>{copy}</p>}
    </div>
  )
}

function ChipList({ items }) {
  return <div className="chip-list">{items.map(item => <span className="chip" key={item}>{item}</span>)}</div>
}

const roleIcons = [<LayoutDashboard size={16} />, <CalendarClock size={16} />, <DraftingCompass size={16} />, <Ruler size={16} />]

function gearPath(teeth, outer, inner) {
  const points = []
  const step = (Math.PI * 2) / teeth
  for (let i = 0; i < teeth; i += 1) {
    const a = i * step
    ;[[-0.32, inner], [-0.2, outer], [0.2, outer], [0.32, inner]].forEach(([o, r]) => {
      points.push(`${(50 + r * Math.cos(a + o * step * 2)).toFixed(2)},${(50 + r * Math.sin(a + o * step * 2)).toFixed(2)}`)
    })
  }
  return `M${points.join('L')}Z`
}

const gearLayout = [
  { cls: 'bg-gear-a', teeth: 14, dir: 1, speed: 0.12 },
  { cls: 'bg-gear-b', teeth: 10, dir: -1, speed: 0.17 },
  { cls: 'bg-gear-c', teeth: 18, dir: -1, speed: 0.09 },
  { cls: 'bg-gear-d', teeth: 12, dir: 1, speed: 0.14 },
  { cls: 'bg-gear-e', teeth: 16, dir: 1, speed: 0.11 },
  { cls: 'bg-gear-f', teeth: 11, dir: -1, speed: 0.16 },
  { cls: 'bg-gear-g', teeth: 20, dir: -1, speed: 0.08 },
  { cls: 'bg-gear-h', teeth: 9, dir: 1, speed: 0.2 },
  { cls: 'bg-gear-i', teeth: 13, dir: 1, speed: 0.13 },
]

function GearBackground() {
  return (
    <div className="gear-bg" aria-hidden="true">
      {gearLayout.map(({ cls, teeth, dir, speed }) => (
        <div className={`bg-gear ${cls}`} key={cls} data-dir={dir} data-speed={speed}>
          <svg viewBox="0 0 100 100" focusable="false">
            <path d={gearPath(teeth, 48, 40)} />
            <circle cx="50" cy="50" r="12" />
            <circle cx="50" cy="50" r="28" className="bg-gear-ring" />
          </svg>
        </div>
      ))}
    </div>
  )
}
function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showTop, setShowTop] = useState(false)
  const [theme, setTheme] = useState(() => document.documentElement.dataset.theme || 'light')

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try { localStorage.setItem('theme', next) } catch { /* armazenamento indisponível */ }
    setTheme(next)
  }
  const [selectedExperience, setSelectedExperience] = useState(0)
  const activeExperience = experiences[selectedExperience]
  const activeResponsibilities = activeExperience.groups
    ? activeExperience.groups.flatMap(group => group.items).slice(0, 2)
    : activeExperience.items.slice(0, 2)

  useEffect(() => {
    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? (window.scrollY / max) * 100 : 0)
      setShowTop(window.scrollY > 560)
    }
    const gears = [...document.querySelectorAll('.bg-gear')]
    let frame = 0
    const spinGears = () => {
      frame = 0
      gears.forEach(gear => {
        gear.style.setProperty('--spin', `${window.scrollY * Number(gear.dataset.speed) * Number(gear.dataset.dir)}deg`)
      })
    }
    const onScroll = () => {
      updateScroll()
      if (!frame) frame = requestAnimationFrame(spinGears)
    }
    updateScroll()
    spinGears()
    window.addEventListener('scroll', onScroll, { passive: true })

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element))

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(frame)
      observer.disconnect()
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
      <GearBackground />
      <div className="reading-progress" style={{ transform: `scaleX(${progress / 100})` }} />
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="João Paulo Macedo — início" onClick={closeMenu}>
          <span className="brand-mark">JP<span>.</span></span>
          <span className="brand-copy">JOÃO PAULO<span>ENGENHARIA & GESTÃO</span></span>
        </a>
        <button className="menu-toggle" aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
        <nav className={`nav-menu${menuOpen ? ' nav-open' : ''}`} aria-label="Navegação principal">
          {sections.map(([id, label]) => <a key={id} href={`#${id}`} onClick={closeMenu}>{label}</a>)}
          <a className="nav-resume" href={resumeUrl} download="Curriculo-Executivo-Joao-Paulo-Macedo.pdf" onClick={closeMenu}><ArrowDownToLine size={15} /> Currículo PDF</a>
        </nav>
        <button className="theme-toggle" type="button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'} title={theme === 'dark' ? 'Modo claro' : 'Modo escuro'}>
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </header>

      <main>
        <section className="hero" id="inicio">
          <div className="hero-grain" aria-hidden="true" />
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="availability"><span /> TRAJETÓRIA PROFISSIONAL · MINERAÇÃO</div>
              <h1>João Paulo<br /><span>Augusto Macedo</span></h1>
              <p className="hero-role">Engenharia de Manutenção <i /> Confiabilidade <i /> Gestão de Ativos <i /> PCM</p>
              <p className="hero-intro">Mais de 20 anos de experiência industrial, conectando projetos, manutenção e confiabilidade para apoiar a evolução das operações.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#experiencia">Ver trajetória profissional <ArrowRight size={17} /></a>
                <a className="button button-outline" href={resumeUrl} target="_blank" rel="noreferrer">Currículo executivo <ArrowDownToLine size={17} /></a>
              </div>
              <div className="hero-location"><MapPin size={15} />{profile.location}</div>
            </div>
            <div className="hero-visual" aria-label="Linha do tempo da experiência profissional e espaço reservado para fotografia profissional">
              <div className="career-board">
                <div className="career-board-head">
                  <div><span className="board-kicker">PERCURSO</span><h2>Experiência<br />em movimento.</h2></div>
                  <div className="portrait-frame">
                  <div className="portrait-grid" />
                  <span className="portrait-corner corner-tl" /><span className="portrait-corner corner-br" />
                  <div className="portrait-monogram">JP<span>.</span></div>
                  <div className="portrait-caption">FOTO<br />PROFISSIONAL</div>
                  </div>
                </div>
                <p className="career-route-hint">SELECIONE UM CARGO PARA VER A ATUAÇÃO</p>
                <div className="career-route">
                  {experiences.map((experience, index) => (
                    <div className="route-entry" key={`${experience.company}-${experience.role}`}>
                      <span className="route-gear" aria-hidden="true"><Cog size={19} /></span>
                      <button
                        className={`route-stop${selectedExperience === index ? ' route-stop-current' : ''}`}
                        type="button"
                        aria-pressed={selectedExperience === index}
                        aria-label={`Ver experiência: ${experience.role}, ${experience.period}`}
                        onClick={() => setSelectedExperience(index)}
                      >
                        <span className="role-icon" aria-hidden="true">{roleIcons[index]}</span>
                        <span className="route-period">{experience.period}</span>
                        <b>{experience.role}</b>
                        <small>{experience.company}</small>
                      </button>
                    </div>
                  ))}
                </div>
                <div className="career-detail" aria-live="polite">
                  <span className="career-detail-label">ATUAÇÃO NESTE PERÍODO</span>
                  <h3>{activeExperience.role}</h3>
                  <p>{activeExperience.intro}</p>
                  <ul>{activeResponsibilities.map(item => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>
            </div>
          </div>
          <div className="hero-credentials" aria-label="Resumo da experiência profissional"><span><b>20+</b> anos de experiência industrial</span><span><b>10+</b> anos no setor de mineração</span></div>
          <a href="#perfil" className="scroll-hint" aria-label="Rolar para o perfil"><span>EXPLORE O CURRÍCULO</span><ArrowDown size={16} /></a>
        </section>

        <section className="section section-profile" id="perfil">
          <div className="container profile-layout">
            <div className="profile-aside reveal">
              <SectionTitle eyebrow="01 / PERFIL" title={<>Engenharia com<br /><em>visão de negócio.</em></>} />
              <div className="profile-aside-note"><span className="note-line" />PCM · CONFIABILIDADE · ATIVOS</div>
            </div>
            <div className="profile-body reveal">
              <p className="profile-lead">Experiência consolidada entre a engenharia, a operação e a gestão de pessoas — com atuação em projetos industriais e manutenção no setor de mineração.</p>
              <p>{profileText}</p>
              <div className="profile-facts">
                <div><span>20+</span><small>anos de experiência industrial</small></div>
                <div><span>10+</span><small>anos no setor de mineração</small></div>
                <div><span>4</span><small>áreas de atuação integradas</small></div>
              </div>
              <div className="profile-area-label">ATUAÇÃO</div>
              <ChipList items={['Projetos Industriais', 'PCM', 'Engenharia de Manutenção', 'Confiabilidade', 'Gestão de Ativos', 'Business Intelligence']} />
            </div>
          </div>
        </section>

        <section className="section section-dark" id="destaques">
          <div className="container">
            <SectionTitle eyebrow="02 / RESULTADOS E PROJETOS" title={<>Escala que exige<br /><em>confiabilidade.</em></>} copy="Marcos e iniciativas descritos na trajetória profissional, em seu contexto operacional." light />
            <div className="metrics-grid">
              {highlights.map((item, index) => <article className="metric-card reveal" key={item.label} style={{ '--delay': `${index * 70}ms` }}>
                <span className="metric-index">0{index + 1}</span><div className="metric-value">{item.value}</div><h3>{item.label}</h3><p>{item.detail}</p><div className="metric-rule" />
              </article>)}
            </div>
            <div className="projects-heading reveal"><span className="eyebrow"><span />INICIATIVAS</span><p>Frentes de atuação que conectam processos, dados e equipes.</p></div>
            <div className="projects-grid">
              {projects.map((project, index) => <article className="project-card reveal" key={project.number} style={{ '--delay': `${index * 80}ms` }}>
                <div className="project-top"><span>{project.number}</span><ArrowRight size={17} /></div><h3>{project.title}</h3><p>{project.text}</p><ChipList items={project.tags} />
              </article>)}
            </div>
            <p className="context-note"><ShieldCheck size={14} /> Valores aproximados e resultados apresentados conforme o contexto descrito no currículo master.</p>
          </div>
        </section>

        <section className="section section-experience" id="experiencia">
          <div className="container">
            <SectionTitle eyebrow="03 / TRAJETÓRIA PROFISSIONAL" title={<>Experiência que<br /><em>constrói confiança.</em></>} copy="Atuação profissional em ordem cronológica, com responsabilidades documentadas." />
            <div className="timeline">
              {experiences.map((job, index) => <article className="timeline-item reveal" key={`${job.company}-${job.role}`}>
                <div className="timeline-marker" aria-hidden="true">{roleIcons[index]}</div>
                <div className="timeline-date">{job.period}</div>
                <div className="timeline-card">
                  <div className="timeline-heading"><div><h3>{job.role}</h3><p className="company-name">{job.company}</p></div>{job.current && <span className="current-badge"><span /> ATUAL</span>}</div>
                  <p className="job-intro">{job.intro}</p>
                  {job.groups ? <div className="job-groups">{job.groups.map(group => <div className="job-group" key={group.title}><h4>{group.title}</h4><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul></div>)}</div> : <ul className="responsibility-list">{job.items.map(item => <li key={item}>{item}</li>)}</ul>}
                </div>
                {index < experiences.length - 1 && <div className="timeline-connector" />}
              </article>)}
            </div>
          </div>
        </section>

        <section className="section section-assets" id="ativos">
          <div className="container assets-layout">
            <div className="assets-intro reveal"><SectionTitle eyebrow="04 / GESTÃO DE ATIVOS" title={<>Conhecer o ativo.<br /><em>Entender o processo.</em></>} copy="Gestão e controle de ativos industriais distribuídos em plantas operacionais, abrangendo diferentes etapas da concentração mineral." /><div className="asset-count"><Layers3 size={19} /><span><b>189</b><small>ativos industriais<br />em 8 plantas operacionais</small></span></div></div>
            <div className="asset-lists">{assetGroups.map((group, index) => <article className="asset-panel reveal" key={group.name}><div className="asset-panel-head"><span>0{index + 1}</span><h3>{group.name}</h3></div><div className="asset-items">{group.items.map(item => <span key={item}><Check size={14} />{item}</span>)}</div></article>)}</div>
          </div>
        </section>

        <section className="section section-engineering" id="engenharia">
          <div className="container">
            <SectionTitle eyebrow="05 / ENGENHARIA & TRANSFORMAÇÃO" title={<>Confiabilidade aplicada<br /><em>à tomada de decisão.</em></>} copy="Atividades e conhecimentos técnicos documentados em Engenharia de Manutenção, análise de falhas, Business Intelligence e transformação digital." />
            <div className="engineering-grid">
              <article className="engineering-card reveal"><div className="engineering-icon"><Wrench size={20} /></div><h3>Engenharia de manutenção e análise de falhas</h3><p>Condução e participação em análises técnicas, pareceres e peritagens envolvendo ativos industriais críticos.</p><ul><li>Análise de históricos, evidências de campo e condições operacionais.</li><li>Investigação de modos e mecanismos de falha.</li><li>Avaliação de alternativas para recuperação ou substituição de componentes e equipamentos.</li><li>Relatórios e pareceres técnicos para suporte a decisões, fornecedores e mitigação de riscos operacionais.</li></ul></article>
              <article className="engineering-card reveal"><div className="engineering-icon"><BarChart3 size={20} /></div><h3>Indicadores e Business Intelligence</h3><p>Desenvolvimento e gestão de soluções de BI aplicadas à Manutenção, com 82 páginas de dashboards e controles gerenciais.</p><div className="bi-coverage"><span>Manutenção</span><span>Custos</span><span>Gestão de pessoas</span><span>Inspeção</span><span>Planejamento</span><span>Serviços</span><span>Programação</span></div><p className="card-footnote">Indicadores: MTBF, MTTR, Disponibilidade Física (DF) e Disponibilidade Física Inerente (DFI).</p></article>
              <article className="engineering-card reveal"><div className="engineering-icon"><Cpu size={20} /></div><h3>Transformação digital e conhecimento</h3><p>Iniciativas digitais voltadas à padronização, capacitação e gestão do conhecimento na Manutenção Mecânica.</p><ul><li>Mais de 90 vídeos, apresentações e conteúdos técnicos.</li><li>Procedimentos técnicos padronizados em biblioteca de consulta e capacitação.</li><li>Uso de Inteligência Artificial em procedimentos, materiais técnicos, treinamentos e análises.</li></ul></article>
              <article className="engineering-card reveal"><div className="engineering-icon"><Sparkles size={20} /></div><h3>Planejamento e gestão orçamentária</h3><p>Elaboração, planejamento e acompanhamento do orçamento da Manutenção Mecânica, com gestão aproximada de R$ 1,4 milhão/mês em OPEX.</p><ul><li>Acompanhamento de custos e análise de desvios orçamentários.</li><li>Interface com Controladoria e áreas responsáveis pela gestão financeira.</li><li>O custo de mão de obra direta dos colaboradores próprios da LGA é gerenciado em estrutura contábil separada e não integra diretamente o centro de custo acompanhado.</li></ul></article>
            </div>
            <div className="methodology reveal"><div className="methodology-title"><span className="eyebrow"><span />MÉTODOS & COMPETÊNCIAS</span><p>Abordagens e práticas descritas no currículo.</p></div><div className="methods-grid">{methods.map(group => <div className="method-group" key={group.title}><h3>{group.title}</h3><ChipList items={group.items} /></div>)}</div></div>
          </div>
        </section>

        <section className="section section-career" id="formacao">
          <div className="container career-layout">
            <div className="career-column reveal"><SectionTitle eyebrow="06 / FORMAÇÃO ACADÊMICA" title={<>Aprendizado em<br /><em>constante evolução.</em></>} /><div className="education-list">{education.map((item, index) => <article className="education-item" key={item.name}><div className="education-icon"><GraduationCap size={18} /></div><div><h3>{item.name}</h3>{item.institution && <p>{item.institution}</p>}</div><span className="education-status">{item.status || 'Formação técnica'}</span></article>)}</div></div>
            <div className="tools-column reveal"><SectionTitle eyebrow="07 / FERRAMENTAS & TECNOLOGIAS" title={<>Recursos para<br /><em>transformar a rotina.</em></>} /><div className="tools-list">{tools.map((group, index) => <div className="tool-group" key={group.group}><div className="tool-group-icon">{index === 0 ? <BriefcaseBusiness size={17} /> : index === 1 ? <BarChart3 size={17} /> : index === 2 ? <Wrench size={17} /> : <Cpu size={17} />}</div><div><h3>{group.group}</h3><ChipList items={group.items} /></div></div>)}</div><div className="languages"><span className="eyebrow"><span />IDIOMAS</span><div className="language-row"><b>Inglês</b><span>Básico</span></div><div className="language-row"><b>Espanhol</b><span>Básico</span></div></div></div>
          </div>
        </section>

        <section className="contact-section" id="contato">
          <div className="contact-pattern" aria-hidden="true" />
          <div className="container contact-layout"><div className="contact-copy reveal"><SectionTitle eyebrow="08 / CONTATO" title={<>Vamos conversar<br /><em>sobre manutenção.</em></>} copy="Entre em contato pelos canais profissionais." light /><a href={`mailto:${profile.email}`} className="button button-primary contact-cta">Enviar e-mail <ArrowRight size={17} /></a></div><div className="contact-details reveal"><a href={`tel:${profile.phoneLink}`} className="contact-row"><span className="contact-icon"><Phone size={18} /></span><span><small>TELEFONE</small><b>{profile.phone}</b></span><ArrowRight size={17} /></a><a href={`mailto:${profile.email}`} className="contact-row"><span className="contact-icon"><Mail size={18} /></span><span><small>E-MAIL</small><b>{profile.email}</b></span><ArrowRight size={17} /></a><a href={profile.linkedin} className="contact-row" target="_blank" rel="noreferrer"><span className="contact-icon"><Linkedin size={18} /></span><span><small>LINKEDIN</small><b>Perfil profissional</b></span><ArrowRight size={17} /></a><div className="contact-row contact-place"><span className="contact-icon"><MapPin size={18} /></span><span><small>LOCALIZAÇÃO</small><b>{profile.location}</b></span></div></div></div>
        </section>
      </main>

      <footer className="site-footer"><div className="container footer-inner"><a className="brand footer-brand" href="#inicio"><span className="brand-mark">JP<span>.</span></span><span className="brand-copy">JOÃO PAULO<span>ENGENHARIA & GESTÃO</span></span></a><p>Currículo profissional · {profile.name}</p><a className="footer-top" href="#inicio">VOLTAR AO INÍCIO <ArrowUp size={14} /></a></div></footer>
      <a className={`back-to-top${showTop ? ' back-to-top-visible' : ''}`} href="#inicio" aria-label="Voltar ao topo"><ArrowUp size={18} /></a>
    </>
  )
}

export default App
