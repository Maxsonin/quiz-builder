import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { type CreateQuizDto } from './create-quiz.schema.js';

@Injectable()
export class QuizzesService {
  constructor(private readonly prisma: PrismaService) {}

  create({ title, questions }: CreateQuizDto) {
    return this.prisma.quiz.create({
      data: {
        title,
        questions: {
          create: questions.map((question, order) => ({
            order,
            type: question.type,
            text: question.text,
            options: question.type === 'CHECKBOX' ? question.options : undefined,
            answer: question.type === 'CHECKBOX' ? undefined : question.answer,
          })),
        },
      },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
  }

  async findAll() {
    // If `_count` ever becomes a bottleneck, store a `questionCount` column on Quiz. Set it in `create`, and keep it in sync
    const quizzes = await this.prisma.quiz.findMany({
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, _count: { select: { questions: true } } },
    });
    return quizzes.map(({ _count, ...quiz }) => ({ ...quiz, questionCount: _count.questions }));
  }

  async findOne(id: number) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
      include: { questions: { orderBy: { order: 'asc' } } },
    });
    if (!quiz) throw new NotFoundException(`Quiz ${id} not found`);
    return quiz;
  }

  async remove(id: number) {
    const { count } = await this.prisma.quiz.deleteMany({ where: { id } });
    if (count === 0) throw new NotFoundException(`Quiz ${id} not found`);
  }
}
