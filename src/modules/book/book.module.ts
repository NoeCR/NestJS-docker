import { Module } from "@nestjs/common";
import { BookService } from "./book.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BookController } from "./book.controller";
import { BookRepository } from "./book.repository";
import { UserRepository } from "../user/user.repository";

@Module({
  imports: [TypeOrmModule.forFeature([BookRepository, UserRepository])],
  providers: [BookService],
  controllers: [BookController],
})
export class BookModule {}
