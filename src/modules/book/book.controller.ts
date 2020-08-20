import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  ParseIntPipe,
  UseGuards,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { RoleGuard } from "../role/guards/role.guard";
import { BookService } from "./book.service";
import { RoleType } from "../role/roletype.enum";
import { Roles } from "../role/decorators/role.decorator";
import { ReadBookDto, CreateOrUpdateBookDto } from "./dto";

@Controller("book")
export class BookController {
  constructor(private readonly _bookService: BookService) {}

  @Get(":id")
  @Roles(RoleType.ADMIN, RoleType.USER)
  @UseGuards(AuthGuard(), RoleGuard)
  async getBook(@Param("id", ParseIntPipe) id: number): Promise<ReadBookDto> {
    return await this._bookService.get(id);
  }

  @UseGuards(AuthGuard()) // Only for test, use generated token in login process
  @Get()
  async getBooks(): Promise<ReadBookDto[]> {
    return await this._bookService.getAll();
  }

  Deprecated;
  @Post()
  async createUser(@Body() book: CreateOrUpdateBookDto): Promise<boolean> {
    return await this._bookService.createBook(book);
  }

  @Patch(":id")
  async updateBook(
    @Param("id", ParseIntPipe) id: number,
    @Body() book: CreateOrUpdateBookDto,
  ): Promise<boolean> {
    return await this._bookService.updateBook(id, book);
  }

  @Delete(":id")
  async deleteBook(@Param("id", ParseIntPipe) id: number): Promise<boolean> {
    return await this._bookService.deleteBook(id);
  }
}
