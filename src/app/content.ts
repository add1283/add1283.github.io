export type Lang = 'tr' | 'en';

export interface Project {
  slug: string;
  name: string;
  domain: string;
  url: string;
  kind: Record<Lang, string>;
  summary: Record<Lang, string>;
  stack: string[];
}

export interface Role {
  title: string;
  org: string;
  years: string;
  points: string[];
}

export interface Credential {
  title: Record<Lang, string>;
  issuer: string;
  date: string;
  url?: string;
}

export interface PathRow {
  years: string;
  what: string;
  where: string;
  /** Which side of the two disciplines a step belongs to. */
  kind: 'mind' | 'both' | 'code';
  url?: string;
}

export interface Copy {
  meta: { title: string; description: string; locale: string };
  nav: { work: string; systems: string; about: string; contact: string; skip: string; menu: string };
  toggles: { view3d: string; viewPlain: string; theme: string; lang: string; langLabel: string };
  hero: {
    kicker: string;
    mind: string;
    code: string;
    tagline: string;
    grad: string;
    role: string;
    lead: string;
    now: string;
    credential: string;
    verify: string;
    primary: string;
    secondary: string;
    scroll: string;
  };
  work: {
    label: string;
    title: string;
    intro: string;
    open: string;
    groups: { title: string; mind: string; slugs: string[] }[];
    next: string;
    nextLink: string;
  };
  systems: {
    label: string;
    title: string;
    columns: { head: string; items: string[] }[];
    foundation: string;
    foundationNote: string;
  };
  about: {
    label: string;
    title: string;
    spec: [string, string][];
    pathTitle: string;
    path: PathRow[];
    method: [string, string];
    paragraphs: string[];
    quote: string;
    quoteBy: string;
    experienceTitle: string;
    experience: Role[];
    educationTitle: string;
    education: Role[];
    toolsTitle: string;
    tools: { group: string; items: string[] }[];
    credentialsTitle: string;
    verify: string;
    languagesTitle: string;
    languages: { name: string; level: string }[];
    cv: string;
  };
  contact: {
    title: string;
    lead: string;
    emailLabel: string;
    formTitle: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    send: string;
    sending: string;
    sent: string;
    failed: string;
    missing: string;
    notConfigured: string;
    elsewhere: string;
  };
  footer: { made: string; top: string };
}

export const EMAIL = 'contact@ahmetdenizdundar.com.tr';
export const SITE = 'https://ahmetdenizdundar.com.tr';

