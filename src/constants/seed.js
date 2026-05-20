const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('🧹 Cleaning up existing database records...');
  await prisma.property.deleteMany({});
  await prisma.attendance.deleteMany({});
  await prisma.client.deleteMany({});
  await prisma.employee.deleteMany({});

  console.log('👥 Seeding premium employee accounts...');
  const admin = await prisma.employee.create({
    data: {
      firstName: 'Yassine',
      lastName: 'Daouib',
      email: 'yassine.daouib@immobagency.com',
      phone: '+212600000000',
      role: 'ADMIN',
    },
  });

  const agent1 = await prisma.employee.create({
    data: {
      firstName: 'Karim',
      lastName: 'Alami',
      email: 'karim.alami@immobagency.com',
      phone: '+212611223344',
      role: 'AGENT',
    },
  });

  const agent2 = await prisma.employee.create({
    data: {
      firstName: 'Sarah',
      lastName: 'Chraibi',
      email: 'sarah.chraibi@immobagency.com',
      phone: '+212655667788',
      role: 'AGENT',
    },
  });

  console.log('📅 Seeding employee attendance logs...');
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  await prisma.attendance.createMany({
    data: [
      {
        employeeId: agent1.id,
        date: yesterday,
        status: 'PRESENT',
        checkIn: new Date(yesterday.setHours(8, 45, 0)),
        checkOut: new Date(yesterday.setHours(17, 30, 0)),
        notes: { 
          log: {
            fr: 'Arrivé tôt, traitement des dossiers immobiliers.',
            en: 'Arrived early, processed real estate files.',
            ar: 'وصل مبكراً، قام بمعالجة ملفات العقارات.'
          }
        },
      },
      {
        employeeId: agent2.id,
        date: yesterday,
        status: 'LATE',
        checkIn: new Date(yesterday.setHours(9, 25, 0)),
        checkOut: new Date(yesterday.setHours(17, 15, 0)),
        notes: { 
          reason: {
            fr: 'Embouteillage près du centre-ville.',
            en: 'Traffic jam near the city center.',
            ar: 'ازدحام مروري بالقرب من وسط المدينة.'
          }, 
          approvedBy: 'Admin' 
        },
      },
    ],
  });

  console.log('🤝 Seeding clients...');
  const seller1 = await prisma.client.create({
    data: {
      fullName: 'Ahmed Mansouri',
      email: 'ahmed.mansouri@email.com',
      phone: '+212699887766',
      type: 'SELLER',
      notes: { vipseller: true, preferredTime: 'Afternoon' },
    },
  });

  const buyer1 = await prisma.client.create({
    data: {
      fullName: 'Jean Dupont',
      email: 'jean.dupont@email.com',
      phone: '+33612345678',
      type: 'BUYER',
      notes: { budgetMax: 5000000 },
    },
  });

  console.log('🏡 Seeding trilingual high-end real estate listings...');
  // 4. Create Properties with complete JSONB translation schemas (FR, EN, AR)
  await prisma.property.create({
    data: {
      title: {
        fr: 'Terrain Résidentiel de Luxe à Malabata',
        en: 'Luxury Residential Land in Malabata',
        ar: 'أرض سكنية فاخرة في مالاباطا',
      },
      description: {
        fr: 'Superbe terrain constructible de 800m² avec vue panoramique imprenable sur la mer Méditerranée. Emplacement ultra premium, viabilisé et sécurisé.',
        en: 'Superb 800m² building plot with breathtaking panoramic views of the Mediterranean Sea. Ultra premium location, fully serviced and secure.',
        ar: 'أرض رائعة صالحة للبناء بمساحة 800 متر مربع مطلة على البحر الأبيض المتوسط. موقع ممتاز، مجهز بالكامل ومؤمن.',
      },
      type: 'LAND',
      status: 'AVAILABLE',
      price: 4200000.00,
      location: 'Malabata, Tangier',
      area: 800.0,
      features: {
        zoning: 'R+2',
        seaView: true,
      },
      sellerId: seller1.id,
      agentId: agent1.id,
    },
  });

  await prisma.property.create({
    data: {
      title: {
        fr: 'Villa Contemporaine Neuve avec Piscine',
        en: 'Brand New Contemporary Villa with Pool',
        ar: 'فيلا معاصرة جديدة مع مسبح',
      },
      description: {
        fr: 'Magnifique villa moderne de 4 chambres, finitions haut de gamme en marbre noir et touches dorées, grand jardin privatif et piscine à débordement.',
        en: 'Magnificent modern 4-bedroom villa, premium finishes in black marble and gold accents, large private garden and infinity pool.',
        ar: 'فيلا حديثة رائعة تحتوي على 4 غرف نوم، تشطيبات راقية من الرخام الأسود واللمسات الذهبية، حديقة خاصة كبيرة ومسبح.',
      },
      type: 'VILLA',
      status: 'RESERVED',
      price: 8500000.00,
      location: 'California, Casablanca',
      area: 450.5,
      features: {
        bedrooms: 4,
        hasPool: true,
      },
      sellerId: seller1.id,
      buyerId: buyer1.id,
      agentId: agent2.id,
    },
  });

  console.log('🚀 Database seeding script updated successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during database seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });