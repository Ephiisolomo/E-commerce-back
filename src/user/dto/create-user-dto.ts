import { ApiProperty } from "@nestjs/swagger";
import { Role } from "src/auth/enums/role.enum";

export class CreateUserDTO {
  @ApiProperty({ example: 'John Doe', description: 'The username of the user' })
    username: string;

    @ApiProperty({ example: 'mail@mailserver.com', description: 'The mail address of the user' })
    email: string;

    @ApiProperty({ example: 'PWD', description: 'The password of the user' })
    password: string;

    @ApiProperty({ example: 'PWD', description: 'The password of the user' })
    confirmed_password: string;

    @ApiProperty({ example: 'user', description: 'The role of the user' })
    roles: string[];
  }