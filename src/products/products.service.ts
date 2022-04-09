import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Products } from './interfaces/products.interface';
import { CreateProductDTO } from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel('Products') private readonly productModel: Model<Products>,
  ) {}

  async getProducts(): Promise<Products[]> {
    const products = await this.productModel.find();
    return products;
  }

  async getProduct(productId: string): Promise<Products> {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async createProduct(createProductDTO): Promise<Products> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }

  async deleteProduct(productId: string): Promise<Products> {
    const deletedProduct = await this.productModel.findByIdAndDelete(productId);
    return deletedProduct;
  }

  async updateProduct(productId: string, createProductDTO): Promise<Products> {
    const updatedProduct = await this.productModel.findByIdAndUpdate(
      productId,
      createProductDTO,
      { new: true },
    );
    return updatedProduct;
  }
}