export const SOCIAL = [
  { label: 'GitHub', url: 'https://github.com/add1283' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/ahmetdenizdundar' },
  { label: 'X', url: 'https://x.com/add1283' },
  { label: 'Threads', url: 'https://www.threads.net/@add.1283' },
];

export const PROJECTS: Project[] = [
  {
    slug: '12punto',
    name: '12 Punto',
    domain: '12punto.com.tr',
    url: 'https://12punto.com.tr',
    kind: { tr: 'Haber platformu', en: 'News platform' },
    summary: {
      tr: 'Bağımsız bir haber sitesi. Mobil öncelikli akışları kurdum; sayfa hızı ve haberlerin arama motorlarında hızlı indekslenmesi üzerinde çalıştım.',
      en: 'An independent news site. I built the mobile-first feeds and worked on page speed and on getting new stories indexed quickly.',
    },
    stack: ['ASP.NET Core', 'C#', 'Tailwind CSS', 'SEO'],
  },
  {
    slug: 'heroty',
    name: 'Heroty',
    domain: 'heroty.com',
    url: 'https://heroty.com',
    kind: { tr: 'İK yazılımı', en: 'HR software' },
    summary: {
      tr: 'Bordro, izin ve vardiya yönetimi sunan bir İK ürününün tanıtım sitesi. Arayüzü kodladım, GSAP ile ürün anlatımına hareket ekledim.',
      en: 'Marketing site for an HR product covering payroll, leave and scheduling. I coded the interface and used GSAP to walk visitors through the product.',
    },
    stack: ['HTML', 'Tailwind CSS', 'JavaScript', 'GSAP', 'SEO'],
  },
  {
    slug: 'add',
    name: 'Atatürkçü Düşünce Derneği',
    domain: 'add.org.tr',
    url: 'https://add.org.tr',
    kind: { tr: 'Dernek portalı', en: 'Association portal' },
    summary: {
      tr: 'Derneğin resmi portalı. Haber ve arşiv içerikleri için özel içerik akışları kurdum, yapıyı aramada görünür olacak şekilde düzenledim.',
      en: 'The association’s official portal. I set up custom content flows for news and archives and structured the site to be found in search.',
    },
    stack: ['WordPress', 'PHP', 'JavaScript', 'SEO'],
  },
  {
    slug: 'disnet',
    name: 'Disnet',
    domain: 'disnet.com.tr',
    url: 'https://disnet.com.tr/en',
    kind: { tr: 'Kurumsal teknoloji', en: 'Enterprise technology' },
    summary: {
      tr: 'BMC Software’ın Türkiye ve Doğu Avrupa distribütörünün kurumsal sitesi. ITSM ve bulut otomasyonu çözümlerini anlatan sayfaları geliştirdim.',
      en: 'Corporate site for BMC Software’s distributor in Türkiye and Eastern Europe. I built the pages presenting its ITSM and cloud automation offering.',
    },
    stack: ['HTML', 'CSS', 'JavaScript', 'PHP', 'SEO'],
  },
  {
    slug: 'avrupadan',
    name: 'Avrupadan',
    domain: 'avrupadan.com',
    url: 'https://avrupadan.com',
    kind: { tr: 'Topluluk haber sitesi', en: 'Community news site' },
    summary: {
      tr: 'Avrupa’daki Türk topluluğu için haber ve rehber sitesi. Mobil uyumu ve farklı Avrupa ülkelerindeki arama görünürlüğünü önceliklendirdim.',
      en: 'News and guide site for the Turkish community in Europe. I prioritised mobile layouts and search visibility across European markets.',
    },
    stack: ['PHP', 'MySQL', 'Bootstrap 5', 'JavaScript', 'SEO'],
  },
  {
    slug: 'kpay',
    name: 'Kpay',
    domain: 'kpay.com.tr',
    url: 'https://kpay.com.tr',
    kind: { tr: 'Ödeme sistemleri', en: 'Payments' },
    summary: {
      tr: 'POS, SoftPOS ve sanal POS çözümleri sunan bir ödeme kuruluşunun sitesi. Ürünleri işletmelere net anlatan arayüzü hazırladım.',
      en: 'Site for a payments company offering POS, SoftPOS and virtual POS. I built an interface that explains each product plainly to merchants.',
    },
    stack: ['C# / .NET', 'Bootstrap 5', 'jQuery', 'SEO'],
  },
  {
    slug: 'vbt',
    name: 'VBT Yazılım',
    domain: 'vbt.com.tr',
    url: 'https://vbt.com.tr/en',
    kind: { tr: 'Kurumsal site', en: 'Corporate site' },
    summary: {
      tr: 'Çalıştığım şirketin kurumsal sitesi. UI ekibinin bir parçası olarak çözüm sayfalarını ve yatırımcı içeriklerini geliştirdim.',
      en: 'Corporate site of the company I work for. As part of the UI team I built the solution pages and investor content.',
    },
    stack: ['ASP.NET MVC', 'TypeScript', 'Bootstrap', 'SEO'],
  },
  {
    slug: 'serberker',
    name: 'Ser&Berker',
    domain: 'serberker.com',
    url: 'https://serberker.com',
    kind: { tr: 'Bağımsız denetim', en: 'Independent audit' },
    summary: {
      tr: 'DFK International üyesi bir bağımsız denetim şirketinin sitesi. Hizmet ve mevzuat içeriklerini düzenli ve bulunabilir hale getirdim.',
      en: 'Site for an independent audit firm in the DFK International network. I organised its services and regulatory content so people can find them.',
    },
    stack: ['WordPress', 'PHP', 'JavaScript', 'SEO'],
  },
  {
    slug: 'flerpi',
    name: 'Flerpi',
    domain: 'flerpi.com',
    url: 'https://flerpi.com/en',
    kind: { tr: 'ERP yazılımı', en: 'ERP software' },
    summary: {
      tr: 'Büyüyen şirketler için modüler bir ERP ürününün sitesi. Modülleri tek tek tanıtan, esnek bir sayfa yapısı kurdum.',
      en: 'Site for a modular ERP product aimed at growing companies. I built a flexible page system that introduces each module on its own.',
    },
    stack: ['C# / .NET', 'Bootstrap 5', 'REST API', 'SEO'],
  },
];

/** From the LinkedIn profile; newest first. Event attendance certificates are left out. */
export const CREDENTIALS: Credential[] = [
  {
    title: { tr: 'Veri Analizi Okulu: Yapay Zekâ ve Makine Öğrenmesi', en: 'Data Analysis School: Artificial Intelligence and Machine Learning' },
    issuer: 'Yükseköğretim Kurulu (YÖK)',
    date: '2026-06',
    url: 'https://belge.verianaliziokulu.com/e1f35b42-ae82-487a-a271-90dbd0bba565',
  },
  {
    title: { tr: 'Empower Me Gençlik Zirvesi: Döngüsel Ekonomi Eğitmen Eğitimi', en: 'Empower Me Youth Summit: Circular Economy Trainer Programme' },
    issuer: 'Habitat Derneği',
    date: '2026-01',
    url: 'https://verified.sertifier.com/en/verify/08098888944153/',
  },
  {
    title: { tr: 'Fikri ve Sınai Mülkiyet Hakları', en: 'Intellectual and Industrial Property Rights' },
    issuer: 'Kobimen Akademi',
    date: '2024-09',
  },
  {
    title: { tr: 'Dijital Pazarlama', en: 'Digital Marketing' },
    issuer: 'Boğaziçi Üniversitesi İşletme ve Ekonomi Kulübü',
    date: '2021-01',
  },
];

export const COPY: Record<Lang, Copy> = {
  tr: {
    meta: {
      title: 'Ahmet Deniz Dündar | Frontend Geliştirici ve SEO Uzmanı',
      description:
        'İstanbul’da frontend geliştirici ve SEO uzmanı. Haber, SaaS ve kurumsal alanda yayında olan dokuz siteyi tasarladım, kodladım ve arama için optimize ettim.',
      locale: 'tr_TR',
    },
    nav: { work: 'İşler', systems: 'Yetkinlikler', about: 'Hakkımda', contact: 'İletişim', skip: 'İçeriğe geç', menu: 'Menü' },
    toggles: { view3d: '3D görünüm', viewPlain: 'Sade görünüm', theme: 'Temayı değiştir', lang: 'EN', langLabel: 'Switch to English' },
    hero: {
      kicker: 'zihin × kod',
      mind: 'Psikoloji',
      code: 'Yazılım',
      tagline: 'Arayüzün ötesinde.',
      grad: 'Psikoloji mezunu.',
      role: 'Frontend geliştirici ve SEO uzmanı',
      lead: 'Psikoloji okudum, sonra kod yazmaya başladım. Arayüzleri insanların bir sayfayı nasıl okuduğuna göre kuruyor, aynı sayfayı arama motorları için de hazırlıyorum.',
      now: 'Şu an İstanbul’da, VBT Yazılım’ın UI ekibindeyim.',
      credential: 'YÖK Veri Analizi Okulu’ndan Yapay Zekâ ve Makine Öğrenmesi sertifikası',
      verify: 'Belgeyi doğrula',
      primary: 'İşleri gör',
      secondary: 'E-posta gönder',
      scroll: 'Kaydırdıkça karolar dönüp işlerimi gösterecek',
    },
    work: {
      label: 'işler / yayındaki dokuz site',
      title: 'Yayındaki dokuz site',
      intro: 'Haber platformları, SaaS tanıtım siteleri ve kurumsal portallar. Hepsi canlı ve hepsinde arayüz ile SEO tarafında çalıştım.',
      open: 'Siteyi aç',
      groups: [
        { title: 'Haber ve editoryal', mind: 'Saniyeler içinde okunur: incelenmez, taranır.', slugs: ['add', '12punto', 'avrupadan'] },
        { title: 'Ürünler ve platformlar', mind: 'Önce tek bir vaat, sonra bir sonraki adım.', slugs: ['heroty', 'kpay', 'flerpi'] },
        { title: 'Kurumsal', mind: 'Sakin, güvenilir ve net.', slugs: ['vbt', 'disnet', 'serberker'] },
      ],
      next: 'Benzer bir iş için konuşalım.',
      nextLink: 'İletişime geç',
    },
    systems: {
      label: 'yetkinlikler / işin nasıl bağlandığı',
      title: 'Dört disiplin, tek temel',
      columns: [
        { head: 'Mühendislik', items: ['C# / .NET', 'ASP.NET MVC / Core', 'SQL', 'PHP / WordPress', 'Git / GitHub'] },
        { head: 'Arayüz', items: ['TypeScript / Angular', 'HTML / SCSS', 'Tailwind / Bootstrap', 'GSAP / Three.js', 'Responsive, erişilebilir arayüz'] },
        { head: 'Görünürlük', items: ['Teknik SEO', 'Core Web Vitals', 'Yapılandırılmış veri', 'Search Console / GA4', 'SEM / Google Ads', 'İçerik mimarisi'] },
        { head: 'Yapay zekâ', items: ['Yapay zekâ ve makine öğrenmesi', 'Veri analizi', 'Prompt mühendisliği', 'Claude / GPT API’leri', 'Cursor / Copilot', 'Otomasyon'] },
      ],
      foundation: 'İnsan: algı, dikkat, davranış.',
      foundationNote: 'Hiyerarşi, okunabilirlik ve hız; insanların bir sayfayı gerçekten nasıl okuduğuna göre.',
    },
    about: {
      label: 'hakkımda / fig. 1',
      title: 'Hakkımda',
      spec: [
        ['Konum', 'İstanbul, Türkiye'],
        ['Rol', 'UI ekibi, VBT Yazılım'],
        ['Başlangıç', '2021'],
        ['Öğrenim', 'Psikoloji, Bilgisayar Programcılığı'],
      ],
      pathTitle: 'Yol: ikisinin buluştuğu yer',
      path: [
        { years: '2018–2022', what: 'Psikoloji, lisans', where: 'Çukurova Üniversitesi, Adana', kind: 'mind' },
        { years: '2019–2021', what: 'Web kurulu üyesi, 1907 ÜNİFEB', where: 'Sosyal medya, grafik ve hareketli tasarım, kampanyalar', kind: 'both' },
        { years: '2021', what: 'Dijital Pazarlama', where: 'Boğaziçi Üniversitesi İşletme ve Ekonomi Kulübü', kind: 'both' },
        { years: '2021–', what: 'Web tasarımcı ve frontend geliştirici', where: 'VBT Yazılım, UI ekibi: arayüz, sayfa hızı, SEO', kind: 'code' },
        { years: '2022–2024', what: 'Bilgisayar Programcılığı, önlisans', where: 'Anadolu Üniversitesi', kind: 'code' },
        { years: '2024', what: 'Fikri ve Sınai Mülkiyet Hakları', where: 'Kobimen Akademi', kind: 'both' },
        { years: '2026', what: 'Döngüsel Ekonomi Eğitmen Eğitimi', where: 'Habitat Derneği', kind: 'both', url: 'https://verified.sertifier.com/en/verify/08098888944153/' },
        { years: '2026', what: 'Yapay Zekâ ve Makine Öğrenmesi', where: 'Veri Analizi Okulu, YÖK', kind: 'code', url: 'https://belge.verianaliziokulu.com/e1f35b42-ae82-487a-a271-90dbd0bba565' },
      ],
      method: ['Problemi anla.', 'Doğru çözümü kur.'],
      paragraphs: [
        '2000’de Adana’da doğdum. Çukurova Üniversitesi’nde psikoloji okurken üniversite kulübünün web ve tasarım işlerini üstlendim; kodla tanışmam orada oldu.',
        'Bugün işim, insanların gerçekten okuduğu ve arama motorlarının doğru anladığı sayfalar yapmak. Algı ve dikkat üzerine öğrendiklerim hiyerarşi, okunabilirlik ve hız kararlarımın arkasında duruyor.',
        'İşin dışında spor, tarih, siyaset, siber güvenlik ve müzikle ilgileniyorum.',
      ],
      quote: 'Hiçbir şeye ihtiyacımız yok, yalnız bir şeye ihtiyacımız vardır: Çalışkan olmak.',
      quoteBy: 'Mustafa Kemal Atatürk',
      experienceTitle: 'Deneyim',
      experience: [
        {
          title: 'Web tasarımcı ve frontend geliştirici',
          org: 'VBT Yazılım, İstanbul',
          years: '2021, devam ediyor',
          points: [
            'UI ekibinde kurumsal ve ürün sitelerinin arayüzlerini geliştiriyorum.',
            'Tasarım ekibinin hazırladığı ekranları responsive arayüzlere dönüştürüyorum.',
            'Sayfa hızı ve teknik SEO iyileştirmelerini yürütüyorum.',
          ],
        },
        {
          title: 'Web kurulu üyesi',
          org: '1907 ÜNİFEB, Çukurova Üniversitesi',
          years: '2019 – 2021',
          points: [
            'Kulübün sosyal medyasını, grafik ve hareketli tasarım işlerini yönettim.',
            'Dijital kampanyalar ve marka çalışmaları yürüttüm.',
          ],
        },
      ],
      educationTitle: 'Eğitim',
      education: [
        { title: 'Bilgisayar Programcılığı (Önlisans)', org: 'Anadolu Üniversitesi', years: '2022 – 2024', points: [] },
        { title: 'Psikoloji (Lisans)', org: 'Çukurova Üniversitesi', years: '2018 – 2022', points: [] },
      ],
      toolsTitle: 'Kullandıklarım',
      tools: [
        { group: 'Her gün', items: ['HTML', 'CSS / SCSS', 'JavaScript', 'TypeScript', 'Angular', 'Tailwind CSS'] },
        { group: 'Projelerde', items: ['WordPress', 'PHP', 'ASP.NET', 'Bootstrap', 'GSAP', 'Three.js'] },
        { group: 'Arama', items: ['Teknik SEO', 'Sayfa hızı', 'Yapılandırılmış veri', 'İçerik mimarisi'] },
        { group: 'Yapay zekâ ve veri', items: ['Cursor', 'GitHub Copilot', 'Prompt ve otomasyon', 'Veri analizi', 'Makine öğrenmesi temelleri'] },
      ],
      credentialsTitle: 'Sertifikalar',
      verify: 'Belgeyi doğrula',
      languagesTitle: 'Diller',
      languages: [
        { name: 'Türkçe', level: 'Ana dil' },
        { name: 'İngilizce', level: 'Profesyonel çalışma düzeyi' },
      ],
      cv: 'Özgeçmişi indir',
    },
    contact: {
      title: 'Bir proje mi var?',
      lead: 'Yeni bir site, bir hız ya da SEO sorunu veya sadece bir merhaba. En hızlı yol e-posta.',
      emailLabel: 'E-posta',
      formTitle: 'Ya da buradan yaz',
      name: 'Adın',
      email: 'E-posta adresin',
      subject: 'Konu',
      message: 'Mesajın',
      send: 'Mesajı gönder',
      sending: 'Gönderiliyor',
      sent: 'Mesajın gönderildi. En kısa sürede dönüş yapacağım.',
      failed: 'Mesaj gönderilemedi. Lütfen doğrudan e-posta ile yaz.',
      missing: 'İşaretli alanları doldur; e-posta adresinin geçerli olduğundan emin ol.',
      notConfigured: 'Form şu an kapalı. Lütfen doğrudan e-posta ile yaz.',
      elsewhere: 'Başka yerlerde',
    },
    footer: { made: 'İstanbul’da Angular ve Three.js ile yapıldı.', top: 'Başa dön' },
  },
  en: {
    meta: {
      title: 'Ahmet Deniz Dündar | Frontend Developer and SEO Specialist',
      description:
        'Frontend developer and SEO specialist in Istanbul. I designed, built and optimised nine live sites across news, SaaS and corporate work.',
      locale: 'en_US',
    },
    nav: { work: 'Work', systems: 'Skills', about: 'About', contact: 'Contact', skip: 'Skip to content', menu: 'Menu' },
    toggles: { view3d: '3D view', viewPlain: 'Plain view', theme: 'Change theme', lang: 'TR', langLabel: 'Türkçeye geç' },
    hero: {
      kicker: 'mind × code',
      mind: 'Psychology',
      code: 'Software',
      tagline: 'Beyond the interface.',
      grad: 'Psychology graduate.',
      role: 'Frontend developer and SEO specialist',
      lead: 'I studied psychology before I started writing code. I build interfaces around how people actually read a page, and build the same page for search engines too.',
      now: 'Currently in Istanbul, on the UI team at VBT Software.',
      credential: 'Certified in Artificial Intelligence and Machine Learning by YÖK’s Data Analysis School',
      verify: 'Verify',
      primary: 'See the work',
      secondary: 'Send an email',
      scroll: 'Scroll and the tiles turn to show my work',
    },
    work: {
      label: 'work / nine live sites',
      title: 'Nine sites, all live',
      intro: 'News platforms, SaaS marketing sites and corporate portals. Every one is live, and on every one I worked on the interface and on search.',
      open: 'Open site',
      groups: [
        { title: 'News and editorial', mind: 'Read in seconds: scanned, not studied.', slugs: ['add', '12punto', 'avrupadan'] },
        { title: 'Products and platforms', mind: 'One promise first, then the next step.', slugs: ['heroty', 'kpay', 'flerpi'] },
        { title: 'Corporate and enterprise', mind: 'Calm, credible and clear.', slugs: ['vbt', 'disnet', 'serberker'] },
      ],
      next: 'Planning something similar?',
      nextLink: 'Get in touch',
    },
    systems: {
      label: 'skills / how the work connects',
      title: 'Four disciplines, one foundation',
      columns: [
        { head: 'Engineering', items: ['C# / .NET', 'ASP.NET MVC / Core', 'SQL', 'PHP / WordPress', 'Git / GitHub'] },
        { head: 'Interface', items: ['TypeScript / Angular', 'HTML / SCSS', 'Tailwind / Bootstrap', 'GSAP / Three.js', 'Responsive, accessible UI'] },
        { head: 'Visibility', items: ['Technical SEO', 'Core Web Vitals', 'Structured data', 'Search Console / GA4', 'SEM / Google Ads', 'Content architecture'] },
        { head: 'Intelligence', items: ['AI and machine learning', 'Data analysis', 'Prompt engineering', 'Claude / GPT APIs', 'Cursor / Copilot', 'Automation'] },
      ],
      foundation: 'People: perception, attention, behaviour.',
      foundationNote: 'Hierarchy, legibility and speed, decided by how people actually read a page.',
    },
    about: {
      label: 'about / fig. 1',
      title: 'About',
      spec: [
        ['Based', 'Istanbul, Türkiye'],
        ['Role', 'UI team, VBT Software'],
        ['Since', '2021'],
        ['Studied', 'Psychology, Computer Programming'],
      ],
      pathTitle: 'Path: where the two meet',
      path: [
        { years: '2018–2022', what: 'Psychology, BSc', where: 'Çukurova University, Adana', kind: 'mind' },
        { years: '2019–2021', what: 'Web board member, 1907 ÜNİFEB', where: 'Social media, graphic and motion design, campaigns', kind: 'both' },
        { years: '2021', what: 'Digital Marketing', where: 'Boğaziçi University Business and Economics Club', kind: 'both' },
        { years: '2021–', what: 'Web designer and frontend developer', where: 'VBT Software, UI team: interfaces, page speed, SEO', kind: 'code' },
        { years: '2022–2024', what: 'Computer Programming, associate degree', where: 'Anadolu University', kind: 'code' },
        { years: '2024', what: 'Intellectual and Industrial Property Rights', where: 'Kobimen Akademi', kind: 'both' },
        { years: '2026', what: 'Circular Economy Trainer Programme', where: 'Habitat Association', kind: 'both', url: 'https://verified.sertifier.com/en/verify/08098888944153/' },
        { years: '2026', what: 'AI and Machine Learning', where: 'Data Analysis School, YÖK', kind: 'code', url: 'https://belge.verianaliziokulu.com/e1f35b42-ae82-487a-a271-90dbd0bba565' },
      ],
      method: ['Understand the problem.', 'Build the right solution.'],
      paragraphs: [
        'I was born in Adana in 2000. While studying psychology at Çukurova University I took over the web and design work for a student club, and that is where I met code.',
        'Today my job is building pages people actually read and search engines understand correctly. What I learned about perception and attention sits behind my decisions on hierarchy, legibility and speed.',
        'Outside work I follow sports, history, politics, cyber security and music.',
      ],
      quote: 'We need nothing but one thing: to be hardworking.',
      quoteBy: 'Mustafa Kemal Atatürk',
      experienceTitle: 'Experience',
      experience: [
        {
          title: 'Web designer and frontend developer',
          org: 'VBT Software, Istanbul',
          years: '2021 to now',
          points: [
            'I build interfaces for corporate and product sites on the UI team.',
            'I turn the design team’s screens into responsive interfaces.',
            'I lead page speed and technical SEO improvements.',
          ],
        },
        {
          title: 'Web board member',
          org: '1907 ÜNİFEB, Çukurova University',
          years: '2019 – 2021',
          points: [
            'Ran the club’s social media, graphic and motion design.',
            'Led digital campaigns and brand work.',
          ],
        },
      ],
      educationTitle: 'Education',
      education: [
        { title: 'Computer Programming (Associate)', org: 'Anadolu University', years: '2022 – 2024', points: [] },
        { title: 'Psychology (BSc)', org: 'Çukurova University', years: '2018 – 2022', points: [] },
      ],
      toolsTitle: 'What I use',
      tools: [
        { group: 'Every day', items: ['HTML', 'CSS / SCSS', 'JavaScript', 'TypeScript', 'Angular', 'Tailwind CSS'] },
        { group: 'On projects', items: ['WordPress', 'PHP', 'ASP.NET', 'Bootstrap', 'GSAP', 'Three.js'] },
        { group: 'Search', items: ['Technical SEO', 'Page speed', 'Structured data', 'Content architecture'] },
        { group: 'AI and data', items: ['Cursor', 'GitHub Copilot', 'Prompting and automation', 'Data analysis', 'Machine learning basics'] },
      ],
      credentialsTitle: 'Certificates',
      verify: 'Verify',
      languagesTitle: 'Languages',
      languages: [
        { name: 'Turkish', level: 'Native' },
        { name: 'English', level: 'Professional working proficiency' },
      ],
      cv: 'Download CV',
    },
    contact: {
      title: 'Have a project?',
      lead: 'A new site, a speed or SEO problem, or just hello. Email is the fastest way to reach me.',
      emailLabel: 'Email',
      formTitle: 'Or write here',
      name: 'Your name',
      email: 'Your email',
      subject: 'Subject',
      message: 'Your message',
      send: 'Send message',
      sending: 'Sending',
      sent: 'Message sent. I’ll get back to you soon.',
      failed: 'The message couldn’t be sent. Please email me directly.',
      missing: 'Fill in the highlighted fields and check that your email address is valid.',
      notConfigured: 'The form is off right now. Please email me directly.',
      elsewhere: 'Elsewhere',
    },
    footer: { made: 'Built in Istanbul with Angular and Three.js.', top: 'Back to top' },
  },
};
