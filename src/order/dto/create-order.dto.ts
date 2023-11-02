import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
@ApiProperty({ example: 'ibfpi42uhtp09cuapouangh1948f', description: 'The id of the user that is placing the order' }) 
  userId: string;

@ApiProperty({ example: 'array', description: 'The items to be included in the order' })
  items: any[]; // Define the type of items according to your data structure

@ApiProperty({ example: '3409', description: 'The total price of the order' })
  totalPrice: number;

}
