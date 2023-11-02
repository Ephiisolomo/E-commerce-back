import { Controller, Post, Get, Put, Delete, Body, Param, Query, NotFoundException, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product.dto';
import { FilterProductDTO } from './dto/filter-product.dto';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { multerConfig } from './schemas/multer.config';
import { diskStorage } from 'multer';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('product')
@Controller('store/products')
export class ProductController {
  constructor(private productService: ProductService) { }

  @Get('/')
  async getProducts(@Query() filterProductDTO: FilterProductDTO, @Res() res) {
    console.log('inside the desired function');

    if (Object.keys(filterProductDTO).length) {
      const filteredProducts = await this.productService.getFilteredProducts(filterProductDTO);
      return filteredProducts;
    } else {
      console.log('the 2nd one')
      const allProducts = await this.productService.getAllProducts();
      return allProducts;
    }
  }

  @Get('/:filename')
seeUploadedFile(@Param('filename') filename:string, @Res() res) {
  return res.sendFile(filename, { root: './src/product/schemas/uploads' });
}
  @Get('/:id')
  async getProduct(@Param('id') id: string) {
    const product = await this.productService.getProduct(id);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }
  
  @Post('/')
  @UseInterceptors(FileInterceptor('ProductImage', {
    storage: diskStorage({
        destination: './src/product/schemas/uploads',
        filename: (req, file, cb) => {
            cb(null, `${file.originalname}`)
            console.log(file.originalname, "lll")
        }
    })
}))
  async addProduct(@Body() createProductDTO: CreateProductDTO, @UploadedFile() productImage): Promise<{ product: import("c:/Users/USER/Desktop/IE-assignment/ecommerce-backend/src/product/schemas/product.schma").Product; pro: any; }> {
       
    const pro =  productImage ? productImage.filename : null;
    const product = await this.productService.addProduct(createProductDTO);
    product.image = 'src/product/schemas/uploads/' + pro;
    const new1 = await this.productService.addProduct(product);
    return {product, pro};
  }

  @Put('/:id')
  async updateProduct(@Param('id') id: string, @Body() createProductDTO: CreateProductDTO) {
    console.log("inside here");
    const product = await this.productService.updateProduct(id, createProductDTO);
    if (!product) throw new NotFoundException('Product does not exist!');
    return product;
  }

  @Delete('/:id')
  async deleteProduct(@Param('id') id: string) {
    const product = await this.productService.deleteProduct(id);
    if (!product) throw new NotFoundException('Product does not exist');
    return product;
  }
}