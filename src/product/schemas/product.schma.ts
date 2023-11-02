import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product;

@Schema()
export class Product{
  @Prop({required:true, unique:true, isString:true})
  name: string;

  @Prop({required:true, isNaN:true})
  description: string;

  @Prop({required:true, isNaN:true})
  category: string;
  
  @Prop({isInteger:true})
  price: number;

  @Prop({isInteger:true})
  quantity: number;

  @Prop()
  image: string;

}

export const ProductSchema = SchemaFactory.createForClass(Product);