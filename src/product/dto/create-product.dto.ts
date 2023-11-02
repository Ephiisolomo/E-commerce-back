import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDTO {
  @ApiProperty({ example: 'New product', description: 'The name of the product' })
    name: string;

  @ApiProperty({ example: 'This is a new product', description: 'The description about the product' })
    description: string;

  @ApiProperty({ example: 'Product category', description: 'The category of the product' })
    category: string;

  @ApiProperty({ example: '1000', description: 'The price of the product' })
    price: number;

  @ApiProperty({ example: '10', description: 'The quantitiy of the product' })
    quantity: number;

  @ApiProperty({ example: 'src/product/schemas/uploads', description: 'the path, the file name and the file extention associated with the product and is not nessacery to send with the form body' })
    image: string;
  }