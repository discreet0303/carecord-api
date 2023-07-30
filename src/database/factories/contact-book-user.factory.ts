import { setSeederFactory } from 'typeorm-extension';
import { ContactBookUserEntity } from 'src/entities/contact-book-user.entity';
import { generateRandomString } from 'src/utils/string';
import { ContactBookUserTypeEnum } from 'src/enums/contact-book-user-type.enum';

export default setSeederFactory(ContactBookUserEntity, (faker) => {
  const cbUser = new ContactBookUserEntity();

  cbUser.name = faker.person.fullName();
  cbUser.uid = generateRandomString(6);
  cbUser.type = ContactBookUserTypeEnum.BABE;

  return cbUser;
});
