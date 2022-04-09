import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/products.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    const product = await this.productsService.createProduct(createProductDTO);
    return res.status(HttpStatus.OK).json({
      message: 'Producto creado',
      product: product,
    });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productsService.getProducts();
    res.status(HttpStatus.OK).json(products);
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productsService.getProduct(productID);
    if (!product) {
      throw new NotFoundException('Producto no existe');
    }
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete/:productID')
  async deleteProduct(@Res() res, @Param('productID') productID) {
    const productDeleted = await this.productsService.deleteProduct(productID);
    if (!productDeleted) {
      throw new NotFoundException('Producto no existe');
    }
    return res
      .status(HttpStatus.OK)
      .json({ message: 'Producto eliminado', productDeleted });
  }

  @Put('/update/:productID')
  async updateProduct(
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
    @Param('productID') productID,
  ) {
    const product = await this.productsService.updateProduct(
      productID,
      createProductDTO,
    );
    return res.status(HttpStatus.OK).json({
      message: 'Producto Actualizado',
      product: product,
    });
  }
}
