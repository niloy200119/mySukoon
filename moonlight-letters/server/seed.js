const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const AdminUser = require('./models/AdminUser');
const TimelineEvent = require('./models/TimelineEvent');
const LoveReason = require('./models/LoveReason');
const LoveLetter = require('./models/LoveLetter');
const GalleryImage = require('./models/GalleryImage');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        // Clear existing data
        await AdminUser.deleteMany();
        await TimelineEvent.deleteMany();
        await LoveReason.deleteMany();
        await LoveLetter.deleteMany();
        await GalleryImage.deleteMany();

        // Create admin user
        await AdminUser.create({
            username: 'admin',
            password: 'admin123'
        });
        console.log('Admin created: username=admin, password=admin123');

        // Create timeline events
        await TimelineEvent.insertMany([
            {
                title: 'The First Smile',
                description: 'I saw you, Mimi, and the whole world went quiet. Your smile — soft, effortless — was the very first thing that made me believe in beautiful accidents. That was the moment I knew I was in trouble.',
                date: new Date('2024-03-15'),
                order: 1
            },
            {
                title: 'The First Conversation',
                description: 'We talked for hours that night, Alo, and I forgot the world existed. Every word you said felt like a page from a story I had always wanted to live inside. You were already my favorite person.',
                date: new Date('2024-03-22'),
                order: 2
            },
            {
                title: 'The First Late Night',
                description: 'Three in the morning, and neither of us wanted to say goodnight, Chocolate. That silence between our words — it held more intimacy than any embrace ever could.',
                date: new Date('2024-04-10'),
                order: 3
            },
            {
                title: 'Our Favorite Memory',
                description: 'That golden afternoon where nothing happened and everything changed, Afsana. We just sat there, together, and I realized — this is what sukoon feels like. You are my peace.',
                date: new Date('2024-06-20'),
                order: 4
            },
            {
                title: 'The Moment I Knew',
                description: 'You laughed at something I said, Mimi — really laughed — and I thought: I want to spend the rest of my life earning that sound. Every single day.',
                date: new Date('2024-08-14'),
                order: 5
            }
        ]);
        console.log('Timeline events created');

        // Create love reasons
        await LoveReason.insertMany([
            { title: 'Your Laugh, Mimi', description: 'The way you laugh unexpectedly — like joy catches you off guard. Mimi, it is the most healing sound I know. My whole world lights up.', order: 1 },
            { title: 'You Are My Sukoon', description: 'How you calm my chaos without even trying, Alo. You are my quiet place in a loud world — my sukoon, always.', order: 2 },
            { title: 'Your Sleepy Voice', description: 'That soft, half-awake voice when you first wake up, Chocolate. It makes me want to freeze time and stay in that moment with you forever.', order: 3 },
            { title: 'Your Eyes, Afsana', description: 'The softness in your eyes when you look at me, Afsana. It feels like being truly seen for the very first time in my life.', order: 4 },
            { title: 'When You Say My Name', description: 'Nobody else says it like you do, Mimi — like it means something sacred, like it was always meant to belong to you.', order: 5 },
            { title: 'Your Gentle Heart', description: 'The gentle way you treat everyone around you, Alo. It makes me want to be a better person — just to deserve being next to you.', order: 6 },
            { title: 'Your Quiet Courage', description: 'How brave you are even when you do not feel it, Chocolate. You face everything with a grace that leaves me in awe.', order: 7 },
            { title: 'Our Silence Together', description: 'The comfortable silence we share, Mimi. No need for words — just existing beside you is the purest form of peace I have ever known.', order: 8 }
        ]);
        console.log('Love reasons created');

        // Create love letter
        await LoveLetter.create({
            title: 'A Letter Written in Moonlight — for Mimi',
            content: `My dearest Alo,

There are things I have never been able to say out loud — not because I do not feel them, but because some feelings are too vast for spoken words. So I wrote them here, in moonlight, just for you.

Mimi — you came into my life like dawn after the longest night. Quietly. Gently. Without asking permission. And suddenly, everything I thought I understood about love had to be rewritten.

You are not just the person I love, Afsana. You are my favorite story, my safest place, my sukoon. You are the reason I believe that some souls are made to find each other — across time, across distance, across every impossible thing.

I do not love you because you are perfect, Chocolate. I love you because you are real. Because your flaws are poetry, and your fears make you so beautifully brave, and the way you try — even on your hardest days — is the most beautiful thing I have ever witnessed.

If I could give you one thing, Alo, it would be the ability to see yourself the way I see you. You would never doubt your worth again. You would understand why my heart races when you laugh, why the world goes quiet when you speak.

Thank you for choosing me. Thank you for staying. Thank you for being the quiet miracle I never knew I was waiting for.

Har pal, har lamha — tumi amar.

Forever and always,
Your chocolate boy`,
            password: 'iloveyou'
        });
        console.log('Love letter created (password: iloveyou)');

        // Create gallery images (placeholder URLs)
        await GalleryImage.insertMany([
            { imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=800', title: 'Golden Hour', description: 'That perfect light', order: 1 },
            { imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=800', title: 'Starlit Evening', description: 'Under the same sky', order: 2 },
            { imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800', title: 'Together', description: 'Where I belong', order: 3 },
            { imageUrl: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=800', title: 'Wildflowers', description: 'Like your spirit', order: 4 },
            { imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', title: 'Quiet Moments', description: 'The ones that matter most', order: 5 },
            { imageUrl: 'https://images.unsplash.com/photo-1455587734955-081b22074882?w=800', title: 'Our Place', description: 'Where time stops', order: 6 }
        ]);
        console.log('Gallery images created');

        console.log('\n✨ Seed data inserted successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedData();
