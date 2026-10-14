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

export interface CivicItem {
  org: string;
  years: string;
  role: string;
  /** Which field the work belongs to: social responsibility, or literature and politics. */
  field: string;
  points: string[];
  photos?: { src: string; alt: string }[];
  link?: { label: string; url: string };
  /** A line in his own words, with where it was said. */
  quote?: { text: string; source: string };
}

export interface Copy {
  meta: { title: string; description: string; locale: string };
  /** Small drawing-sheet labels used across the page. */
  labels: { fig: string; sheet: string; cap: string; base: string; mind: string; code: string };
  nav: { work: string; systems: string; civic: string; about: string; contact: string; skip: string; menu: string };
  toggles: { theme: string; lang: string; langLabel: string };
  hero: {
    kicker: string;
    mind: string;
    code: string;
    tagline: string;
    grad: string;
    role: string;
    lead: string;
    now: string;
    /** Short, verifiable facts shown under the hero. */
    proof: string[];
    credential: string;
    verify: string;
    primary: string;
    secondary: string;
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
  civic: {
    label: string;
    title: string;
    intro: string;
    items: CivicItem[];
    writingTitle: string;
    writing: { title: string; where: string; date: string; url?: string }[];
    read: string;
    lightbox: { open: string; close: string; prev: string; next: string };
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
    quoteLabel: string;
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
        'İstanbul’da psikolog ve frontend geliştirici. .NET’ten Angular’a web uygulamaları geliştiriyor, haber, SaaS ve kurumsal alanda yayındaki dokuz çalışmanın arayüzünü ve SEO’sunu kurdum.',
      locale: 'tr_TR',
    },
    labels: { fig: 'şek.', sheet: 'işaret / pafta 01', cap: 'üst çizgi', base: 'taban', mind: 'zihin', code: 'kod' },
    nav: { work: 'İşler', systems: 'Yetkinlikler', civic: 'Ekran dışı', about: 'Hakkımda', contact: 'İletişim', skip: 'İçeriğe geç', menu: 'Menü' },
    toggles: { theme: 'Temayı değiştir', lang: 'EN', langLabel: 'Switch to English' },
    hero: {
      kicker: 'zihin × kod',
      mind: 'Psikoloji',
      code: 'Yazılım',
      tagline: 'Arayüzün ötesinde.',
      grad: 'Psikolog',
      role: 'frontend geliştirici',
      lead: 'Algı ve dikkat üzerine öğrendiklerimi koda çeviriyorum. .NET ve SQL’den Angular arayüzlerine kadar web uygulamalarını uçtan uca geliştiriyor; her sayfayı önce insan okusun, sonra arama motoru doğru anlasın diye kuruyorum.',
      now: '2021’den beri İstanbul’da, VBT Yazılım’ın UI ekibindeyim.',
      proof: ['9 canlı çalışma', 'VBT’de 5+ yıl', '2018’den beri yazar', 'YÖK yapay zekâ sertifikası'],
      credential: 'YÖK Veri Analizi Okulu’ndan Yapay Zekâ ve Makine Öğrenmesi sertifikası',
      verify: 'Belgeyi doğrula',
      primary: 'İşleri gör',
      secondary: 'E-posta gönder',
    },
    work: {
      label: 'işler / dokuz canlı çalışma',
      title: 'Dokuz çalışma, hepsi canlı.',
      intro: 'Haberden ödeme sistemlerine, ERP’den bağımsız denetime. Hepsinde aynı soruyu sordum: Bu sayfaya gelen kişi ilk üç saniyede neyi görmeli?',
      open: 'Siteyi aç',
      groups: [
        { title: 'Haber ve editoryal', mind: 'Saniyeler içinde okunur: incelenmez, taranır.', slugs: ['add', '12punto', 'avrupadan'] },
        { title: 'Ürünler ve platformlar', mind: 'Önce tek bir vaat, sonra bir sonraki adım.', slugs: ['heroty', 'kpay', 'flerpi'] },
        { title: 'Kurumsal', mind: 'Sakin, güvenilir ve net.', slugs: ['vbt', 'disnet', 'serberker'] },
      ],
      next: 'Benzer bir iş için konuşalım.',
      nextLink: 'İletişime geç',
    },
    civic: {
      label: 'ekran dışı / sivil toplum, edebiyat, siyaset',
      title: 'Ekranın dışında',
      intro: 'Kodun dışında da aynı işi yapıyorum: insanları bir araya getiren yapılar kuruyorum.',
      items: [
        {
          org: 'Adana Kent Konseyi Gençlik Meclisi',
          years: '2024 – devam ediyor',
          role: 'Gençlik Meclisi yöneticisi',
          field: 'Sosyal sorumluluk',
          points: [
            'İkiz Dönüşüm ve Teknoloji Çalışma Grubu’nun eş başkanıyım; gençlik odaklı dijital dönüşüm projelerine katkı veriyorum.',
            'Adana Büyükşehir Belediyesi Öğrenci İletişim Merkezi ile çalıştaylar ve etkinlikler tasarlayıp yürütüyoruz.',
            '“Bir Diyeceğim Var!” Gençlik Çalıştayı, Karataş Yaz Kampı, Adana’nın Sorunları ve Potansiyelleri Konferansı, 29 Ekim Gençlik Yürüyüşü.',
          ],
        },
        {
          org: '1907 ÜNİFEB, Çukurova Üniversitesi',
          years: '2019 – 2022',
          role: 'Gönüllü yönetici',
          field: 'Sosyal sorumluluk',
          points: [
            'Üniversite Fenerbahçeliler Birliği, bir tribün grubundan fazlası: #ÜnifebCares gibi sosyal sorumluluk projeleri yürüten bir sivil toplum kuruluşu.',
            'Organizasyon ve projeler, web, yönetim ve üniversite sorumluluğu görevlerini sırasıyla üstlendim.',
            '16 Mayıs 2022’de, 2018’de kaybettiğimiz taraftarımız Koray Şener anısına, Adana Fenerbahçeliler Derneği’nin desteğiyle Adana Sarıçam’da Koray Şener Ana Sınıfı’nı açtık. Pandemiye rağmen süren bir çalışmanın sonunda açılış konuşmasını Üniversite Sorumlusu olarak yaptım.',
          ],
          quote: { text: 'Biz gençler için zaman, çalışma zamanıdır.', source: 'Koray Şener Ana Sınıfı açılış konuşması, 2022' },
          photos: [
            { src: 'unifeb-scarf', alt: '1907 ÜNİFEB Çukurova üyeleri, ellerinde dernek atkısıyla' },
            { src: 'unifeb-tribune', alt: '1907 ÜNİFEB Çukurova üyeleri bir basketbol maçında tribünde' },
            { src: 'unifeb-cup-2020', alt: 'Kadınlar Türkiye Kupası 2020 töreninde 1907 ÜNİFEB üyeleri' },
          ],
          link: { label: 'Fenerbahçe.org haberi', url: 'https://www.fenerbahce.org/haberler/dernekler/2022/5/adana-dernegimiz-ve-1907-unifeb-cukurova-universitesi-uyeleri-koray-sener-ana-sinifi-nin-acilisini' },
        },
        {
          org: 'Üçüncü Yol',
          years: '2018 – devam ediyor',
          role: 'Yazar ve BT direktörü',
          field: 'Edebiyat ve siyaset',
          points: ['Cumhuriyet, aydınlanma ve halk edebiyatı üzerine yazıyor, sitenin teknik yönetimini yürütüyorum.'],
          link: { label: 'Yazar sayfası', url: 'https://ucuncuyol1919.com/author/ahmetdenizdundaruy1919/' },
        },
        {
          org: 'Yeni Yücel',
          years: '2024',
          role: 'Yazar',
          field: 'Edebiyat ve siyaset',
          points: ['Derginin ikinci sayısında yapay zekâ ile insan arasındaki ilişkiyi yazdım.'],
          link: { label: 'Dergi duyurusu', url: 'https://www.instagram.com/p/C7mlfwTg7qD/' },
        },
      ],
      writingTitle: 'Yazılar',
      writing: [
        { title: 'Yapay zekâ ve insan', where: 'Yeni Yücel, sayı 2', date: '2024-05' },
        { title: 'Cumhuriyetin Aydınlanma Neferi Bahriye Üçok', where: 'Üçüncü Yol', date: '2020-10', url: 'https://ucuncuyol1919.com/2020/10/06/cumhuriyetin-aydinlanma-neferi-bahriye-ucok/' },
        { title: 'Ayarı Bozulan Kantar', where: 'Üçüncü Yol', date: '2020-04', url: 'https://ucuncuyol1919.com/2020/04/05/ayari-bozulan-kantar/' },
        { title: 'İki Gözünde İki Zindan: Âşık Veysel', where: 'Üçüncü Yol', date: '2020-03', url: 'https://ucuncuyol1919.com/2020/03/21/iki-gozunde-iki-zindan-asik-veysel/' },
      ],
      read: 'Oku',
      lightbox: { open: 'Fotoğrafı büyüt', close: 'Kapat', prev: 'Önceki fotoğraf', next: 'Sonraki fotoğraf' },
    },
    systems: {
      label: 'yetkinlikler / işin nasıl bağlandığı',
      title: 'Beş disiplin, tek temel: insan.',
      columns: [
        { head: 'Mühendislik', items: ['C# / .NET', 'ASP.NET MVC / Core', 'SQL', 'PHP / WordPress', 'Git / GitHub'] },
        { head: 'Arayüz', items: ['TypeScript / Angular', 'HTML / SCSS', 'Tailwind / Bootstrap', 'GSAP / Three.js', 'Responsive, erişilebilir arayüz'] },
        { head: 'Görünürlük', items: ['Teknik SEO', 'Core Web Vitals', 'Yapılandırılmış veri', 'Search Console / GA4', 'SEM / Google Ads', 'İçerik mimarisi'] },
        { head: 'Yapay zekâ', items: ['Yapay zekâ ve makine öğrenmesi', 'Veri analizi', 'Prompt mühendisliği', 'Claude ve Claude Code', 'GPT API’leri', 'Cursor / Copilot', 'Otomasyon'] },
        { head: 'Toplum ve farkındalık', items: ['Sivil toplum ve gönüllülük', 'Gençlik katılımı ve çalıştay tasarımı', 'Yazarlık: edebiyat ve siyaset', 'Topluluk ve kampanya yönetimi', 'Fikri mülkiyet farkındalığı', 'Döngüsel ekonomi eğitmenliği'] },
      ],
      foundation: 'İnsan: algı, dikkat, davranış.',
      foundationNote: 'Hiyerarşi, okunabilirlik ve hız; insanların bir sayfayı gerçekten nasıl okuduğuna göre.',
    },
    about: {
      label: 'hakkımda / şek. 1',
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
        { years: '2018–', what: 'Yazar ve BT direktörü, Üçüncü Yol', where: 'Edebiyat ve siyaset yazıları; sitenin teknik yönetimi', kind: 'mind' },
        { years: '2019–2022', what: 'Gönüllü yönetici, 1907 ÜNİFEB', where: 'Çukurova Üniversitesi: organizasyon, web, yönetim ve üniversite sorumluluğu', kind: 'both' },
        { years: '2021', what: 'Dijital Pazarlama', where: 'Boğaziçi Üniversitesi İşletme ve Ekonomi Kulübü', kind: 'both' },
        { years: '2021–', what: 'Frontend Web Developer, VBT Yazılım', where: 'UI ekibi: .NET, ASP.NET MVC, C#, SQL, SASS; SEO analizi, prompt mühendisliği', kind: 'code' },
        { years: '2022–2024', what: 'Bilgisayar Programcılığı, önlisans', where: 'Anadolu Üniversitesi', kind: 'code' },
        { years: '2024', what: 'Fikri ve Sınai Mülkiyet Hakları', where: 'Kobimen Akademi', kind: 'both' },
        { years: '2024–', what: 'Gençlik Meclisi yöneticisi, Adana Kent Konseyi', where: 'İkiz Dönüşüm ve Teknoloji Çalışma Grubu eş başkanı', kind: 'both' },
        { years: '2026', what: 'Döngüsel Ekonomi Eğitmen Eğitimi', where: 'Habitat Derneği', kind: 'both', url: 'https://verified.sertifier.com/en/verify/08098888944153/' },
        { years: '2026', what: 'Yapay Zekâ ve Makine Öğrenmesi', where: 'Veri Analizi Okulu, YÖK', kind: 'code', url: 'https://belge.verianaliziokulu.com/e1f35b42-ae82-487a-a271-90dbd0bba565' },
      ],
      method: ['Problemi anla.', 'Doğru çözümü kur.'],
      paragraphs: [
        'Adana, 2000. Psikoloji okurken 1907 ÜNİFEB’in web işlerini üstlendim; kodla orada tanıştım. O günden beri iki şeyi birlikte yapıyorum: insanları anlamak ve onlar için yapılar kurmak.',
        'Bugün işim, insanların gerçekten okuduğu ve arama motorlarının doğru anladığı sayfalar yapmak. Algı ve dikkat üzerine öğrendiklerim hiyerarşi, okunabilirlik ve hız kararlarımın arkasında duruyor.',
        'İşin dışında spor, tarih, siyaset, siber güvenlik ve müzikle ilgileniyorum.',
      ],
      quote: 'Hiçbir şeye ihtiyacımız yok, yalnız bir şeye ihtiyacımız vardır: Çalışkan olmak.',
      quoteBy: 'Mustafa Kemal Atatürk',
      quoteLabel: 'ilke',
      experienceTitle: 'Deneyim',
      experience: [
        {
          title: 'Frontend Web Developer',
          org: 'VBT Yazılım, İstanbul',
          years: '2021, devam ediyor',
          points: [
            'UI ekibinde .NET ve ASP.NET MVC ile kurumsal ve ürün sitelerinin arayüzlerini geliştiriyorum.',
            'Tasarım ekibinin hazırladığı ekranları responsive arayüzlere dönüştürüyorum.',
            'Sayfa hızı ve teknik SEO iyileştirmelerini yürütüyorum.',
          ],
        },
        {
          title: 'Gençlik Meclisi yöneticisi',
          org: 'Adana Kent Konseyi',
          years: '2024, devam ediyor',
          points: [
            'İkiz Dönüşüm ve Teknoloji Çalışma Grubu’nun eş başkanıyım.',
            'Adana Büyükşehir Belediyesi Öğrenci İletişim Merkezi ile gençlik çalıştayları ve etkinlikleri tasarlıyorum.',
          ],
        },
        {
          title: 'Gönüllü yönetici',
          org: '1907 ÜNİFEB, Çukurova Üniversitesi',
          years: '2019 – 2022',
          points: [
            'Organizasyon ve projeler, web, yönetim ve üniversite sorumluluğu görevlerini üstlendim.',
            'Sosyal medya, grafik ve hareketli tasarım, dijital kampanyalar yürüttüm.',
          ],
        },
        {
          title: 'Yazar ve BT direktörü',
          org: 'Üçüncü Yol',
          years: '2018, devam ediyor',
          points: ['Edebiyat ve siyaset yazıları yazıyor, sitenin teknik yönetimini yürütüyorum.'],
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
        { group: 'Yapay zekâ ve veri', items: ['Claude / Claude Code', 'Cursor', 'GitHub Copilot', 'Prompt ve otomasyon', 'Veri analizi', 'Makine öğrenmesi temelleri'] },
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
      title: 'Birlikte bir şey kuralım.',
      lead: 'Yeni bir site, yavaşlayan bir sayfa ya da görünmeyen bir içerik. Yazın; en kısa sürede dönüyorum.',
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
    footer: { made: 'İstanbul’da Angular ile yapıldı.', top: 'Başa dön' },
  },
  en: {
    meta: {
      title: 'Ahmet Deniz Dündar | Frontend Developer and SEO Specialist',
      description:
        'Psychologist and frontend developer in Istanbul. I build web applications from .NET to Angular, and built the interface and SEO of nine live projects across news, SaaS and corporate work.',
      locale: 'en_US',
    },
    labels: { fig: 'fig.', sheet: 'mark / sheet 01', cap: 'cap', base: 'base', mind: 'mind', code: 'code' },
    nav: { work: 'Work', systems: 'Skills', civic: 'Off-screen', about: 'About', contact: 'Contact', skip: 'Skip to content', menu: 'Menu' },
    toggles: { theme: 'Change theme', lang: 'TR', langLabel: 'Türkçeye geç' },
    hero: {
      kicker: 'mind × code',
      mind: 'Psychology',
      code: 'Software',
      tagline: 'Beyond the interface.',
      grad: 'Psychologist',
      role: 'frontend developer',
      lead: 'I turn what I learned about perception and attention into code. I build web applications end to end, from .NET and SQL to Angular interfaces, so that a person reads each page first and a search engine understands it right.',
      now: 'In Istanbul, on the UI team at VBT Software since 2021.',
      proof: ['9 live projects', '5+ years at VBT', 'Writing since 2018', 'YÖK AI certificate'],
      credential: 'Certified in Artificial Intelligence and Machine Learning by YÖK’s Data Analysis School',
      verify: 'Verify',
      primary: 'See the work',
      secondary: 'Send an email',
    },
    work: {
      label: 'work / nine live projects',
      title: 'Nine projects, all live.',
      intro: 'From news to payments, from ERP to independent audit. On every one I asked the same question: what should a visitor see in the first three seconds?',
      open: 'Open site',
      groups: [
        { title: 'News and editorial', mind: 'Read in seconds: scanned, not studied.', slugs: ['add', '12punto', 'avrupadan'] },
        { title: 'Products and platforms', mind: 'One promise first, then the next step.', slugs: ['heroty', 'kpay', 'flerpi'] },
        { title: 'Corporate and enterprise', mind: 'Calm, credible and clear.', slugs: ['vbt', 'disnet', 'serberker'] },
      ],
      next: 'Planning something similar?',
      nextLink: 'Get in touch',
    },
    civic: {
      label: 'off-screen / civil society, literature, politics',
      title: 'Off the screen',
      intro: 'Away from code I do the same work: I build structures that bring people together.',
      items: [
        {
          org: 'Adana City Council Youth Council',
          years: '2024 – now',
          role: 'Youth Council board member',
          field: 'Social responsibility',
          points: [
            'Co-chair of the Twin Transition and Technology working group, contributing to youth-led digital transformation projects.',
            'With the Adana Metropolitan Municipality Student Communication Centre we design and run workshops and events.',
            '“Bir Diyeceğim Var!” youth workshop, Karataş summer camp, a conference on Adana’s problems and potential, the 29 October youth march.',
          ],
        },
        {
          org: '1907 ÜNİFEB, Çukurova University',
          years: '2019 – 2022',
          role: 'Volunteer board member',
          field: 'Social responsibility',
          points: [
            'The University Fenerbahçe Fans’ Union is more than a supporters’ group: a civil society organisation that runs social responsibility projects such as #ÜnifebCares.',
            'I held the events and projects, web, board and university lead roles in turn.',
            'On 16 May 2022, in memory of Koray Şener, a fan we lost in 2018, and with the support of the Adana Fenerbahçe association, we opened the Koray Şener Nursery Class in Sarıçam, Adana. After work that carried on through the pandemic, I gave the opening speech as university lead.',
          ],
          quote: { text: 'For us young people, the time is the time to work.', source: 'Opening speech, Koray Şener Nursery Class, 2022' },
          photos: [
            { src: 'unifeb-scarf', alt: '1907 ÜNİFEB Çukurova members holding the union’s scarf' },
            { src: 'unifeb-tribune', alt: '1907 ÜNİFEB Çukurova members in the stands at a basketball game' },
            { src: 'unifeb-cup-2020', alt: '1907 ÜNİFEB members at the 2020 Women’s Turkish Cup ceremony' },
          ],
          link: { label: 'Fenerbahçe.org news (TR)', url: 'https://www.fenerbahce.org/haberler/dernekler/2022/5/adana-dernegimiz-ve-1907-unifeb-cukurova-universitesi-uyeleri-koray-sener-ana-sinifi-nin-acilisini' },
        },
        {
          org: 'Üçüncü Yol',
          years: '2018 – now',
          role: 'Writer and IT director',
          field: 'Literature and politics',
          points: ['I write on the Republic, the Enlightenment and folk literature, and run the site’s technical side.'],
          link: { label: 'Author page (TR)', url: 'https://ucuncuyol1919.com/author/ahmetdenizdundaruy1919/' },
        },
        {
          org: 'Yeni Yücel',
          years: '2024',
          role: 'Writer',
          field: 'Literature and politics',
          points: ['In the magazine’s second issue I wrote on the relationship between artificial intelligence and people.'],
          link: { label: 'Magazine announcement', url: 'https://www.instagram.com/p/C7mlfwTg7qD/' },
        },
      ],
      writingTitle: 'Writing',
      writing: [
        { title: 'Artificial intelligence and people', where: 'Yeni Yücel, issue 2', date: '2024-05' },
        { title: 'Cumhuriyetin Aydınlanma Neferi Bahriye Üçok', where: 'Üçüncü Yol (TR)', date: '2020-10', url: 'https://ucuncuyol1919.com/2020/10/06/cumhuriyetin-aydinlanma-neferi-bahriye-ucok/' },
        { title: 'Ayarı Bozulan Kantar', where: 'Üçüncü Yol (TR)', date: '2020-04', url: 'https://ucuncuyol1919.com/2020/04/05/ayari-bozulan-kantar/' },
        { title: 'İki Gözünde İki Zindan: Âşık Veysel', where: 'Üçüncü Yol (TR)', date: '2020-03', url: 'https://ucuncuyol1919.com/2020/03/21/iki-gozunde-iki-zindan-asik-veysel/' },
      ],
      read: 'Read',
      lightbox: { open: 'Enlarge photo', close: 'Close', prev: 'Previous photo', next: 'Next photo' },
    },
    systems: {
      label: 'skills / how the work connects',
      title: 'Five disciplines, one foundation: people.',
      columns: [
        { head: 'Engineering', items: ['C# / .NET', 'ASP.NET MVC / Core', 'SQL', 'PHP / WordPress', 'Git / GitHub'] },
        { head: 'Interface', items: ['TypeScript / Angular', 'HTML / SCSS', 'Tailwind / Bootstrap', 'GSAP / Three.js', 'Responsive, accessible UI'] },
        { head: 'Visibility', items: ['Technical SEO', 'Core Web Vitals', 'Structured data', 'Search Console / GA4', 'SEM / Google Ads', 'Content architecture'] },
        { head: 'Intelligence', items: ['AI and machine learning', 'Data analysis', 'Prompt engineering', 'Claude and Claude Code', 'GPT APIs', 'Cursor / Copilot', 'Automation'] },
        { head: 'Society and awareness', items: ['Civil society and volunteering', 'Youth participation and workshop design', 'Writing: literature and politics', 'Community and campaign management', 'Intellectual property awareness', 'Circular economy training'] },
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
        { years: '2018–', what: 'Writer and IT director, Üçüncü Yol', where: 'Essays on literature and politics; runs the site', kind: 'mind' },
        { years: '2019–2022', what: 'Volunteer board member, 1907 ÜNİFEB', where: 'Çukurova University: events, web, board and university lead', kind: 'both' },
        { years: '2021', what: 'Digital Marketing', where: 'Boğaziçi University Business and Economics Club', kind: 'both' },
        { years: '2021–', what: 'Frontend Web Developer, VBT Software', where: 'UI team: .NET, ASP.NET MVC, C#, SQL, SASS; SEO analysis, prompt engineering', kind: 'code' },
        { years: '2022–2024', what: 'Computer Programming, associate degree', where: 'Anadolu University', kind: 'code' },
        { years: '2024', what: 'Intellectual and Industrial Property Rights', where: 'Kobimen Akademi', kind: 'both' },
        { years: '2024–', what: 'Youth Council board, Adana City Council', where: 'Co-chair, Twin Transition and Technology working group', kind: 'both' },
        { years: '2026', what: 'Circular Economy Trainer Programme', where: 'Habitat Association', kind: 'both', url: 'https://verified.sertifier.com/en/verify/08098888944153/' },
        { years: '2026', what: 'AI and Machine Learning', where: 'Data Analysis School, YÖK', kind: 'code', url: 'https://belge.verianaliziokulu.com/e1f35b42-ae82-487a-a271-90dbd0bba565' },
      ],
      method: ['Understand the problem.', 'Build the right solution.'],
      paragraphs: [
        'Adana, 2000. While studying psychology I took over the web work for 1907 ÜNİFEB, and that is where I met code. Since then I have done two things together: understanding people, and building structures for them.',
        'Today my job is building pages people actually read and search engines understand correctly. What I learned about perception and attention sits behind my decisions on hierarchy, legibility and speed.',
        'Outside work I follow sports, history, politics, cyber security and music.',
      ],
      quote: 'We need nothing but one thing: to be hardworking.',
      quoteBy: 'Mustafa Kemal Atatürk',
      quoteLabel: 'principle',
      experienceTitle: 'Experience',
      experience: [
        {
          title: 'Frontend Web Developer',
          org: 'VBT Software, Istanbul',
          years: '2021 to now',
          points: [
            'I build interfaces for corporate and product sites on the UI team.',
            'I turn the design team’s screens into responsive interfaces.',
            'I lead page speed and technical SEO improvements.',
          ],
        },
        {
          title: 'Youth Council board member',
          org: 'Adana City Council',
          years: '2024 to now',
          points: [
            'Co-chair of the Twin Transition and Technology working group.',
            'Design youth workshops and events with the Adana Metropolitan Municipality Student Communication Centre.',
          ],
        },
        {
          title: 'Volunteer board member',
          org: '1907 ÜNİFEB, Çukurova University',
          years: '2019 – 2022',
          points: [
            'Held the events and projects, web, board and university lead roles.',
            'Ran social media, graphic and motion design, and digital campaigns.',
          ],
        },
        {
          title: 'Writer and IT director',
          org: 'Üçüncü Yol',
          years: '2018 to now',
          points: ['Write on literature and politics and run the site’s technical side.'],
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
        { group: 'AI and data', items: ['Claude / Claude Code', 'Cursor', 'GitHub Copilot', 'Prompting and automation', 'Data analysis', 'Machine learning basics'] },
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
      title: 'Let’s build something.',
      lead: 'A new site, a slow page, or content nobody finds. Write to me; I reply as soon as I can.',
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
    footer: { made: 'Built in Istanbul with Angular.', top: 'Back to top' },
  },
};
