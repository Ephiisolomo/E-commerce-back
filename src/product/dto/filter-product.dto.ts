import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDTO } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

//export class UpdateProductDto extends PartialType(CreateProductDTO) {}
export class FilterProductDTO {
 // @ApiProperty({ example: 'shoes leather', description: 'The search query that has to be tested againest the product name or the product description' })
    search: string;

 // @ApiProperty({ example: 'shoes', description: 'The search query that has to be tested againest the product category' })
    category: string;
  }