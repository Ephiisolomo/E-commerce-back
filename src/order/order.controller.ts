import { Controller, Get, Param, Post, Body, Put, Delete, Request, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.dcorator';
import { Role } from 'src/auth/enums/role.enum';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('orders')
@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Post('/')
  async createOrder(@Request() req, @Body() orderDTO: CreateOrderDto) {
    const userId = req.user.userId;
    const order = await this.orderService.createOrder(userId, orderDTO);
    return order;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/')
  async findAllOrders() {
    const orders = await this.orderService.findAllOrders();
    return orders;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:orderId')
  async findOrderById(@Param('orderId') orderId: string) {
    const order = await this.orderService.findOrderById(orderId);
    return order;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Put('/:orderId')
  async updateOrder(
    @Param('orderId') orderId: string,
    @Body() orderDTO: CreateOrderDto,
  ) {
    const updatedOrder = await this.orderService.updateOrder(orderId, orderDTO);
    return updatedOrder;
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:orderId')
  async removeOrder(@Param('orderId') orderId: string) {
    await this.orderService.removeOrder(orderId);
    return { message: 'Order removed successfully' };
  }
}