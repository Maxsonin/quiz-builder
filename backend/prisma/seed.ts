import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env['DATABASE_URL'] }),
});

async function main() {
  if ((await prisma.quiz.count()) > 0) {
    console.log('Database already has quizzes, skipping seed');
    return;
  }

  await prisma.quiz.create({
    data: {
      title: 'General knowledge',
      questions: {
        create: [
          { order: 0, type: 'BOOLEAN', text: 'The Earth orbits the Sun?', answer: true },
          { order: 1, type: 'INPUT', text: 'What is the capital of France?', answer: 'Paris' },
          {
            order: 2,
            type: 'CHECKBOX',
            text: 'Which of these numbers are even?',
            options: [
              { text: '2', isCorrect: true },
              { text: '3', isCorrect: false },
              { text: '4', isCorrect: true },
            ],
          },
        ],
      },
    },
  });
  console.log('Seeded sample quiz');
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
