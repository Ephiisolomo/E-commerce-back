import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product, ProductDocument } from './schemas/product.schma';
import { CreateProductDTO } from './dto/create-product.dto';
import { FilterProductDTO } from './dto/filter-product.dto';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private readonly productModel: Model<ProductDocument>) { }
 
  
  async getFilteredProducts(filterProductDTO: FilterProductDTO): Promise<Product[]> {
    const { search, category } = filterProductDTO;
    let products = await this.getAllProducts();
    console.log('inside the desired function 2');

    if (search) {
      products = products.filter(product => 
        product.name.includes(search) ||
        product.description.includes(search));
    }

    if (category) {
      products = products.filter(product => product.category === category)
    }

    return products;
  }

  async getAllProducts(): Promise<Product[]> {
    try {
      console.log('here');
      var products = await this.productModel.find().exec();
    } catch (error) {
      console.log(error);
    }
    //const products = await this.productModel.find().exec();
    return products;
  }

  async getProduct(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    return product;
  }

  async addProduct(createProductDTO: CreateProductDTO): Promise<Product> {
    const newProduct = await this.productModel.create(createProductDTO);
    return newProduct.save();
  }

  async updateProduct(id: string, createProductDTO: CreateProductDTO): Promise<Product> {
    //console.log('inside the desired function');
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, createProductDTO, { new: true }).exec();
    return updatedProduct;
  }

  async deleteProduct(id: string): Promise<any> {
    const deletedProduct = await this.productModel.findByIdAndRemove(id);
    return deletedProduct;
  }
}