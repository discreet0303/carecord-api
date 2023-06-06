import { Body, Controller, Param, ParseIntPipe, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ContactBookUserRepository } from 'src/repositories/contact-book-user.repository';
import { IRequest } from 'src/types/common.interface';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { ContactBookUserService } from './contact-book-user.service';
import { CreateContactBookUserDto } from './dto/create-contact-book-user.dto';
import { CreateContactBookUserRelationDto } from './dto/create-contact-book-user-relation.dto';
import { UpdateContactBookUserDto } from './dto/update-contact-book-user.dto';

@ApiBearerAuth()
@ApiTags('ContactBookUser')
@UseGuards(JwtAuthGuard)
@Controller('contact-book-user')
export class ContactBookUserController {
  constructor(
    private contactBookUserRepository: ContactBookUserRepository,
    private readonly contactBookUserService: ContactBookUserService,
  ) {}

  /* Post Method */
  @Post('/')
  createContactBookUser(
    @Req() req: IRequest,
    @Body() createContactBookUserDto: CreateContactBookUserDto,
  ) {
    return this.contactBookUserRepository.createContactBookUser(req.user, createContactBookUserDto);
  }

  @Post('/:contactBookUserId/relation')
  createContactBookUserRelation(
    @Req() req: IRequest,
    @Param('contactBookUserId', ParseIntPipe) contactBookUserId: number,
    @Body() createContactBookUserRelationDto: CreateContactBookUserRelationDto,
  ) {
    return this.contactBookUserService.createContactBookUserRelation(
      contactBookUserId,
      createContactBookUserRelationDto,
      req.user,
    );
  }

  /* Patch Method */
  @Patch('/:contactBookUserId')
  updateContactBookUser(
    @Param('contactBookUserId', ParseIntPipe) contactBookUserId: number,
    @Body() updateContactBookUserDto: UpdateContactBookUserDto,
  ) {
    return this.contactBookUserService.updateContactBookUser(
      contactBookUserId,
      updateContactBookUserDto,
    );
  }
}
