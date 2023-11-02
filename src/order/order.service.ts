import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { CartService } from '../cart/cart.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<OrderDocument>,
    private cartService: CartService,
  ) {}

  async createOrder(userId: string, orderDTO: CreateOrderDto): Promise<Order> {
    const cart = await this.cartService.getCart(userId);

    if (!cart) {
      throw new NotFoundException('Cart does not exist');
    }

    const { items, totalPrice } = cart;

    const newOrder = await this.orderModel.create({
      userId,
      items,
      totalPrice,
      ...orderDTO,
    });

    // Clear cart after creating the order
    await this.cartService.deleteCart(userId);

    return newOrder;
  }

  async findAllOrders(): Promise<Order[]> {
    const orders = await this.orderModel.find().exec();
    return orders;
  }

  async findOrderById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  async updateOrder(orderId: string, orderDTO: CreateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderId, orderDTO, { new: true })
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException('Order not found');
    }

    return updatedOrder;
  }

  async removeOrder(orderId: string): Promise<void> {
    const result = await this.orderModel.deleteOne({ _id: orderId }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('Order not found');
    }
  }
}