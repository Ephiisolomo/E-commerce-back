import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from 'src/auth/decorators/roles.dcorator';
import { Role } from 'src/auth/enums/role.enum';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({unique:true})
  username: string;

  @Prop({unique:true})
  email: string;

  @Prop()
  password: string;


  @Prop({default: [Role.User]})
  roles: Role[] ;

}

export const UserSchema = SchemaFactory.createForClass(User);