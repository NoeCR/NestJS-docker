import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BookRepository } from "./book.repository";
import { UserRepository } from "../user/user.repository";
import { ReadBookDto, CreateOrUpdateBookDto } from "./dto";
import { plainToClass } from "class-transformer";
import { Status } from "../../shared/entity-status.enum";
import { Book } from "./book.entity";

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookRepository) private readonly _bookRepository:
      BookRepository,
    @InjectRepository(UserRepository) private readonly userRepository:
      UserRepository,
  ) {}

  async get(bookId: number): Promise<ReadBookDto> {
    if (bookId) {
      throw new BadRequestException("bookId must be send");
    }

    const book: Book = await this._bookRepository.findOne(
      bookId,
      { where: { status: Status.ACTIVE } },
    );

    if (!book) {
      throw new NotFoundException("book not found");
    }

    return plainToClass(ReadBookDto, book);
  }

  async getAll(): Promise<ReadBookDto[]> {
    const books: Book[] = await this._bookRepository.find(
      { where: { status: Status.ACTIVE } },
    );

    if (!books) {
      throw new NotFoundException();
    }

    return books.map((b) => plainToClass(ReadBookDto, b));
  }

  async createBook(book: CreateOrUpdateBookDto): Promise<boolean> {
    const createdBook = await this._bookRepository.create(book);

    if (!createdBook) {
      throw new ConflictException("book cannot be created");
    }

    return true;
  }

  async updateBook(id: number, book: CreateOrUpdateBookDto): Promise<boolean> {
    const updateBook = await this._bookRepository.findOne(id);

    if (!updateBook) {
      throw new NotFoundException("book not found");
    }

    updateBook.description = book.description || updateBook.description;
    updateBook.title = book.title || updateBook.title;
    updateBook.authors = book.authors || updateBook.authors;

    const updated = this._bookRepository.save(updateBook);
    if (!updated) {
      throw new UnprocessableEntityException();
    }

    return !!updated;
  }

  async deleteBook(id: number): Promise<boolean> {
    const book = await this._bookRepository.findOne(id);
    if (!book) {
      throw new NotFoundException("book not found");
    }

    const deleted = await this._bookRepository.update(
      id,
      { status: Status.INACTIVE },
    );

    return !!deleted;
  }
}
