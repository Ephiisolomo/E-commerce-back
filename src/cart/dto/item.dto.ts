import { ApiProperty } from "@nestjs/swagger";

export class ItemDTO {

  @ApiProperty({ example: 'jbrl1k4j5hlkjflkjafhpi13t', description: 'The ID of the product' })
    productId: string;

  @ApiProperty({ example: 'Sports wear', description: 'The name of the product' })
    name: string;

  @ApiProperty({ example: '10', description: 'The quantity of the item' })
    quantity: number;

  @ApiProperty({ example: '1000', description: 'The price of the item' })
    price: number;
  }