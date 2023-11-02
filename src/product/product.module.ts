import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose'; 
import { ProductSchema } from './schemas/product.schma'; 
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }])
  ,MulterModule.register({
      dest: './schemas/uploads',
    })],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}